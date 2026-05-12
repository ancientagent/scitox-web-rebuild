import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const defaultSourceBasePath = path.join(repoRoot, "guidance", "source_base.example.json");
const apiPaths = new Set(["/api/guidance/health", "/api/guidance/recommend"]);

export function isGuidanceApiPath(pathname) {
  return apiPaths.has(pathname);
}

export async function handleGuidanceApiRequest(request, response) {
  const url = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);

  if (request.method === "OPTIONS") {
    writeJson(response, 204, {});
    return;
  }

  if (url.pathname === "/api/guidance/health") {
    writeJson(response, 200, {
      ok: true,
      llmConfigured: hasLiveLlmConfig(),
      sourceBasePath: path.relative(repoRoot, getSourceBasePath()),
      mode: hasLiveLlmConfig() ? "llm_ready" : "safe_fallback",
    });
    return;
  }

  if (url.pathname !== "/api/guidance/recommend") {
    writeJson(response, 404, { error: "Not found" });
    return;
  }

  if (request.method !== "POST") {
    writeJson(response, 405, { error: "Use POST for product guidance." });
    return;
  }

  try {
    const input = await readJsonBody(request);
    const sourceBase = await loadSourceBase();
    const sanitizedAnswers = sanitizeAnswers(input.answers);
    const result = await runGuidanceAssistant({ sourceBase, answers: sanitizedAnswers });
    writeJson(response, 200, result);
  } catch (error) {
    writeJson(response, 500, {
      recommendation_status: "human_follow_up",
      recommended_product_id: null,
      recommended_path_label: "Human follow-up path",
      explanation:
        "The guidance service could not complete a source-grounded recommendation, so it should route to human support.",
      source_ids: [],
      missing_owner_data: [],
      review_required: ["Guidance service error review"],
      next_step: "Route to support intake.",
      error:
        process.env.GUIDANCE_DEBUG === "1" && error instanceof Error
          ? error.message
          : "Guidance service error.",
    });
  }
}

async function runGuidanceAssistant({ sourceBase, answers }) {
  if (!hasLiveLlmConfig()) {
    return fallbackGuidance({
      sourceBase,
      answers,
      reason:
        "The backend guidance endpoint is running, but live LLM credentials are not configured.",
    });
  }

  const body = {
    model: process.env.GUIDANCE_LLM_MODEL,
    temperature: 0.1,
    messages: [
      {
        role: "system",
        content:
          "You are a source-grounded SciTOX product guidance assistant. Use only the provided source base and customer answers. Do not invent product facts, claims, legal advice, medical advice, diagnostic advice, test-result advice, guarantees, privacy/security promises, vendor approval, marketplace eligibility, or payment approval. If the source base does not support a recommendation, return human_follow_up. Return only valid JSON matching the requested contract.",
      },
      {
        role: "user",
        content: JSON.stringify({
          task: "Determine whether the source base supports a product path recommendation.",
          answer_summary: answers,
          source_base: sourceBase,
          output_contract: sourceBase.assistant_output_contract,
        }),
      },
    ],
  };

  const response = await fetch(getLlmEndpoint(), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GUIDANCE_LLM_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    return fallbackGuidance({
      sourceBase,
      answers,
      reason: `The LLM provider returned ${response.status}.`,
    });
  }

  const payload = await response.json();
  const content = payload?.choices?.[0]?.message?.content;
  const parsed = parseJsonFromText(content);

  if (!parsed) {
    return fallbackGuidance({
      sourceBase,
      answers,
      reason: "The LLM response was not valid JSON.",
    });
  }

  return normalizeAssistantOutput(parsed, sourceBase);
}

function fallbackGuidance({ sourceBase, answers, reason }) {
  return {
    recommendation_status: "human_follow_up",
    recommended_product_id: null,
    recommended_path_label: "Human follow-up path",
    explanation:
      `${reason} Product guidance should not invent a recommendation without approved source data and reviewed routing rules.`,
    source_ids: sourceBase.source_groups?.map((source) => source.id) ?? [],
    missing_owner_data: [
      "Approved product mapping rules",
      "Owner-approved product catalog",
      "LLM provider credentials and data-handling review",
    ],
    review_required: [
      "Product guidance logic",
      "Privacy/data handling",
      "Claims boundaries",
      "Human escalation workflow",
    ],
    next_step: answers.length
      ? "Use the selected route to open support intake or a reviewed product path."
      : "Ask structured product questions before routing.",
    mode: "safe_fallback",
  };
}

function normalizeAssistantOutput(parsed, sourceBase) {
  const allowedStatuses = new Set(["product_path", "needs_more_info", "human_follow_up"]);
  const status = allowedStatuses.has(parsed.recommendation_status)
    ? parsed.recommendation_status
    : "human_follow_up";

  return {
    recommendation_status: status,
    recommended_product_id: parsed.recommended_product_id ?? null,
    recommended_path_label: String(parsed.recommended_path_label ?? "Human follow-up path").slice(0, 120),
    explanation: String(parsed.explanation ?? "Route to human support.").slice(0, 600),
    source_ids: Array.isArray(parsed.source_ids) ? parsed.source_ids.slice(0, 8) : [],
    missing_owner_data: Array.isArray(parsed.missing_owner_data)
      ? parsed.missing_owner_data.slice(0, 10)
      : [],
    review_required: Array.isArray(parsed.review_required) ? parsed.review_required.slice(0, 10) : [],
    next_step: String(parsed.next_step ?? "Route to support intake.").slice(0, 200),
    mode: "llm_response",
    source_base_status: sourceBase.status ?? "REVIEW_REQUIRED",
  };
}

async function loadSourceBase() {
  const content = await readFile(getSourceBasePath(), "utf8");
  return JSON.parse(content);
}

function getSourceBasePath() {
  return process.env.GUIDANCE_SOURCE_BASE
    ? path.resolve(process.env.GUIDANCE_SOURCE_BASE)
    : defaultSourceBasePath;
}

function getLlmEndpoint() {
  if (process.env.GUIDANCE_LLM_ENDPOINT) {
    return process.env.GUIDANCE_LLM_ENDPOINT;
  }

  const baseUrl = (process.env.GUIDANCE_LLM_BASE_URL ?? "").replace(/\/$/, "");
  return `${baseUrl}/chat/completions`;
}

function hasLiveLlmConfig() {
  return Boolean(
    process.env.GUIDANCE_LLM_API_KEY &&
      process.env.GUIDANCE_LLM_MODEL &&
      (process.env.GUIDANCE_LLM_ENDPOINT || process.env.GUIDANCE_LLM_BASE_URL),
  );
}

function sanitizeAnswers(answers) {
  if (!Array.isArray(answers)) {
    return [];
  }

  return answers.slice(0, 12).map((answer) => ({
    id: String(answer.id ?? "").slice(0, 80),
    label: String(answer.label ?? "").slice(0, 160),
    value: String(answer.value ?? "").slice(0, 400),
  }));
}

async function readJsonBody(request) {
  const chunks = [];
  let total = 0;

  for await (const chunk of request) {
    total += chunk.length;
    if (total > 32768) {
      throw new Error("Request body too large.");
    }
    chunks.push(chunk);
  }

  if (!chunks.length) {
    return {};
  }

  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function parseJsonFromText(text) {
  if (typeof text !== "string") {
    return null;
  }

  const trimmed = text.trim();

  try {
    return JSON.parse(trimmed);
  } catch {
    const match = trimmed.match(/\{[\s\S]*\}/);
    if (!match) {
      return null;
    }

    try {
      return JSON.parse(match[0]);
    } catch {
      return null;
    }
  }
}

function writeJson(response, status, payload) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "Access-Control-Allow-Origin": process.env.GUIDANCE_ALLOWED_ORIGIN ?? "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });

  if (status === 204) {
    response.end();
    return;
  }

  response.end(JSON.stringify(payload, null, 2));
}

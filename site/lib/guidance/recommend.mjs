import { readFile } from "node:fs/promises";
import path from "node:path";

const VALID_STATUSES = new Set([
  "product_path",
  "needs_more_info",
  "human_follow_up",
]);

const REVIEWED_PATH_STATUSES = new Set(["REVIEWED", "APPROVED"]);

const DISALLOWED_PATTERNS = [
  /\bmedical\b/i,
  /\blegal\b/i,
  /\bdiagnos/i,
  /\bprescri/i,
  /\bcounsel\b/i,
  /\bconsultation\b/i,
  /\bguarantee/i,
  /\bpass\b.*\btest\b/i,
  /\btest\b.*\bresult\b/i,
  /\bencrypt/i,
  /\banonymous\b/i,
  /\bvendor\b.*\baccept/i,
  /\bamazon\b/i,
  /\bpayment\b.*\bapproval\b/i,
];

const DEFAULT_RESULT = {
  recommendation_status: "human_follow_up",
  recommended_product_id: null,
  recommended_path_label: "[PLACEHOLDER: human follow-up path - REVIEW REQUIRED]",
  explanation:
    "[REVIEW REQUIRED: guidance should route to support until source data supports a product path]",
  source_ids: [],
  missing_owner_data: [],
  review_required: [],
  next_step: "[OWNER DATA NEEDED: human support routing workflow]",
};

function cleanText(value, maxLength = 400) {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function normalizeList(value, maxItems = 10) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => cleanText(item, 160))
    .filter(Boolean)
    .slice(0, maxItems);
}

function buildResult(overrides = {}) {
  const status = VALID_STATUSES.has(overrides.recommendation_status)
    ? overrides.recommendation_status
    : DEFAULT_RESULT.recommendation_status;

  return {
    ...DEFAULT_RESULT,
    ...overrides,
    recommendation_status: status,
    recommended_product_id:
      status === "product_path" ? cleanText(overrides.recommended_product_id, 120) : null,
    recommended_path_label:
      cleanText(overrides.recommended_path_label, 140) ||
      DEFAULT_RESULT.recommended_path_label,
    explanation: cleanText(overrides.explanation, 600) || DEFAULT_RESULT.explanation,
    source_ids: normalizeList(overrides.source_ids, 8),
    missing_owner_data: normalizeList(overrides.missing_owner_data, 12),
    review_required: normalizeList(overrides.review_required, 12),
    next_step: cleanText(overrides.next_step, 240) || DEFAULT_RESULT.next_step,
  };
}

export function validateGuidanceRequest(payload) {
  const fieldErrors = {};

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return {
      ok: false,
      data: { answers: [] },
      fieldErrors: {
        request: ["Provide a structured guidance request."],
      },
    };
  }

  if (!Array.isArray(payload.answers)) {
    fieldErrors.answers = ["Provide structured guidance answers."];
  }

  const answers = Array.isArray(payload.answers)
    ? payload.answers.slice(0, 8).map((answer) => ({
        id: cleanText(answer?.id, 80),
        label: cleanText(answer?.label, 120),
        value: cleanText(answer?.value, 300),
      }))
    : [];

  if (answers.some((answer) => !answer.id || !answer.value)) {
    fieldErrors.answers = ["Each guidance answer needs an id and value."];
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, data: { answers }, fieldErrors };
  }

  return { ok: true, data: { answers }, fieldErrors: {} };
}

export function createGuidanceResponse(payload, options = {}) {
  const request = validateGuidanceRequest(payload);
  const sourceBase = options.sourceBase;

  if (!request.ok) {
    return buildResult({
      recommendation_status: "needs_more_info",
      explanation: "[REVIEW REQUIRED: guidance request failed structured validation]",
      missing_owner_data: ["Structured guidance answers"],
      review_required: ["Guidance request validation"],
      next_step: "[REVIEW REQUIRED: ask structured product questions]",
    });
  }

  if (hasDisallowedAdviceRequest(request.data.answers)) {
    return buildResult({
      recommendation_status: "human_follow_up",
      explanation:
        "[REVIEW REQUIRED: request is outside reviewed product guidance boundaries]",
      source_ids: getSourceIds(sourceBase),
      review_required: [
        "Guidance boundary review",
        "Human escalation workflow",
      ],
      next_step: "[OWNER DATA NEEDED: route to human support for review]",
    });
  }

  if (!isUsableSourceBase(sourceBase)) {
    return buildResult({
      recommendation_status: "human_follow_up",
      explanation:
        "[OWNER DATA NEEDED: source base is missing or does not include reviewed product paths]",
      source_ids: getSourceIds(sourceBase),
      missing_owner_data: [
        "Guidance source base",
        "Reviewed product path mapping",
        "Owner product catalog",
      ],
      review_required: [
        "Guidance source data review",
        "Claims and product routing review",
      ],
      next_step: "[OWNER DATA NEEDED: use support intake until source data is complete]",
    });
  }

  const matchedPath = findMatchingProductPath(sourceBase.product_paths, request.data.answers);

  if (!matchedPath) {
    return buildResult({
      recommendation_status: "human_follow_up",
      explanation:
        "[REVIEW REQUIRED: no reviewed source path matched the structured answers]",
      source_ids: getSourceIds(sourceBase),
      missing_owner_data: ["Product path mapping for selected answers"],
      review_required: ["Human escalation workflow"],
      next_step: "[OWNER DATA NEEDED: support route for unmatched guidance request]",
    });
  }

  return buildResult({
    recommendation_status: "product_path",
    recommended_product_id: matchedPath.product_id,
    recommended_path_label: matchedPath.label,
    explanation: matchedPath.explanation,
    source_ids: matchedPath.source_ids,
    missing_owner_data: matchedPath.missing_owner_data,
    review_required: matchedPath.review_required,
    next_step: matchedPath.next_step,
  });
}

export async function createGuidanceResponseFromSourcePath(payload, sourcePath) {
  try {
    const sourceBase = await loadGuidanceSourceBase(sourcePath);
    return createGuidanceResponse(payload, { sourceBase });
  } catch {
    return createGuidanceResponse(payload, { sourceBase: null });
  }
}

export async function loadGuidanceSourceBase(sourcePath = getDefaultSourceBasePath()) {
  const content = await readFile(sourcePath, "utf8");
  return JSON.parse(content);
}

export function getDefaultSourceBasePath() {
  if (process.env.GUIDANCE_SOURCE_BASE) {
    return path.resolve(process.env.GUIDANCE_SOURCE_BASE);
  }

  return path.join(process.cwd(), "data", "guidance-source.example.json");
}

function hasDisallowedAdviceRequest(answers) {
  const text = answers.map((answer) => `${answer.label} ${answer.value}`).join(" ");
  return DISALLOWED_PATTERNS.some((pattern) => pattern.test(text));
}

function isUsableSourceBase(sourceBase) {
  return Boolean(
    sourceBase &&
      typeof sourceBase === "object" &&
      Array.isArray(sourceBase.source_groups) &&
      Array.isArray(sourceBase.product_paths) &&
      sourceBase.product_paths.some((pathRecord) =>
        REVIEWED_PATH_STATUSES.has(pathRecord?.status),
      ),
  );
}

function findMatchingProductPath(productPaths, answers) {
  const answerValues = new Set(
    answers.flatMap((answer) => [
      answer.value.toLowerCase(),
      answer.id.toLowerCase(),
      answer.label.toLowerCase(),
    ]),
  );

  return productPaths.find((pathRecord) => {
    if (!REVIEWED_PATH_STATUSES.has(pathRecord?.status) || !pathRecord.product_id) {
      return false;
    }

    const matchValues = normalizeList(pathRecord.match_values, 20).map((value) =>
      value.toLowerCase(),
    );
    return matchValues.some((value) => answerValues.has(value));
  });
}

function getSourceIds(sourceBase) {
  if (!sourceBase || !Array.isArray(sourceBase.source_groups)) {
    return [];
  }

  return sourceBase.source_groups
    .map((source) => cleanText(source.id, 120))
    .filter(Boolean);
}

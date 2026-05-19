"use client";

import { FormEvent, useState } from "react";

type GuidanceResult = {
  recommendation_status: "product_path" | "needs_more_info" | "human_follow_up";
  recommended_product_id: string | null;
  recommended_path_label: string;
  explanation: string;
  source_ids: string[];
  missing_owner_data: string[];
  review_required: string[];
  next_step: string;
};

const demoRoutes = {
  common: {
    label: "Common path",
    answerLabel: "Product path type [REVIEW REQUIRED]",
    answerValue: "standard",
  },
  compare: {
    label: "Compare options",
    answerLabel: "Comparison need [REVIEW REQUIRED]",
    answerValue: "compare",
  },
  boundary: {
    label: "Boundary check",
    answerLabel: "[REVIEW REQUIRED: sensitive guidance boundary]",
    answerValue: "boundary-review-needed",
  },
};

type DemoRouteKey = keyof typeof demoRoutes;

const initialResult: GuidanceResult = {
  recommendation_status: "human_follow_up",
  recommended_product_id: null,
  recommended_path_label: "Source-gated route not requested yet",
  explanation:
    "[OWNER DATA NEEDED: owner-reviewed source data before live route output]",
  source_ids: [],
  missing_owner_data: ["Reviewed product path mapping"],
  review_required: ["Guidance source-base behavior"],
  next_step: "[OWNER DATA NEEDED: human support destination for fallback cases]",
};

export function GuidanceAssistantDemo() {
  const [selectedRoute, setSelectedRoute] = useState<DemoRouteKey>("common");
  const [result, setResult] = useState<GuidanceResult>(initialResult);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");
  const route = demoRoutes[selectedRoute];

  async function submitGuidance(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/guidance/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: [
            {
              id: "demo_route",
              label: route.answerLabel,
              value: route.answerValue,
            },
          ],
        }),
      });
      const payload = await response.json();

      if (!response.ok || !payload?.result) {
        setStatus("error");
        setMessage(
          payload?.message ??
            "[REVIEW REQUIRED: guidance route returned a safe validation state]",
        );
        return;
      }

      setResult(payload.result);
      setStatus("idle");
      setMessage("[REVIEW REQUIRED: source-gated response returned]");
    } catch {
      setStatus("error");
      setMessage("[REVIEW REQUIRED: guidance route unavailable; use support intake]");
      setResult({
        ...initialResult,
        explanation:
          "[REVIEW REQUIRED: guidance route unavailable, so the demo must fall back to support]",
      });
    }
  }

  return (
    <div className="guidance-api-demo">
      <form className="choice-panel guidance-api-demo__form" onSubmit={submitGuidance}>
        <p className="tag">Source-gated intake</p>
        <h2>Source-gated route check [REVIEW REQUIRED]</h2>
        <div className="choice-list" role="group" aria-label="Guidance API demo routes">
          {Object.entries(demoRoutes).map(([key, value]) => (
            <button
              className={key === selectedRoute ? "is-active" : ""}
              key={key}
              onClick={() => setSelectedRoute(key as DemoRouteKey)}
              type="button"
            >
              {value.label}
            </button>
          ))}
        </div>
        <div className="form-note">
          <p>
            [OWNER DATA NEEDED: route output remains gated until owner-reviewed
            source data, product mapping, and support fallback rules exist]
          </p>
        </div>
        <div className="form-actions">
          <button disabled={status === "loading"} type="submit">
            {status === "loading" ? "Checking source gate" : "Check route"}
          </button>
          {message ? (
            <span
              className={`form-status ${
                status === "error" ? "form-status--error" : "form-status--success"
              }`}
              role="status"
            >
              {message}
            </span>
          ) : null}
        </div>
      </form>
      <GuidanceResultPanel result={result} />
    </div>
  );
}

function GuidanceResultPanel({ result }: { result: GuidanceResult }) {
  return (
    <div className="preview-result guidance-api-demo__result">
      <p className="tag">Structured route state</p>
      <h2>{result.recommended_path_label}</h2>
      <dl className="fact-list">
        <div>
          <dt>Status</dt>
          <dd>{result.recommendation_status}</dd>
        </div>
        <div>
          <dt>Product ID</dt>
          <dd>{result.recommended_product_id ?? "[OWNER DATA NEEDED]"}</dd>
        </div>
        <div>
          <dt>Explanation</dt>
          <dd>{result.explanation}</dd>
        </div>
        <div>
          <dt>Next step</dt>
          <dd>{result.next_step}</dd>
        </div>
      </dl>
      <div className="notice-list">
        <span>{formatList("Source IDs", result.source_ids)}</span>
        <span>{formatList("Owner data needed", result.missing_owner_data)}</span>
        <span>{formatList("Review required", result.review_required)}</span>
      </div>
    </div>
  );
}

function formatList(label: string, values: string[]) {
  return `${label}: ${values.length ? values.join("; ") : "[OWNER DATA NEEDED]"}`;
}

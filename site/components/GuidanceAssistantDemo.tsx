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
    answerLabel: "Starting point",
    answerValue: "standard-volume",
  },
  compare: {
    label: "Longer hair",
    answerLabel: "Product volume need",
    answerValue: "long-hair-volume",
  },
  boundary: {
    label: "Not simple",
    answerLabel: "Support need",
    answerValue: "boundary-review-needed",
  },
};

type DemoRouteKey = keyof typeof demoRoutes;

const initialResult: GuidanceResult = {
  recommendation_status: "human_follow_up",
  recommended_product_id: null,
  recommended_path_label: "Start with the closest option.",
  explanation:
    "The site can help with simple paths first. If the fit is unclear, it will move the request to support.",
  source_ids: [],
  missing_owner_data: ["Reviewed product path mapping"],
  review_required: ["Guidance source-base behavior"],
  next_step: "Choose a starting point, then continue only if the route feels right.",
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
        setMessage("Please answer the guidance question before continuing.");
        return;
      }

      setResult(payload.result);
      setStatus("idle");
      setMessage("The guidance route checked your starting point.");
    } catch {
      setStatus("error");
      setMessage("This route is not available right now. Support is the safer next step.");
      setResult({
        ...initialResult,
        explanation:
          "The site should keep the experience calm when guidance is unavailable.",
      });
    }
  }

  return (
    <div className="guidance-api-demo">
      <form className="choice-panel guidance-api-demo__form" onSubmit={submitGuidance}>
        <p className="tag">Quick guidance</p>
        <h2>Pick the closest starting point.</h2>
        <div className="choice-list" role="group" aria-label="Guidance route choices">
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
            The demo keeps this simple: common situations can move forward,
            unclear situations should go to support.
          </p>
        </div>
        <div className="form-actions">
          <button disabled={status === "loading"} type="submit">
            {status === "loading" ? "Checking" : "Continue"}
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
  const display = getGuidanceDisplay(result);

  return (
    <div className="preview-result guidance-api-demo__result">
      <p className="tag">Next step</p>
      <h2>{display.title}</h2>
      <dl className="fact-list">
        <div>
          <dt>Route</dt>
          <dd>{display.status}</dd>
        </div>
        <div>
          <dt>Product path</dt>
          <dd>{display.productPath}</dd>
        </div>
        <div>
          <dt>Why</dt>
          <dd>{display.explanation}</dd>
        </div>
        <div>
          <dt>Next step</dt>
          <dd>{display.nextStep}</dd>
        </div>
      </dl>
      <div className="notice-list">
        <span>The site should avoid guessing when the fit is unclear.</span>
        <span>Support remains available for situations that need more context.</span>
      </div>
    </div>
  );
}

function getGuidanceDisplay(result: GuidanceResult) {
  if (result.recommendation_status === "product_path" && result.recommended_product_id) {
    return {
      title: result.recommended_path_label,
      status: "Product path available",
      productPath: "TotalTOX product line",
      explanation:
        "A product path can be shown when the answers match reviewed product information.",
      nextStep: "Review the product path, then continue only if it fits.",
    };
  }

  if (result.recommendation_status === "needs_more_info") {
    return {
      title: "A little more context is needed.",
      status: "More information needed",
      productPath: "Not selected yet",
      explanation:
        "The site should ask for more context before suggesting a product path.",
      nextStep: "Use support if the choice still feels unclear.",
    };
  }

  return {
    title: "Support is the better next step.",
    status: "Support follow-up",
    productPath: "Not selected yet",
    explanation:
      "When a situation is not simple, the site should route to support instead of guessing.",
    nextStep: "Send the support request with the details you are comfortable sharing.",
  };
}

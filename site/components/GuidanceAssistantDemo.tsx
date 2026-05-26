"use client";

import Link from "next/link";
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

type VisitorType = "first-time" | "returning";
type VisitorNeed = "learn" | "next-step" | "recent-purchase" | "support-question";

const visitorOptions: Record<
  VisitorType,
  {
    label: string;
    sentence: string;
    needs: Array<{
      key: VisitorNeed;
      label: string;
      title: string;
      body: string;
      route: "resource" | "questions" | "support";
    }>;
  }
> = {
  "first-time": {
    label: "I'm a first time visitor",
    sentence: "I'm a first time visitor",
    needs: [
      {
        key: "learn",
        label: "looking for information on whether SciTOX is right for me",
        title: "We can start with the resource library.",
        body:
          "No pressure. You can review what SciTOX is, who it may be for, and the privacy-aware topics to consider before making any decisions.",
        route: "resource",
      },
      {
        key: "next-step",
        label: "looking to take the next step with SciTOX",
        title: "No problem. We'll keep this simple.",
        body:
          "We just need to ask a few quick questions to help route you toward the right product path. Kick back while we prepare your private session, and we'll get you moving.",
        route: "questions",
      },
    ],
  },
  returning: {
    label: "I'm an active or returning client",
    sentence: "I'm an active or returning client",
    needs: [
      {
        key: "recent-purchase",
        label: "checking what to do after a recent purchase",
        title: "We'll keep this focused on next-step support.",
        body:
          "Use support for order, product, or timing questions. Share only the details that help the team understand what you need.",
        route: "support",
      },
      {
        key: "support-question",
        label: "returning with a product or support question",
        title: "Support is the right place for this.",
        body:
          "When the situation needs more context, support is the better next step.",
        route: "support",
      },
    ],
  },
};

const initialResult: GuidanceResult = {
  recommendation_status: "human_follow_up",
  recommended_product_id: null,
  recommended_path_label: "Start with the statement that fits best.",
  explanation:
    "Start by choosing whether you are new, returning, ready to learn, or ready to continue.",
  source_ids: [],
  missing_owner_data: ["Reviewed product path mapping"],
  review_required: ["Guidance source-base behavior"],
  next_step: "Choose the closest statement. The next options will narrow from there.",
};

export function GuidanceAssistantDemo() {
  const [visitorType, setVisitorType] = useState<VisitorType | null>(null);
  const [visitorNeed, setVisitorNeed] = useState<VisitorNeed | null>(null);
  const [result, setResult] = useState<GuidanceResult>(initialResult);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  const selectedProfile = visitorType ? visitorOptions[visitorType] : null;
  const selectedNeed = selectedProfile?.needs.find((need) => need.key === visitorNeed) ?? null;

  function chooseVisitorType(type: VisitorType) {
    setVisitorType(type);
    setVisitorNeed(null);
    setResult({
      ...initialResult,
      recommended_path_label: visitorOptions[type].sentence,
      explanation: "Good. The next step is choosing what you need from here.",
      next_step: "Choose the statement that completes the thought.",
    });
    setMessage("");
    setStatus("idle");
  }

  function chooseVisitorNeed(need: VisitorNeed) {
    if (!selectedProfile) {
      return;
    }

    const nextNeed = selectedProfile.needs.find((option) => option.key === need);
    if (!nextNeed) {
      return;
    }

    setVisitorNeed(need);
    setResult({
      ...initialResult,
      recommendation_status: nextNeed.route === "questions" ? "needs_more_info" : "human_follow_up",
      recommended_path_label: `${selectedProfile.sentence} ${nextNeed.label}.`,
      explanation: nextNeed.body,
      review_required:
        nextNeed.route === "questions"
          ? ["Product guidance routing review"]
          : ["Resource and support content review"],
      next_step:
        nextNeed.route === "questions"
          ? "Continue to a few focused product guidance questions."
          : nextNeed.route === "resource"
            ? "Open the resource library before making a decision."
            : "Use support for the next step.",
    });
    setMessage("");
    setStatus("idle");
  }

  async function submitGuidance(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!visitorType || !selectedNeed) {
      setStatus("error");
      setMessage("Choose the statement that best represents your current situation.");
      return;
    }

    if (selectedNeed.route !== "questions") {
      setStatus("idle");
      setMessage(
        selectedNeed.route === "resource"
          ? "We'll take you to the resource library first."
          : "We'll move this to support.",
      );
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/guidance/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: [
            {
              id: "visitor_context",
              label: selectedProfile?.sentence ?? "Visitor context",
              value: selectedNeed.key,
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

      setResult({
        ...payload.result,
        recommended_path_label: `${selectedProfile?.sentence} ${selectedNeed.label}.`,
        explanation:
          "No problem. We just need a few focused answers to help route you toward the right product path.",
        next_step:
          "Kick back while we prepare your private session, then continue through the quick questions.",
      });
      setStatus("idle");
      setMessage("Your private session is ready for the next questions.");
    } catch {
      setStatus("error");
      setMessage("This path is not available right now. Support is the safer next step.");
      setResult({
        ...initialResult,
        explanation: "Support is available when guidance is not the right fit.",
      });
    }
  }

  return (
    <div className={`guidance-api-demo ${selectedNeed ? "" : "guidance-api-demo--single"}`}>
      <form className="choice-panel guidance-api-demo__form" onSubmit={submitGuidance}>
        <h2>Which of the following statements best represents your current situation?</h2>
        <div className="choice-list" role="group" aria-label="Visitor type choices">
          {(Object.entries(visitorOptions) as Array<[VisitorType, (typeof visitorOptions)[VisitorType]]>)
            .filter(([key]) => !visitorType || key === visitorType)
            .map(([key, value]) => (
              <button
                className={key === visitorType ? "is-active" : ""}
                key={key}
                onClick={() => chooseVisitorType(key)}
                type="button"
              >
                {value.label}
              </button>
            ))}
        </div>
        {selectedProfile ? (
          <div className="followup-choice" aria-live="polite">
            <p>{selectedProfile.sentence}...</p>
            <div className="choice-list" role="group" aria-label="Visitor need choices">
              {selectedProfile.needs
                .filter((need) => !visitorNeed || need.key === visitorNeed)
                .map((need) => (
                  <button
                    className={need.key === visitorNeed ? "is-active" : ""}
                    key={need.key}
                    onClick={() => chooseVisitorNeed(need.key)}
                    type="button"
                  >
                    {need.label}
                  </button>
                ))}
            </div>
          </div>
        ) : null}
        <div className="form-note">
          <p>
            Start with the closest answer. The page will narrow the next step
            without asking for more than it needs.
          </p>
        </div>
        {selectedNeed?.route === "questions" || message ? (
          <div className="form-actions">
            {selectedNeed?.route === "questions" ? (
              <button disabled={status === "loading"} type="submit">
                {status === "loading" ? "Preparing" : "Continue"}
              </button>
            ) : null}
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
        ) : null}
      </form>
      {selectedNeed ? <GuidanceResultPanel result={result} selectedNeed={selectedNeed} /> : null}
    </div>
  );
}

function GuidanceResultPanel({
  result,
  selectedNeed,
}: {
  result: GuidanceResult;
  selectedNeed:
    | {
        title: string;
        route: "resource" | "questions" | "support";
      }
    | null;
}) {
  const display = getGuidanceDisplay(result, selectedNeed);

  return (
    <div className="preview-result guidance-api-demo__result">
        <p className="tag">Next step</p>
      <h2>{display.title}</h2>
      <dl className="fact-list">
        <div>
          <dt>Path</dt>
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
        <span>Your first choice helps narrow the next step.</span>
        <span>Support remains available when the path needs more context.</span>
      </div>
      {display.href ? (
        <Link className="text-link" href={display.href}>
          {display.cta}
        </Link>
      ) : null}
    </div>
  );
}

function getGuidanceDisplay(
  result: GuidanceResult,
  selectedNeed:
    | {
        title: string;
        route: "resource" | "questions" | "support";
      }
    | null,
) {
  if (selectedNeed) {
    return {
      title: selectedNeed.title,
      status:
        selectedNeed.route === "resource"
          ? "Resource library"
          : selectedNeed.route === "questions"
            ? "Private session"
            : "Support",
      productPath:
        selectedNeed.route === "questions" ? "TotalTOX product guidance" : "Not selected yet",
      explanation: result.explanation,
      nextStep: result.next_step,
      href:
        selectedNeed.route === "resource"
          ? "/resources"
          : selectedNeed.route === "support"
            ? "/support"
            : null,
      cta:
        selectedNeed.route === "resource"
          ? "Open resource library"
          : selectedNeed.route === "support"
            ? "Open support"
            : null,
    };
  }

  return {
    title: "Start with where you are right now.",
    status: "Waiting for first choice",
    productPath: "Not selected yet",
    explanation: result.explanation,
    nextStep: result.next_step,
    href: null,
    cta: null,
  };
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type EntryStep =
  | "welcome"
  | "visitor"
  | "first-time"
  | "returning"
  | "resource-routing"
  | "support-routing"
  | "private-session"
  | "complete";

type ProductIntent = "choose-system" | "size-help" | "support";
type HairProfile = "short" | "medium" | "long-thick" | "not-sure";
type ContinuePreference = "view-product" | "support-review";

const routingDelay = 1700;
const sessionDelay = 2800;

function getMotionDelay(defaultDelay: number) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return Math.min(defaultDelay, 700);
  }

  return defaultDelay;
}

export function GuidanceAssistantDemo() {
  const router = useRouter();
  const [step, setStep] = useState<EntryStep>("welcome");
  const [questionStep, setQuestionStep] = useState(0);
  const [productIntent, setProductIntent] = useState<ProductIntent | null>(null);
  const [hairProfile, setHairProfile] = useState<HairProfile | null>(null);
  const [continuePreference, setContinuePreference] = useState<ContinuePreference | null>(null);

  useEffect(() => {
    if (step === "complete") {
      document.body.classList.remove("guidance-entry-active");
      return;
    }

    document.body.classList.add("guidance-entry-active");
    return () => {
      document.body.classList.remove("guidance-entry-active");
    };
  }, [step]);

  useEffect(() => {
    if (step !== "welcome") {
      return;
    }

    const timer = window.setTimeout(() => {
      setStep("visitor");
    }, getMotionDelay(4300));

    return () => window.clearTimeout(timer);
  }, [step]);

  useEffect(() => {
    if (step !== "resource-routing" && step !== "support-routing" && step !== "private-session") {
      return;
    }

    const timer = window.setTimeout(() => {
      if (step === "resource-routing") {
        router.push("/resources");
        return;
      }

      if (step === "support-routing") {
        router.push("/support");
        return;
      }

      setStep("complete");
      window.requestAnimationFrame(() => {
        document.getElementById("quick-guidance")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }, getMotionDelay(step === "private-session" ? sessionDelay : routingDelay));

    return () => window.clearTimeout(timer);
  }, [router, step]);

  if (step === "complete") {
    return (
      <ProductGuidanceQuestions
        continuePreference={continuePreference}
        hairProfile={hairProfile}
        productIntent={productIntent}
        questionStep={questionStep}
        setContinuePreference={setContinuePreference}
        setHairProfile={setHairProfile}
        setProductIntent={setProductIntent}
        setQuestionStep={setQuestionStep}
      />
    );
  }

  return (
    <section className={`guidance-entry guidance-entry--${step}`} aria-label="SciTOX guidance entry">
      <div className="guidance-entry__masthead" aria-label="SciTOX">
        <span aria-hidden="true" />
        <strong>SciTOX</strong>
      </div>

      {step === "welcome" ? (
        <div className="guidance-entry__stage guidance-entry__stage--welcome">
          <p className="guidance-entry__eyebrow">You are in the right place</p>
          <h1>Welcome to SciTOX.</h1>
          <p>Take a breath. You made it here, and the next step can be simple.</p>
        </div>
      ) : null}

      {step === "visitor" ? (
        <div className="guidance-entry__stage">
          <h1>Which of the following statements best represents your current situation?</h1>
          <div className="guidance-entry__choices" aria-label="Current situation">
            <button className="guidance-entry__choice" onClick={() => setStep("first-time")} type="button">
              I&apos;m a first time visitor
            </button>
            <button className="guidance-entry__choice" onClick={() => setStep("returning")} type="button">
              I&apos;m an active or returning client
            </button>
          </div>
        </div>
      ) : null}

      {step === "first-time" ? (
        <div className="guidance-entry__stage">
          <p className="guidance-entry__sentence">I&apos;m a first time visitor...</p>
          <div className="guidance-entry__choices" aria-label="First time visitor options">
            <button className="guidance-entry__choice" onClick={() => setStep("resource-routing")} type="button">
              looking for information on whether SciTOX is right for me
            </button>
            <button className="guidance-entry__choice" onClick={() => setStep("private-session")} type="button">
              looking to take the next step with SciTOX
            </button>
          </div>
        </div>
      ) : null}

      {step === "returning" ? (
        <div className="guidance-entry__stage">
          <p className="guidance-entry__sentence">I&apos;m an active or returning client...</p>
          <div className="guidance-entry__choices" aria-label="Returning client options">
            <button className="guidance-entry__choice" onClick={() => setStep("support-routing")} type="button">
              checking what to do after a recent purchase
            </button>
            <button className="guidance-entry__choice" onClick={() => setStep("support-routing")} type="button">
              returning with a product or support question
            </button>
          </div>
        </div>
      ) : null}

      {step === "resource-routing" ? (
        <div className="guidance-entry__stage">
          <p className="guidance-entry__eyebrow">Resource library</p>
          <h1>We&apos;ll take you there first.</h1>
          <p>
            You can learn what SciTOX is, who it may be for, and what to consider before
            making any decisions.
          </p>
        </div>
      ) : null}

      {step === "support-routing" ? (
        <div className="guidance-entry__stage">
          <p className="guidance-entry__eyebrow">Support</p>
          <h1>We&apos;ll move this to support.</h1>
          <p>That is the better path for order, product, timing, or follow-up questions.</p>
        </div>
      ) : null}

      {step === "private-session" ? (
        <div className="guidance-entry__stage">
          <p className="guidance-entry__eyebrow">Private session</p>
          <h1>No problem. We&apos;ll keep this simple.</h1>
          <p>
            We just need to ask a few quick questions to make sure you&apos;re set up with
            the right treatment. Kick back while we prepare your private session, and
            we&apos;ll get you on your way.
          </p>
        </div>
      ) : null}
    </section>
  );
}

function ProductGuidanceQuestions({
  continuePreference,
  hairProfile,
  productIntent,
  questionStep,
  setContinuePreference,
  setHairProfile,
  setProductIntent,
  setQuestionStep,
}: {
  continuePreference: ContinuePreference | null;
  hairProfile: HairProfile | null;
  productIntent: ProductIntent | null;
  questionStep: number;
  setContinuePreference: (value: ContinuePreference | null) => void;
  setHairProfile: (value: HairProfile | null) => void;
  setProductIntent: (value: ProductIntent | null) => void;
  setQuestionStep: (value: number) => void;
}) {
  function resetQuestions() {
    setProductIntent(null);
    setHairProfile(null);
    setContinuePreference(null);
    setQuestionStep(0);
  }

  return (
    <section className="content-band content-band--dark guidance-revealed" id="quick-guidance">
      <div className="band-inner">
        <div className="product-guidance-flow">
          <div className="product-guidance-flow__intro">
            <p className="tag">Product guidance</p>
            <h1>Let&apos;s find the right TotalTOX path.</h1>
            <p>
              Answer what you can. If the fit is not clear, we&apos;ll send this to support
              instead of guessing.
            </p>
          </div>

          {questionStep === 0 ? (
            <GuidanceQuestion
              options={[
                {
                  label: "I need help choosing a TotalTOX system",
                  onClick: () => {
                    setProductIntent("choose-system");
                    setQuestionStep(1);
                  },
                },
                {
                  label: "I need help with size or quantity",
                  onClick: () => {
                    setProductIntent("size-help");
                    setQuestionStep(1);
                  },
                },
                {
                  label: "I want support to review this first",
                  onClick: () => {
                    setProductIntent("support");
                    setQuestionStep(3);
                  },
                },
              ]}
              question="What do you need help with right now?"
            />
          ) : null}

          {questionStep === 1 ? (
            <GuidanceQuestion
              options={[
                {
                  label: "Short hair",
                  onClick: () => {
                    setHairProfile("short");
                    setQuestionStep(2);
                  },
                },
                {
                  label: "Medium length hair",
                  onClick: () => {
                    setHairProfile("medium");
                    setQuestionStep(2);
                  },
                },
                {
                  label: "Long or thick hair",
                  onClick: () => {
                    setHairProfile("long-thick");
                    setQuestionStep(2);
                  },
                },
                {
                  label: "I'm not sure",
                  onClick: () => {
                    setHairProfile("not-sure");
                    setQuestionStep(2);
                  },
                },
              ]}
              question="Which best describes your hair?"
            />
          ) : null}

          {questionStep === 2 ? (
            <GuidanceQuestion
              options={[
                {
                  label: "Show me the product path",
                  onClick: () => {
                    setContinuePreference("view-product");
                    setQuestionStep(3);
                  },
                },
                {
                  label: "Have support review before I order",
                  onClick: () => {
                    setContinuePreference("support-review");
                    setQuestionStep(3);
                  },
                },
              ]}
              question="How would you like to continue?"
            />
          ) : null}

          {questionStep === 3 ? (
            <GuidanceResult
              continuePreference={continuePreference}
              hairProfile={hairProfile}
              productIntent={productIntent}
              resetQuestions={resetQuestions}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}

function GuidanceQuestion({
  options,
  question,
}: {
  options: Array<{ label: string; onClick: () => void }>;
  question: string;
}) {
  return (
    <div className="product-guidance-card">
      <h2>{question}</h2>
      <div className="product-guidance-options">
        {options.map((option) => (
          <button key={option.label} onClick={option.onClick} type="button">
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function GuidanceResult({
  continuePreference,
  hairProfile,
  productIntent,
  resetQuestions,
}: {
  continuePreference: ContinuePreference | null;
  hairProfile: HairProfile | null;
  productIntent: ProductIntent | null;
  resetQuestions: () => void;
}) {
  const shouldUseSupport =
    productIntent === "support" ||
    continuePreference === "support-review" ||
    hairProfile === "not-sure";

  if (shouldUseSupport) {
    return (
      <div className="product-guidance-card">
        <p className="tag">Next step</p>
        <h2>Support should review this with you.</h2>
        <p>
          That is the better next step when size, quantity, or product fit is not clear
          from the quick questions.
        </p>
        <div className="product-guidance-actions">
          <Link className="button-link button-link--primary" href="/support">
            Go to support
          </Link>
          <button onClick={resetQuestions} type="button">
            Change answers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-guidance-card">
      <p className="tag">Next step</p>
      <h2>Start with the TotalTOX Hair Treatment System.</h2>
      <p>
        This points you to the product family. If anything about size, quantity, or
        order timing feels unclear, support can review before you order.
      </p>
      <div className="product-guidance-actions">
        <Link
          className="button-link button-link--primary"
          href="/products/totaltox-hair-treatment-system"
        >
          View TotalTOX
        </Link>
        <button onClick={resetQuestions} type="button">
          Change answers
        </button>
      </div>
    </div>
  );
}

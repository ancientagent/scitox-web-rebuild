"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type EntryStep =
  | "welcome"
  | "visitor"
  | "first-time"
  | "returning"
  | "product-routing"
  | "support-routing"
  | "private-session"
  | "complete";

type TreatmentFrequency = "two-weeks-or-less" | "weekly" | "daily";
type HairProfile = "short" | "medium" | "long-thick" | "not-sure";
type ContinuePreference = "view-product" | "support-review";

const routingDelay = 1700;
const sessionDelay = 2800;
const treatmentFrequencyLabels: Record<TreatmentFrequency, string> = {
  "two-weeks-or-less": "Every 2 weeks or less",
  weekly: "Weekly",
  daily: "Daily",
};
const hairProfileLabels: Record<HairProfile, string> = {
  short: "Short hair",
  medium: "Medium length hair",
  "long-thick": "Long or thick hair",
  "not-sure": "I'm not sure",
};

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
  const [treatmentFrequency, setTreatmentFrequency] = useState<TreatmentFrequency | null>(null);
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
    if (step !== "product-routing" && step !== "support-routing" && step !== "private-session") {
      return;
    }

    const timer = window.setTimeout(() => {
      if (step === "product-routing") {
        router.push("/products/totaltox-hair-treatment-system");
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
        treatmentFrequency={treatmentFrequency}
        questionStep={questionStep}
        setContinuePreference={setContinuePreference}
        setHairProfile={setHairProfile}
        setTreatmentFrequency={setTreatmentFrequency}
        setQuestionStep={setQuestionStep}
      />
    );
  }

  return (
    <section className={`guidance-entry guidance-entry--${step}`} aria-label="SciTOX getting started">
      <div className="guidance-entry__masthead" aria-label="SciTOX">
        <span aria-hidden="true" />
        <strong>SciTOX</strong>
      </div>

      {step === "welcome" ? (
        <>
          <div className="guidance-entry__stage guidance-entry__stage--welcome">
            <p className="guidance-entry__eyebrow">You are in the right place</p>
            <h1>Welcome to SciTOX.</h1>
            <p>Take a breath. You made it here, and the next step can be simple.</p>
          </div>
          <div className="guidance-entry__stage guidance-entry__stage--fallback-visitor">
            <h1>Which of the following statements best represents your current situation?</h1>
            <div className="guidance-entry__choices" aria-label="Current situation">
              <Link
                className="guidance-entry__choice"
                href="/products/totaltox-hair-treatment-system"
                onClick={(event) => {
                  event.preventDefault();
                  setStep("first-time");
                }}
              >
                I&apos;m a first time visitor
              </Link>
              <Link
                className="guidance-entry__choice"
                href="/support"
                onClick={(event) => {
                  event.preventDefault();
                  setStep("returning");
                }}
              >
                I&apos;m an active or returning client
              </Link>
            </div>
          </div>
        </>
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
            <button className="guidance-entry__choice" onClick={() => setStep("product-routing")} type="button">
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

      {step === "product-routing" ? (
        <div className="guidance-entry__stage">
          <p className="guidance-entry__eyebrow">Product review</p>
          <h1>We&apos;ll take you to TotalTOX first.</h1>
          <p>
            You can review the complete hair detox treatment system before
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
  treatmentFrequency,
  questionStep,
  setContinuePreference,
  setHairProfile,
  setTreatmentFrequency,
  setQuestionStep,
}: {
  continuePreference: ContinuePreference | null;
  hairProfile: HairProfile | null;
  treatmentFrequency: TreatmentFrequency | null;
  questionStep: number;
  setContinuePreference: (value: ContinuePreference | null) => void;
  setHairProfile: (value: HairProfile | null) => void;
  setTreatmentFrequency: (value: TreatmentFrequency | null) => void;
  setQuestionStep: (value: number) => void;
}) {
  function resetQuestions() {
    setTreatmentFrequency(null);
    setHairProfile(null);
    setContinuePreference(null);
    setQuestionStep(0);
  }

  return (
    <section className="content-band content-band--dark guidance-revealed" id="quick-guidance">
      <div className="band-inner">
        <div className="product-guidance-flow">
          <div className="product-guidance-flow__intro">
            <p className="tag">Quick product questions</p>
            <h1>Let&apos;s find the treatment that&apos;s right for you.</h1>
            <p>
              Answer what you can. If the fit is not clear, we&apos;ll send this to support
              instead of guessing.
            </p>
          </div>

          {questionStep === 0 ? (
            <GuidanceQuestion
              options={[
                {
                  label: treatmentFrequencyLabels["two-weeks-or-less"],
                  onClick: () => {
                    setTreatmentFrequency("two-weeks-or-less");
                    setQuestionStep(1);
                  },
                },
                {
                  label: treatmentFrequencyLabels.weekly,
                  onClick: () => {
                    setTreatmentFrequency("weekly");
                    setQuestionStep(1);
                  },
                },
                {
                  label: treatmentFrequencyLabels.daily,
                  onClick: () => {
                    setTreatmentFrequency("daily");
                    setQuestionStep(1);
                  },
                },
              ]}
              question="How often have you needed hair detox support in the last 9 months?"
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
                  label: "Show me the product",
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
              treatmentFrequency={treatmentFrequency}
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
  treatmentFrequency,
  resetQuestions,
}: {
  continuePreference: ContinuePreference | null;
  hairProfile: HairProfile | null;
  treatmentFrequency: TreatmentFrequency | null;
  resetQuestions: () => void;
}) {
  const treatmentFrequencyLabel = treatmentFrequency
    ? treatmentFrequencyLabels[treatmentFrequency]
    : null;
  const hairProfileLabel = hairProfile ? hairProfileLabels[hairProfile] : null;
  const shouldUseSupport = continuePreference === "support-review" || hairProfile === "not-sure";

  if (shouldUseSupport) {
    return (
      <div className="product-guidance-card">
        <p className="tag">Next step</p>
        <h2>Support should review this with you.</h2>
        <p>
          That is the better next step when size, quantity, or treatment fit is not clear
          from the quick questions.
        </p>
        <GuidanceAnswerSummary
          hairProfileLabel={hairProfileLabel}
          treatmentFrequencyLabel={treatmentFrequencyLabel}
        />
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
      <h2>Start with the TotalTOX treatment family.</h2>
      <p>
        This points you to the product family. If anything about size, quantity, or
        order timing feels unclear, support can review before you order.
      </p>
      <GuidanceAnswerSummary
        hairProfileLabel={hairProfileLabel}
        treatmentFrequencyLabel={treatmentFrequencyLabel}
      />
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

function GuidanceAnswerSummary({
  hairProfileLabel,
  treatmentFrequencyLabel,
}: {
  hairProfileLabel: string | null;
  treatmentFrequencyLabel: string | null;
}) {
  if (!hairProfileLabel && !treatmentFrequencyLabel) {
    return null;
  }

  return (
    <dl className="fact-list product-guidance-summary" aria-label="Your answers">
      {treatmentFrequencyLabel ? (
        <div>
          <dt>Treatment frequency</dt>
          <dd>{treatmentFrequencyLabel}</dd>
        </div>
      ) : null}
      {hairProfileLabel ? (
        <div>
          <dt>Hair</dt>
          <dd>{hairProfileLabel}</dd>
        </div>
      ) : null}
    </dl>
  );
}

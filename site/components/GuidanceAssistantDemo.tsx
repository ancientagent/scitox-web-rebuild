"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GuidancePreview } from "@/components/GuidancePreview";
import { PrivacyPrepNotice } from "@/components/PrivacyPrepNotice";

type EntryStep =
  | "welcome"
  | "visitor"
  | "first-time"
  | "returning"
  | "resource-routing"
  | "support-routing"
  | "private-session"
  | "complete";

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
      <section className="content-band content-band--dark guidance-revealed" id="quick-guidance">
        <div className="band-inner">
          <PrivacyPrepNotice />
          <GuidancePreview />
        </div>
      </section>
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

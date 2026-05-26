import Link from "next/link";

type WelcomeGreetingProps = {
  context?: "home" | "guidance";
};

const greetingCopy = {
  home: {
    eyebrow: "You are in the right place",
    title: "Welcome to SciTOX.",
    body:
      "Take a moment. The site can ask a couple quick questions, keep the path focused, and help you move toward the next step.",
    status: "Preparing a quiet guidance path.",
    primaryHref: "/guidance",
    primaryLabel: "Start guidance",
    secondaryHref: "/products",
    secondaryLabel: "View product line",
  },
};

export function WelcomeGreeting({ context = "home" }: WelcomeGreetingProps) {
  if (context === "guidance") {
    return <GuidanceWelcomeSequence />;
  }

  const copy = greetingCopy[context];

  return (
    <section className={`welcome-greeting welcome-greeting--${context}`}>
      <div className="welcome-greeting__copy">
        <p className="welcome-greeting__eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p>{copy.body}</p>
        <p className="welcome-greeting__status">{copy.status}</p>
      </div>
      <div className="welcome-greeting__actions" aria-label="Welcome actions">
        <Link className="button-link button-link--primary" href={copy.primaryHref}>
          {copy.primaryLabel}
        </Link>
        <Link className="button-link" href={copy.secondaryHref}>
          {copy.secondaryLabel}
        </Link>
      </div>
    </section>
  );
}

function GuidanceWelcomeSequence() {
  return (
    <section
      className="welcome-greeting welcome-greeting--guidance welcome-sequence"
      aria-label="Welcome to SciTOX"
    >
      <div className="welcome-sequence__stage welcome-sequence__stage--intro">
        <p className="welcome-greeting__eyebrow">You are in the right place</p>
        <h1>Welcome to SciTOX.</h1>
        <p className="welcome-greeting__subtitle">
          Congratulations! You&apos;ve already completed the most important step
          toward the next chapter. We&apos;re glad you&apos;re here.
        </p>
      </div>
      <div className="welcome-sequence__stage welcome-sequence__stage--session">
        <p className="welcome-greeting__eyebrow">Private session</p>
        <h1>Feel free to kick back and relax.</h1>
        <p className="welcome-greeting__subtitle">
          We&apos;re securing a private session with our product guidance
          system. After a couple quick questions, we&apos;ll get you to the right
          product and on your way.
        </p>
        <p className="welcome-greeting__status">
          Preparing the guidance step before asking for details.
        </p>
      </div>
      <div className="welcome-greeting__actions welcome-sequence__actions" aria-label="Welcome actions">
        <Link className="button-link button-link--primary" href="#quick-guidance">
          Start questions
        </Link>
        <Link className="button-link" href="/products">
          View product line
        </Link>
      </div>
    </section>
  );
}

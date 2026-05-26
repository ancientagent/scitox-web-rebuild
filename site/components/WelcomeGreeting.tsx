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
  guidance: {
    eyebrow: "You are in the right place",
    title: "Sit tight. We will ask a couple quick questions.",
    body:
      "This step is designed to stay calm and focused. Choose the closest starting point, then continue toward whatever the next chapter holds.",
    status: "Getting the guidance step ready before asking for details.",
    primaryHref: "#quick-guidance",
    primaryLabel: "Start questions",
    secondaryHref: "/products",
    secondaryLabel: "View product line",
  },
};

export function WelcomeGreeting({ context = "home" }: WelcomeGreetingProps) {
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

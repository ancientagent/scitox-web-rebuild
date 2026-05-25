import Link from "next/link";

type WelcomeGreetingProps = {
  context?: "home" | "guidance";
};

const greetingCopy = {
  home: {
    eyebrow: "Welcome to SciTOX",
    title: "Start quietly. Find the path that fits.",
    body:
      "Use the product line, guided questions, or support route depending on how simple your situation feels.",
    primaryHref: "/guidance",
    primaryLabel: "Start guidance",
    secondaryHref: "/products",
    secondaryLabel: "View product line",
  },
  guidance: {
    eyebrow: "Welcome to SciTOX",
    title: "A few calm questions can point you in the right direction.",
    body:
      "Choose the closest starting point. If the fit is not simple, the site routes you to support instead of guessing.",
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

"use client";

import Link from "next/link";

type WelcomeGreetingProps = {
  context?: "home";
};

const greetingCopy = {
  home: {
    eyebrow: "New",
    title: "NEW Sci-TOX TotalTOX hair treatment systems for all your hair detox needs",
    body:
      "Choose TotalTOX or TotalTOX Advanced, add optional items, and checkout when you are ready.",
    status: "Support is available when a product or order question needs a person.",
    primaryHref: "/products/totaltox-hair-treatment-system#checkout",
    primaryLabel: "Buy now",
    secondaryHref: "/products/totaltox-hair-treatment-system",
    secondaryLabel: "View product",
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

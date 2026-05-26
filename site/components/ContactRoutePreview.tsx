"use client";

import { useState } from "react";

const contactRoutes = {
  product: {
    label: "Product question",
    summary: "Use this for help understanding a product path.",
    nextStep: "Keep the question focused on what you need help choosing.",
  },
  order: {
    label: "Order or shipping",
    summary: "Use this for order, delivery, or shipping questions.",
    nextStep: "Include the details needed to find the order or understand the shipping issue.",
  },
  followUp: {
    label: "Human follow-up",
    summary: "Use this when a quick form is not enough context.",
    nextStep: "Share a short summary and the best way to reach you.",
  },
  wholesale: {
    label: "Wholesale / partner",
    summary: "Use this for buyer, distributor, or documentation questions.",
    nextStep: "Include the business context so the team can direct the inquiry.",
  },
};

type ContactRouteKey = keyof typeof contactRoutes;

export function ContactRoutePreview() {
  const [selectedRoute, setSelectedRoute] = useState<ContactRouteKey>("product");
  const route = contactRoutes[selectedRoute];

  return (
    <div className="preview-shell">
      <div className="segmented-control" role="group" aria-label="Contact options">
        {Object.entries(contactRoutes).map(([key, value]) => (
          <button
            className={key === selectedRoute ? "is-active" : ""}
            key={key}
            onClick={() => setSelectedRoute(key as ContactRouteKey)}
            type="button"
          >
            {value.label}
          </button>
        ))}
      </div>
      <div className="preview-result">
        <p className="tag">Selected path</p>
        <h2>{route.label}</h2>
        <p>{route.summary}</p>
        <div className="notice-list">
          <span>{route.nextStep}</span>
          <span>Share only the details needed for the team to understand the request.</span>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

const guidanceRoutes = {
  common: {
    label: "Common path",
    title: "When the fit is simple",
    body:
      "The site can move a customer toward the product line without a long explanation or public overpromising.",
    detail: "Keep the product path direct and easy to leave.",
  },
  compare: {
    label: "Product fit",
    title: "When the customer needs help choosing",
    body:
      "The flow can compare practical fit details, then stop before making unsupported claims.",
    detail: "Use simple questions and avoid pressure.",
  },
  specific: {
    label: "Nuanced question",
    title: "When the situation is not simple",
    body:
      "If the product path is not obvious, the site should make support feel normal instead of making the customer figure it out alone.",
    detail: "Support is part of the main flow, not a dead end.",
  },
};

type GuidanceRouteKey = keyof typeof guidanceRoutes;

export function GuidancePreview() {
  const [selectedRoute, setSelectedRoute] = useState<GuidanceRouteKey>("common");
  const route = guidanceRoutes[selectedRoute];

  return (
    <div className="guidance-preview">
      <div className="choice-panel">
        <p className="tag">How guidance works</p>
        <h2>Simple options, then a clear route.</h2>
        <div className="choice-list" role="group" aria-label="Guidance route choices">
          {Object.entries(guidanceRoutes).map(([key, value]) => (
            <button
              className={key === selectedRoute ? "is-active" : ""}
              key={key}
              onClick={() => setSelectedRoute(key as GuidanceRouteKey)}
              type="button"
            >
              {value.label}
            </button>
          ))}
        </div>
      </div>
      <div className="preview-result">
        <p className="tag">Customer experience</p>
        <h2>{route.title}</h2>
        <p>{route.body}</p>
        <div className="notice-list">
          <span>{route.detail}</span>
          <span>The flow should stay calm, private-feeling, and easy to understand.</span>
        </div>
      </div>
    </div>
  );
}

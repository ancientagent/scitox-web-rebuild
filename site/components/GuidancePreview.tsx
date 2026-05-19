"use client";

import { useState } from "react";

const guidanceRoutes = {
  common: {
    label: "Common path",
    title: "[PLACEHOLDER: common product path - REVIEW REQUIRED]",
    body: "[REVIEW REQUIRED: show restrained product-path cards, policy links, and support fallback]",
    ownerNeed: "[OWNER DATA NEEDED: source-backed product mapping]",
  },
  compare: {
    label: "Compare options",
    title: "[PLACEHOLDER: comparison path - REVIEW REQUIRED]",
    body: "[REVIEW REQUIRED: compare only reviewed product facts and avoid result language]",
    ownerNeed: "[OWNER DATA NEEDED: comparison criteria]",
  },
  specific: {
    label: "Specific situation",
    title: "[PLACEHOLDER: human follow-up path - REVIEW REQUIRED]",
    body: "[REVIEW REQUIRED: route nuanced cases to support instead of forcing a recommendation]",
    ownerNeed: "[OWNER DATA NEEDED: escalation workflow]",
  },
};

type GuidanceRouteKey = keyof typeof guidanceRoutes;

export function GuidancePreview() {
  const [selectedRoute, setSelectedRoute] = useState<GuidanceRouteKey>("common");
  const route = guidanceRoutes[selectedRoute];

  return (
    <div className="guidance-preview">
      <div className="choice-panel">
        <p className="tag">Guidance preview</p>
        <h2>[PLACEHOLDER: limited product questions - REVIEW REQUIRED]</h2>
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
        <p className="tag">Output state</p>
        <h2>{route.title}</h2>
        <p>{route.body}</p>
        <div className="notice-list">
          <span>{route.ownerNeed}</span>
          <span>[REVIEW REQUIRED: guidance rules and source-base behavior]</span>
        </div>
      </div>
    </div>
  );
}

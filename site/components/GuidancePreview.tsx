"use client";

import { useState } from "react";

const guidanceRoutes = {
  common: {
    label: "Common path",
    title: "Route common cases into the TotalTOX system",
    body: "The demo can show one core product while keeping variant logic, recommendation output, and claims gated. [REVIEW REQUIRED]",
    ownerNeed: "[OWNER DATA NEEDED: owner-reviewed TotalTOX variant mapping rules]",
  },
  compare: {
    label: "Variant fit",
    title: "Compare only reviewed volume and fit facts",
    body: "Variant output should use owner-confirmed kit facts, not outcome claims, deadlines, or unsupported proof. [REVIEW REQUIRED]",
    ownerNeed: "[OWNER DATA NEEDED: hair length, kit volume, and escalation criteria]",
  },
  specific: {
    label: "Nuanced question",
    title: "Route nuanced cases to human follow-up",
    body: "If the source data does not clearly support a product path, the system should avoid recommendation output. [REVIEW REQUIRED]",
    ownerNeed: "[OWNER DATA NEEDED: support escalation workflow]",
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
        <h2>Structured questions before product routing [REVIEW REQUIRED]</h2>
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
          <span>[REVIEW REQUIRED: source-base rules, fallback logic, and public wording]</span>
        </div>
      </div>
    </div>
  );
}

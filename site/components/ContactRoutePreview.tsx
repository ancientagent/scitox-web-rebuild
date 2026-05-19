"use client";

import { useState } from "react";

const contactRoutes = {
  product: {
    label: "Product question",
    summary: "[REVIEW REQUIRED: product question routing preview]",
    ownerNeed: "[OWNER DATA NEEDED: product support destination]",
  },
  order: {
    label: "Order or shipping",
    summary: "[REVIEW REQUIRED: order support routing preview]",
    ownerNeed: "[OWNER DATA NEEDED: shipping/order lookup workflow]",
  },
  followUp: {
    label: "Human follow-up",
    summary: "[REVIEW REQUIRED: callback or follow-up preview]",
    ownerNeed: "[OWNER DATA NEEDED: support owner, channel, and timing]",
  },
  wholesale: {
    label: "Wholesale / partner",
    summary: "[REVIEW REQUIRED: vendor inquiry routing preview]",
    ownerNeed: "[OWNER DATA NEEDED: wholesale inquiry destination]",
  },
};

type ContactRouteKey = keyof typeof contactRoutes;

export function ContactRoutePreview() {
  const [selectedRoute, setSelectedRoute] = useState<ContactRouteKey>("product");
  const route = contactRoutes[selectedRoute];

  return (
    <div className="preview-shell">
      <div className="segmented-control" role="group" aria-label="Contact route preview">
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
        <p className="tag">Selected route</p>
        <h2>{route.label}</h2>
        <p>{route.summary}</p>
        <div className="notice-list">
          <span>{route.ownerNeed}</span>
          <span>[REVIEW REQUIRED: privacy and consent language]</span>
        </div>
      </div>
    </div>
  );
}

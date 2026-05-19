"use client";

import { useState } from "react";

const productPaths = {
  standard: {
    label: "Core system",
    title: "One TotalTOX-first product line is loaded [REVIEW REQUIRED]",
    status: "The public catalog now centers on TotalTOX instead of multiple category-specific product names.",
    action: "Open the TotalTOX detail, then choose a volume or support-routed path. [REVIEW REQUIRED]",
  },
  focused: {
    label: "Variant review",
    title: "Variants are based on length, volume, and timing sensitivity",
    status: "[OWNER DATA NEEDED: exact bottle sizes, kit counts, fit rules, variant names, and pricing]",
    action: "Use structured guidance before presenting a variant as the right path. [REVIEW REQUIRED]",
  },
  complete: {
    label: "Support fallback",
    title: "Human support handles timing-sensitive or nuanced cases",
    status: "[OWNER DATA NEEDED: support channel, destination, and routing owner]",
    action: "[REVIEW REQUIRED: fallback route before public deadline, outcome, or use-context language]",
  },
};

type ProductPathKey = keyof typeof productPaths;

export function ProductPathPreview() {
  const [selectedPath, setSelectedPath] = useState<ProductPathKey>("standard");
  const path = productPaths[selectedPath];

  return (
    <div className="preview-shell">
      <div className="segmented-control" role="group" aria-label="Product path preview">
        {Object.entries(productPaths).map(([key, value]) => (
          <button
            className={key === selectedPath ? "is-active" : ""}
            key={key}
            onClick={() => setSelectedPath(key as ProductPathKey)}
            type="button"
          >
            {value.label}
          </button>
        ))}
      </div>
      <div className="product-preview-card">
        <p className="tag">TotalTOX product path</p>
        <h2>{path.title}</h2>
        <dl className="fact-list">
          <div>
            <dt>Display status</dt>
            <dd>{path.status}</dd>
          </div>
          <div>
            <dt>CTA behavior</dt>
            <dd>{path.action}</dd>
          </div>
          <div>
            <dt>Support route</dt>
            <dd>[OWNER DATA NEEDED: approved support workflow and destination]</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

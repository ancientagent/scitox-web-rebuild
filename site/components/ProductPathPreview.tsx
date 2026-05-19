"use client";

import { useState } from "react";

const productPaths = {
  standard: {
    label: "Product catalog",
    title: "Six source-backed product records are loaded [REVIEW REQUIRED]",
    status: "Product titles, photos, path labels, availability context, and standard-kit price context are visible.",
    action: "Open product detail, then route to support, guidance, or the gated checkout handoff. [REVIEW REQUIRED]",
  },
  focused: {
    label: "Path review",
    title: "Product paths can be compared only through reviewed rules",
    status: "Current source gives product-path labels, but comparison criteria and routing rules remain gated. [REVIEW REQUIRED]",
    action: "Use structured guidance before presenting any product comparison or recommendation. [REVIEW REQUIRED]",
  },
  complete: {
    label: "Support fallback",
    title: "Human support handles missing-source or nuanced cases",
    status: "[OWNER DATA NEEDED: support channel, destination, and routing owner]",
    action: "[REVIEW REQUIRED: fallback route for nuanced or missing-source cases]",
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
        <p className="tag">Source-backed product path</p>
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

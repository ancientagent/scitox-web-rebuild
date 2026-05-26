"use client";

import { useState } from "react";

const productPaths = {
  standard: {
    label: "Core system",
    title: "One focused product line",
    status: "The public catalog centers on TotalTOX instead of several confusing product categories.",
    action: "Open the TotalTOX detail, then choose guidance or support if the fit is not obvious.",
  },
  focused: {
    label: "Fit questions",
    title: "Practical questions help narrow the path",
    status: "Questions focus on what you know without making the page harder to understand.",
    action: "Use guidance before presenting a path as the best fit.",
  },
  complete: {
    label: "Support fallback",
    title: "Support handles nuanced cases",
    status: "When the situation is not simple, support is a normal next step.",
    action: "Move the customer to support instead of forcing a product choice.",
  },
};

type ProductPathKey = keyof typeof productPaths;

export function ProductPathPreview() {
  const [selectedPath, setSelectedPath] = useState<ProductPathKey>("standard");
  const path = productPaths[selectedPath];

  return (
    <div className="preview-shell">
      <div className="segmented-control" role="group" aria-label="Product path options">
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
            <dt>What this means</dt>
            <dd>{path.status}</dd>
          </div>
          <div>
            <dt>Next step</dt>
            <dd>{path.action}</dd>
          </div>
          <div>
            <dt>Support</dt>
            <dd>Available when the product path is not clear.</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

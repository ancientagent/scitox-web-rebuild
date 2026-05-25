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
    status: "Questions can focus on what the customer knows without turning the page into a claims-heavy explanation.",
    action: "Use guidance before presenting a path as the best fit.",
  },
  complete: {
    label: "Support fallback",
    title: "Support handles nuanced cases",
    status: "When the situation is not simple, the customer should feel comfortable asking for help.",
    action: "Move the customer to support instead of forcing a product choice.",
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
            <dd>Available when the product path is not clear.</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

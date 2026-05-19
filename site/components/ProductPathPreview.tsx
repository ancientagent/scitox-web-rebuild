"use client";

import { useState } from "react";

const productPaths = {
  standard: {
    label: "Product path",
    title: "[PLACEHOLDER: common product path - REVIEW REQUIRED]",
    status: "[OWNER DATA NEEDED: public product facts, image, price, and availability]",
    action: "[REVIEW REQUIRED: product detail, support fallback, or checkout gate]",
  },
  focused: {
    label: "Compare path",
    title: "[PLACEHOLDER: reviewed comparison path - REVIEW REQUIRED]",
    status: "[OWNER DATA NEEDED: category relationship and comparison criteria]",
    action: "[REVIEW REQUIRED: guided product questions before comparison output]",
  },
  complete: {
    label: "Support fallback",
    title: "[PLACEHOLDER: human support route - REVIEW REQUIRED]",
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
        <p className="tag">Owner-review product path</p>
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

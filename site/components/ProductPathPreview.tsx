"use client";

import { useState } from "react";

const productPaths = {
  standard: {
    label: "Standard path",
    title: "[PLACEHOLDER: standard product path - REVIEW REQUIRED]",
    status: "[OWNER DATA NEEDED: public product facts, image, and price]",
    action: "[REVIEW REQUIRED: current checkout or support CTA]",
  },
  focused: {
    label: "Focused path",
    title: "[PLACEHOLDER: focused product path - REVIEW REQUIRED]",
    status: "[OWNER DATA NEEDED: category relationship and comparison fields]",
    action: "[REVIEW REQUIRED: product question CTA]",
  },
  complete: {
    label: "Complete path",
    title: "[PLACEHOLDER: full review product path - REVIEW REQUIRED]",
    status: "[OWNER DATA NEEDED: directions, warnings, policies, and availability]",
    action: "[REVIEW REQUIRED: guidance-first CTA]",
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
        <p className="tag">Product detail skeleton</p>
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
            <dd>[OWNER DATA NEEDED: product support workflow]</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

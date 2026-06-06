import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  createGuidanceResponse,
  validateGuidanceRequest,
} from "../lib/guidance/recommend.mjs";

const reviewedSourceBase = {
  status: "REVIEWED",
  source_groups: [
    {
      id: "reviewed-product-paths",
      type: "product_mapping",
      status: "REVIEWED",
      content: "[REVIEW REQUIRED: product path mapping test fixture]",
    },
  ],
  product_paths: [
    {
      id: "standard-path",
      label: "[PLACEHOLDER: standard product path - REVIEW REQUIRED]",
      product_id: "owner-product-placeholder",
      match_values: ["standard"],
      source_ids: ["reviewed-product-paths"],
      status: "REVIEWED",
      explanation:
        "[REVIEW REQUIRED: source-grounded product path explanation placeholder]",
      next_step: "[REVIEW REQUIRED: reviewed product path next step]",
    },
  ],
};

test("valid structured request can return a product path from reviewed source data", () => {
  const result = createGuidanceResponse(
    {
      answers: [{ id: "path", value: "standard" }],
    },
    { sourceBase: reviewedSourceBase },
  );

  assert.equal(result.recommendation_status, "product_path");
  assert.equal(result.recommended_product_id, "owner-product-placeholder");
  assert.equal(
    result.recommended_path_label,
    "[PLACEHOLDER: standard product path - REVIEW REQUIRED]",
  );
  assert.deepEqual(result.source_ids, ["reviewed-product-paths"]);
});

test("approved test source path can return a product path", () => {
  const result = createGuidanceResponse(
    {
      answers: [{ id: "path", value: "approved-test" }],
    },
    {
      sourceBase: {
        ...reviewedSourceBase,
        product_paths: [
          {
            ...reviewedSourceBase.product_paths[0],
            label: "[PLACEHOLDER: approved test path - REVIEW REQUIRED]",
            match_values: ["approved-test"],
            status: "APPROVED",
          },
        ],
      },
    },
  );

  assert.equal(result.recommendation_status, "product_path");
  assert.equal(
    result.recommended_path_label,
    "[PLACEHOLDER: approved test path - REVIEW REQUIRED]",
  );
});

test("unreviewed source path does not return a product recommendation", () => {
  const result = createGuidanceResponse(
    {
      answers: [{ id: "path", value: "standard" }],
    },
    {
      sourceBase: {
        ...reviewedSourceBase,
        product_paths: [
          {
            ...reviewedSourceBase.product_paths[0],
            status: "OWNER_DATA_NEEDED",
          },
        ],
      },
    },
  );

  assert.equal(result.recommendation_status, "human_follow_up");
  assert.equal(result.recommended_product_id, null);
  assert.match(result.missing_owner_data.join(" "), /product catalog/i);
});

test("missing source data escalates to human follow-up", () => {
  const result = createGuidanceResponse(
    {
      answers: [{ id: "path", value: "standard" }],
    },
    { sourceBase: null },
  );

  assert.equal(result.recommendation_status, "human_follow_up");
  assert.equal(result.recommended_product_id, null);
  assert.match(result.missing_owner_data.join(" "), /source base/i);
});

test("disallowed advice request escalates without product recommendation", () => {
  const result = createGuidanceResponse(
    {
      answers: [{ id: "question", value: "Can this guarantee a test result?" }],
    },
    { sourceBase: reviewedSourceBase },
  );

  assert.equal(result.recommendation_status, "human_follow_up");
  assert.equal(result.recommended_product_id, null);
  assert.match(result.review_required.join(" "), /guidance boundary/i);
});

test("malformed input returns validation errors", () => {
  const result = validateGuidanceRequest({ answers: "not an array" });

  assert.equal(result.ok, false);
  assert.deepEqual(result.fieldErrors.answers, [
    "Provide structured guidance answers.",
  ]);
});

test("product guidance starts with hair detox support frequency question", async () => {
  const source = await readFile(
    new URL("../components/GuidanceAssistantDemo.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /How often have you needed hair detox support in the last 9 months\?/);
  assert.match(source, /Every 2 weeks or less/);
  assert.match(source, /Weekly/);
  assert.match(source, /Daily/);
  assert.doesNotMatch(source, /What do you need help with right now\?/);
});

test("guidance entry includes a static fallback for the first routing question", async () => {
  const source = await readFile(
    new URL("../components/GuidanceAssistantDemo.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /guidance-entry__stage--fallback-visitor/);
  assert.match(source, /Which of the following statements best represents your current situation\?/);
  assert.match(source, /href="\/products\/totaltox-hair-treatment-system"/);
  assert.match(source, /href="\/support"/);
});

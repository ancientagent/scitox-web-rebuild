import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("public guidance route redirects to the TotalTOX product page", async () => {
  const source = await readFile(
    new URL("../app/guidance/page.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /redirect\("\/products\/totaltox-hair-treatment-system"\)/);
  assert.doesNotMatch(source, /GuidanceAssistantDemo/);
});

test("product page opens with the TotalTOX landing message and buy-now link", async () => {
  const source = await readFile(
    new URL("../app/products/[slug]/page.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /SciTOX TotalTOX 2\.0 Ultra/);
  assert.match(source, /Powered by Folliclear™ Technology/);
  assert.match(source, /Our first all-in-one full follicle solution/);
  assert.match(source, /Available Now/);
  assert.match(source, /href="#checkout"/);
  assert.match(source, /Buy now/);
  assert.doesNotMatch(source, /We recommend|Recommended add/i);
});

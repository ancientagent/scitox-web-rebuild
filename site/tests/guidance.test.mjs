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

  assert.match(source, /SciTOX is now simpler/);
  assert.match(source, /Introducing the all new TotalTOX 2\.0 Ultra Series/);
  assert.match(source, /Our number one selling solution reformulated/);
  assert.match(source, /new Folliclear™ Treatment Technology/);
  assert.match(source, /Now available/);
  assert.doesNotMatch(source, /Product FAQ/);
  assert.match(source, /href="\/faq"/);
  assert.match(source, /getProductOptionPrice/);
  assert.match(source, /\$399/);
  assert.match(source, /Buy now/);
  assert.doesNotMatch(source, /We recommend|Recommended add/i);
});

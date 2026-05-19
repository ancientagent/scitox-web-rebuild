import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import catalog from "../data/products.example.json" with { type: "json" };
import {
  getPublicProductDetails,
  getVendorProductRows,
  validateProductCatalog,
} from "../lib/products/model.mjs";

test("source-backed product catalog keeps required owner and review gates", () => {
  const result = validateProductCatalog(catalog);

  assert.equal(result.ok, true);
  assert.deepEqual(result.errors, []);
});

test("public product projection includes source-backed product records", () => {
  const products = getPublicProductDetails(catalog);
  const [product] = products;

  assert.equal(products.length, 1);
  assert.equal(product.slug, "totaltox-hair-treatment-system");
  assert.equal(product.name, "TotalTOX Hair Treatment System");
  assert.match(product.image, /^\/product-marketing\/totaltox-kit\.png$/);
  assert.match(product.sourceImage, /^\/product-images\/totaltox\.jpg$/);
  assert.match(product.kitComposition, /12-item complete-kit/);
  assert.equal(product.variants.length, 3);
});

test("public product projection does not expose vendor-only fields", () => {
  const products = getPublicProductDetails(catalog);
  const publicPayload = JSON.stringify(products);

  assert.match(publicPayload, /\[OWNER DATA NEEDED/);
  assert.match(publicPayload, /\[REVIEW REQUIRED/);
  assert.doesNotMatch(publicPayload, /wholesalePrice/);
  assert.doesNotMatch(publicPayload, /casePack/);
  assert.doesNotMatch(publicPayload, /moq/);
  assert.doesNotMatch(publicPayload, /upcGtin/);
  assert.doesNotMatch(publicPayload, /sku/);
});

test("vendor product projection includes wholesale placeholders only for vendor surfaces", () => {
  const [row] = getVendorProductRows(catalog);

  assert.equal(row.slug, "totaltox-hair-treatment-system");
  assert.match(row.sku, /\[OWNER DATA NEEDED/);
  assert.match(row.wholesalePrice, /\[OWNER DATA NEEDED/);
  assert.match(row.casePack, /\[OWNER DATA NEEDED/);
  assert.match(row.claimSubstantiation, /\[REVIEW REQUIRED/);
});

test("public product route files do not render vendor-only labels", async () => {
  const publicFiles = await Promise.all([
    readFile(new URL("../app/products/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/products/[slug]/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/ProductPathPreview.tsx", import.meta.url), "utf8"),
  ]);
  const publicSource = publicFiles.join("\n");

  assert.doesNotMatch(publicSource, /\bSKU\b/);
  assert.doesNotMatch(publicSource, /\bMSRP\b/);
  assert.doesNotMatch(publicSource, /\bMOQ\b/);
  assert.doesNotMatch(publicSource, /case pack/i);
  assert.doesNotMatch(publicSource, /UPC\/GTIN/i);
});

test("catalog validation rejects missing markers on owner-data fields", () => {
  const unsafeCatalog = structuredClone(catalog);
  unsafeCatalog.products[0].vendor.sku = "SKU-123";

  const result = validateProductCatalog(unsafeCatalog);

  assert.equal(result.ok, false);
  assert.match(result.errors.join(" "), /vendor\.sku/);
});

test("catalog validation rejects missing review gates on source-sensitive public fields", () => {
  const unsafeCatalog = structuredClone(catalog);
  unsafeCatalog.products[0].public.price = "$239";

  const result = validateProductCatalog(unsafeCatalog);

  assert.equal(result.ok, false);
  assert.match(result.errors.join(" "), /public\.price/);
});

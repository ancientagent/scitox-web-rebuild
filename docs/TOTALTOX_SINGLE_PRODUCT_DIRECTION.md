# TotalTOX Single-Product V1 Direction

Status: active V1 direction pending owner confirmation. `[REVIEW REQUIRED]`

## Decision

The customer-facing V1 should move away from a public catalog of multiple substance-specific products and center on one core product line:

- TotalTOX Hair Treatment System
- Variant paths based on hair length, kit volume, and timing-sensitive support needs
- Human support fallback for nuanced, sensitive, unsupported, or time-sensitive cases

This is a product architecture decision for the demo and next planning pass. It is not final website copy, claim approval, legal review, payment approval, vendor acceptance, or launch approval.

## Why This Helps

- Reduces public exposure created by substance-specific product names.
- Makes the customer experience simpler: one core product, then guided variant selection.
- Makes vendor review cleaner: one product family with variant SKUs instead of many risk-signaling product names.
- Makes checkout easier to model: one product line with quantity/variant selection.
- Keeps the guidance assistant focused on fit, volume, and escalation instead of broad product comparison.

## Public-Site Rules

- Do not use product language that promises outcomes, test results, deadlines, guarantees, or proof. `[REVIEW REQUIRED]`
- Do not publicly frame variants as stronger or more effective unless reviewed and substantiated. `[REVIEW REQUIRED]`
- Use variant concepts such as kit volume, long-hair support, and support-first timing sensitivity until owner and legal review approve final names. `[OWNER DATA NEEDED]` `[REVIEW REQUIRED]`
- Avoid public substance-specific product labels unless counsel and owner explicitly approve them. `[REVIEW REQUIRED]`
- Keep sensitive fit logic inside the source-gated guidance/support flow until reviewed. `[REVIEW REQUIRED]`

## Owner Data Needed

- Confirm whether TotalTOX is the only V1 public product.
- Confirm final public product name.
- Confirm variant names.
- Confirm hair-length ranges for each variant.
- Confirm bottle counts, bottle sizes, product types, and kit contents for each variant.
- Confirm variant pricing, MSRP, wholesale price, MOQ, case pack, UPC/GTIN, and SKU mapping.
- Confirm whether timing-sensitive situations create a separate variant, support-routed path, or priority handling.
- Confirm directions, warnings, ingredients, labels, product photos, shipping rules, returns/refund rules, and checkout rules.

## Implementation Impact

- Public `/products` should show one TotalTOX product line.
- Product detail should show review-gated variant paths.
- Guidance should map answers to TotalTOX variants only after owner-reviewed source data exists.
- Wholesale should describe one product family with variant commercial fields.
- Former substance-specific products can remain in captured source evidence, but should not drive the public V1 catalog unless reviewed.

## Still Review-Gated

- Any test-related language.
- Any success, pass, cleanse, detox, removal, guarantee, timing, or mechanism claim.
- Any privacy/security claim.
- Any legal, medical, prescription, diagnostic, or employment guidance.
- Any vendor, platform, payment, marketplace, or Amazon eligibility language.

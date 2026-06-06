# TotalTOX Single-Product V1 Direction

Status: active V1 direction with owner-confirmed treatment names. Fit rules, kit contents, pricing, routing, and claims remain review-gated. `[REVIEW REQUIRED]`

## Decision

The customer-facing V1 should move away from a public catalog of multiple substance-specific products and center on one core product line:

- TotalTOX Hair Treatment System
- Four owner-confirmed treatment names: TotalTOX Light, TotalTOX Plus, TotalTOX Max, and TotalTOX Ultra Max
- Treatment routing based on owner-reviewed hair-detox support frequency, fit, kit volume, and support rules
- Human support fallback for nuanced, sensitive, unsupported, or time-sensitive cases

This is a product architecture decision for the demo and next planning pass. It is not final website copy, claim approval, legal review, payment approval, vendor acceptance, or launch approval.

## Why This Helps

- Reduces public exposure created by substance-specific product names.
- Makes the customer experience simpler: one core product family, then guided treatment selection.
- Makes vendor review cleaner: one product family with treatment SKUs instead of many risk-signaling product names.
- Makes checkout easier to model: one product line with treatment and quantity selection.
- Keeps the guidance assistant focused on fit, volume, and escalation instead of broad product comparison.

## Public-Site Rules

- Do not use product language that promises outcomes, test results, deadlines, guarantees, or proof. `[REVIEW REQUIRED]`
- Do not publicly frame Light, Plus, Max, or Ultra Max as stronger, more effective, or better for a specific scenario unless reviewed and substantiated. `[REVIEW REQUIRED]`
- Use the owner-confirmed treatment names only as product-family labels until owner-reviewed fit rules, kit contents, pricing, and routing are supplied. `[OWNER DATA NEEDED]` `[REVIEW REQUIRED]`
- Avoid public substance-specific product labels unless counsel and owner explicitly approve them. `[REVIEW REQUIRED]`
- Keep sensitive fit logic inside the source-gated guidance/support flow until reviewed. `[REVIEW REQUIRED]`

## Owner Data Needed

- Confirm whether TotalTOX is the only V1 public product.
- Confirm final public product name.
- Treatment names are owner-confirmed as TotalTOX Light, TotalTOX Plus, TotalTOX Max, and TotalTOX Ultra Max.
- Current first product guidance question is: "How often have you needed hair detox support in the last 9 months?" with answer options "Every 2 weeks or less", "Weekly", and "Daily".
- Confirm how each frequency answer maps to Light, Plus, Max, Ultra Max, support, or a no-recommendation path.
- Confirm hair-length ranges and fit rules for each treatment.
- Confirm bottle counts, bottle sizes, product types, and kit contents for each treatment.
- Confirm treatment pricing, MSRP, wholesale price, MOQ, case pack, UPC/GTIN, and SKU mapping.
- Confirm whether timing-sensitive situations create a separate treatment, support-routed path, or priority handling.
- Confirm directions, warnings, ingredients, labels, product photos, shipping rules, returns/refund rules, and checkout rules.

## Implementation Impact

- Public `/products` should show one TotalTOX product line.
- Product surfaces can show the four treatment names, but fit, contents, pricing, and routing details must remain review-gated until supplied.
- Guidance should collect the hair-detox support frequency question first, then map answers to TotalTOX treatments only after owner-reviewed source data exists.
- Wholesale should describe one product family with treatment commercial fields.
- Former substance-specific products can remain in captured source evidence, but should not drive the public V1 catalog unless reviewed.

## Still Review-Gated

- Any test-related language.
- Any success, pass, cleanse, detox, removal, guarantee, timing, or mechanism claim.
- Any privacy/security claim.
- Any professional-advice, diagnostic, guarantee, or outcome language.
- Any vendor, platform, payment, marketplace, or Amazon eligibility language.

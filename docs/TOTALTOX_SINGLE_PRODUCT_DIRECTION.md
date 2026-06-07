# TotalTOX Single-Product V1 Direction

Status: active V1 direction with owner-confirmed product names. Kit contents, pricing, SKUs, and claims remain review-gated. `[REVIEW REQUIRED]`

## Decision

The customer-facing V1 should move away from a public catalog of multiple substance-specific products and center on one TotalTOX product line with two public products:

- TotalTOX Hair Treatment System
- TotalTOX
- TotalTOX Advanced
- TotalTOX Advanced is for people with long hair and/or daily buildup.
- Public product framing based on who TotalTOX is for, optional add-ons, and support rules
- Human support fallback for nuanced, sensitive, unsupported, or time-sensitive cases

This is a product architecture decision for the demo and next planning pass. It is not final website copy, claim approval, legal review, payment approval, vendor acceptance, or launch approval.

## Why This Helps

- Reduces public exposure created by substance-specific product names.
- Makes the customer experience simpler: one product family with two public products.
- Makes vendor review cleaner: one product family with two product SKUs instead of many risk-signaling product names.
- Makes checkout easier to model: one product line with optional add-ons.
- Avoids public product-choice direction when the current path is one product with add-ons.

## Public-Site Rules

- Do not use product language that promises outcomes, test results, deadlines, guarantees, or proof. `[REVIEW REQUIRED]`
- Do not publicly frame TotalTOX Advanced as stronger, more effective, or better. It can be described as for people with long hair and/or daily buildup. `[REVIEW REQUIRED]`
- Use the owner-confirmed product names only as product-family labels until owner-reviewed kit contents, pricing, and SKU details are supplied. `[OWNER DATA NEEDED]` `[REVIEW REQUIRED]`
- Avoid public substance-specific product labels unless counsel and owner explicitly approve them. `[REVIEW REQUIRED]`
- Keep sensitive fit logic out of public copy until reviewed. `[REVIEW REQUIRED]`

## Owner Data Needed

- Confirm final public product names and slugs.
- Product names are owner-confirmed as TotalTOX and TotalTOX Advanced.
- Current owner direction: do not use public product-choice direction. The product page should say who TotalTOX is for.
- Confirm final wording for TotalTOX and TotalTOX Advanced, including the Advanced long-hair and/or daily-buildup framing.
- Confirm bottle counts, bottle sizes, product types, and kit contents for each product.
- Confirm product pricing, MSRP, wholesale price, MOQ, case pack, UPC/GTIN, and SKU mapping.
- Confirm whether timing-sensitive situations create a separate treatment, support-routed path, or priority handling.
- Confirm directions, warnings, ingredients, labels, product photos, shipping rules, returns/refund rules, and checkout rules.

## Implementation Impact

- Public `/products` should show one TotalTOX product line with TotalTOX and TotalTOX Advanced.
- Product surfaces can show the two product names, but contents, pricing, and SKU details must remain review-gated until supplied.
- Public product pages should avoid choice-direction logic and use support for questions that need a person.
- Wholesale should describe one product family with product commercial fields.
- Former substance-specific products can remain in captured source evidence, but should not drive the public V1 catalog unless reviewed.

## Still Review-Gated

- Any test-related language.
- Any success, pass, cleanse, detox, removal, guarantee, timing, or mechanism claim.
- Any privacy/security claim.
- Any professional-advice, diagnostic, guarantee, or outcome language.
- Any vendor, platform, payment, marketplace, or Amazon eligibility language.

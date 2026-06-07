# TotalTOX Single-Product V1 Direction

Status: active V1 direction with owner-confirmed public product names and prices. Kit contents, SKUs, and claims remain review-gated. `[REVIEW REQUIRED]`

## Decision

The customer-facing V1 should move away from a public catalog of multiple substance-specific products and center on one TotalTOX product line with two public products:

- TotalTOX 2.0 Ultra, $329
- TotalTOX 2.0 Ultra Max, $399
- TotalTOX 2.0 Ultra is for most orders.
- TotalTOX 2.0 Ultra Max is for people with long hair and/or daily buildup.
- Owner-confirmed add-ons: UV light for $79 and custom developer for $20.
- Public product framing based on who each option is for, optional add-ons, and support rules
- Human support fallback for nuanced, sensitive, unsupported, or time-sensitive cases

This is a product architecture decision for the demo and next planning pass. It is not final website copy, claim approval, legal review, payment approval, vendor acceptance, or launch approval.

## Why This Helps

- Reduces public exposure created by substance-specific product names.
- Makes the customer experience simpler: one product family with two public products.
- Makes vendor review cleaner: one product family with two product SKUs instead of many risk-signaling product names.
- Makes checkout easier to model: one product line with optional add-ons.
- Gives buyers a neutral top-level FAQ route without presenting the site as a diagnostic tool or recommendation engine.

## Public-Site Rules

- Do not use product language that promises outcomes, test results, deadlines, guarantees, or proof. `[REVIEW REQUIRED]`
- Do not publicly frame TotalTOX 2.0 Ultra Max as stronger, more effective, or better. It can be described as for people with long hair and/or daily buildup. `[REVIEW REQUIRED]`
- TotalTOX 2.0 Ultra can be described as the standard option for most orders. `[REVIEW REQUIRED]`
- Public pricing is owner-confirmed for TotalTOX 2.0 Ultra, TotalTOX 2.0 Ultra Max, UV light, and custom developer. Owner-reviewed kit contents and SKU details are still needed. `[OWNER DATA NEEDED]` `[REVIEW REQUIRED]`
- Avoid public substance-specific product labels unless counsel and owner explicitly approve them. `[REVIEW REQUIRED]`
- Keep sensitive fit logic out of public copy until reviewed. `[REVIEW REQUIRED]`

## Owner Data Needed

- Confirm final public product names and slugs.
- Product names are owner-confirmed publicly as TotalTOX 2.0 Ultra and TotalTOX 2.0 Ultra Max.
- Current owner direction: include a neutral top-level FAQ page next to Products and Support. TotalTOX 2.0 Ultra is for most orders. TotalTOX 2.0 Ultra Max is for long hair and/or daily buildup. Unsure buyers or unusually heavy buildup questions should route to support before ordering.
- Confirm final label/package wording for TotalTOX 2.0 Ultra and TotalTOX 2.0 Ultra Max.
- Confirm bottle counts, bottle sizes, product types, and kit contents for each product.
- Confirm MSRP, wholesale price, MOQ, case pack, UPC/GTIN, and SKU mapping.
- Confirm whether timing-sensitive situations create a separate treatment, support-routed path, or priority handling.
- Confirm directions, warnings, ingredients, labels, product photos, shipping rules, returns/refund rules, and checkout rules.

## Implementation Impact

- Public `/products` redirects to the TotalTOX 2.0 Ultra Series product page.
- Product surfaces can show the two product names and owner-confirmed prices, but contents and SKU details remain review-gated until supplied.
- The public product page should stay buyer-first; the neutral FAQ should live at `/faq` and use support for unsure buyers, unusually heavy buildup questions, or any question that needs a person.
- Wholesale should describe one product family with product commercial fields.
- Former substance-specific products can remain in captured source evidence, but should not drive the public V1 catalog unless reviewed.

## Still Review-Gated

- Any test-related language.
- Any success, pass, removal, guarantee, timing, or mechanism claim.
- Any privacy/security claim.
- Any professional-advice, diagnostic, guarantee, or outcome language.
- Any vendor, platform, payment, marketplace, or Amazon eligibility language.

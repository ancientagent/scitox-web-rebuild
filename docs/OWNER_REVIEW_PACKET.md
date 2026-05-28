# SciTOX Owner Review Packet

Historical demo commit: `c4e4854 chore: stabilize owner demo shell`

Current app reference commits:

- `e55592f fix: remove public developer-facing copy`
- `207cb2e feat: build knowledge center resource page`
- `b9a99d2 feat: add staged guidance entry flow`

This packet is for owner review of the current SciTOX custom app demo. It is not final website copy, launch approval, payment approval, legal review, vendor acceptance, marketplace approval, or product-claim approval.

This packet began as an owner-review demo packet. The current public UI has since been cleaned so internal markers and developer-facing scaffolding do not render to customers.

Any remaining `[OWNER DATA NEEDED]` or `[REVIEW REQUIRED]` language in this packet is an internal review gate. It means owner facts, operating decisions, claims review, privacy review, legal/compliance review, or source review are still needed before that material becomes public wording or live behavior.

## Demo Purpose

The current app shows the V1 shape of a private, restrained SciTOX web app:

- A calm customer lobby for visitors who already know why they are there.
- Stable navigation across products, product detail, guidance, support, contact, wholesale, and policy routes.
- TotalTOX-first product and vendor placeholders that keep public product pages separate from wholesale/vendor information.
- Review-gated guidance, intake, and checkout flows.
- Clear places where owner data, policy review, payment review, and source-base review are still needed.

The demo should be reviewed as a product-routing and operating-model prototype, not as a finished public site.

## Recommended Demo Path

Use this path when reviewing the demo:

1. Home: `/`
2. Products: `/products`
3. TotalTOX product detail: `/products/totaltox-hair-treatment-system`
4. Checkout gate on the product detail page.
5. Guidance: `/guidance`
6. Support: `/support`
7. Contact: `/contact`
8. Wholesale: `/wholesale`
9. Policies:
   - `/shipping-returns`
   - `/privacy`
   - `/terms`
10. Unknown route check: any missing page should show the custom 404 route.

## What The Owner Should Review

Review the demo for structure and operating fit:

- Does the homepage routing model match how customers should be guided?
- Should the product path begin with product browsing, guided questions, human support, or another route?
- Which TotalTOX product details and variant details can safely appear on public product pages?
- Which product details should stay vendor-only or owner-only?
- Does the guidance flow ask the right type of structured questions?
- When should the guidance flow escalate to human support instead of returning a product path?
- Which support/contact/wholesale form fields are necessary?
- Where should form submissions go? `[OWNER DATA NEEDED]`
- Which policy pages must exist before launch?
- Which public labels, route names, and calls to action need wording review? `[REVIEW REQUIRED]`

## What Is Working Now

The current app includes:

- Shared header, footer, layout, route shell, favicon, and custom 404.
- Stable routes for home, products, TotalTOX product detail, guidance, resources, support, contact, wholesale, privacy, terms, and shipping/returns.
- Clickable homepage route cards for the main owner-demo paths.
- TotalTOX product data placeholders with public product fields separated from vendor/wholesale fields.
- Product detail placeholders for facts, owner-needed data, review-needed sections, support routing, and checkout state.
- Staged guidance entry flow with a brief "Welcome to SciTOX." fade-in, current-situation question, and first-time/returning visitor branches.
- Customer-facing Help / Resources FAQ hub at `/resources` for information-first visitors.
- Focused support route at `/support` for order questions, returning clients, and product questions that still need a person.
- Guidance API scaffold that returns structured JSON and escalates to human follow-up when source support is missing or the request is outside approved boundaries.
- Support, contact, and wholesale intake forms with client/server validation and safe success/error states.
- Inquiry route stub that does not deliver to a live owner destination yet.
- Authorize.net checkout gate scaffold that stays unavailable/review-gated and does not collect raw card data.
- Policy route shells with cross-links so the owner can review the policy surface as a group.

## Intentionally Blocked Or Review-Gated

The following are intentionally not live:

- Final public website copy. `[REVIEW REQUIRED]`
- Real product recommendations from unreviewed source data. `[OWNER DATA NEEDED]` `[REVIEW REQUIRED]`
- Live payment collection or Authorize.net transaction creation. `[OWNER DATA NEEDED]` `[REVIEW REQUIRED]`
- Raw card entry in the app.
- Live form delivery to email, CRM, helpdesk, or another destination. `[OWNER DATA NEEDED]`
- Final privacy, terms, shipping, returns, refund, support, or wholesale policies. `[OWNER DATA NEEDED]` `[REVIEW REQUIRED]`
- Public product claims, proof, results language, testimonials, certifications, platform eligibility, or vendor acceptance. `[REVIEW REQUIRED]`
- Any legal, medical, diagnostic, test-result, consultation, counsel, prescription, guaranteed-outcome, privacy/security, or platform-safety claim. `[REVIEW REQUIRED]`

## Owner Data Needed

Before the demo can move toward launch, the owner needs to provide or confirm:

- TotalTOX product name, variant names, categories, sizes, images, labels, ingredients, directions, warnings, availability, and public display rules. `[OWNER DATA NEEDED]`
- TotalTOX variant routing rules for hair length, kit volume, timing-sensitive support, and human escalation. `[OWNER DATA NEEDED]`
- Prices, MSRP, wholesale pricing, MOQ, case pack, UPC/GTIN, stock status, shipping rules, and fulfillment rules. `[OWNER DATA NEEDED]`
- Support process, support owner, response expectations, callback workflow, and customer handoff rules. `[OWNER DATA NEEDED]`
- Contact, support, and wholesale form destinations. `[OWNER DATA NEEDED]`
- Privacy, retention, consent, terms, shipping, returns, refund, and wholesale policy details. `[OWNER DATA NEEDED]`
- Claim support, product substantiation, testimonial permissions, review-source permissions, and approved public wording. `[OWNER DATA NEEDED]` `[REVIEW REQUIRED]`
- Legacy/current-site URLs that need redirects or route mapping. `[OWNER DATA NEEDED]`

## Review Decisions Needed

These decisions should be made before final copy or live integration work:

- Public exposure level: how much product/category detail should appear on the customer site? `[REVIEW REQUIRED]`
- Product CTA strategy: browse-first, guidance-first, support-first, or another order. `[REVIEW REQUIRED]`
- Guidance boundary: which questions can be answered automatically and which must go to human support? `[REVIEW REQUIRED]`
- Support boundary: what the team can say, what must be avoided, and what must escalate. `[REVIEW REQUIRED]`
- Privacy wording: what can be stated based on real tools, data flow, retention, and policies. `[REVIEW REQUIRED]`
- Payment wording: how checkout, refunds, disputes, failures, and unavailable states should be described. `[REVIEW REQUIRED]`
- Wholesale wording: what can be shown to vendor/partner reviewers without implying approval or acceptance. `[REVIEW REQUIRED]`
- Policy publishing plan: which policies must be owner-reviewed before any public launch. `[REVIEW REQUIRED]`
- Analytics/search plan: what should be tracked, what must not be sent to analytics, and what should remain unindexed until ready. `[REVIEW REQUIRED]`

## Payment / Authorize.net Items Needed

Authorize.net is owner-confirmed planning data only. The current app does not treat payment collection as approved or live.

Needed before checkout can move beyond the gate:

- Authorize.net sandbox account/config details. `[OWNER DATA NEEDED]`
- Environment setting for sandbox vs live. `[OWNER DATA NEEDED]`
- Accept Hosted or other exact integration decision. `[OWNER DATA NEEDED]` `[REVIEW REQUIRED]`
- Enabled payment methods and merchant-account terms. `[OWNER DATA NEEDED]` `[REVIEW REQUIRED]`
- Fraud, AVS, CVV, dispute, refund, void, settlement, tax, shipping, and receipt behavior. `[OWNER DATA NEEDED]` `[REVIEW REQUIRED]`
- Success, cancel, failure, and unavailable checkout messaging. `[REVIEW REQUIRED]`
- Confirmation that raw card fields stay out of this app unless a reviewed architecture explicitly changes that. `[REVIEW REQUIRED]`
- Payment-related policy language for terms, shipping, returns, and refunds. `[REVIEW REQUIRED]`
- Any alternate payment or crypto/onramp path must remain hidden or review-gated until separately reviewed. `[REVIEW REQUIRED]`

## Guidance Assistant / Source-Base Items Needed

The guidance assistant must stay backend-source-grounded and review-gated.

Needed before live recommendations:

- Owner-reviewed source-base data for products, product paths, and escalation rules. `[OWNER DATA NEEDED]`
- Explicit reviewed/approved markers for any path allowed to return a product recommendation. `[REVIEW REQUIRED]`
- Source IDs and source notes for every answerable product path. `[OWNER DATA NEEDED]`
- Rules for missing data, unmatched requests, and sensitive requests. `[REVIEW REQUIRED]`
- Disallowed categories that must escalate to human support, including legal, medical, diagnostic, test-result, privacy/security, guaranteed-outcome, platform, and payment-risk requests. `[REVIEW REQUIRED]`
- Approved structured questions and answer options. `[OWNER DATA NEEDED]` `[REVIEW REQUIRED]`
- Logging, retention, analytics, and provider-processing review before any live AI/provider integration. `[REVIEW REQUIRED]`
- Human support destination for fallback cases. `[OWNER DATA NEEDED]`

## Wholesale / Vendor Items Needed

The wholesale route is intentionally separate from the public customer route.

Needed before vendor/wholesale review:

- Vendor-safe product line overview. `[OWNER DATA NEEDED]` `[REVIEW REQUIRED]`
- SKU, MSRP, wholesale price, MOQ, case pack, UPC/GTIN, dimensions, weights, images, labels, and availability. `[OWNER DATA NEEDED]`
- Wholesale terms, ordering process, shipping rules, return rules, payment terms, and account qualification rules. `[OWNER DATA NEEDED]` `[REVIEW REQUIRED]`
- Documentation checklist and document availability status. `[OWNER DATA NEEDED]`
- Claims/proof support that can be shared with vendors without overclaiming. `[OWNER DATA NEEDED]` `[REVIEW REQUIRED]`
- Buyer inquiry destination and follow-up process. `[OWNER DATA NEEDED]`
- Explicit removal or review of any language that could imply vendor, retailer, marketplace, Amazon, payment, distributor, or platform acceptance. `[REVIEW REQUIRED]`

## What Should Not Be Treated As Launch-Ready

Do not treat these as launch-ready:

- Placeholder text.
- Product and variant facts on the TotalTOX product page.
- Vendor product table data.
- Guidance recommendation output beyond source-gated demo behavior.
- Checkout handoff or payment collection.
- Intake form delivery.
- Privacy/security language.
- Terms, shipping, returns, refund, or wholesale policy language.
- Claims, testimonials, reviews, proof, certifications, platform eligibility, vendor acceptance, Amazon eligibility, payment-platform acceptance, or legal conclusions.
- Analytics, search indexing, sitemap, redirect, or launch QA readiness.

## Next Recommended Implementation Steps

Recommended next steps:

1. Owner completes the data and decision items in this packet.
2. Convert owner-confirmed TotalTOX variant and vendor fields into the source-controlled product data model.
3. Build the owner-reviewed guidance source base and approved TotalTOX variant-path rules.
4. Connect support/contact/wholesale forms to an owner-confirmed destination.
5. Configure and test Authorize.net sandbox only after owner/payment details are available.
6. Draft policy pages from owner-provided policy decisions, then mark claim-sensitive language for review.
7. Add legacy redirects, metadata, sitemap, and analytics only after review of exposure and tracking boundaries.
8. Run the full custom app QA checklist before any staging or public-launch decision.

## Owner Review Summary

Owner should answer:

- Is the demo path direction correct?
- Which routes should be visible in V1?
- What owner data can be added now?
- What language needs review before becoming public?
- What should stay hidden, blocked, or owner-only?
- What is the next safest implementation slice after review?

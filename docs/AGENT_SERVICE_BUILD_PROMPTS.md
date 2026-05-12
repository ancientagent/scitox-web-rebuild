# SciTOX Agent And Service Build Prompts

Source context:
- `AGENTS.md`
- `docs/CONTINUE_HERE.md`
- `docs/CUSTOMER_GUIDANCE_LOBBY_DIRECTION.md`
- `docs/SECURE_SUPPORT_CHECKOUT_OPTIONS.md`
- `docs/PUBLIC_SITE_MESSAGING_RULES.md`
- `docs/VENDOR_READY_SITEMAP.md`
- `docs/PAGE_BY_PAGE_WIREFRAME_PLAN.md`
- `docs/WEBFLOW_DEVELOPMENT_BACKLOG.md`
- `docs/WEBFLOW_QA_CHECKLIST.md`
- `demo/`

This prompt pack is for assigning parallel agents or service builders while keeping the SciTOX rebuild aligned. It does not approve final copy, product claims, checkout tools, privacy/security claims, vendor acceptance, or platform eligibility.

## Shared Operating Rules

Every agent or service builder must follow these rules:

- Treat vendor readiness as the primary rebuild goal.
- Treat the public customer site as a calm product guidance lobby for already-aware visitors.
- Keep public customer pages and vendor/wholesale surfaces distinct.
- Do not overexpose the product/category in a way that creates vendor, payment, platform, or risk-review issues.
- Do not invent owner data, product data, proof, sales numbers, reviews, vendor relationships, payment approval, platform approval, legal conclusions, or claims support.
- Mark uncertain claims `[REVIEW REQUIRED]`.
- Mark missing business, product, policy, support, payment, fulfillment, or wholesale information `[OWNER DATA NEEDED]`.
- Do not write final public website copy unless explicitly assigned and review gates are defined.
- Do not present autonomous AI, encrypted chat, autonomous checkout, payment approval, or vendor acceptance as live unless verified.

## Parallel Workstreams

| Workstream | Primary Output | Must Read First | Main Boundary |
| --- | --- | --- | --- |
| Webflow demo/build | Webflow-ready page structure and interaction notes | `demo/`, `docs/PAGE_BY_PAGE_WIREFRAME_PLAN.md` | No final copy or unsupported claims |
| Visual/UI refinement | Refined style system and component notes | `demo/`, `docs/WEBSITE_REBUILD_BRIEF.md` | Serious and warm, not hype or panic |
| Customer guidance automation | Decision-tree model and routing rules | `docs/CUSTOMER_GUIDANCE_LOBBY_DIRECTION.md` | Controlled routing, not advice |
| Secure support/checkout | Tool and payment option matrix | `docs/SECURE_SUPPORT_CHECKOUT_OPTIONS.md` | Review-gated, no approval assumptions |
| Vendor/wholesale layer | Wholesale page and asset requirements | `docs/VENDOR_READY_STRATEGY_BRIEF.md` | No vendor acceptance claims |
| Product/CMS data | CMS fields and owner-data gap list | `outputs/`, `docs/VENDOR_READY_SITEMAP.md` | No invented SKUs, prices, labels, claims |
| Messaging/risk control | Exposure-safe placeholder language rules | `docs/PUBLIC_SITE_MESSAGING_RULES.md` | Do not write final copy |
| QA/launch readiness | Demo and Webflow QA report | `docs/WEBFLOW_QA_CHECKLIST.md` | Evidence only, no launch claims |

## Prompt 1: Webflow Demo Build Agent

Objective:
Turn the static demo and wireframe plan into a Webflow-ready implementation plan or Webflow page build.

Expected output:
- Page/component list.
- Section order for each V1 page.
- CMS collection recommendations.
- Interaction notes for product tabs, guidance routing, support intake, and vendor inquiry.
- Owner-data placeholders.
- Review-gated language markers.

Copy-paste prompt:

```text
Use the SciTOX project sources in this repository.

Read AGENTS.md, docs/CONTINUE_HERE.md, docs/CUSTOMER_GUIDANCE_LOBBY_DIRECTION.md, docs/SECURE_SUPPORT_CHECKOUT_OPTIONS.md, docs/PUBLIC_SITE_MESSAGING_RULES.md, docs/VENDOR_READY_SITEMAP.md, docs/PAGE_BY_PAGE_WIREFRAME_PLAN.md, docs/WEBFLOW_DEVELOPMENT_BACKLOG.md, docs/WEBFLOW_QA_CHECKLIST.md, and the demo/ folder.

Create a Webflow-ready build plan for the SciTOX V1 site using the current demo as the feel/flow reference. Keep the public site as a calm product guidance lobby for already-aware visitors. Keep vendor/wholesale surfaces separate. Do not write final website copy. Do not invent product data, claims, pricing, reviews, policy terms, payment approval, platform approval, vendor acceptance, or legal conclusions.

For each page/component, provide:
- purpose
- sections
- CMS/static fields
- interactions
- owner data needed
- claim-sensitive or exposure-sensitive areas
- V1/later status
- acceptance criteria

Mark uncertain items [REVIEW REQUIRED] and missing facts [OWNER DATA NEEDED].
```

Acceptance criteria:
- Uses lean V1 pages from the sitemap.
- Preserves low-exposure customer flow.
- Separates customer, vendor, support, and policy surfaces.
- Does not depend on unverified AI/chat/checkout tools.

## Prompt 2: Visual/UI Refinement Agent

Objective:
Improve the demo's visual direction while keeping the brand private, serious, warm, direct, and competent.

Expected output:
- Refined visual principles.
- Component list with states.
- Webflow class naming recommendations.
- Desktop and mobile layout notes.
- Accessibility and readability checks.

Copy-paste prompt:

```text
Use the SciTOX demo and planning docs in this repository.

Read AGENTS.md, docs/WEBSITE_REBUILD_BRIEF.md, docs/CUSTOMER_GUIDANCE_LOBBY_DIRECTION.md, docs/PUBLIC_SITE_MESSAGING_RULES.md, and demo/.

Refine the visual/UI direction for a vendor-ready SciTOX rebuild. The audience includes already-aware customers, stressed customers needing clear routing, vendors, distributors, smoke shops, head shops, retailers, and payment/platform reviewers.

Do not redesign into a hype, wellness, panic, meme, luxury, or medical-looking site. Keep the look serious, warm, restrained, organized, and competent. Avoid overexposing the product/category. Do not write final copy.

Deliver:
- visual style principles
- color/type/spacing recommendations
- component inventory
- mobile layout guidance
- desktop layout guidance
- vendor-layer visual rules
- customer-lobby visual rules
- areas needing owner or review approval
```

Acceptance criteria:
- The UI supports trust without heavy product persuasion.
- Product selection, support routing, and wholesale inquiry are easy to understand.
- Mobile layouts do not feel cramped or salesy.

## Prompt 3: Customer Guidance Automation Agent

Objective:
Design the controlled product guidance flow that can reduce owner support load without creating legal, medical, test-result, privacy, or claims risk.

Expected output:
- Decision-tree outline.
- Allowed question types.
- Disallowed question types.
- Routing destinations.
- Escalation rules.
- Data minimization notes.
- Owner-data requirements.

Copy-paste prompt:

```text
Use the SciTOX customer guidance docs in this repository.

Read AGENTS.md, docs/CUSTOMER_GUIDANCE_LOBBY_DIRECTION.md, docs/SECURE_SUPPORT_CHECKOUT_OPTIONS.md, docs/PUBLIC_SITE_MESSAGING_RULES.md, docs/VENDOR_READY_SITEMAP.md, and docs/PAGE_BY_PAGE_WIREFRAME_PLAN.md.

Design a controlled product guidance automation model for SciTOX. The site should help already-aware visitors choose a common product path, compare options, or request human follow-up. It must not act like open-ended AI advice, legal advice, medical advice, diagnostic guidance, or test-result advice.

Deliver:
- decision-tree structure
- suggested form/intake fields
- routing outcomes
- escalation rules
- what the automation may say in placeholder-safe terms
- what the automation must never say
- owner data needed
- review items
- implementation options for Webflow plus a light custom layer

Do not invent product mappings, claims, results, or final wording. Mark all routing logic [REVIEW REQUIRED] until owner and review approval.
```

Acceptance criteria:
- Keeps guidance rule-based and reviewable.
- Avoids overcollection of sensitive data.
- Routes unclear cases to human support.
- Leaves product mapping as `[OWNER DATA NEEDED]`.

## Prompt 4: Secure Support And Checkout Research Agent

Objective:
Identify realistic secure support, human handoff, assisted checkout, and later autonomous checkout options without implying approval.

Expected output:
- Option matrix.
- Tool/provider shortlist.
- Data flow notes.
- Privacy/security claim review notes.
- Payment/channel review needs.
- V1 recommendation and later-phase recommendation.

Copy-paste prompt:

```text
Use the SciTOX secure support and checkout materials in this repository.

Read AGENTS.md, docs/SECURE_SUPPORT_CHECKOUT_OPTIONS.md, docs/CUSTOMER_GUIDANCE_LOBBY_DIRECTION.md, docs/PUBLIC_SITE_MESSAGING_RULES.md, and docs/WEBFLOW_DEVELOPMENT_BACKLOG.md.

Research and propose implementation options for:
- controlled on-site routing
- encrypted or privacy-sensitive human support handoff
- assisted checkout through an owner-approved path
- later autonomous checkout only if payment/channel review allows it

Use official provider, platform, privacy, and payment documentation where possible. Do not assume Stripe, PayPal, WhatsApp, Telegram, Signal, Webflow, or any high-risk merchant provider is approved. Do not claim end-to-end encrypted AI. Separate support, guidance automation, and checkout.

Deliver:
- option matrix
- data flow sketch
- privacy/security language risks
- payment/channel risks
- V1 recommendation
- later-phase recommendation
- owner decisions needed
- legal/compliance review items
```

Acceptance criteria:
- Distinguishes routing, human messaging, and payment.
- Does not rely on unsupported autonomous purchasing.
- Gives the owner a practical near-term path and a review-gated future path.

## Prompt 5: Vendor/Wholesale Layer Agent

Objective:
Build the vendor-facing layer and supporting outreach materials so SciTOX looks credible to buyers without claiming approval, eligibility, or unsupported performance.

Expected output:
- Partner/Wholesale page plan.
- Inquiry form requirements.
- Required vendor packet assets.
- Product line sheet gaps.
- Buyer concerns to address.
- Owner data needed.

Copy-paste prompt:

```text
Use the SciTOX vendor-readiness docs in this repository.

Read AGENTS.md, docs/VENDOR_READY_STRATEGY_BRIEF.md, docs/VENDOR_READY_SITEMAP.md, docs/PAGE_BY_PAGE_WIREFRAME_PLAN.md, docs/WEBFLOW_DEVELOPMENT_BACKLOG.md, outputs/scitox_product_line_sheet/Product_Line_Sheet_Template.xlsx, outputs/scitox_product_data/Product_Data_Requirements.xlsx, and outputs/scitox_buyer_outreach/Buyer_Outreach_Tracker.xlsx if present.

Create a vendor/wholesale implementation plan for SciTOX. The goal is credibility for vendor, wholesale, smoke shop, head shop, distributor, retailer, and online vendor outreach.

Deliver:
- Partner / Wholesale Inquiry page section plan
- form field requirements
- required vendor-facing assets
- product line sheet requirements
- buyer concerns to address
- what must wait for owner data
- what requires review
- acceptance criteria for the vendor page

Do not invent pricing, MOQ, case pack, UPC/GTIN, vendor acceptance, distributor relationships, platform eligibility, product proof, or claims support.
```

Acceptance criteria:
- Vendor layer is restrained and separate from customer emotional flow.
- Page focuses on professionalism, documentation, and inquiry routing.
- All missing economics/product data remain `[OWNER DATA NEEDED]`.

## Prompt 6: Product/CMS Data Agent

Objective:
Prepare the product data model needed for public product pages, Webflow CMS, and vendor materials.

Expected output:
- CMS schema.
- Product data gap checklist.
- Field-level review markers.
- Import-ready field names.
- Webflow collection notes.

Copy-paste prompt:

```text
Use the SciTOX data and sitemap docs in this repository.

Read AGENTS.md, docs/VENDOR_READY_SITEMAP.md, docs/PAGE_BY_PAGE_WIREFRAME_PLAN.md, docs/WEBFLOW_DEVELOPMENT_BACKLOG.md, outputs/scitox_product_data/Product_Data_Requirements.xlsx, outputs/scitox_product_line_sheet/Product_Line_Sheet_Template.xlsx, and docs/SOURCE_INDEX.md.

Create an implementation-ready product/CMS data plan for Webflow and vendor materials.

Include fields for:
- product name
- SKU
- category
- size
- price
- MSRP
- wholesale price
- MOQ
- case pack
- UPC/GTIN
- ingredients
- label file
- product image
- instructions
- warnings
- shipping notes
- review-required claims
- owner data needed

Do not invent any product facts. Mark missing fields [OWNER DATA NEEDED] and claim-sensitive fields [REVIEW REQUIRED].
```

Acceptance criteria:
- Field names are ready for Webflow or spreadsheet import.
- Public product fields and vendor fields are clearly separated.
- Review-sensitive fields are obvious.

## Prompt 7: Messaging And Risk-Control Agent

Objective:
Review placeholder language and section framing for exposure risk, claim risk, and vendor/payment/platform review risk.

Expected output:
- Copy-risk checklist.
- Exposure-risk scan.
- Banned terms list.
- Placeholder-safe phrasing rules.
- Review queue.

Copy-paste prompt:

```text
Use the SciTOX messaging rules and current demo.

Read AGENTS.md, docs/PUBLIC_SITE_MESSAGING_RULES.md, docs/CUSTOMER_GUIDANCE_LOBBY_DIRECTION.md, docs/SECURE_SUPPORT_CHECKOUT_OPTIONS.md, docs/WEBSITE_REBUILD_BRIEF.md, and demo/.

Review the demo and planned Webflow sections for public-site messaging risk. Focus on exposure: language that overidentifies, overexplains, advertises, or flags the product/category for vendors, payment reviewers, platforms, or risk systems.

Deliver:
- risky words/phrases to avoid
- claim-sensitive sections
- privacy/security language needing review
- AI/support/checkout language needing review
- placeholder-safe phrasing patterns
- items to remove before public launch

Do not rewrite final copy. Do not approve any claim. Mark uncertain items [REVIEW REQUIRED].
```

Acceptance criteria:
- Separates claim risk from exposure risk.
- Does not overcorrect into vague or unhelpful site structure.
- Keeps customer comfort and vendor-readiness aligned.

## Prompt 8: QA And Launch Readiness Agent

Objective:
Verify the demo or Webflow build against the project checklist before owner review or launch preparation.

Expected output:
- QA report.
- Screenshots or evidence notes.
- Broken-link list.
- Launch blockers.
- Owner-data and review-gate summary.

Copy-paste prompt:

```text
Use the SciTOX rebuild repository.

Read AGENTS.md, docs/WEBFLOW_QA_CHECKLIST.md, docs/PUBLIC_SITE_MESSAGING_RULES.md, docs/CUSTOMER_GUIDANCE_LOBBY_DIRECTION.md, docs/SECURE_SUPPORT_CHECKOUT_OPTIONS.md, and the current demo or Webflow staging URL.

Run a QA pass for:
- mobile layout
- desktop layout
- navigation
- forms
- product pages
- vendor inquiry page
- policy links
- analytics/Search Console readiness
- claim-sensitive language
- privacy/security claims
- owner-data placeholders
- broken links
- launch blockers

Report only evidence you verified. Do not claim launch readiness unless every required gate is satisfied. Mark unresolved items [REVIEW REQUIRED] or [OWNER DATA NEEDED].
```

Acceptance criteria:
- Findings are evidence-based.
- Launch blockers are clearly separated from later improvements.
- No unverifiable success claims are made.

## Immediate Development Recommendation

Use these prompts in this order:

1. Webflow Demo Build Agent.
2. Customer Guidance Automation Agent.
3. Secure Support And Checkout Research Agent.
4. Vendor/Wholesale Layer Agent.
5. Product/CMS Data Agent.
6. Messaging And Risk-Control Agent.
7. QA And Launch Readiness Agent.

The Visual/UI Refinement Agent can run alongside the Webflow build once the owner accepts the demo direction.

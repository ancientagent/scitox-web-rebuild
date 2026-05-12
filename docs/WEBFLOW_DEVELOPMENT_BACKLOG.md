# Webflow Development Backlog

Use this backlog to turn the planning files into buildable Webflow work. Do not publish final copy or claim-sensitive language until review is complete.

## Priority 1: Repo And Source Alignment

| Task | Output | Acceptance Criteria | Blockers |
| --- | --- | --- | --- |
| Confirm V1 sitemap | Webflow page list | Page list matches `docs/VENDOR_READY_SITEMAP.md`. | Owner approval if page scope changes. |
| Define customer guidance lobby | Lobby flow map | Homepage and intake flow reflect `docs/CUSTOMER_GUIDANCE_LOBBY_DIRECTION.md` with common-situation self-service and escalation paths. | Product routing rules, privacy review, support workflow. |
| Define demo-safe exposure rules | Demo language and UI guardrails | Demo shows seriousness, routing, and automation without overexposing the product/category or presenting unsupported tools/channels. | Owner review of acceptable abstraction level. |
| Prepare parallel build prompts | Agent/service prompt pack | Prompts in `docs/AGENT_SERVICE_BUILD_PROMPTS.md` can be used to delegate Webflow, guidance automation, secure support/checkout, vendor, data, messaging, and QA work without inventing missing facts. | Owner approval of workstream order if priorities change. |
| Confirm CMS model | Product CMS schema | CMS fields align with product data workbook. | Product data missing. |
| Confirm source evidence | Source references | Current site/source files are linked where claims or policy language are discussed. | Missing source or owner confirmation. |

## Priority 2: Public Customer Site

| Task | Output | Acceptance Criteria | Blockers |
| --- | --- | --- | --- |
| Homepage structure | Webflow homepage | Uses wireframe section order and placeholder-safe language. | Claim-sensitive copy review. |
| Guided product flow | Decision-tree / intake spec | Structured product questions route to product paths or human support without legal, medical, or test-result advice. | Routing logic, tool choice, privacy/security review. |
| Explorable owner demo | Static demo / prototype | Owner can explore lobby, common paths, product routing, support escalation, vendor inquiry, and automation surfaces without unsupported live-system claims. | Demo-safe abstraction and source material review. |
| Product category template | Category page/template | Products can be browsed without unsupported claims. | Product data. |
| Product detail template | CMS-backed product detail | Product facts, instructions, warnings, shipping notes, and review-required claim areas are represented. | Ingredients, labels, warnings, images. |
| FAQ / Support page | Support page | Calm support flow with no legal/medical/test-outcome advice. | Support process confirmation. |
| Shipping / Returns / Guarantee page | Policy page | Public policy language matches owner-approved terms. | Owner policy data and review. |

## Priority 3: Vendor / Wholesale Layer

| Task | Output | Acceptance Criteria | Blockers |
| --- | --- | --- | --- |
| Partner / Wholesale Inquiry page | Vendor-facing Webflow page | Professional inquiry path, required buyer fields, no implied vendor acceptance. | Wholesale terms and form routing. |
| Line sheet handoff | Vendor line sheet workbook/PDF source | Uses owner-confirmed product data only. | SKU, MSRP, wholesale, MOQ, case pack, UPC/GTIN. |
| Buyer outreach tracker | Outreach workbook | Buyer status and owner approval fields are active. | Outreach list and owner approvals. |

## Priority 4: Launch QA

| Task | Output | Acceptance Criteria | Blockers |
| --- | --- | --- | --- |
| Mobile QA | QA evidence | All V1 pages pass mobile checklist. | Layout defects. |
| Desktop QA | QA evidence | All V1 pages pass desktop checklist. | Layout defects. |
| Forms QA | Form submission evidence | Contact/intake/vendor forms route correctly. | Missing notifications or privacy review. |
| Chat/callback QA | Tooling review evidence | Any AI, chat, callback, encrypted communication, or third-party messaging flow is verified before public claims are made. | Tool access, privacy policy, payment/platform review. |
| Secure support / checkout review | Option matrix + selected path | Support and checkout solution follows `docs/SECURE_SUPPORT_CHECKOUT_OPTIONS.md` and distinguishes routing, encrypted human support, assisted checkout, and autonomous checkout. | Current payment path, tool selection, privacy and payment review. |
| Claim cleanup | Reviewed claim list | No launch-blocking claims remain unresolved. | Legal/compliance review. |
| Analytics/Search Console | Verification evidence | Tracking and ownership checks complete without collecting sensitive intake data. | Access credentials. |

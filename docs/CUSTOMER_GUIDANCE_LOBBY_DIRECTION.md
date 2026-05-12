# Customer Guidance Lobby Direction

Source context:
- Owner direction from May 12, 2026.
- `docs/WEBSITE_REBUILD_BRIEF.md`
- `docs/PUBLIC_SITE_MESSAGING_RULES.md`
- `docs/VENDOR_READY_SITEMAP.md`
- `docs/PAGE_BY_PAGE_WIREFRAME_PLAN.md`

This document captures the current owner direction for the customer-facing rebuild. It is not final website copy and does not approve product, privacy, security, AI, legal, medical, payment, vendor, or platform claims.

## Strategic Shift

Because much customer traffic is expected to arrive from other sources, the first customer-facing experience does not need to overexplain the product category or lead with the nature of the product.

Refined owner direction:
- The site does not need to advertise the product category heavily if customers arrive through word of mouth or other trusted sources.
- Most visitors should be treated as already-aware prospects who may trust the product because of people they know, reviews they have read, or outside research completed before arrival.
- The site should validate that existing trust, reduce friction, and help them choose the right path.
- The customer-facing goal is to make the visitor feel that the product and company are serious, organized, respectful, and capable.
- The claims priority is not to prove every product point in the demo. The priority is to avoid exposing the product/category in a way that flags the business as risky to vendors, platforms, payment reviewers, or partners.
- Product details should appear only where needed for user routing, product selection, and confidence.

The rebuild should focus on:
- Comfort.
- Respect.
- Privacy-aware routing.
- Simplified self-service.
- Clear product selection.
- Escalation when a customer situation is nuanced.

The customer site should feel like a calm lobby where a visitor can quickly decide whether:
- Their situation is common enough to use normal product information.
- They need guided product questions.
- They need human follow-up.

## Customer Understanding Model

The site should assume every buyer may arrive with a different background, urgency level, knowledge level, and comfort level.

The experience should help the business "know" the customer enough to route them to the appropriate product path without overcollecting sensitive information.

Use this framing internally:
- Situation-based routing.
- Product guidance.
- Guided product questions.
- Human support escalation.
- Common situation self-service.

Avoid public wording that implies:
- Diagnosis.
- Prescription.
- Legal advice.
- Medical advice.
- Guaranteed outcome.
- Test-result advice.
- Complete privacy/security certainty.

The word "prescribe" may be useful as internal shorthand, but customer-facing copy should not use it unless legal/compliance review approves it. Use "recommend," "route," or "guide" only after claim review.

## Lobby Experience

The customer-facing homepage should behave more like a product guidance lobby than a traditional product sales page.

The lobby should include:
- A calm entry point.
- A confirmation that the visitor can quickly choose the right path without sitting through a product pitch.
- Product/category paths for common situations.
- A simple path to purchase when the situation clearly fits reviewed product information.
- A "not sure" route for nuanced situations.
- A support path for customers who need human help.
- Clear policy, shipping, returns, and privacy links.

The lobby should not:
- Overexplain the product category on the first screen.
- Try to persuade already-aware visitors with heavy proof, results, or product-category advertising.
- Advertise the product category in a way that creates avoidable vendor or platform risk.
- Use panic or urgency as the main conversion driver.
- Force every visitor into a form.
- Hide product information from customers who can self-select.
- Promise outcomes, privacy, encryption, or special advice without review.

## Product Guidance Flow

The core customer automation concept is a live backend-source-grounded product selection flow.

Recommended V1 direction:
1. Let customers browse common product/category paths.
2. Let customers answer a limited set of structured product questions.
3. Send structured answers to a backend assistant that can retrieve approved source information.
4. Route customers to a product option, support page, or human callback request only when the source base supports the path.
5. Keep product recommendations source-grounded, validated, and reviewed.
6. Escalate uncertain, sensitive, or unsupported situations to human support.

Required boundaries:
- Do not use frontend-only or open-ended AI to generate claims or advice.
- Do not let the assistant answer from general internet knowledge.
- Do not let the guidance flow provide legal, medical, or test-result advice.
- Do not ask for more sensitive data than needed to route the question.
- Do not imply that the guidance system can solve every situation.
- Do not require customers to read risk-flagging product explanations before they can choose a path.
- Do not return a product recommendation unless the backend source base contains approved product mapping.
- Mark guidance logic `[REVIEW REQUIRED]`.
- Mark actual routing rules `[OWNER DATA NEEDED]`.

## AI Assistance Direction

The owner wants the product guidance feature to be live and powered by a capable LLM assistant that refers to backend source information.

This is directionally useful and should be planned as a live V1 feature, but it must remain backend-source-grounded and review-gated.

Allowed planning language:
- AI-assisted product guidance `[REVIEW REQUIRED]`
- Source-grounded product assistant `[REVIEW REQUIRED]`
- Backend-source-grounded guidance assistant `[REVIEW REQUIRED]`
- Guided product questions `[REVIEW REQUIRED]`
- Product support assistant `[REVIEW REQUIRED]`
- Escalation to human support `[OWNER DATA NEEDED]`

Do not publicly claim:
- AI counsel.
- AI consultation.
- Encrypted AI consultation.
- Medical, legal, or diagnostic guidance.
- Guaranteed product selection.
- Fully autonomous support for sensitive cases.

V1 should implement a live backend assistant, not open-ended frontend chat. The assistant should use approved product data and routing rules from the backend, return structured outputs, and route to human support when source data is missing or the customer situation is outside reviewed flows.

## Human Callback Direction

Customers with nuanced situations should be able to request follow-up from a knowledgeable company representative if the owner confirms the support process.

Planning requirements:
- Callback or follow-up availability `[OWNER DATA NEEDED]`.
- Support owner and staffing `[OWNER DATA NEEDED]`.
- Response times `[OWNER DATA NEEDED]`.
- Contact method and consent language `[REVIEW REQUIRED]`.
- Privacy/data handling workflow `[REVIEW REQUIRED]`.

The site should not promise immediate human callback unless the support operation can consistently deliver it.

## Privacy And Communication Direction

The owner wants on-site communications handled with high privacy standards and preferably encrypted communication.

This is a requirement for implementation planning, not a public claim until verified.

Planning requirements:
- Identify actual chat/form/callback tools.
- Confirm encryption in transit and at rest, if claimed.
- Confirm data retention and access controls.
- Confirm who can read customer communications.
- Confirm whether purchase information and support information are stored together or separately.
- Confirm privacy policy alignment.
- Confirm whether sensitive intake data is necessary.

Public claims requiring review:
- "Encrypted"
- "Confidential"
- "Secure"
- "Private consultation"
- "Anonymous"
- "No data stored"
- "End-to-end encrypted"

Use `[REVIEW REQUIRED]` until the technical system and policy language support the exact claim.

## Third-Party Messaging And Autonomous Purchase Direction

The owner is open to native on-site messaging or third-party platforms such as Telegram, potentially including autonomous discussion and purchasing.

This needs separate technical, privacy, payment, and compliance review before implementation.

The demo should include this as a possible system architecture, not as a live promise. See `docs/SECURE_SUPPORT_CHECKOUT_OPTIONS.md`.

Review questions:
- Is the platform appropriate for this product category and customer privacy expectations?
- Can the platform support required consent, retention, access control, and deletion workflows?
- Can product guidance be constrained to reviewed language?
- Can purchases be completed without violating payment processor or platform rules?
- Does the flow create support, chargeback, privacy, or claims risk?
- Does it keep customer experience professional enough for vendor and payment review?

V1 should not depend on a third-party autonomous purchasing flow unless owner/payment/privacy review clears it.

The likely near-term path is:
1. Controlled on-site routing.
2. Optional secure human support handoff.
3. Default checkout through the owner-confirmed Authorize.net path after integration/configuration review.
4. Optional comfort-oriented payment choices for customers who want another path, such as assisted payment, enabled ACH/eCheck, enabled Apple Pay/Google Pay, or crypto/stablecoin/onramp checkout after provider review.
5. Autonomous checkout only after payment/channel review.

## High-Risk Channel Constraint

Owner direction notes that typical channels may be limited because the current product/category is treated as high risk.

Planning implication:
- Keep checkout/payment migration outside V1 unless reviewed.
- Treat Authorize.net as the owner-confirmed current processor/gateway, but keep integration type, enabled payment methods, fraud/dispute/refund settings, and Webflow handoff as `[OWNER DATA NEEDED]` / `[REVIEW REQUIRED]`.
- Build the site so it can route customers clearly without implying platform safety.
- Do not claim a payment, marketplace, ad, vendor, or messaging channel is approved.
- Do not design the public demo around tools, channels, or scenarios that the business likely cannot support because of current risk status.
- Any system shown in the demo should be framed as controlled routing, support workflow, or review-gated future capability unless it is already verified.
- Offer optional comfort-oriented payment paths as choices when reviewed; do not describe them as anonymous, private, processor-proof, refund-proof, or guaranteed.

## UI Implications

Homepage:
- Reframe as a calm product guidance lobby.
- Lead with orientation and next steps, not dense product explanation.
- Provide common situation paths and "not sure" support routing.
- Show seriousness through structure, restraint, and support workflow rather than product-category promotion.

Product Category:
- Keep self-service paths for common situations.
- Use reviewed product categories and structured comparisons.

Product Detail:
- Preserve direct purchase path only where owner/payment review confirms it.
- Include a clear "ask a product question" route.

Private Product Guidance / Intake:
- Treat as the primary simplification/automation surface.
- Use structured questions, not broad free-form confession-style intake.
- Escalate to human support where guidance is uncertain.

FAQ / Support:
- Explain how product guidance, AI-assisted support, and human follow-up work only after owner data and review.

Contact:
- Include reason-based routing and support escalation.

Vendor / Wholesale:
- Keep vendor layer separate, but show that customer support and product routing are organized and controlled.

## Development Priority

The first development slice should define:
- Customer lobby information architecture.
- Product guidance decision model.
- Live LLM guidance backend and source-base structure.
- Intake fields and privacy boundaries.
- Human escalation workflow.
- Tooling options for chat/forms/callbacks.
- Payment/channel constraints.
- Claim and privacy review gates.
- Demo-safe automation surfaces that can be explored without implying unsupported live systems.

No final UI copy should be written from this document without review.

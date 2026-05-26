# SciTOX Page-by-Page Wireframe Plan

Source context:
- `docs/VENDOR_READY_SITEMAP.md`
- `docs/WEBSITE_REBUILD_BRIEF.md`
- `docs/CUSTOMER_GUIDANCE_LOBBY_DIRECTION.md`
- `docs/VENDOR_READY_STRATEGY_BRIEF.md`
- `docs/PUBLIC_SITE_MESSAGING_RULES.md`

This is a structure plan for the SciTOX rebuild. It does not contain final website copy, approved claims, proof, legal conclusions, vendor acceptance, Amazon eligibility, or platform approval.

All copy blocks should remain placeholders until owner data, claims review, privacy review, and legal/compliance review are complete.

## Current Implementation Note

This wireframe plan predates the current public UI cleanup. Treat the marker and placeholder instructions below as internal planning guidance, not customer-facing display rules.

Current app direction:

- `/guidance` now opens with a brief full-screen "Welcome to SciTOX." fade-in, then hands off to the current-situation question and routes first-time visitors into either `/resources` or product guidance.
- `/resources` is the Knowledge Center destination for visitors who want information before deciding.
- Public customer-facing UI must not render `[REVIEW REQUIRED]`, `[OWNER DATA NEEDED]`, scaffold/demo labels, route-shell notes, or other developer-facing planning text.
- Internal docs, source data, backend fallbacks, tests, QA reports, and owner-review workflows should keep review/owner-data markers until they are replaced by an equivalent internal review gate.

## Global Wireframe Rules

- Use short placeholder labels, not final marketing copy.
- Mark claim-sensitive copy `[REVIEW REQUIRED]`.
- Mark missing owner/business/product facts `[OWNER DATA NEEDED]`.
- Do not render those markers in public customer-facing UI. Use customer-facing neutral copy, hide incomplete sections, or route to support/resources until facts and review are complete.
- Treat the custom app under `site/` as the primary implementation target unless the owner explicitly changes direction.
- Keep the tone private, serious, warm, direct, and competent.
- Do not use panic-sales language, legal/medical advice, outcome guarantees, fake proof, fake badges, fake review counts, or vendor/platform approval claims.
- Do not overexplain or advertise the product/category where a lower-exposure product path, category label, or support route will accomplish the user flow.
- Keep the custom app build lean: static routes plus product templates and server-side API routes only where needed.
- Keep customer-facing pages separate from vendor/wholesale pages.

## 1. Homepage

**Purpose**

Orient stressed visitors quickly, establish a serious and credible brand feel, and act as a calm product guidance lobby. The page should route users to common product paths, guided product questions, support, and vendor inquiry without overclaiming or overexplaining the product category on the first screen.

**Section Order**

1. Header/navigation: Products, Product Guidance, FAQ / Support, Contact, Wholesale / Partners.
2. Lobby hero: concise orientation placeholder and primary CTAs.
3. Calm guidance path: "common situation / not sure / contact support" structure.
4. Product category cards: major product categories or product paths.
5. Common situation self-service: reviewed paths for situations that fit clear product/category information.
6. Nuanced situation escalation: guided product questions and human follow-up placeholder.
7. Why the site is structured this way: trust/support/process placeholder.
8. Product guidance/intake teaser: minimal, privacy-aware form entry.
9. Reviews/customer experience placeholder: neutral trust area, no proof language.
10. Support and policy strip: shipping, returns, FAQ, contact.
11. Wholesale/partner teaser: small professional route for buyers.
12. Footer: policies, support, contact, wholesale, privacy, terms.

**CTA Hierarchy**

- Primary: Choose a Product Path / View Product Categories.
- Secondary: Get Product Guidance / Not Sure.
- Tertiary: Contact Support.
- Footer/utility: Wholesale / Partners.

**Placeholder Copy Rules**

- Use concise placeholder headings only.
- Position as product guidance and support, not guaranteed outcomes or broad product-category education.
- Prioritize seriousness and flow clarity over product advertising.
- Do not use "prescribe," "counsel," "consultation," or "encrypted" in public copy without review.
- Any privacy reassurance must be marked `[REVIEW REQUIRED]`.
- Any claim about effectiveness, results, testing, or superiority must be marked `[REVIEW REQUIRED]`.

**Claim-Sensitive Sections**

- Hero positioning.
- Product category summaries.
- Product guidance routing.
- Human callback or AI-assisted support language.
- Reviews/customer experience area.
- Product guidance/privacy teaser.
- Shipping/returns/guarantee mentions.
- Any "why SciTOX" or proof section.

**Owner Data Needed**

- Product category list.
- Approved product positioning.
- Approved common-situation routing rules.
- Product images.
- Current support paths.
- Chat/form/callback tooling.
- Privacy/data handling details.
- Review/testimonial source status.
- Shipping/returns/guarantee policy.
- Claim substantiation status.

## 2. Product Category

**Purpose**

Help customers compare product categories or product paths without making risky result promises.

**Section Order**

1. Header/navigation.
2. Category page hero: category purpose placeholder.
3. Category/product path cards: each card links to product detail or guidance.
4. Product comparison table or card grid.
5. "Not sure?" product guidance CTA.
6. Category FAQ snippets.
7. Support strip.
8. Footer policy links.

**CTA Hierarchy**

- Primary: View Product Details.
- Secondary: Get Product Guidance.
- Tertiary: Contact Support.

**Placeholder Copy Rules**

- Use neutral category labels.
- Do not say a product "works for" a specific outcome unless reviewed.
- Use `[REVIEW REQUIRED]` for category explanations tied to test results, timing, substances, or outcomes.
- Use `[OWNER DATA NEEDED]` for missing SKU/category relationships.

**Claim-Sensitive Sections**

- Category names and descriptions.
- Product comparison criteria.
- "Best for" labels.
- Timing or situation-based recommendations.
- FAQ snippets.

**Owner Data Needed**

- Final category taxonomy.
- SKU-to-category mapping.
- Product availability.
- Product images.
- Approved comparison criteria.
- Product guidance decision rules.

## 3. Product Detail

**Purpose**

Present each product in a structured, review-safe format that can serve both customers and vendor reviewers.

**Section Order**

1. Header/navigation.
2. Product hero: product name, image, price/status placeholders, primary CTA.
3. Product facts panel: SKU, size, category, availability.
4. Short product description placeholder.
5. What to know before ordering: support-safe product guidance section.
6. Directions/use guidance placeholder.
7. Ingredients/label section.
8. Shipping/returns/support strip.
9. FAQ snippets for this product.
10. Review/customer experience placeholder.
11. Related products or product guidance CTA.
12. Footer policy links.

**CTA Hierarchy**

- Primary: Buy / Continue to Current Checkout Path, if approved.
- Secondary: Ask Product Question / Product Guidance.
- Tertiary: View Shipping and Returns.

**Placeholder Copy Rules**

- Use product facts only where owner data exists.
- Use `[OWNER DATA NEEDED]` for price, SKU, ingredients, images, availability, directions, shipping, and policies.
- Use `[REVIEW REQUIRED]` for product description, use guidance, claims, reviews, and results.
- Do not write final efficacy language.

**Claim-Sensitive Sections**

- Product description.
- Directions/use.
- Product results.
- Ingredients/safety.
- Timing.
- Guarantee/refund.
- Reviews/testimonials.
- Related product recommendations.

**Owner Data Needed**

- Product name.
- SKU.
- Variant/size.
- Product image.
- Price.
- Availability.
- Ingredients.
- Directions.
- Label files.
- Shipping details.
- Refund/guarantee policy.
- Claim substantiation.
- Review permissions.

## 4. Private Product Guidance / Intake

**Purpose**

Give customers a structured way to ask product questions, choose a product path, or request human follow-up through a backend-source-grounded assistant while minimizing sensitive data collection and avoiding legal/medical/test-result advice.

**Section Order**

1. Header/navigation.
2. Guidance page intro: purpose and privacy-aware placeholder.
3. Common situation selector.
4. "How this works" steps: answer limited questions, backend checks approved source information, get routed to product information or support, next step.
5. Guided product questions.
6. Assistant output state: product path, needs more information, or human follow-up.
7. Human support/callback request placeholder.
8. Privacy/data handling notice placeholder.
9. Product category links.
10. FAQ/support links.
11. Footer policy links.

**CTA Hierarchy**

- Primary: Start Product Guidance Form.
- Secondary: Contact Support.
- Tertiary: Browse Products.

**Placeholder Copy Rules**

- Use "Product Guidance" or "Product Support Intake" language.
- "AI-assisted product guidance" and "source-grounded assistant" remain `[REVIEW REQUIRED]` until the backend, source base, and privacy review are complete.
- Do not call it prescribed, counsel, consultation, encrypted, confidential, medical, legal, diagnostic, or guaranteed without review.
- Use `[REVIEW REQUIRED]` for any privacy, discretion, or response-time statement.
- Use `[OWNER DATA NEEDED]` for form routing, retention, response time, support owner, CRM/helpdesk/chat tool, callback process, and privacy policy.

**Claim-Sensitive Sections**

- Privacy/discretion intro.
- Intake question labels.
- Recommendation logic.
- LLM source retrieval and output behavior.
- Support response expectations.
- Any AI/private consultation language.
- Any product matching outcome.
- Any third-party messaging or autonomous purchasing flow.

**Owner Data Needed**

- Approved intake questions.
- Support owner.
- Response-time expectations.
- Form destination.
- CRM/helpdesk tool.
- Chat/messaging tool.
- LLM provider and backend deployment choice.
- Approved source-base content.
- Product-to-situation mapping rules.
- Human callback workflow.
- Privacy/data retention policy.
- Escalation rules.
- Approved product routing logic.

## 5. FAQ / Support

**Purpose**

Reduce repeated support questions, organize help topics, and make support feel competent without legal/medical advice or risky claims.

**Section Order**

1. Header/navigation.
2. Support page hero: calm help placeholder.
3. Quick action cards: product question, order/shipping question, refund/returns question, wholesale question.
4. FAQ category navigation.
5. Product questions section.
6. Ordering/shipping section.
7. Returns/guarantee section.
8. Privacy/product guidance section.
9. Contact support block.
10. Policy links.
11. Footer.

**CTA Hierarchy**

- Primary: Contact Support / Submit Support Request.
- Secondary: Get Product Guidance.
- Tertiary: View Shipping / Returns.

**Placeholder Copy Rules**

- Use category headings and answer placeholders only.
- Do not write final FAQ answers where claims, directions, refunds, or privacy are involved.
- Mark product, result, refund, privacy, and support process answers `[REVIEW REQUIRED]`.
- Mark actual times, policies, and support channels `[OWNER DATA NEEDED]`.

**Claim-Sensitive Sections**

- Product-use answers.
- Result/timing answers.
- Refund/guarantee answers.
- Privacy/product guidance answers.
- Shipping promises.
- Contact/support promises.

**Owner Data Needed**

- Top support questions.
- Actual support channels.
- Response-time expectations.
- Shipping timelines.
- Refund/guarantee policy.
- Order lookup process.
- Product directions.
- Privacy/data policy.

## 6. Reviews / Customer Experiences

**Purpose**

Preserve social proof potential without treating reviews as proof of product results or typical outcomes.

**Section Order**

1. Header/navigation.
2. Page intro: review/customer experience placeholder.
3. Source/context note placeholder.
4. Review cards or modules, if approved.
5. Customer experience categories: ordering, support, product clarity, shipping.
6. Review disclaimer/review rules placeholder.
7. Product/support CTAs.
8. Footer policy links.

**CTA Hierarchy**

- Primary: Browse Products.
- Secondary: Get Product Guidance.
- Tertiary: Contact Support.

**Placeholder Copy Rules**

- Use neutral "customer experience" framing.
- Do not invent reviews, names, counts, ratings, or outcomes.
- Do not summarize reviews as proof.
- Mark all review snippets, ratings, screenshots, and source claims `[REVIEW REQUIRED]`.
- Mark permissions and source metadata `[OWNER DATA NEEDED]`.

**Claim-Sensitive Sections**

- Review cards.
- Result/testimonial snippets.
- Star ratings/counts.
- Before/after references.
- AI-generated review summaries.
- Any typical-result implication.

**Owner Data Needed**

- Verified review sources.
- Permissions.
- Review dates/platforms.
- Approved review display policy.
- Moderation rules.
- Legal/compliance review.
- Claim substantiation status.

## 7. Shipping / Returns / Guarantee

**Purpose**

Create a clear policy hub that resolves confusion and reduces customer, vendor, and payment-review friction.

**Section Order**

1. Header/navigation.
2. Policy hub intro placeholder.
3. Shipping section.
4. Tracking/orders section.
5. Returns/refunds section.
6. Guarantee section, if owner and review approve.
7. Damaged/lost package section.
8. Contact support for policy questions.
9. Footer legal/policy links.

**CTA Hierarchy**

- Primary: Contact Support About an Order.
- Secondary: View Product Guidance / Products.
- Tertiary: Wholesale / Partners policy route, if needed.

**Placeholder Copy Rules**

- Do not write final refund or guarantee terms without owner/legal review.
- Mark all guarantee/refund language `[REVIEW REQUIRED]`.
- Mark all shipping times, cutoff times, carriers, costs, and damaged-goods handling `[OWNER DATA NEEDED]`.
- Keep policy language plain and consistent.

**Claim-Sensitive Sections**

- Guarantee promise.
- Refund eligibility.
- Result-tied refund language.
- Shipping speed/cutoff promises.
- Lost/damaged goods handling.
- Payment/chargeback/dispute language.

**Owner Data Needed**

- Current shipping methods.
- Processing times.
- Cutoff times.
- Tracking process.
- Shipping costs.
- Return/refund policy.
- Guarantee terms.
- Dispute/chargeback history.
- Damaged/lost package process.
- Legal review status.

## 8. Contact

**Purpose**

Provide a calm, professional support route for customers, vendors, and general inquiries without overpromising response or collecting unnecessary sensitive data.

**Section Order**

1. Header/navigation.
2. Contact page intro placeholder.
3. Inquiry type selector: product question, order/shipping, returns/refunds, wholesale/partner, general.
4. Minimal contact form.
5. Direct contact methods, if owner approves.
6. Support expectations placeholder.
7. Privacy/data handling notice placeholder.
8. FAQ/product guidance links.
9. Footer policy links.

**CTA Hierarchy**

- Primary: Submit Contact Form.
- Secondary: Product Guidance.
- Tertiary: FAQ / Support.
- Utility: Wholesale / Partners.

**Placeholder Copy Rules**

- Keep contact language professional and calm.
- Do not include warning-heavy, hacker, intercepted-call, or panic language.
- Mark response time, phone/text availability, and data handling `[OWNER DATA NEEDED]`.
- Mark privacy/security language `[REVIEW REQUIRED]`.

**Claim-Sensitive Sections**

- Privacy notice.
- Support response-time promise.
- Phone/text/chat availability.
- Sensitive-data instructions.
- Product guidance links.

**Owner Data Needed**

- Approved phone/text/email channels.
- Form destination.
- Support hours.
- Response-time expectations.
- CRM/helpdesk workflow.
- Privacy/data handling.
- Attribution/source question requirements.

## 9. Partner / Wholesale Inquiry

**Purpose**

Give vendors, wholesalers, smoke shops, head shops, distributors, online retailers, and partner reviewers a professional intake path without final outreach or unsupported business claims.

**Section Order**

1. Header/navigation.
2. Vendor-facing hero: restrained page purpose placeholder.
3. Buyer fit / who this is for.
4. Product line overview placeholder.
5. Documentation checklist.
6. Wholesale inquiry process.
7. Inquiry form.
8. Policy/support links.
9. Contact fallback.
10. Footer.

**CTA Hierarchy**

- Primary: Submit Wholesale Inquiry.
- Secondary: Request Product Information.
- Tertiary: View Public Products.

**Placeholder Copy Rules**

- Keep vendor language neutral, product-data driven, and restrained.
- Do not use customer emotional language or panic framing.
- Do not claim vendor acceptance, Amazon eligibility, marketplace safety, or payment-platform safety.
- Mark product claims and product descriptions `[REVIEW REQUIRED]`.
- Mark wholesale terms, pricing, MOQ, case packs, UPCs, and documentation `[OWNER DATA NEEDED]`.

**Claim-Sensitive Sections**

- Brand/product overview.
- Product line descriptions.
- Documentation completeness statements.
- Wholesale terms.
- Marketplace/vendor eligibility.
- Claims about customer demand, sales, margins, or support burden.

**Owner Data Needed**

- Product line data.
- SKU list.
- MSRP.
- Wholesale price.
- MOQ.
- Case packs.
- UPC/GTIN.
- Product images.
- Label files.
- Ingredients.
- Shipping terms.
- Damaged-goods/returns policy.
- Product liability insurance status.
- Vendor inquiry routing.
- Owner-approved buyer qualification fields.

## Cross-Page CTA Rules

- Customer pages should prioritize Product Categories, Product Guidance, and Contact Support.
- Vendor pages should prioritize Wholesale Inquiry and Product Information Request.
- Reviews should support navigation but not act as proof.
- Policy pages should reduce confusion, not sell.
- Product pages can point to the owner-confirmed Authorize.net checkout path after integration/configuration review confirms the intended flow.
- Optional comfort-oriented payment choices may be offered after review, but do not describe them as anonymous, private, processor-proof, refund-proof, or guaranteed.

## Cross-Page Placeholder Rules

- Use placeholders like "Product explanation placeholder [REVIEW REQUIRED]" instead of draft claims.
- Use `[OWNER DATA NEEDED]` for facts, policies, prices, product specs, support workflows, and system behavior.
- Do not write final slogans, hero headlines, product claims, FAQ answers, privacy promises, or guarantee language.
- Do not remove review markers until review is complete.

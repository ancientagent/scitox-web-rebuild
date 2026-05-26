# SciTOX Website Rebuild Brief

Source context:
- `docs/VENDOR_ROUTE_CONTEXT.md`
- `docs/SHARED_CHAT_CONTEXT.md`
- `docs/SHARED_CHAT_TRANSCRIPT_STRUCTURED.txt`

This brief translates the prior SciTOX website rebuild discussion into a working direction document. It is not final website copy and does not approve product, legal, marketplace, vendor, or advertising claims.

## Current Implementation Note

The custom app under `site/` is now the active implementation path, not only a future plan. Recent app work added the `/guidance` welcome fade and current-situation onboarding flow, the `/resources` Knowledge Center route, and a public UI cleanup that removes visible internal markers, scaffold labels, route-shell notes, and developer-facing planning text.

For current work:

- Keep `[REVIEW REQUIRED]` and `[OWNER DATA NEEDED]` markers in internal docs, source data, backend fallbacks, tests, QA reports, and owner-review workflows.
- Do not render those markers in public customer-facing UI.
- If a customer-facing section is not ready, use neutral reviewed copy, hide the incomplete item, or route the user to resources/support.
- Use `/resources` for information-first visitors who want to understand fit, boundaries, medication privacy/stigma context, official rights resources, and practical documentation before deciding.

## Project Goal

Rebuild the existing SciTOX website into a cleaner, more credible, vendor-ready web presence while preserving a customer-facing experience that feels private, serious, warm, direct, and competent.

The rebuild should support two connected but separate layers:

1. Public customer site: product guidance, routing, support, privacy, trust, policies, and restrained customer education.
2. Vendor/wholesale layer: product line structure, vendor inquiry path, documentation checklist, wholesale readiness, restrained claims, and buyer-facing organization.

The public site must be improved before vendor outreach because vendors, distributors, online retailers, payment reviewers, and partners may inspect the public customer site before taking the brand seriously.

## Target Audiences

Primary audiences:
- Vendors, wholesale buyers, smoke shops, head shops, distributors, online retailers, and partner reviewers.
- Direct customers who are stressed, privacy-sensitive, and looking for clear product guidance.

Secondary audiences:
- Payment, marketplace, ad-platform, and processor reviewers.
- The business owner and internal support operators.
- Future implementation, design, content, analytics, and automation agents.

## Primary Vendor-Readiness Goal

Make SciTOX look like an organized specialty product business that is ready for controlled vendor, wholesale, distributor, smoke shop, head shop, and online retailer review.

Vendor-readiness means the site should:
- Separate vendor-facing language from direct customer emotional language.
- Present product information in a structured, buyer-friendly format.
- Avoid aggressive or unsupported claims in vendor-facing material.
- Include a clear partner/wholesale inquiry path.
- Identify required business/product data before outreach.
- Show that the brand has a serious support, policy, and documentation posture.
- Avoid making vendor acceptance, marketplace approval, or Amazon eligibility claims.

## Customer-Site Emotional Goal

The public customer site should make visitors feel that they are in capable hands without creating panic, overpromising outcomes, or sounding like legal or medical advice.

The customer experience should feel:
- Private.
- Serious.
- Warm.
- Direct.
- Competent.
- Calm under pressure.
- Structured enough to guide the customer toward the right product or support path.

The customer site should not feel like:
- A panic sales page.
- A headshop gimmick.
- A spa or wellness brand.
- A medical provider.
- A legal advisor.
- A platform-risky drug-test workaround page.

Updated owner direction:
- Treat the customer-facing entry experience as a calm product guidance lobby.
- Assume many visitors arrive with outside context and do not need a dense first-screen explanation of the product category.
- Treat many visitors as already-aware prospects who need confirmation, product routing, and support access more than persuasion.
- Let common situations self-serve through reviewed product/category paths.
- Route nuanced, uncertain, or more sensitive situations to controlled product guidance or human follow-up.
- Make the company and product feel serious, organized, and competent without unnecessarily advertising or exposing the product category.
- For the demo and early build, claims risk should be judged mainly by whether language exposes or flags the product/category to vendors, platforms, payment reviewers, or risk systems.
- Do not use "prescribe," "counsel," "consultation," "encrypted," or autonomous purchasing claims in public copy until reviewed.

## Tone Rules

Use:
- Clear, restrained, plain language.
- Warm but serious guidance.
- Practical product-routing language.
- Privacy-aware language that does not overpromise.
- Confidence through organization, clarity, and support.
- Placeholder copy where final claims require review.

Avoid:
- "Guaranteed pass."
- Unsupported success rates.
- "Detox miracle."
- "Beat the system."
- "Medical-grade."
- Legal or medical advice.
- Fear-heavy urgency.
- Party/drug-culture tone.
- Competitor attack language.
- Fake certainty about tests, results, legality, platforms, or vendors.

Any claim-sensitive copy in internal docs, source data, QA reports, or review packets must be marked `[REVIEW REQUIRED]`.

Any missing business, product, pricing, support, or operating detail in internal planning or source data must be marked `[OWNER DATA NEEDED]`.

These markers are review infrastructure, not public customer-facing copy.

## Visual Style Direction

Overall direction:
- Clean, strong, confident, scientific.
- Black, green, and white as the core color direction.
- More masculine and technical than spa-like.
- Serious ecommerce structure, not decorative lifestyle branding.
- Trust through clarity, spacing, hierarchy, and organized information.

The visual system should include:
- Strong product-first page hierarchy.
- Mobile-first layouts.
- Clear CTAs without panic framing.
- Structured product cards and product detail sections.
- Calm support/contact pathways.
- Policy and privacy visibility.
- A visually distinct partner/wholesale layer.
- Placeholder sections for review-required claims and owner-needed data.

Do not rely on fake photography, fake badges, fake certifications, invented reviews, vendor logos, or platform logos.

## Site Constraints

General constraints:
- Do not write final website copy in this brief.
- Do not approve product claims.
- Do not invent proof, testing, reviews, sales numbers, traffic, margins, customer counts, vendor acceptance, Amazon eligibility, or legal conclusions.
- Keep Amazon conditional.
- Treat vendor readiness as the primary goal unless the owner changes direction.
- Build V1 around structure, clarity, internal review gates, inquiry flow, and owner-data placeholders.
- Build the public homepage as a guidance lobby, not a product-category explainer.
- Keep public pages free of internal markers, developer-facing scaffold copy, and visible route-shell notes.

Recommended V1 structure:
- Public customer homepage.
- Product category/product routing page.
- Product detail page template.
- Knowledge Center/resources page.
- FAQ/support page.
- Privacy/support/intake flow.
- Partner/wholesale inquiry page.
- Vendor documentation checklist or packet placeholder.
- Policies visible enough for customer and partner review.

Operational constraints:
- Build V1 as a simple custom app under `site/`, avoiding unnecessary custom complexity beyond the app shell, source-grounded guidance, intake routing, and reviewed checkout handoff.
- Keep checkout/payment migration outside V1 unless owner and payment review clear it.
- Build AI guidance only as a backend-source-grounded assistant with reviewed source material, structured outputs, and human escalation.
- Use controlled intake/product guidance language only after privacy, claim, and escalation rules are reviewed.
- Do not present unsupported channels, tools, autonomous purchase flows, or privacy/security systems as available in the demo.
- Show automation as flow design, routing, support escalation, and operational simplification unless the tool is verified.

## Claim-Sensitive Sections

These sections require `[REVIEW REQUIRED]` until substantiation, legal/compliance review, and owner approval are available:

- Drug-test, pass-result, or outcome language.
- Guarantee language.
- Refund language tied to product performance.
- Success-rate claims.
- "Most effective," "#1," "proven," "scientifically tested," or similar superiority/proof language.
- Substance-specific claims.
- Mechanism claims about how the product works.
- Before/after, testimonial, review, or customer-result claims.
- Competitor comparisons or attacks.
- Safety, ingredient, health, or side-effect claims.
- Privacy, confidentiality, encryption, or AI consultation claims.
- Vendor, wholesale, distributor, marketplace, Amazon, or payment acceptance claims.
- Any claim implying legal or medical advice.

Demo-specific claim lens:
- The most important demo risk is exposure. Avoid public copy that identifies, overexplains, or advertises the product/category in a way that could trigger vendor, platform, payment, or risk-review concerns.
- Product language can stay abstract, guided, and customer-support oriented where exact product detail is unnecessary for the flow.
- Still avoid privacy/security, legal/medical, AI, payment, vendor, and platform promises unless verified.

## Owner Data Needed

Business and operations:
- Current sales, order volume, and seasonality.
- Margins, COGS, shipping costs, refund rates, chargebacks, and dispute history.
- Current fulfillment process, inventory capacity, bottlenecks, and lead times.
- Customer support workload, call/text/email volume, and common questions.
- Return/refund policy and actual refund handling.

Website and analytics:
- Current platform access.
- GA4/Search Console/tag manager access if available.
- Traffic sources, conversion data, paid/ad history, and attribution data.
- Checkout/payment flow details.
- Current customer-service tools and support scripts.

Product and vendor readiness:
- SKU list.
- Product names and variants.
- Ingredients.
- Labels and packaging files.
- Product images.
- MSRP.
- Wholesale pricing.
- COGS by SKU.
- MOQ.
- Case packs.
- UPC/GTIN data.
- Shipping terms.
- Damaged-goods/returns policy for wholesale.
- Product liability insurance status.
- Vendor/wholesale attempts or prior conversations.
- Any existing line sheets, sell sheets, product docs, or pitch materials.

Claims and proof:
- Claim substantiation.
- Testing records.
- Batch records.
- Customer result documentation.
- Review/testimonial permissions.
- Prior legal review, if any.
- Any platform warnings, ad denials, marketplace denials, merchant account issues, freezes, or disputes.

## Legal/Compliance Review Items

Review is needed for:
- Claims substantiation and advertising language.
- FTC-style advertising and testimonial standards.
- FDA/cosmetic/drug boundary risk.
- Payment processor and high-risk merchant restrictions.
- Google/Meta ad-platform restrictions.
- Amazon and marketplace restricted-product risk.
- Vendor/wholesale buyer documentation requirements.
- Privacy policy, data retention, intake forms, and support workflows.
- Any AI/product guidance feature.
- Any "encrypted," "confidential," or "private consultation" language.
- Refund, guarantee, and results language.
- Terms, disclaimers, and support escalation rules.
- Any language that could be read as legal, medical, or drug-test circumvention advice.

The brief does not make legal conclusions. Items above are routing flags for review.

## What Must Not Be Included In V1

Do not include:
- Final claims language that has not been reviewed.
- "Guaranteed pass" or equivalent outcome promises.
- Unsupported success rates or customer-count claims.
- Fake trust badges, certifications, vendor logos, or partner logos.
- Claims of Amazon approval, vendor acceptance, marketplace eligibility, or payment-platform safety.
- "Encrypted AI consultations" unless the technical system and legal/privacy review support that exact claim.
- Open-ended AI chat that can generate risky product, legal, medical, or test-result advice.
- Legal advice, medical advice, or healthcare-provider framing.
- Competitor attack language.
- AI-generated proof language.
- Unverified testimonials or result screenshots.
- Unsupported privacy/security guarantees.
- Checkout/payment migration unless owner and payment review clear it.
- Unnecessary app complexity beyond the reviewed V1 custom-app scope.
- Anything that mixes the vendor-facing layer with the warmer customer emotional flow in a way that weakens either audience.

## V1 Success Standard

V1 is successful if it produces a clean, navigable, vendor-ready site structure with:
- Public customer pages that feel private, serious, warm, direct, and competent.
- A separate vendor/wholesale layer.
- Clear placeholders for missing owner data.
- Clear `[REVIEW REQUIRED]` markers for claim-sensitive sections.
- No invented proof, numbers, approvals, eligibility, legal conclusions, or claim support.
- A practical path from site cleanup to vendor-readiness packet to controlled outreach planning.

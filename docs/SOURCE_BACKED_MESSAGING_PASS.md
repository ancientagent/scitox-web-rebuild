# Source-Backed Messaging Pass

Current repo basis: `d200f54 docs: add owner review packet`

This document reviews captured SciTOX source material for owner-demo messaging direction. It is not final website copy, claim approval, payment approval, privacy/security approval, legal review, vendor acceptance, marketplace approval, or launch readiness.

Use all examples here as structure guidance only. Anything marked `[OWNER DATA NEEDED]` requires owner-provided facts or operating decisions. Anything marked `[REVIEW REQUIRED]` requires review before public use.

## Sources Reviewed

Primary source files reviewed:

- `docs/PUBLIC_SITE_MESSAGING_RULES.md`
- `docs/OWNER_REVIEW_PACKET.md`
- `docs/SOURCE_INDEX.md`
- `project_sources/live_public_site/home.txt`
- `project_sources/live_public_site/contact.txt`
- `project_sources/live_public_site/f-a-q-1.txt`
- `project_sources/live_public_site/how-it-works.txt`
- `project_sources/live_public_site/products.txt`
- `project_sources/live_public_site/reviews.txt`
- `project_sources/live_public_site/privacy-policy.txt`
- `project_sources/live_public_site/terms-and-conditions.txt`
- `project_sources/live_public_site/returns-_26-refunds.txt`

The captured public site contains useful customer-context signals, but it also contains many claims and tone patterns that should not move into V1 without review.

## Messaging Direction Confirmed By Sources

The current owner-demo direction is supported by source material in these ways:

- Visitors are likely looking for fast, situation-specific direction. Source pages repeatedly push phone/text contact, support, and product recommendation paths.
- The product choice depends on structured user context. Source material asks about timing, usage pattern, and hair details on the how-it-works page.
- The existing business has used support-heavy selling. Contact, FAQ, and homepage captures all point users toward phone/text/email support.
- The current site has policy surfaces for privacy, terms, returns, and refunds, but the content needs review before reuse.
- The current site uses review and proof modules as trust builders, but those are claim-sensitive and should not be used as proof without owner/source review.
- The current site has product categories and product-specific pages, but the public V1 should keep categories abstract until owner confirms exposure level.

## Safe For Placeholder Demo

These themes can support the current owner-review demo if kept generic, marked, and not presented as final copy.

| Source-backed theme | Evidence | Safe demo use |
| --- | --- | --- |
| Help-first contact route | Contact page asks "How can we help?" and captures name, email, phone, and source of discovery in `project_sources/live_public_site/contact.txt:55-64`. | Use a calm contact/support intake route. Keep destination and privacy language `[OWNER DATA NEEDED]` / `[REVIEW REQUIRED]`. |
| Call, text, email as support modes | Homepage includes "Click To Call, Text or Email" and contact details in `project_sources/live_public_site/home.txt:181-182`. | Demo can show human support as a route. Do not promise response time or availability. |
| Structured product guidance | How-it-works source asks for usage details, last-use timing, hair length, and color in `project_sources/live_public_site/how-it-works.txt:107-119`. | Keep guided questions structured and review-gated. Do not ask for broad sensitive narratives. |
| Step-by-step process framing | How-it-works uses "Step-by-Step Process" and step labels in `project_sources/live_public_site/how-it-works.txt:59-93`. | Use "structured path" or "step-by-step owner-reviewed instructions" as a placeholder concept. Do not include process claims or mechanism claims without review. |
| Product categories exist | Products source lists hair, urine, and saliva categories in `project_sources/live_public_site/products.txt:55-64`. | Keep public product routing abstract until owner confirms which categories can appear. |
| Policy surfaces exist | Terms, returns/refunds, and privacy captures show active policy areas in `project_sources/live_public_site/terms-and-conditions.txt:55-87`, `project_sources/live_public_site/returns-_26-refunds.txt:55-71`, and `project_sources/live_public_site/privacy-policy.txt:55-68`. | Keep policy shells in the demo. Rewrite and review before public use. |
| Support for questions and inquiries | Privacy source says data is used for replying to questions and inquiries in `project_sources/live_public_site/privacy-policy.txt:58-63`. | Demo can describe inquiry routing as a destination-needed operational path. Do not make privacy/security guarantees. |

Placeholder-safe working labels:

- `[PLACEHOLDER: guided product questions - REVIEW REQUIRED]`
- `[PLACEHOLDER: common product path - REVIEW REQUIRED]`
- `[PLACEHOLDER: human support route - OWNER DATA NEEDED]`
- `[PLACEHOLDER: policy review path - OWNER DATA NEEDED]`
- `[PLACEHOLDER: source-backed product routing - REVIEW REQUIRED]`

These labels are not final public copy.

## Needs Owner Review

These source-backed themes may be useful, but they need owner review before any visible public use.

| Theme | Evidence | Review need |
| --- | --- | --- |
| Human support availability | Contact page lists hours and says urgent matters may be accommodated in `project_sources/live_public_site/contact.txt:69-84`. | Owner must confirm current hours, channels, and support expectations. `[OWNER DATA NEEDED]` |
| Third-party review platforms | Reviews page references Yotpo and Trustpilot in `project_sources/live_public_site/reviews.txt:55-60`. | Review-source permission, current ratings, claim handling, and FTC/testimonial handling are required. `[REVIEW REQUIRED]` |
| Business/science background | Homepage references scientific/business experience and lab access in `project_sources/live_public_site/home.txt:80-99`. | Credentials, proof, titles, and claim boundaries need substantiation. `[OWNER DATA NEEDED]` `[REVIEW REQUIRED]` |
| Product-specific pathways | Homepage lists product names and substance classes in `project_sources/live_public_site/home.txt:100-107`. | Owner must decide public exposure level and vendor/payment risk. `[REVIEW REQUIRED]` |
| Product timing and instructions | FAQ/how-it-works include timing, protocol, and use details in `project_sources/live_public_site/f-a-q-1.txt:137-178` and `project_sources/live_public_site/how-it-works.txt:59-106`. | Directions, timing, warnings, and safety language need product and claims review. `[REVIEW REQUIRED]` |
| Privacy/SMS language | Privacy and terms pages include SMS opt-out and data-use clauses in `project_sources/live_public_site/privacy-policy.txt:55-68` and `project_sources/live_public_site/terms-and-conditions.txt:55-67`. | Current tools, consent wording, retention, security, and routing must be verified. `[OWNER DATA NEEDED]` `[REVIEW REQUIRED]` |
| Shipping/refund/damage handling | Returns source includes shipping and damaged-product handling in `project_sources/live_public_site/returns-_26-refunds.txt:55-71`. | Policy must be rewritten calmly and checked against actual payment/refund operations. `[OWNER DATA NEEDED]` `[REVIEW REQUIRED]` |

## Claim-Sensitive

These themes are source-backed, but they are not safe for public V1 copy without substantiation and review.

- "Scientifically formulated/tested/proven" and similar scientific authority language.
- "#1", "most effective", "highest rated", "best", "worldwide", or superiority claims.
- Success rates, pass rates, fail counts, or substance-specific outcome rates.
- Money-back guarantee, double-your-money-back, payout, fail reimbursement, or refund-condition language.
- "Permanent cleanse", "not a mask", "remove metabolites", "molecular level", "toxins destroyed", or mechanism-of-action claims.
- Claims about labs, testing methods, before/after results, screenshots, customer messages, official test outcomes, or proof galleries.
- Claims about Yotpo, Trustpilot, Reddit, AI summaries, or review integrity as proof of effectiveness.
- Competitor comparisons, competitor attacks, "scam" framing, and comparative success/failure claims.
- Legal/court/employer/customer-consequence framing.
- Health, safety, hair damage, pregnancy, side effects, medical, biological, or product-warning claims.
- Privacy/security statements such as secure storage, non-sharing, retention, opt-out timing, or data deletion unless verified.
- Support availability, immediate response, urgent handling, expert standing by, or personalized recommendation claims unless owner confirms the workflow.

## Should Not Be Reused In V1

Do not reuse these patterns in the owner-demo or public V1:

- Panic-heavy or fear-heavy copy.
- Aggressive all-caps claims.
- "Guaranteed pass", "pass any test", "works every time", or equivalent outcome promises.
- "Consultation" language where it could imply professional, legal, medical, or test-result advice.
- "Expert witness", court, custody, probation, employer, or legal-outcome framing.
- Future product claims unrelated to the current V1 customer path, including sexual health, birth control, herpes, nootropics, or euphoria claims from the FAQ source.
- Hacker/call-interception warnings from the current site unless owner confirms a current operational need and legal/security review approves wording.
- Profane, threatening, or punitive policy language from returns/refunds.
- Chargeback-threat language, collections threats, or credit-report threats without payment/legal review.
- AI-generated review summaries as public proof.
- Public product/category overexposure where it creates vendor, payment, ad, platform, or search-index risk.

## Text And Themes That Can Support The Current Direction

The owner-demo can safely lean into these source-backed concepts:

1. A visitor arrives needing help choosing the right product path. This is source-backed by the support and recommendation prompts, but public wording must remain general. `[REVIEW REQUIRED]`
2. The route should offer structured product questions instead of a broad chat or open-ended advice flow. This fits the how-it-works source prompts and the current app guidance scaffold. `[REVIEW REQUIRED]`
3. Human support should be visible as a fallback for nuanced or sensitive situations. The source repeatedly routes users to call/text/email. `[OWNER DATA NEEDED]`
4. Policies should be visible before launch, but they need a calm rewrite. The current policy sources contain operational details but also risky language. `[REVIEW REQUIRED]`
5. Reviews can eventually support buyer confidence, but only after source, permissions, current ratings, and claims handling are reviewed. `[OWNER DATA NEEDED]` `[REVIEW REQUIRED]`
6. Product categories and product records should stay structured, but public labels should remain abstract until owner confirms exposure level. `[OWNER DATA NEEDED]` `[REVIEW REQUIRED]`

## Demo Messaging Recommendations

Keep the current demo direction:

- Home should stay a calm routing lobby, not a dense product-explanation page.
- Product pages should show owner-needed product records, not final product claims.
- Guidance should stay structured, source-gated, and human-fallback-first.
- Support/contact should frame routing and intake, not advice, consultation, or guaranteed outcomes.
- Wholesale should stay separate, data-forward, and restrained.
- Policy pages should stay present but clearly marked as owner/review-needed.

Recommended placeholder concepts for future UI copy work:

- `[PLACEHOLDER: choose a product path or request human follow-up - REVIEW REQUIRED]`
- `[PLACEHOLDER: answer structured product questions using owner-reviewed source data - REVIEW REQUIRED]`
- `[PLACEHOLDER: support route for nuanced product questions - OWNER DATA NEEDED]`
- `[PLACEHOLDER: product facts pending owner review - OWNER DATA NEEDED]`
- `[PLACEHOLDER: reviewed policy details required before checkout - REVIEW REQUIRED]`

## Optional UI Update Decision

No app UI changes were made in this pass.

Reason: the source-backed phrases that are safe enough for the demo are already represented by the current app's placeholder structure. More specific wording from the source material either needs owner review, raises claim risk, exposes product/category details, or depends on missing owner data.

## Follow-Up Owner Questions

Owner review should answer:

- Which product/category labels can appear publicly in V1? `[OWNER DATA NEEDED]`
- Which support channels are active and approved for display? `[OWNER DATA NEEDED]`
- Which support hours, if any, can be shown? `[OWNER DATA NEEDED]`
- Should phone/text support be emphasized, or should the app route first through forms? `[REVIEW REQUIRED]`
- Which product-selection questions are necessary and safe to ask? `[REVIEW REQUIRED]`
- Which policy details are current, enforceable, and suitable for public wording? `[OWNER DATA NEEDED]` `[REVIEW REQUIRED]`
- Which review platforms, ratings, or testimonials can be used after permission and claim review? `[OWNER DATA NEEDED]` `[REVIEW REQUIRED]`
- Which product claims, if any, have substantiation ready for review? `[OWNER DATA NEEDED]` `[REVIEW REQUIRED]`

## Next Safe Implementation Slice

After owner review, the next safe implementation slice should be one of:

1. Add owner-approved support/contact destination configuration and delivery integration.
2. Add owner-reviewed product guidance source-base records with explicit approved/reviewed markers.
3. Replace policy placeholders with owner-provided policy drafts, keeping all claim-sensitive language marked for review.
4. Add a review-gated trust/reviews placeholder module that does not publish ratings, testimonials, or outcome claims until source and permission review are complete.

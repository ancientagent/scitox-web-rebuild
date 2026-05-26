# SciTOX Public Site Messaging Rules

Source context:
- `docs/VENDOR_ROUTE_CONTEXT.md`
- `docs/WEBSITE_REBUILD_BRIEF.md`
- `docs/SHARED_CHAT_CONTEXT.md`
- `docs/SHARED_CHAT_TRANSCRIPT_STRUCTURED.txt`

This document governs customer-facing messaging for the SciTOX public site. It is not final website copy and does not approve any product, legal, medical, privacy, vendor, marketplace, or advertising claim.

## Current Public UI Rule

Internal review markers remain required for source governance, backend fallbacks, tests, private docs, product data, and launch review work. They must not be rendered in public customer-facing UI.

Do not show these publicly:

- `[REVIEW REQUIRED]`
- `[OWNER DATA NEEDED]`
- scaffold, demo, route-shell, or placeholder labels
- internal implementation notes
- developer-facing descriptions such as "review-gated," "owner data," "source-backed," or "claim review" unless the page is explicitly an internal review/admin surface

When a public section depends on missing data or claim review, either:

- remove or hide the section,
- use neutral customer-facing boundaries,
- route to support or guidance, or
- keep the marker only in private data/docs/API payloads.

## Approved Tone Direction

The public customer site should feel:

- Private.
- Serious.
- Warm.
- Direct.
- Competent.
- Calm under pressure.
- Clear without being cold.
- Supportive without being soft or spa-like.
- Structured enough to help a stressed visitor choose the next step.

The visitor may be anxious, privacy-sensitive, and trying to make a fast decision. Messaging should lower confusion without increasing fear. The site should sound like a capable product team that understands urgency, not like a panic-driven sales page.

For the custom app rebuild, the site should not overexplain or advertise the product category when the visitor likely arrives with outside context. Many visitors may already trust the product because of word of mouth, reviews, or outside research. Trust should be validated through seriousness, discretion, organization, clear routing, and support availability.

Use:

- Plain, direct language.
- Short sections and clear next steps.
- Product guidance framing.
- Supportive but restrained reassurance.
- Internal review markers in source-controlled data and private docs where claims are not approved.
- Internal owner-data markers in source-controlled data and private docs where facts are missing.
- Abstract product-path labels where specific product/category exposure is unnecessary.
- Confirmation-oriented language for already-aware visitors.

## Banned Tone

Do not use:

- Panic-sales tone.
- Party/drug-culture tone.
- Headshop gimmick tone.
- Spa/wellness softness.
- Medical-provider tone.
- Legal-advisor tone.
- Fear-heavy urgency.
- Shame, judgment, or moralizing.
- Overconfident outcome promises.
- Aggressive competitor attacks.
- Fake scientific authority.
- Fake privacy/security certainty.
- Marketplace/platform certainty.
- Product-category exposure that creates avoidable vendor, payment, or platform risk.

The site should not imply: "we can solve any situation," "you are guaranteed safe," "this is medical/legal guidance," or "platforms/vendors have approved this."

## Banned Phrases

Do not use these phrases in customer-facing V1 copy:

- "Guaranteed pass"
- "Pass any test"
- "Beat the system"
- "Detox miracle"
- "Medical-grade"
- "Doctor-approved" unless verified and reviewed
- "Clinically proven" unless verified and reviewed
- "Scientifically proven" unless verified and reviewed
- "#1 most effective" unless verified and reviewed
- "99% success" or any unsupported success rate
- "Permanent cleanse" unless reviewed and substantiated
- "Undetectable"
- "Foolproof"
- "No risk"
- "Works every time"
- "Encrypted AI consultation" unless technically and legally verified
- "Confidential medical consultation"
- "Secure legal advice"
- "Private diagnosis"
- "Product prescription"
- "Personal counsel"
- "Immediate counsel"
- "AI counsel"
- "AI consultation"
- "Guaranteed privacy"
- "Amazon approved"
- "Vendor approved"
- "Marketplace safe"
- "Payment-platform safe"

If a concept is needed but risky, do not publish it as customer-facing copy. Keep the review marker in private source data/docs, or replace the public copy with a neutral boundary or support path.

## Claim-Sensitive Topics

Mark these topics `[REVIEW REQUIRED]` until substantiation, owner approval, and legal/compliance review are complete:

- Drug-test, pass-result, or outcome language.
- Guarantee or refund language tied to results.
- Success rates.
- Superiority claims.
- Scientific/proven/tested claims.
- Substance-specific claims.
- Mechanism-of-action claims.
- Safety, health, ingredient, side-effect, or biological claims.
- Customer result claims.
- Before/after claims.
- Testimonials and review sections.
- Competitor comparisons.
- Privacy, confidentiality, encryption, or data-security claims.
- AI consultation, private guidance, or intake claims.
- Any wording that could imply legal or medical advice.
- Any Amazon, vendor, marketplace, payment, ad-platform, or regulatory eligibility claim.
- Any third-party messaging, autonomous purchasing, or chat-based checkout claim.

Rule: for public UI, the first question is whether the language exposes or flags the product/category to vendors, platforms, payment reviewers, or risk systems. If yes, remove it, abstract it, or keep the review marker only in private source data/docs. Continue to mark privacy/security, legal/medical, AI, payment, vendor, platform, and outcome claims `[REVIEW REQUIRED]` or `[OWNER DATA NEEDED]` in internal governance materials.

## Privacy And Discretion Language Rules

Privacy language should be careful and operational, not absolute.

Allowed direction:

- Say the experience is designed to be discreet, private, or low-friction only if the actual site flow supports that.
- Explain what information is requested and why.
- Keep intake fields minimal.
- Refer to the privacy policy where appropriate.
- Use "privacy-aware" or "discreet support" as working language, with review where needed.

Avoid:

- Absolute privacy promises.
- Claims that data is encrypted unless the technical implementation is verified.
- Claims that a conversation is confidential unless the policy and workflow support it.
- Any implication that the site gives legal protection.
- Any implication that customer information is never stored unless verified.

Required internal markers:

- Use `[REVIEW REQUIRED]` for all privacy/security promises.
- Use `[OWNER DATA NEEDED]` where data retention, tools, CRM, chat, form routing, or support workflow is unknown.

Public UI handling:

- Do not render those markers to customers.
- If privacy/security details are unknown, use restrained language such as "review the privacy page" or "share only what is needed," and avoid stronger privacy/security claims.

## Support And Intake Language Rules

Support and intake language should guide the visitor without overcollecting sensitive information or implying professional advice.

Use:

- "Product guidance"
- "Product questions"
- "Support"
- "Guided product questions"
- "Common product path"
- "Private product guidance" after privacy review
- "Confidential product intake" only after privacy/policy review
- "Tell us what you need help choosing" as a placeholder concept
- "A support team member can review your question" if true

Avoid:

- "Medical consultation"
- "Legal advice"
- "Diagnosis"
- "Prescription"
- "Prescribe"
- "Counsel"
- "Consultation" when it could imply professional advice
- "Case evaluation"
- "We know what will work for your test"
- "Tell us everything about your situation" as broad collection
- Intake questions that collect more sensitive data than needed

Support/intake should:

- Ask structured questions only.
- Route sensitive or uncertain cases to human support.
- Avoid legal, medical, or test-result advice.
- Avoid high-risk claims.
- Minimize personal data.
- Make escalation paths clear.

## AI And Private Consultation Wording Rules

Do not launch or describe open-ended AI chat as a V1 promise. A live guidance assistant may be used only if it is backend-source-grounded, tested, policy-reviewed, and approved.

Do not use:

- "Encrypted AI consultation"
- "AI medical consultation"
- "AI legal guidance"
- "AI counsel"
- "AI consultation"
- "Private diagnosis"
- "Secure legal advice"
- "Confidential AI expert"

Safer internal working labels:

- "Private Product Guidance" `[REVIEW REQUIRED]`
- "Confidential Product Intake" `[REVIEW REQUIRED]`
- "Guided Product Questions" `[REVIEW REQUIRED]`
- "Product Support Intake" `[REVIEW REQUIRED]`
- "AI-assisted product guidance" `[REVIEW REQUIRED]`
- "Source-grounded product assistant" `[REVIEW REQUIRED]`
- "Guided product support" `[REVIEW REQUIRED]`

Rules:

- AI/product guidance must be backend-source-grounded and controlled, not free-form.
- It should ask structured questions only.
- It should provide only approved product guidance.
- It should retrieve from owner-approved source information, not general internet knowledge.
- It must return a product path only when approved source data supports the path.
- It must avoid legal or medical advice.
- It must route sensitive, uncertain, or high-risk cases to human support.
- It must not claim encryption, confidentiality, or special privacy unless technically and legally verified.
- It must not produce final claims, guarantees, or outcome promises.
- It must not support autonomous purchase flow unless payment, privacy, platform, and compliance review approve the exact workflow.

## Testimonial And Review Handling Rules

Reviews may be useful for trust, but they must not be treated as proof.

Rules:

- Do not invent reviews, counts, ratings, names, outcomes, screenshots, or customer stories.
- Do not treat testimonials as claim substantiation.
- Do not use reviews to imply guaranteed or typical results.
- Do not highlight pass-result claims without review.
- Do not use review snippets as proof of product effectiveness.
- Do not use AI-generated review summaries as proof.
- Mark review/result sections `[REVIEW REQUIRED]`.
- Mark missing permission, source, rating, date, or platform data `[OWNER DATA NEEDED]`.

Safer handling:

- Use neutral review-section placeholders.
- Separate customer experience from product outcome claims.
- Use review cards only after source, permission, and claim review.
- Avoid cherry-picked extreme outcomes in V1.

## Draft Phrasing Rules

The older placeholder examples below are not approved final copy. In public UI, remove bracketed review/owner markers and use only customer-facing wording that stays within reviewed boundaries.

For internal docs and data, continue using `[REVIEW REQUIRED]` and `[OWNER DATA NEEDED]` to preserve launch gates.

## Placeholder-Safe Phrasing Examples

These are structure-safe examples for internal planning, not final public copy.

Hero/support framing:

- "Private product guidance for time-sensitive situations. [REVIEW REQUIRED]"
- "Clear steps, discreet support, and product information in one place. [REVIEW REQUIRED]"
- "Find the product path that fits your situation. [REVIEW REQUIRED]"
- "You may already know why you are here. Start with the path that fits. [REVIEW REQUIRED]"
- "Choose a path, ask a question, or request follow-up. [REVIEW REQUIRED]"

Product routing:

- "Answer a few product questions to narrow the options. [REVIEW REQUIRED]"
- "Choose the product category you need help with. [REVIEW REQUIRED]"
- "Compare available product options. [OWNER DATA NEEDED]"
- "Choose the path that best matches your situation. [REVIEW REQUIRED]"
- "Use a common path, or request support if your situation is more specific. [REVIEW REQUIRED]"

Privacy/discretion:

- "This form is designed to ask only for the information needed to route your question. [REVIEW REQUIRED]"
- "Privacy and data handling details should link here. [OWNER DATA NEEDED]"
- "Discreet support path placeholder. [REVIEW REQUIRED]"

Support/intake:

- "Send a product question and support will follow up. [OWNER DATA NEEDED]"
- "For uncertain situations, route to human support. [REVIEW REQUIRED]"
- "Product guidance form placeholder. [REVIEW REQUIRED]"
- "Source-grounded product guidance assistant placeholder. [REVIEW REQUIRED]"
- "Assistant result should cite approved source IDs internally. [REVIEW REQUIRED]"

Claims/proof sections:

- "Claim-sensitive product explanation goes here after review. [REVIEW REQUIRED]"
- "Evidence or substantiation summary placeholder. [OWNER DATA NEEDED] [REVIEW REQUIRED]"
- "Customer experience section placeholder. [REVIEW REQUIRED]"

Testimonials/reviews:

- "Verified review module placeholder. [OWNER DATA NEEDED] [REVIEW REQUIRED]"
- "Customer experience quote pending source and permission review. [OWNER DATA NEEDED]"
- "Review summary must avoid outcome guarantees. [REVIEW REQUIRED]"

FAQ:

- "Product use question placeholder. [REVIEW REQUIRED]"
- "Shipping/support answer placeholder. [OWNER DATA NEEDED]"
- "Privacy and intake answer placeholder. [OWNER DATA NEEDED] [REVIEW REQUIRED]"

## Working Rule For Future Copy Agents

Future copy agents may propose draft section structures and placeholder wording only. They must not convert placeholders into final claims until owner data, substantiation, technical privacy details, and legal/compliance review are available.

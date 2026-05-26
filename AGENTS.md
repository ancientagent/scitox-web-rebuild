# SciTOX Project Instructions

This repository is the private SciTOX website rebuild, vendor-readiness, custom-app implementation, and optional Webflow/reference handoff workspace.

## Authority Order

1. Current files in this repository.
2. `docs/CONTINUE_HERE.md`.
3. Current SciTOX planning briefs in `docs/`.
4. Captured source evidence in `project_sources/`.
5. Generated workbooks and deliverables in `outputs/`.

Do not import instructions or assumptions from GISTer or any other project.

## Startup

1. Confirm the active repository path and Git status before making repo-status claims.
2. Read `docs/CONTINUE_HERE.md` before strategy, custom-app, Webflow/reference, vendor, payment, guidance-assistant, or claim-sensitive work.
3. Use `docs/SOURCE_INDEX.md` and `project_sources/` when source evidence matters.

## Core Rules

- Do not write final website copy unless explicitly asked.
- Do not invent owner data, product data, sales numbers, traffic, margins, proof, testing, certifications, reviews, vendor relationships, Amazon eligibility, platform approval, legal conclusions, or claims support.
- Mark uncertain claims or claim-sensitive language as `[REVIEW REQUIRED]`.
- Mark missing business, product, policy, pricing, or fulfillment information as `[OWNER DATA NEEDED]`.
- Keep `[REVIEW REQUIRED]` and `[OWNER DATA NEEDED]` markers in internal docs, source data, backend fallbacks, tests, and review workflows. Do not render those markers in public customer-facing UI unless the owner explicitly asks for an internal/admin review surface.
- Treat vendor readiness as the primary rebuild goal unless the owner explicitly changes direction.
- For demo and early site structure, the main claim risk is exposure: avoid public language that identifies, overexplains, advertises, or flags the product/category in a way that creates vendor, platform, payment, or risk-review problems.
- Keep the public customer site private, serious, warm, direct, and competent.
- Keep public customer pages and vendor/wholesale surfaces distinct.

## Custom App Build Rules

- Build lean V1 pages first.
- Use placeholders where owner data or review is missing.
- Keep claim-sensitive sections out of final publish until reviewed.
- Treat the custom app under `site/` as the primary implementation path unless the owner explicitly changes direction.
- Treat Webflow, Claude Design, and similar tools as optional prototype, design-reference, CMS-reference, or handoff aids unless explicitly assigned as the production platform.
- Run the QA checklist in `docs/CUSTOM_APP_QA_CHECKLIST.md` before launch. Use `docs/WEBFLOW_QA_CHECKLIST.md` only when reviewing an actual Webflow build or legacy Webflow reference.
- Do not imply guaranteed results, test outcomes, scientific proof, privacy/security protections, vendor acceptance, or platform eligibility without review and source evidence.
- The demo may show systems and flows conceptually, but must not present risky channels, unsupported automation, autonomous purchasing, or privacy/security guarantees as already available.
- The product guidance assistant is now a live V1 target, but it must be backend-source-grounded, review-gated, and routed to human support when approved source data does not support a recommendation. Do not build or describe it as open-ended frontend AI, consultation, counsel, prescription, legal advice, medical advice, test-result advice, or encrypted AI.
- Do not put LLM, payment, CRM, analytics, or provider secrets in frontend code.
- Use explicit reasoning settings in agent packets: `high` for implementation and backend work, `xhigh` for payment, privacy/security, claims, source-grounded recommendations, and launch-blocker review.
- Current owner-confirmed payment processor/gateway is Authorize.net as of May 12, 2026. Treat this as owner data for planning, not as proof that every payment method, integration setting, merchant-account term, refund process, or risk review is complete.
- Crypto, stablecoin, or fiat-to-crypto onramp checkout may be prioritized for research, but must remain review-gated and must not be treated as approved, anonymous, frictionless, refund-proof, chargeback-proof, processor-proof, or legally/commercially safe without provider and owner review.

## Repo Hygiene

- Keep source captures under `project_sources/`.
- Keep generated deliverables under `outputs/`.
- Keep reusable scripts under `scripts/`.
- Keep strategy, handoff, and QA documents under `docs/`.
- Do not commit dependencies, local environment files, or exported staging folders.

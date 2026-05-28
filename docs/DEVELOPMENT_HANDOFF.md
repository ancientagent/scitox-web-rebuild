# Development Handoff

This repository is prepared as the working source of truth for the SciTOX custom-app rebuild and vendor-readiness project. Webflow materials remain available as legacy/reference support, but the primary implementation path is now a custom app under `site/`.

## Primary Goal

Prepare a lean, vendor-ready SciTOX custom app that supports customer trust, source-grounded product guidance, Authorize.net checkout handoff, and wholesale/vendor outreach without publishing unsupported claims.

## Current App State

The primary implementation surface is now the `site/` Next.js app, not a future placeholder.

Recent verified implementation:

- `b9a99d2 feat: add staged guidance entry flow`
- `207cb2e feat: build knowledge center resource page`
- `e55592f fix: remove public developer-facing copy`

Current public UX:

- `/guidance` begins with a full-screen "Welcome to SciTOX." fade-in, fades out, then hands off to the current-situation question.
- The onboarding question remains fixed: "Which of the following statements best represents your current situation?"
- First-time visitors can choose either:
  - information-first path -> `/resources`
  - next-step path -> product guidance/private-session questions
- Active or returning clients are routed toward support-oriented paths.
- `/resources` is the Help / Resources destination for the FAQ, medication privacy, workplace stigma, ADHD/prescribed-medication context, ADA/HIPAA official resources, mandated-screening boundaries, documentation guidance, and responsible next steps.
- `/support` is a narrower follow-up path for order questions, returning clients, and product questions that still need a person after Help / Resources or product guidance.
- Public UI copy has been cleaned so internal review markers, owner-data markers, demo/scaffold labels, and developer-facing planning copy are not visible.
- Internal source data, API fallback states, tests, and private docs still preserve review gates. Do not remove those internal markers unless replacing them with another internal governance mechanism.

## First Files To Read

1. `docs/CONTINUE_HERE.md`
2. `docs/CUSTOM_APP_BUILD_BRIEF.md`
3. `docs/CUSTOM_APP_AGENT_PROMPTS.md`
4. `docs/CUSTOM_APP_DEVELOPMENT_BACKLOG.md`
5. `docs/CUSTOM_APP_QA_CHECKLIST.md`
6. `docs/CUSTOM_APP_SOURCE_MATRIX.md`
7. `docs/CUSTOM_APP_REPO_STRUCTURE.md`
8. `docs/plans/2026-05-12-custom-app-v1.md`
9. `docs/VENDOR_ROUTE_CONTEXT.md`
10. `docs/WEBSITE_REBUILD_BRIEF.md`
11. `docs/VENDOR_READY_STRATEGY_BRIEF.md`
12. `docs/CUSTOMER_GUIDANCE_LOBBY_DIRECTION.md`
13. `docs/SECURE_SUPPORT_CHECKOUT_OPTIONS.md`
14. `docs/LLM_PRODUCT_GUIDANCE_ASSISTANT_PLAN.md`
15. `docs/PUBLIC_SITE_MESSAGING_RULES.md`
16. `docs/VENDOR_READY_SITEMAP.md`
17. `docs/PAGE_BY_PAGE_WIREFRAME_PLAN.md`

## Directory Map

| Path | Purpose |
| --- | --- |
| `docs/` | Strategy briefs, messaging rules, sitemap, wireframe plan, QA checklist, handoff docs. |
| `demo/` | Legacy owner-review prototype showing the customer lobby, guidance flow, live backend guidance check, secure support/checkout concept, vendor layer, and owner systems. Keep as reference only unless the owner asks to revisit it. |
| `guidance/` | Source-base template for the backend-source-grounded product guidance assistant. |
| `site/` | Active custom Next.js app implementation surface. |
| `outputs/` | Generated workbooks, templates, audit outputs, and preview images. |
| `project_sources/` | Captured shared-chat context, current-site extracts, crawled pages, and external source archives. |
| `assets/` | Captured/reference assets from the current site and shared source material. |
| `scripts/` | Rebuildable artifact-generation scripts. |
| `.github/` | GitHub issue and pull request templates. |

## V1 Build Order

1. Confirm owner data needed for products, pricing, policies, wholesale terms, shipping, returns, and support process.
2. Resolve or remove launch-blocking claims from the current site.
3. Continue iterating inside the existing `site/` app.
4. Preserve the current `/guidance` sequence: welcome fade first, then the current-situation question.
5. Keep `/resources` as the information-first Help / Resources and FAQ destination from onboarding.
6. Keep `/support` focused on follow-up support after resources or guidance are not enough.
7. Keep public UI free of internal review/developer markers while preserving internal source/data review gates.
8. Continue refining lean public customer pages from `docs/VENDOR_READY_SITEMAP.md`.
9. Build Partner / Wholesale Inquiry as the primary vendor-facing conversion surface.
10. Prepare product data and line-sheet assets from `outputs/`.
11. Add Authorize.net checkout handoff only after owner/payment review confirms the exact workflow.
12. Run `docs/CUSTOM_APP_QA_CHECKLIST.md` before publishing.

## Required Gates

- Owner data review.
- Claim-sensitive language review.
- Legal/compliance review for claims, testimonials, refund/guarantee language, privacy/security language, and intake flow.
- Custom app mobile and desktop QA.
- Form routing and notification QA.
- Policy link QA.
- Analytics and Search Console QA.
- Explicit reasoning settings in agent/task packets, especially `high` for implementation and `xhigh` for payment, privacy/security, claims, source-grounded guidance, and launch-blocker review.

## Do Not Include In V1

- Unsupported result claims.
- Success rates.
- Final testimonial proof framing.
- Vendor acceptance claims.
- Amazon eligibility or approval claims.
- Legal, medical, or testing advice.
- Privacy/security promises that are not technically verified.
- Open-ended AI/private consultation claims without review.
- Frontend-only AI that exposes model credentials or recommends products without approved backend source data.
- Customer-facing "prescribe," "counsel," or "consultation" framing without legal/compliance review.
- Third-party autonomous chat or purchasing flows without privacy, payment, and platform review.
- Frontend payment or LLM secrets.
- Payment flow claims beyond owner-confirmed Authorize.net planning data.

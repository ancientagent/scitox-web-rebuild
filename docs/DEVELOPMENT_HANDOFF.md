# Development Handoff

This repository is prepared as the working source of truth for the SciTOX Webflow rebuild and vendor-readiness project.

## Primary Goal

Prepare a lean, vendor-ready SciTOX website rebuild that supports customer trust and wholesale/vendor outreach without publishing unsupported claims.

## First Files To Read

1. `docs/CONTINUE_HERE.md`
2. `docs/VENDOR_ROUTE_CONTEXT.md`
3. `docs/WEBSITE_REBUILD_BRIEF.md`
4. `docs/VENDOR_READY_STRATEGY_BRIEF.md`
5. `docs/CUSTOMER_GUIDANCE_LOBBY_DIRECTION.md`
6. `docs/SECURE_SUPPORT_CHECKOUT_OPTIONS.md`
7. `docs/AGENT_SERVICE_BUILD_PROMPTS.md`
8. `docs/PUBLIC_SITE_MESSAGING_RULES.md`
9. `docs/VENDOR_READY_SITEMAP.md`
10. `docs/PAGE_BY_PAGE_WIREFRAME_PLAN.md`
11. `docs/WEBFLOW_QA_CHECKLIST.md`

## Directory Map

| Path | Purpose |
| --- | --- |
| `docs/` | Strategy briefs, messaging rules, sitemap, wireframe plan, QA checklist, handoff docs. |
| `demo/` | Static owner-review prototype showing the customer lobby, guidance flow, secure support/checkout concept, vendor layer, and owner systems. |
| `outputs/` | Generated workbooks, templates, audit outputs, and preview images. |
| `project_sources/` | Captured shared-chat context, current-site extracts, crawled pages, and external source archives. |
| `assets/` | Captured/reference assets from the current site and shared source material. |
| `scripts/` | Rebuildable artifact-generation scripts. |
| `.github/` | GitHub issue and pull request templates. |

## V1 Build Order

1. Confirm owner data needed for products, pricing, policies, wholesale terms, shipping, returns, and support process.
2. Resolve or remove launch-blocking claims from the current site.
3. Define the customer guidance lobby and controlled product-routing flow from `docs/CUSTOMER_GUIDANCE_LOBBY_DIRECTION.md`.
4. Use `docs/AGENT_SERVICE_BUILD_PROMPTS.md` to split Webflow, automation, secure support/checkout, vendor, data, messaging, and QA work.
5. Build lean public customer pages from `docs/VENDOR_READY_SITEMAP.md`.
6. Build Partner / Wholesale Inquiry as the primary vendor-facing conversion surface.
7. Prepare product data and line-sheet assets from `outputs/`.
8. Run `docs/WEBFLOW_QA_CHECKLIST.md` before publishing.

## Required Gates

- Owner data review.
- Claim-sensitive language review.
- Legal/compliance review for claims, testimonials, refund/guarantee language, privacy/security language, and intake flow.
- Webflow mobile and desktop QA.
- Form routing and notification QA.
- Policy link QA.
- Analytics and Search Console QA.

## Do Not Include In V1

- Unsupported result claims.
- Success rates.
- Final testimonial proof framing.
- Vendor acceptance claims.
- Amazon eligibility or approval claims.
- Legal, medical, or testing advice.
- Privacy/security promises that are not technically verified.
- Open-ended AI/private consultation claims without review.
- Customer-facing "prescribe," "counsel," or "consultation" framing without legal/compliance review.
- Third-party autonomous chat or purchasing flows without privacy, payment, and platform review.

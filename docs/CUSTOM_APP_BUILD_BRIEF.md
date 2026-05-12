# SciTOX Custom App Build Brief

This brief updates the build direction for the SciTOX rebuild. It keeps the existing vendor-readiness and customer-guidance strategy, but moves the primary implementation path from a Webflow-first site to a source-controlled custom app.

This is not final website copy. It does not approve product claims, payment approval, privacy/security claims, legal conclusions, vendor acceptance, marketplace eligibility, or product recommendations.

## Decision

Build the V1 SciTOX experience as a custom app, with Webflow, Claude Design, or other visual tools used only as prototype, design-reference, or optional CMS/reference layers.

Recommended primary stack:
- Next.js app under `site/`.
- Server-side API routes for product guidance, intake, checkout handoff, and vendor inquiry.
- Source-controlled product and guidance data.
- Authorize.net hosted checkout path once owner/payment details are confirmed.
- Future CRM/helpdesk and analytics integrations behind reviewed server-side routes.

## Why This Pivot

The project now needs more than a static marketing site:
- Live backend-source-grounded product guidance.
- Review-gated product routing.
- Controlled intake and human escalation.
- Payment handoff through owner-confirmed Authorize.net.
- Vendor/wholesale inquiry handling.
- Strict separation between public customer guidance and vendor-facing credibility.
- Source-controlled claims, owner-data gaps, and sensitive language markers.

Webflow can still help with visual exploration, landing page references, or optional content editing, but it is not the safest primary system for live guidance, payment routing, source governance, and backend-sensitive logic.

## V1 Project Goal

Create an explorable, buildable, vendor-ready SciTOX web app that shows:
- A calm customer lobby for already-aware visitors.
- Common product-routing paths without overexposing the product/category.
- Backend-source-grounded product guidance with safe fallback.
- Clear support and human callback routing.
- Authorize.net as the planned primary checkout path, without implying every payment setting is approved.
- A separate partner/wholesale inquiry layer.
- Owner-data and review gates where facts are missing.

## V1 Experience Principles

Public customer site:
- Private, serious, warm, direct, and competent.
- Guidance-oriented, not hype-oriented.
- Built for already-aware visitors who need routing, confirmation, support, or purchase direction.
- Minimal public product/category exposition unless owner and review gates approve the detail.

Vendor layer:
- Organized, restrained, and data-forward.
- Separate from customer-emotional content.
- Focused on documentation readiness, product data, line sheet needs, wholesale inquiry, and credibility.
- No vendor acceptance, marketplace eligibility, or approval claims.

Operations layer:
- Reduce owner workload by routing common situations.
- Escalate unclear or sensitive cases to human support.
- Keep source data, claims, and owner gaps visible to future agents.
- Avoid frontend-only AI, frontend secrets, unsupported autonomous purchase promises, or privacy/security overclaims.

## Primary Architecture

V1 should use a simple app architecture:

1. `site/` Next.js application.
2. UI routes for homepage, product category, product detail, product guidance, FAQ/support, shipping/returns, contact, and partner/wholesale inquiry.
3. API route for product guidance that loads approved source data on the server.
4. API route or server action for inquiry submission.
5. API route for Authorize.net Accept Hosted token/session creation after owner/payment review.
6. Data files or a lightweight CMS/data layer for products, claims markers, policy placeholders, and vendor fields.
7. Deployment environment variables for secrets and provider configuration.

## Build Tool Positioning

Use these tools according to their strengths:

| Tool | Role | Boundary |
| --- | --- | --- |
| Codex App | Primary repo implementation, planning, QA, and review agent. | Must follow `AGENTS.md`, review gates, and source-controlled docs. |
| Codex CLI | Repeatable implementation and verification in the local repo. | Use exact repo paths and reasoning settings from prompt packets. |
| Claude Design | Visual exploration, component/style references, owner-review mockups. | Do not treat generated copy, claims, code, or product facts as approved. |
| Abacus AI / Deep Agent | Research, analysis, structured extraction, or parallel planning. | Must use source docs and return review markers; no final claims. |
| Webflow | Optional visual prototype, static page reference, or possible CMS/export reference. | Not primary for backend guidance, secrets, checkout control, or review-gated source logic. |

## Reasoning Settings

Future task packets should include reasoning effort so agents do not underthink risky work.

| Task Type | Recommended Reasoning | Why |
| --- | --- | --- |
| Repo status, file inventory, formatting-only edits | `low` or `medium` | Low risk when source files are explicit. |
| Documentation cleanup or prompt packet updates | `medium` | Requires consistency but not deep code inference. |
| UI implementation from existing plan | `medium` or `high` | Needs design judgment and responsive behavior checks. |
| Next.js/API implementation | `high` | Requires routing, secrets, validation, and test coverage. |
| Product guidance assistant, source grounding, safety routing | `high` or `xhigh` | Claim-sensitive and user-facing. |
| Payment, Authorize.net, privacy, security, data retention | `xhigh` | High-risk integration and review-sensitive language. |
| Claims, legal/compliance-adjacent review, vendor/platform risk | `xhigh` | Must avoid invented conclusions and unsafe approvals. |
| QA and launch-blocker review | `high` | Needs evidence-based verification and careful blocker separation. |

Use the best available coding model for implementation tasks. If a tool exposes a reasoning parameter, set it explicitly rather than relying on defaults for claim-sensitive, payment, privacy, or source-grounded assistant work.

## Non-Goals For V1

Do not build or present:
- Final website copy.
- Unsupported result, pass, guarantee, proof, success-rate, privacy, vendor, Amazon, or payment-platform claims.
- Open-ended AI chat.
- Legal, medical, diagnostic, test-result, or "prescription" advice.
- Frontend-only LLM calls or exposed model credentials.
- Encrypted AI claims unless the exact system and policy review support them.
- Autonomous purchasing or crypto checkout as approved unless the provider, owner, payment, and legal/compliance review gates clear the exact workflow.
- Vendor logos, trust badges, certifications, testimonials, or platform badges without owner-confirmed proof and review.

## Owner Data Needed

- Product list, SKUs, categories, sizes, ingredients, labels, images, instructions, warnings, and product mapping rules.
- Prices, MSRP, wholesale price, MOQ, case pack, UPC/GTIN, shipping rules, stock status, and fulfillment rules.
- Authorize.net account configuration, merchant-account terms, Accept Hosted requirements, payment methods enabled, fraud/dispute/refund settings, and sandbox/live credentials.
- Support process, callback process, response expectations, CRM/helpdesk destination, and data retention rules.
- Policy language for privacy, terms, shipping, returns, guarantee, and wholesale terms.
- Claims support, testing/proof records, review/testimonial permissions, and prior platform/payment warnings or restrictions.

## Review Gates

Require review before public launch:
- Claims and product explanation language.
- Product guidance source base and routing rules.
- Privacy/security wording and intake fields.
- LLM provider processing terms, logging, and retention.
- Authorize.net checkout flow, refunds, disputes, fraud settings, and policy language.
- Optional crypto/onramp or alternate payment flows.
- Vendor/wholesale claims and line sheet fields.
- Analytics/Search Console events to ensure sensitive data is not sent to tracking tools.


# SciTOX Web Rebuild

Private working repository for the SciTOX website rebuild, vendor-readiness plan, custom-app implementation package, optional Webflow/reference handoff, source audit, and claim-sensitive review materials.

Start with:

- `AGENTS.md`
- `docs/CONTINUE_HERE.md`
- `docs/DEVELOPMENT_HANDOFF.md`
- `docs/CUSTOM_APP_BUILD_BRIEF.md`
- `docs/CUSTOM_APP_AGENT_PROMPTS.md`
- `docs/CUSTOM_APP_DEVELOPMENT_BACKLOG.md`
- `docs/CUSTOM_APP_QA_CHECKLIST.md`
- `docs/CUSTOM_APP_SOURCE_MATRIX.md`
- `docs/CUSTOM_APP_REPO_STRUCTURE.md`
- `docs/plans/2026-05-12-custom-app-v1.md`
- `docs/VENDOR_ROUTE_CONTEXT.md`
- `docs/WEBSITE_REBUILD_BRIEF.md`
- `docs/VENDOR_READY_STRATEGY_BRIEF.md`
- `docs/CUSTOMER_GUIDANCE_LOBBY_DIRECTION.md`
- `docs/SECURE_SUPPORT_CHECKOUT_OPTIONS.md`
- `docs/LLM_PRODUCT_GUIDANCE_ASSISTANT_PLAN.md`
- `docs/AGENT_SERVICE_BUILD_PROMPTS.md`
- `docs/PUBLIC_SITE_MESSAGING_RULES.md`
- `docs/VENDOR_READY_SITEMAP.md`
- `docs/PAGE_BY_PAGE_WIREFRAME_PLAN.md`
- `docs/WEBFLOW_DEVELOPMENT_BACKLOG.md` (legacy/reference unless Webflow is explicitly selected)
- `docs/WEBFLOW_QA_CHECKLIST.md` (legacy/reference unless reviewing an actual Webflow build)
- `docs/SHARED_CHAT_CONTEXT.md`
- `docs/SOURCE_INDEX.md`

Generated workbooks and development deliverables are in:

- `outputs/`

Raw captures and downloads are in:

- `project_sources/`
- `project_sources/external_pages/`
- `assets/chatgpt_share/`

Reusable artifact scripts are in:

- `scripts/`

The legacy explorable owner-review demo is in:

- `demo/index.html`

The active custom app lives in:

- `site/`

Current app state:

- `/guidance` starts with a brief "Welcome to SciTOX." fade-in, then asks the current-situation question before first-time/returning visitor onboarding.
- `/resources` is the customer-facing Knowledge Center for first-time visitors who want information before continuing.
- Public UI must not show internal markers such as `[REVIEW REQUIRED]`, `[OWNER DATA NEEDED]`, scaffold/demo labels, or developer-facing planning copy.
- Internal data, backend fallback responses, tests, and private docs may still use review/owner markers to preserve launch gates.

Important boundaries:

- This repository is private by default.
- Do not invent owner data, product data, proof, vendor acceptance, Amazon eligibility, legal conclusions, reviews, or claims support.
- Mark claim-sensitive language as `[REVIEW REQUIRED]`.
- Mark missing owner/business/product data as `[OWNER DATA NEEDED]`.
- Keep those markers out of public customer-facing UI unless the owner explicitly asks for an internal review surface.
- Do not publish final customer-facing copy from this repo until owner and review gates are complete.
- Use explicit reasoning settings in prompt packets: `high` for implementation/backend work and `xhigh` for payment, privacy/security, claims, source-grounded recommendations, and launch-blocker review.

## Script Entry Points

Run scripts from the repository root after dependencies are available:

- `npm run build:claims-inventory`
- `npm run build:public-site-extraction`
- `npm run verify:public-site-extraction`
- `npm run build:risky-claims-cleanup`
- `npm run build:product-data`
- `npm run build:buyer-outreach`
- `npm run build:line-sheet`
- `npm run serve:demo`
- `npm run serve:guidance-assistant`

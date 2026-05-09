# SciTOX Web Rebuild

Private working repository for the SciTOX website rebuild, vendor-readiness plan, Webflow handoff, source audit, and claim-sensitive review materials.

Start with:

- `AGENTS.md`
- `docs/CONTINUE_HERE.md`
- `docs/DEVELOPMENT_HANDOFF.md`
- `docs/VENDOR_ROUTE_CONTEXT.md`
- `docs/WEBSITE_REBUILD_BRIEF.md`
- `docs/VENDOR_READY_STRATEGY_BRIEF.md`
- `docs/PUBLIC_SITE_MESSAGING_RULES.md`
- `docs/VENDOR_READY_SITEMAP.md`
- `docs/PAGE_BY_PAGE_WIREFRAME_PLAN.md`
- `docs/WEBFLOW_DEVELOPMENT_BACKLOG.md`
- `docs/WEBFLOW_QA_CHECKLIST.md`
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

Important boundaries:

- This repository is private by default.
- Do not invent owner data, product data, proof, vendor acceptance, Amazon eligibility, legal conclusions, reviews, or claims support.
- Mark claim-sensitive language as `[REVIEW REQUIRED]`.
- Mark missing owner/business/product data as `[OWNER DATA NEEDED]`.
- Do not publish final customer-facing copy from this repo until owner and review gates are complete.

## Script Entry Points

Run scripts from the repository root after dependencies are available:

- `npm run build:claims-inventory`
- `npm run build:public-site-extraction`
- `npm run verify:public-site-extraction`
- `npm run build:risky-claims-cleanup`
- `npm run build:product-data`
- `npm run build:buyer-outreach`
- `npm run build:line-sheet`

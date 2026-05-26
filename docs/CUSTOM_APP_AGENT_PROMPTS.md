# Custom App Agent Prompts

This prompt pack replaces the Webflow-first workstream packet for current SciTOX implementation. Use it for Codex App, Codex CLI, Abacus AI / Deep Agent, Claude Design, Webflow reference work, or other service builders.

The primary implementation path is now a custom app under `site/`. Webflow remains optional reference/prototype support.

This prompt pack does not approve final website copy, product recommendations, payment approval, privacy/security claims, legal conclusions, vendor acceptance, marketplace eligibility, or claims support.

## Shared Operating Rules

Every agent or service builder must follow these rules:

- Treat vendor readiness as the primary rebuild goal.
- Treat the public customer site as a calm guidance lobby for already-aware visitors.
- Keep public customer pages and vendor/wholesale surfaces distinct.
- Do not overexpose the product/category in a way that creates vendor, payment, platform, or risk-review issues.
- Do not invent owner data, product data, proof, sales numbers, reviews, vendor relationships, payment approval, platform approval, legal conclusions, or claims support.
- Mark uncertain claims `[REVIEW REQUIRED]`.
- Mark missing business, product, policy, support, payment, fulfillment, or wholesale information `[OWNER DATA NEEDED]`.
- Keep review/owner markers in internal docs, source data, API fallback payloads, tests, and review reports. Do not render those markers in public customer-facing UI.
- Do not write final public website copy unless explicitly assigned and review gates are defined.
- Do not present encrypted chat, autonomous checkout, payment approval, crypto checkout, vendor acceptance, or platform eligibility as live unless verified.
- Treat the product guidance assistant as a live V1 target only when it is backend-source-grounded, uses approved source material, validates output, and escalates unsupported cases.
- Keep LLM and payment credentials server-side.

## Reasoning Parameter Guide

Use the highest reasoning setting for tasks where a wrong assumption could create claims, payment, privacy, or vendor/platform risk.

| Workstream | Preferred Tool | Recommended Reasoning | Model Guidance | Why |
| --- | --- | --- | --- | --- |
| Repo pivot and docs alignment | Codex App or CLI | `medium` | Default coding model is fine. | Consistency work with known files. |
| Next.js app scaffold | Codex CLI or Codex App | `high` | Coding-optimized or strongest available model. | Needs structure, build scripts, and route hygiene. |
| UI/design implementation | Codex App, Claude Design reference, CLI | `medium` or `high` | Strong general/coding model. | Responsive UX and tone control matter. |
| Source-grounded guidance backend | Codex CLI or App | `high` or `xhigh` | Strongest available coding/reasoning model. | Claim-sensitive, source-sensitive, user-facing. |
| Product/source data model | Codex App or CLI | `high` | Strong model with careful data handling. | Must not invent product facts. |
| Authorize.net checkout | Codex CLI or App | `xhigh` | Strongest available model. | Payment, security, refund, and provider constraints. |
| Support/intake integration | Codex CLI or App | `high` | Strong coding model. | Form validation and privacy/data minimization. |
| Vendor/wholesale layer | Codex App or CLI | `high` | Strong general/coding model. | Credibility without false approvals. |
| Claims/messaging QA | Codex App or CLI | `xhigh` | Strongest available reasoning model. | No invented legal or claim conclusions. |
| Browser QA and launch review | Codex App with browser, or CLI + browser tool | `high` | Strong general/coding model. | Evidence-based launch blockers. |

Codex CLI/App note:
- Set the reasoning effort explicitly when the tool exposes it.
- Use `low` only for mechanical tasks with clear source files.
- Use `medium` for prompt/doc cleanup.
- Use `high` for implementation, UI QA, and backend work.
- Use `xhigh` for payment, privacy/security, claim-sensitive, source-grounded recommendation, and launch-blocker work.
- If exact CLI flag names differ by installed version, use the equivalent current setting and record it in the task result.

## Parallel Workstreams

| Workstream | Primary Output | Must Read First | Main Boundary | Reasoning |
| --- | --- | --- | --- | --- |
| App scaffold | `site/` Next.js app shell | `docs/CUSTOM_APP_BUILD_BRIEF.md`, `docs/CUSTOM_APP_REPO_STRUCTURE.md` | Do not break root artifact scripts. | `high` |
| UI/design implementation | App pages and components | `demo/`, `docs/PAGE_BY_PAGE_WIREFRAME_PLAN.md`, `docs/CUSTOMER_GUIDANCE_LOBBY_DIRECTION.md` | No final copy or unsupported claims. | `medium` or `high` |
| Guidance backend | API route and source-grounded logic | `docs/LLM_PRODUCT_GUIDANCE_ASSISTANT_PLAN.md`, `guidance/source_base.example.json`, `scripts/guidance_assistant_lib.mjs` | Backend-only LLM, structured output, human fallback. | `high` or `xhigh` |
| Product/source data | Product and source schemas | `outputs/`, `docs/CUSTOM_APP_REPO_STRUCTURE.md`, `docs/VENDOR_READY_SITEMAP.md` | No invented SKUs, prices, labels, or claims. | `high` |
| Authorize.net checkout | Hosted checkout handoff plan/API | `docs/SECURE_SUPPORT_CHECKOUT_OPTIONS.md`, `docs/CUSTOM_APP_SOURCE_MATRIX.md` | No assumption that every payment method or setting is approved. | `xhigh` |
| Support/intake | Contact, callback, and inquiry routes | `docs/CUSTOMER_GUIDANCE_LOBBY_DIRECTION.md`, `docs/PUBLIC_SITE_MESSAGING_RULES.md` | No privacy/security overclaims or overcollection. | `high` |
| Vendor/wholesale | Wholesale page and assets | `docs/VENDOR_READY_STRATEGY_BRIEF.md`, `docs/VENDOR_READY_SITEMAP.md` | No vendor acceptance claims. | `high` |
| Claims/messaging QA | Risk scan and blockers | `docs/PUBLIC_SITE_MESSAGING_RULES.md`, `docs/CUSTOM_APP_QA_CHECKLIST.md` | Do not rewrite or approve claims. | `xhigh` |
| Deploy/analytics QA | Deployment and measurement readiness | `docs/CUSTOM_APP_QA_CHECKLIST.md` | No sensitive data in analytics. | `high` |

## Prompt 1: Codex App Or CLI - App Scaffold

Recommended settings:
- Reasoning: `high`.
- Tool: Codex CLI or Codex App.
- Commit scope: `site/` scaffold plus minimal root docs/scripts only if needed.

Copy-paste prompt:

```text
Use the SciTOX repository at C:\Users\baris\OneDrive\Desktop\SciTox.

Set reasoning to high.

First read AGENTS.md, docs/CONTINUE_HERE.md, docs/CUSTOM_APP_BUILD_BRIEF.md, docs/CUSTOM_APP_REPO_STRUCTURE.md, docs/CUSTOM_APP_DEVELOPMENT_BACKLOG.md, docs/PUBLIC_SITE_MESSAGING_RULES.md, and docs/LLM_PRODUCT_GUIDANCE_ASSISTANT_PLAN.md.

Create or continue the V1 custom app under site/ without breaking existing root scripts. Use Next.js App Router unless the repo already contains a stronger app framework decision. Required routes include /, /products, /products/[slug], /guidance, /resources, /support, /contact, /shipping-returns, and /wholesale. Add or preserve internal data files with [OWNER DATA NEEDED] and [REVIEW REQUIRED] markers. Do not render those markers in public UI. Do not invent product facts or claims.

Deliver:
- files changed
- local run command
- verification commands and results
- remaining owner data needed
- review blockers
```

Acceptance criteria:
- App runs locally.
- Core routes exist.
- Existing root artifact scripts still work.
- No frontend secrets or final claims appear.

## Prompt 2: UI / Owner Demo Port

Recommended settings:
- Reasoning: `medium` for pure styling, `high` if changing flow or routes.
- Tool: Codex App, Codex CLI, Claude Design as visual reference only.

Copy-paste prompt:

```text
Use the SciTOX custom app docs and demo.

Set reasoning to high if changing flow, or medium if only styling.

Read AGENTS.md, docs/CUSTOM_APP_BUILD_BRIEF.md, docs/CUSTOMER_GUIDANCE_LOBBY_DIRECTION.md, docs/PAGE_BY_PAGE_WIREFRAME_PLAN.md, docs/PUBLIC_SITE_MESSAGING_RULES.md, docs/CUSTOM_APP_QA_CHECKLIST.md, and demo/.

Port the owner-review demo feel and flow into the custom app under site/. The app should feel private, serious, warm, direct, and competent. It should guide already-aware users without overexplaining the product/category. Keep vendor/wholesale pages separate and restrained.

Do not approve final website copy. Use customer-facing labels in public UI and keep [REVIEW REQUIRED] and [OWNER DATA NEEDED] markers only in internal docs/data/review artifacts where facts are missing.

Deliver:
- implemented pages/components
- responsive behavior notes
- screenshot/browser QA evidence if available
- remaining owner/review gates
```

Acceptance criteria:
- Owner can explore the basic customer lobby, guidance, support, and wholesale flow.
- Text does not overflow or overlap on mobile/desktop.
- UI does not imply unsupported tools, channels, results, privacy, or payment approval.

## Prompt 3: Guidance Backend

Recommended settings:
- Reasoning: `high` for implementation, `xhigh` when changing safety logic or source-routing behavior.
- Tool: Codex CLI or Codex App.

Copy-paste prompt:

```text
Use the SciTOX custom app docs and current guidance scaffold.

Set reasoning to xhigh.

Read AGENTS.md, docs/CUSTOM_APP_BUILD_BRIEF.md, docs/LLM_PRODUCT_GUIDANCE_ASSISTANT_PLAN.md, docs/CUSTOM_APP_REPO_STRUCTURE.md, docs/CUSTOM_APP_QA_CHECKLIST.md, guidance/source_base.example.json, scripts/guidance_assistant_lib.mjs, and scripts/guidance_assistant_server.mjs.

Implement the custom app guidance backend under site/. The guidance endpoint must be server-side, source-grounded, structured, review-gated, and able to return safe fallback/human follow-up when approved source data or provider config is missing.

Do not expose LLM credentials. Do not answer from general internet knowledge. Do not invent product mappings, claims, instructions, warnings, prices, or recommendations. Do not frame the feature as legal advice, medical advice, diagnostic advice, test-result advice, counsel, consultation, or prescription.

Deliver:
- API route
- source-base loader
- output validation
- tests for safe fallback and escalation
- verification output
- remaining owner data needed
```

Acceptance criteria:
- API returns structured output only.
- Missing source data and disallowed advice requests escalate.
- No frontend LLM call exists.

## Prompt 4: Product And Vendor Data

Recommended settings:
- Reasoning: `high`.
- Tool: Codex App or CLI.

Copy-paste prompt:

```text
Use the SciTOX product and vendor docs.

Set reasoning to high.

Read AGENTS.md, docs/CUSTOM_APP_BUILD_BRIEF.md, docs/CUSTOM_APP_REPO_STRUCTURE.md, docs/VENDOR_READY_SITEMAP.md, docs/PAGE_BY_PAGE_WIREFRAME_PLAN.md, outputs/scitox_product_data/Product_Data_Requirements.xlsx if present, and outputs/scitox_product_line_sheet/Product_Line_Sheet_Template.xlsx if present.

Create product and vendor data structures for the custom app. Public product fields and vendor/wholesale fields must be clearly separated. Use placeholders for missing owner data and review markers for claim-sensitive fields.

Do not invent SKUs, prices, MSRP, wholesale prices, MOQ, case pack, UPC/GTIN, ingredients, label files, images, claims, or shipping terms.

Deliver:
- schema/data files
- page integration notes
- owner data gap list
- review-required fields
```

Acceptance criteria:
- Data structure supports public pages and vendor materials.
- Missing product/vendor facts are visible as `[OWNER DATA NEEDED]`.

## Prompt 5: Authorize.net Checkout

Recommended settings:
- Reasoning: `xhigh`.
- Tool: Codex CLI or Codex App.

Copy-paste prompt:

```text
Use the SciTOX payment and custom-app docs.

Set reasoning to xhigh.

Read AGENTS.md, docs/CUSTOM_APP_BUILD_BRIEF.md, docs/CUSTOM_APP_SOURCE_MATRIX.md, docs/SECURE_SUPPORT_CHECKOUT_OPTIONS.md, docs/CUSTOM_APP_REPO_STRUCTURE.md, and docs/CUSTOM_APP_QA_CHECKLIST.md.

Plan or implement the Authorize.net checkout handoff for the custom app. Treat Authorize.net as owner-confirmed for planning only. Do not assume merchant-account terms, enabled payment methods, fraud settings, refund process, or risk review are complete.

Prefer an Accept Hosted or hosted-payment pattern. Do not collect raw card data in the custom app unless explicitly reviewed. Create a review-gated route/stub if credentials are missing.

Deliver:
- required owner/payment data checklist
- server route plan or implementation
- environment variable names only
- sandbox test plan
- review blockers
```

Acceptance criteria:
- No payment secrets are exposed.
- No payment method or approval claim is invented.
- Checkout remains gated until provider and owner details are confirmed.

## Prompt 6: Support And Intake

Recommended settings:
- Reasoning: `high`.
- Tool: Codex CLI or Codex App.

Copy-paste prompt:

```text
Use the SciTOX support and messaging docs.

Set reasoning to high.

Read AGENTS.md, docs/CUSTOMER_GUIDANCE_LOBBY_DIRECTION.md, docs/PUBLIC_SITE_MESSAGING_RULES.md, docs/CUSTOM_APP_QA_CHECKLIST.md, and docs/CUSTOM_APP_REPO_STRUCTURE.md.

Implement or plan the custom app contact, support, callback, and wholesale inquiry intake routes. Keep intake minimal and privacy-aware without making unverified confidentiality or encryption claims.

Do not ask for unnecessary sensitive information. Do not overpromise response times or outcomes. Do not present the support path as legal, medical, diagnostic, or test-result advice.

Deliver:
- form fields
- validation rules
- server route or provider handoff plan
- destination requirements
- privacy/review blockers
```

Acceptance criteria:
- Inquiry types route clearly.
- Sensitive data collection is minimized.
- Missing destination/provider details are marked `[OWNER DATA NEEDED]`.

## Prompt 7: Vendor / Wholesale Layer

Recommended settings:
- Reasoning: `high`.
- Tool: Codex App or CLI.

Copy-paste prompt:

```text
Use the SciTOX vendor-readiness docs.

Set reasoning to high.

Read AGENTS.md, docs/VENDOR_READY_STRATEGY_BRIEF.md, docs/VENDOR_READY_SITEMAP.md, docs/PAGE_BY_PAGE_WIREFRAME_PLAN.md, docs/CUSTOM_APP_BUILD_BRIEF.md, docs/CUSTOM_APP_QA_CHECKLIST.md, and available output workbooks.

Build or plan the Partner / Wholesale Inquiry layer in the custom app. The goal is credibility for vendor, wholesale, smoke shop, head shop, distributor, retailer, and online vendor outreach.

Do not invent pricing, MOQ, case pack, UPC/GTIN, vendor acceptance, distributor relationships, platform eligibility, product proof, or claims support.

Deliver:
- page sections/components
- inquiry form fields
- product data gaps
- vendor asset requirements
- review blockers
```

Acceptance criteria:
- Vendor page is restrained and separate from customer flow.
- Page focuses on organization, documentation, and inquiry routing.

## Prompt 8: Claims, Messaging, And Exposure QA

Recommended settings:
- Reasoning: `xhigh`.
- Tool: Codex App or CLI.

Copy-paste prompt:

```text
Use the SciTOX messaging, claims, and custom-app QA docs.

Set reasoning to xhigh.

Read AGENTS.md, docs/PUBLIC_SITE_MESSAGING_RULES.md, docs/CUSTOMER_GUIDANCE_LOBBY_DIRECTION.md, docs/WEBSITE_REBUILD_BRIEF.md, docs/CUSTOM_APP_QA_CHECKLIST.md, docs/CUSTOM_APP_BUILD_BRIEF.md, and the current app/demo files.

Review the public customer and vendor-facing surfaces for claim risk, exposure risk, privacy/security overclaims, payment/platform overclaims, AI/support overclaims, and vendor approval risk.

Do not approve claims. Do not make legal conclusions. Mark uncertain items [REVIEW REQUIRED] and missing owner data [OWNER DATA NEEDED] in the QA report. Also flag any public UI that exposes those internal markers, scaffold/demo labels, or developer-facing planning copy.

Deliver:
- risky sections
- exact text if reviewing implemented files
- risk reason
- recommended status: keep draft, review, remove before public launch, rewrite later, or legal review
- launch blockers
```

Acceptance criteria:
- Findings are evidence-based and tied to exact files/pages.
- Review does not create new final copy.

## Prompt 9: Deployment, Analytics, And Launch QA

Recommended settings:
- Reasoning: `high`; use `xhigh` if changing analytics payloads or privacy-related behavior.
- Tool: Codex App with browser, or Codex CLI plus browser QA.

Copy-paste prompt:

```text
Use the SciTOX custom app QA docs.

Set reasoning to high.

Read AGENTS.md, docs/CUSTOM_APP_QA_CHECKLIST.md, docs/CUSTOM_APP_BUILD_BRIEF.md, docs/CUSTOM_APP_SOURCE_MATRIX.md, and the current site app.

Run a staging-readiness QA pass for the custom app. Verify mobile layout, desktop layout, navigation, forms, guidance API behavior, product data handling, Knowledge Center/resources page, vendor inquiry, policy links, analytics/Search Console readiness, secret handling, claim-sensitive language, privacy/security claims, broken links, public-marker cleanup, and launch blockers.

Report only evidence you verified. Do not claim launch readiness unless every required gate is satisfied. Mark unresolved items [REVIEW REQUIRED] or [OWNER DATA NEEDED].
```

Acceptance criteria:
- QA report includes evidence and blockers.
- No unverifiable success claims are made.

## Recommended Execution Order

1. App Scaffold - `high`.
2. UI / Owner Demo Port - `high`.
3. Guidance Backend - `xhigh`.
4. Product And Vendor Data - `high`.
5. Authorize.net Checkout - `xhigh`.
6. Support And Intake - `high`.
7. Vendor / Wholesale Layer - `high`.
8. Claims, Messaging, And Exposure QA - `xhigh`.
9. Deployment, Analytics, And Launch QA - `high` or `xhigh`.

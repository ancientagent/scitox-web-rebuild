# Custom App Development Backlog

Use this backlog to turn the SciTOX planning package into a buildable custom app. The custom app should live under `site/` unless the owner explicitly chooses a different structure.

Do not publish final copy, claim-sensitive language, payment claims, privacy/security claims, or product recommendations until the relevant review gates are complete.

## Recommended Agent Settings

| Work Type | Codex App Setting | Codex CLI Setting | Notes |
| --- | --- | --- | --- |
| Repo/doc alignment | Reasoning `medium` | Use current CLI equivalent of `--reasoning medium` | Good for file moves, anchor updates, and prompt cleanup. |
| Next.js scaffold and UI build | Reasoning `high` | Use current CLI equivalent of `--reasoning high` | Needs responsive UI and route correctness. |
| Backend guidance API | Reasoning `high` or `xhigh` | Use current CLI equivalent of `--reasoning high` or `--reasoning xhigh` | Use `xhigh` when changing routing/safety behavior. |
| Payment/Authorize.net | Reasoning `xhigh` | Use current CLI equivalent of `--reasoning xhigh` | Review provider docs and avoid unsafe assumptions. |
| Claims/privacy/vendor QA | Reasoning `xhigh` | Use current CLI equivalent of `--reasoning xhigh` | Evidence-first, no legal conclusions. |
| Layout/browser QA | Reasoning `medium` or `high` | Use current CLI equivalent of `--reasoning medium` or `--reasoning high` | Use browser screenshots and concrete evidence. |

If the exact Codex CLI flag name changes, preserve the intent: explicitly choose the reasoning effort rather than relying on defaults for risky tasks.

## Phase 0: Repo Pivot

| Task | Output | Acceptance Criteria | Blockers |
| --- | --- | --- | --- |
| Confirm custom app as primary path | Updated repo anchors | `AGENTS.md`, `README.md`, `docs/CONTINUE_HERE.md`, and `docs/DEVELOPMENT_HANDOFF.md` point to custom app docs first. | Owner changes platform direction. |
| Keep Webflow docs as reference | Legacy banners | Webflow docs are retained but marked reference/legacy where needed. | None. |
| Add source matrix | `docs/CUSTOM_APP_SOURCE_MATRIX.md` | Platform decision is tied to official sources and review gates. | None. |
| Add agent prompts | `docs/CUSTOM_APP_AGENT_PROMPTS.md` | Workstreams include Codex App/CLI reasoning settings. | None. |

## Phase 1: App Scaffold

| Task | Output | Acceptance Criteria | Blockers |
| --- | --- | --- | --- |
| Create `site/` app | Next.js app skeleton | App runs locally, uses App Router, and does not disrupt root artifact scripts. | Node/package manager decision. |
| Add project layout | Routes and shared layout | Core routes exist for customer, support, policy, and wholesale pages. | None. |
| Add style system | Global CSS and components | Design is serious, warm, restrained, responsive, and not Webflow-dependent. | Visual direction approval. |
| Add data loading pattern | `site/data/` or `site/lib/data/` | Missing facts stay `[OWNER DATA NEEDED]`; claim-sensitive fields stay `[REVIEW REQUIRED]`. | Product data. |

## Phase 2: Owner-Review Demo Port

| Task | Output | Acceptance Criteria | Blockers |
| --- | --- | --- | --- |
| Port demo lobby | Homepage route | Owner can explore the customer lobby feel and flow in the app. | Demo abstraction approval. |
| Port guidance flow UI | Product guidance page | Flow collects structured answers and calls backend route or local stub safely. | Source base and API route. |
| Port support flow | Support/contact routes | Human callback/support options appear as review-gated paths, not unsupported guarantees. | Support workflow. |
| Port vendor layer | Partner/wholesale page | Vendor page is restrained and data-forward. | Wholesale owner data. |

## Phase 3: Source-Grounded Guidance

| Task | Output | Acceptance Criteria | Blockers |
| --- | --- | --- | --- |
| Port guidance library | `site/lib/guidance/` | Reuses current safe fallback logic or a tested TypeScript equivalent. | None. |
| Add API route | `site/app/api/guidance/recommend/route.ts` | Server validates input, loads source base, returns structured outputs, and never exposes LLM keys. | LLM provider details. |
| Add source-base schema | `site/data/guidance-source.example.json` | Source records include review markers and owner-data gaps. | Product mappings. |
| Add tests | Unit/API tests | Safe fallback, missing source base, blocked advice requests, and human escalation are covered. | Test framework selection. |

## Phase 4: Product And Vendor Data

| Task | Output | Acceptance Criteria | Blockers |
| --- | --- | --- | --- |
| Add product schema | Product data file/type | Public and vendor fields are separated. | Owner product data. |
| Add product category/detail templates | Product routes | Pages render placeholders without inventing facts. | Product images/data. |
| Add vendor line-sheet model | Vendor data structure | SKU, MSRP, wholesale, MOQ, case pack, UPC/GTIN are represented as owner-needed until confirmed. | Owner vendor data. |

## Phase 5: Checkout Handoff

| Task | Output | Acceptance Criteria | Blockers |
| --- | --- | --- | --- |
| Document Authorize.net settings needed | Checkout setup checklist | Owner knows the account, payment method, fraud, refund, and sandbox/live info needed. | Owner/payment access. |
| Add checkout session route placeholder | Server route stub | Route returns review-gated fallback until credentials and configuration are available. | Authorize.net credentials. |
| Implement Accept Hosted after review | Hosted checkout handoff | Uses server-side token creation and hosted payment form flow. | Payment/legal/compliance review. |
| Add checkout QA | Test plan | No card data is handled directly by the app unless explicitly reviewed. | Sandbox account. |

## Phase 6: Support, Intake, And Operations

| Task | Output | Acceptance Criteria | Blockers |
| --- | --- | --- | --- |
| Add contact/inquiry API | Server route | Validates inquiry type and avoids overcollecting sensitive data. | Destination provider. |
| Add support escalation | Human follow-up route | Guidance assistant can route unsupported cases without overpromising response times. | Support process. |
| Add owner dashboard later | Deferred admin view | Not required for V1 unless owner requests it. | Owner priority. |

## Phase 7: QA And Deploy

| Task | Output | Acceptance Criteria | Blockers |
| --- | --- | --- | --- |
| Run app checks | Test/build output | Lint, tests, typecheck, and build pass. | App scaffold. |
| Browser QA | Screenshots/evidence | Desktop and mobile core flows work. | Dev server. |
| Claims/privacy QA | QA report | No unreviewed risky copy is launch-ready. | Review gates. |
| Deploy setup | Vercel or selected host | Environment variables and domains are configured without exposing secrets. | Hosting account and owner access. |


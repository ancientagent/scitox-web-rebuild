# SciTOX Custom App V1 Implementation Plan

> **For Codex:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the V1 SciTOX custom app under `site/` with a calm customer lobby, source-grounded guidance flow, vendor/wholesale layer, and review-gated Authorize.net checkout handoff.

**Architecture:** Keep the existing repo as the source-of-truth workspace and create a Next.js App Router app in `site/`. Server-side API routes handle guidance, inquiries, and checkout stubs so LLM/payment secrets never live in the browser.

**Tech Stack:** Next.js App Router, TypeScript, CSS modules or global CSS, server-side route handlers, JSON source data, Vitest or the default Next.js-compatible test runner selected during scaffold.

---

## Execution Settings

Use these settings when assigning the plan to Codex App, Codex CLI, or another implementation agent.

| Task Area | Reasoning | Notes |
| --- | --- | --- |
| App scaffold and route setup | `high` | Avoid breaking root scripts. |
| UI port and responsive behavior | `high` | Owner demo feel and mobile layout matter. |
| Guidance backend and safety routing | `xhigh` | Claim-sensitive, source-grounded behavior. |
| Product/vendor data model | `high` | Do not invent owner data. |
| Authorize.net checkout route | `xhigh` | Payment/security/provider risk. |
| Support/intake forms | `high` | Privacy and data minimization. |
| Claims/privacy/vendor QA | `xhigh` | Evidence-first review, no approvals. |
| Browser/layout QA | `high` | Verify with screenshots and concrete outputs. |

If using Codex CLI, set the current CLI equivalent of the reasoning value above. If the flag name differs in the installed version, record the chosen setting in the task result.

## Pre-Flight

**Files:**
- Read: `AGENTS.md`
- Read: `docs/CONTINUE_HERE.md`
- Read: `docs/CUSTOM_APP_BUILD_BRIEF.md`
- Read: `docs/CUSTOM_APP_REPO_STRUCTURE.md`
- Read: `docs/CUSTOM_APP_AGENT_PROMPTS.md`
- Read: `docs/CUSTOM_APP_QA_CHECKLIST.md`

**Step 1: Verify repository state**

Run from `C:\Users\baris\OneDrive\Desktop\SciTox`:

```powershell
Get-Location
git rev-parse --show-toplevel
git branch --show-current
git status --short
```

Expected:
- Repo root is `C:\Users\baris\OneDrive\Desktop\SciTox`.
- Branch is known.
- Dirty state is reviewed before editing.

**Step 2: Confirm package manager**

Run:

```powershell
Get-ChildItem package-lock.json,yarn.lock,pnpm-lock.yaml -ErrorAction SilentlyContinue
```

Expected:
- Use the lockfile/package manager already present if any.
- If no app lockfile exists, choose one package manager for `site/` and document it.

## Task 1: Create Next.js App Shell

**Reasoning:** `high`

**Files:**
- Create: `site/package.json`
- Create: `site/next.config.js`
- Create: `site/tsconfig.json`
- Create: `site/app/layout.tsx`
- Create: `site/app/page.tsx`
- Create: `site/app/globals.css`
- Create: `site/.env.example`
- Create: `site/README.md`

**Step 1: Scaffold the app**

Create a Next.js App Router app under `site/`. Do not move existing root scripts.

**Step 2: Add required routes**

Create placeholder pages:

```text
site/app/products/page.tsx
site/app/products/[slug]/page.tsx
site/app/guidance/page.tsx
site/app/support/page.tsx
site/app/contact/page.tsx
site/app/shipping-returns/page.tsx
site/app/wholesale/page.tsx
```

**Step 3: Add env example**

`site/.env.example` must include names only:

```text
GUIDANCE_LLM_API_KEY=
GUIDANCE_LLM_MODEL=
GUIDANCE_SOURCE_BASE=
AUTHORIZE_NET_API_LOGIN_ID=
AUTHORIZE_NET_TRANSACTION_KEY=
AUTHORIZE_NET_SIGNATURE_KEY=
AUTHORIZE_NET_ENVIRONMENT=sandbox
INQUIRY_DESTINATION=
NEXT_PUBLIC_SITE_URL=
```

**Step 4: Verify**

Run:

```powershell
npm --prefix site run build
```

Expected:
- Build passes or any scaffold-time dependency issue is documented with exact error.

**Step 5: Commit**

Commit message:

```text
feat: scaffold SciTOX custom app
```

## Task 2: Add Shared UI System And Routes

**Reasoning:** `high`

**Files:**
- Create: `site/components/SiteHeader.tsx`
- Create: `site/components/SiteFooter.tsx`
- Create: `site/components/Section.tsx`
- Create: `site/components/StatusTag.tsx`
- Modify: `site/app/layout.tsx`
- Modify: `site/app/globals.css`
- Modify: all V1 page files under `site/app/`

**Step 1: Build shared layout**

Add header routes:
- Products
- Product Guidance
- FAQ / Support
- Contact
- Wholesale / Partners

Add footer routes:
- Products
- Guidance
- Support
- Contact
- Shipping / Returns
- Privacy `[OWNER DATA NEEDED]`
- Terms `[OWNER DATA NEEDED]`
- Wholesale

**Step 2: Add tone-safe placeholder UI**

Use placeholder labels only. Do not write final website copy.

Allowed placeholder patterns:
- `[PLACEHOLDER: calm routing headline - REVIEW REQUIRED]`
- `[OWNER DATA NEEDED: product support process]`
- `[REVIEW REQUIRED: product explanation]`

**Step 3: Verify**

Run:

```powershell
npm --prefix site run build
```

Expected:
- Build passes.
- Navigation renders on each route.

**Step 4: Commit**

Commit message:

```text
feat: add custom app layout and v1 routes
```

## Task 3: Port Owner-Review Demo Flow

**Reasoning:** `high`

**Files:**
- Read: `demo/index.html`
- Read: `demo/app.js`
- Read: `demo/styles.css`
- Modify: `site/app/page.tsx`
- Modify: `site/app/guidance/page.tsx`
- Modify: `site/app/support/page.tsx`
- Modify: `site/app/contact/page.tsx`
- Modify: `site/app/wholesale/page.tsx`
- Modify: `site/app/globals.css`
- Create or modify: `site/components/*`

**Step 1: Port the customer lobby**

Implement the basic lobby flow:
- Common-path self-service.
- Product guidance start.
- Human follow-up route.
- Support/contact route.
- Vendor route remains visually separate.

**Step 2: Port interaction states**

Add explorable non-final UI states:
- Guidance intro.
- Common situation selection.
- Safe fallback/human follow-up state.
- Vendor inquiry preview.

**Step 3: Verify browser layout**

Run the app locally and capture desktop/mobile screenshots.

Expected:
- No text overlap.
- No unsupported "encrypted", "consultation", "prescribe", "guarantee", "anonymous", or payment-approval language.

**Step 4: Commit**

Commit message:

```text
feat: port owner-review demo flow
```

## Task 4: Implement Guidance Source Base And API

**Reasoning:** `xhigh`

**Files:**
- Read: `scripts/guidance_assistant_lib.mjs`
- Read: `guidance/source_base.example.json`
- Create: `site/data/guidance-source.example.json`
- Create: `site/lib/guidance/types.ts`
- Create: `site/lib/guidance/sourceBase.ts`
- Create: `site/lib/guidance/recommend.ts`
- Create: `site/app/api/guidance/recommend/route.ts`
- Create: `site/tests/guidance.test.ts`

**Step 1: Write tests first**

Test cases:
- Missing source base returns `human_follow_up`.
- Missing owner product mapping returns `human_follow_up` or `needs_more_info`.
- Disallowed legal/medical/test-result/guarantee question escalates.
- Valid structured request returns only output-contract fields.

**Step 2: Implement minimal source loader**

Load source records from `GUIDANCE_SOURCE_BASE` or `site/data/guidance-source.example.json`.

**Step 3: Implement recommendation service**

Service must return:

```ts
type GuidanceResult = {
  recommendation_status: "product_path" | "needs_more_info" | "human_follow_up";
  recommended_product_id: string | null;
  recommended_path_label: string;
  explanation: string;
  source_ids: string[];
  missing_owner_data: string[];
  review_required: string[];
  next_step: string;
};
```

**Step 4: Implement API route**

The route must:
- Accept structured JSON.
- Validate request shape.
- Reject or escalate unsafe/advice-seeking inputs.
- Return JSON only.
- Never expose LLM credentials.

**Step 5: Verify**

Run:

```powershell
npm --prefix site test
npm --prefix site run build
```

Expected:
- Tests pass.
- Build passes.

**Step 6: Commit**

Commit message:

```text
feat: add source-grounded guidance api
```

## Task 5: Add Product And Vendor Data Models

**Reasoning:** `high`

**Files:**
- Create: `site/data/products.example.json`
- Create: `site/lib/products/types.ts`
- Create: `site/lib/products/getProducts.ts`
- Modify: `site/app/products/page.tsx`
- Modify: `site/app/products/[slug]/page.tsx`
- Modify: `site/app/wholesale/page.tsx`

**Step 1: Add example data with placeholders**

Every missing fact must be marked:
- `[OWNER DATA NEEDED]`
- `[REVIEW REQUIRED]`

Fields:
- product name
- SKU
- category
- size
- price
- MSRP
- wholesale price
- MOQ
- case pack
- UPC/GTIN
- ingredients
- label file
- image
- instructions
- warnings
- shipping notes
- review-required claims

**Step 2: Render public and vendor fields separately**

Public product pages must not expose vendor economics unless intended.

**Step 3: Verify**

Run:

```powershell
npm --prefix site run build
```

Expected:
- Product and wholesale pages build with placeholders.

**Step 4: Commit**

Commit message:

```text
feat: add product and vendor data model
```

## Task 6: Add Authorize.net Checkout Stub

**Reasoning:** `xhigh`

**Files:**
- Create: `site/lib/payments/authorizeNet.ts`
- Create: `site/app/api/checkout/authorize-net/route.ts`
- Create: `site/tests/authorizeNet.test.ts`
- Modify: `site/.env.example`
- Modify: `site/app/products/[slug]/page.tsx`

**Step 1: Write tests first**

Test cases:
- Missing credentials returns review-gated unavailable response.
- Sandbox/live environment must be explicit.
- Route does not accept raw card data.

**Step 2: Add stub route**

Until credentials and owner/payment review are complete, route returns:
- `checkout_status: "review_required"`
- `missing_owner_data`
- `review_required`

**Step 3: Add product CTA gate**

Product page CTA must show a review-gated checkout state unless payment is enabled by configuration.

**Step 4: Verify**

Run:

```powershell
npm --prefix site test
npm --prefix site run build
```

Expected:
- No raw card fields exist.
- Missing credentials do not crash the app.

**Step 5: Commit**

Commit message:

```text
feat: add authorize net checkout gate
```

## Task 7: Add Inquiry Routes

**Reasoning:** `high`

**Files:**
- Create: `site/lib/validation/inquiry.ts`
- Create: `site/app/api/inquiries/route.ts`
- Create: `site/tests/inquiries.test.ts`
- Modify: `site/app/contact/page.tsx`
- Modify: `site/app/wholesale/page.tsx`
- Modify: `site/app/guidance/page.tsx`

**Step 1: Define allowed inquiry types**

Allowed types:
- product guidance follow-up
- order/shipping
- return/refund
- wholesale/vendor
- general

**Step 2: Add validation**

Do not collect unnecessary sensitive data.

**Step 3: Add destination fallback**

If `INQUIRY_DESTINATION` is missing, return a safe review-gated response.

**Step 4: Verify**

Run:

```powershell
npm --prefix site test
npm --prefix site run build
```

Expected:
- Valid inquiries return structured status.
- Missing destination is handled.

**Step 5: Commit**

Commit message:

```text
feat: add inquiry routing
```

## Task 8: Add QA And Launch Evidence

**Reasoning:** `high` for browser QA, `xhigh` for claim/privacy/payment review.

**Files:**
- Create: `outputs/custom_app_qa/README.md`
- Create: `outputs/custom_app_qa/qa_report.md`
- Modify if needed: `docs/CUSTOM_APP_QA_CHECKLIST.md`

**Step 1: Run automated checks**

Run:

```powershell
npm --prefix site test
npm --prefix site run build
npm run verify:public-site-extraction
```

Expected:
- Commands pass or exact failures are documented.

**Step 2: Run browser QA**

Check:
- desktop homepage
- mobile homepage
- guidance flow
- product route
- contact form
- wholesale page

Expected:
- Screenshots/evidence are recorded.
- No layout overlap.
- No launch blockers hidden.

**Step 3: Run claims/privacy/payment scan**

Search for banned or review-sensitive terms:

```powershell
rg -n "guarantee|guaranteed|prescribe|counsel|consultation|encrypted|anonymous|private checkout|pass|detox|medical advice|legal advice|Amazon approved|vendor approved" site docs demo -S
```

Expected:
- Any matches are intentionally draft/review markers or are fixed before launch.

**Step 4: Commit**

Commit message:

```text
docs: add custom app qa evidence
```

## Final Done Criteria

The V1 implementation is not complete until:
- `site/` app builds.
- Guidance API returns safe structured output.
- Missing product/payment/vendor data remains marked.
- No frontend LLM/payment secrets exist.
- Authorize.net path is stubbed or implemented according to owner/payment review.
- Mobile and desktop QA evidence exists.
- Claims/privacy/payment/vendor review blockers are documented.
- Root workbook/artifact scripts still run.


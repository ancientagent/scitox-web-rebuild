# Linear Workspace Migration Packet

Created: 2026-05-18

This packet exists because the SciTOX Linear tracking project was first created in the wrong Linear workspace. The current Linear connector still sees the old `gistlister` workspace, so the project must be recreated in the new SciTOX workspace after that workspace is connected.

Do not use the old Linear project or old `Scitox rebuild` team in the `gistlister` workspace as the active SciTOX tracker.

## Target Workspace

Use the new SciTOX Linear workspace created by the owner.

Recommended team:
- Team name: `Scitox rebuild` or `SciTOX`
- Team key: `SCI`

## Project To Recreate

Project name:
`SciTOX Custom App Rebuild`

Summary:
`Vendor-ready SciTOX custom app rebuild with source-grounded guidance and review-gated checkout/support flows.`

Description:

```text
Private project for tracking the SciTOX custom app rebuild.

Scope:
- Build the Next.js app under `site/` from the SciTOX repo.
- Keep the public customer site private, serious, warm, direct, and competent.
- Keep vendor/wholesale surfaces separate from customer guidance.
- Use backend-source-grounded product guidance only.
- Treat Authorize.net as owner-confirmed planning data, not approval of all payment methods or risk review.

Boundaries:
- Do not write final website copy unless explicitly assigned.
- Do not invent owner data, product facts, claims, proof, payment approval, privacy/security claims, vendor acceptance, Amazon eligibility, or legal conclusions.
- Mark missing facts `[OWNER DATA NEEDED]` and claim-sensitive items `[REVIEW REQUIRED]`.
- Do not expose LLM/payment/provider secrets in frontend code.

Primary repo: https://github.com/ancientagent/scitox-web-rebuild
WSL development path: `/home/baris/scitox-web-rebuild`
Current implementation anchor: `docs/plans/2026-05-12-custom-app-v1.md`
```

## Issues To Recreate

### SCI-1: Scaffold Next.js app shell under site

Status: Done
Priority: Medium
Labels: Feature

Description:

```text
Purpose: record the completed initial scaffold slice from `docs/plans/2026-05-12-custom-app-v1.md`, Task 1.

Completed in repo commit:
- `28a853f feat: scaffold SciTOX custom app`

Scope completed:
- Created `site/` Next.js App Router app.
- Added required V1 routes.
- Added `site/.env.example` with variable names only.
- Added `site/README.md`.
- Verified `npm --prefix site run build` and `npm --prefix site run lint`.

Boundaries maintained:
- No final website copy.
- No invented owner data, product facts, claims, proof, payment approval, privacy/security claims, vendor acceptance, Amazon eligibility, or legal conclusions.
- Root `@oai/artifact-tool` blocker was not fixed.
```

### SCI-2: Build shared app layout and V1 route shell

Status: Done
Priority: Medium
Labels: Feature

Description:

```text
Purpose: record the completed shared app layout and V1 route shell slice after the initial `site/` app shell.

Completed in repo commit:
- `c7dc0b6 feat: add shared app layout shell`

Source docs:
- `docs/plans/2026-05-12-custom-app-v1.md`, Task 2
- `docs/CUSTOM_APP_BUILD_BRIEF.md`
- `docs/CUSTOM_APP_QA_CHECKLIST.md`

Scope completed:
- Add shared layout/header/footer components.
- Add stable V1 navigation routes.
- Keep visible text as placeholders only.
- Use `[OWNER DATA NEEDED]` and `[REVIEW REQUIRED]` markers.

Acceptance criteria:
- `npm --prefix site run build` passes.
- `npm --prefix site run lint` passes.
- No final website copy or unsupported claims are introduced.
- No frontend secrets are added.
```

### SCI-3: Port owner-review demo flow into custom app

Status: Todo
Priority: Medium
Labels: Feature

Description:

```text
Purpose: make the custom app explorable for owner review without final copy or unsupported live-system claims.

Source docs:
- `docs/plans/2026-05-12-custom-app-v1.md`, Task 3
- `demo/`
- `docs/CUSTOMER_GUIDANCE_LOBBY_DIRECTION.md`
- `docs/PAGE_BY_PAGE_WIREFRAME_PLAN.md`

Scope:
- Port calm lobby flow.
- Add guidance/support/vendor preview states.
- Keep vendor surface visually separate.
- Keep all copy placeholder-safe.

Acceptance criteria:
- Owner can explore the basic flow.
- Mobile and desktop layout do not overlap.
- No language implies unsupported encryption, consultation, prescription, guarantee, anonymity, payment approval, or vendor acceptance.
```

### SCI-4: Implement source-grounded guidance API scaffold

Status: Todo
Priority: Medium
Labels: Feature

Description:

```text
Purpose: move the current guidance assistant scaffold into the custom app backend.

Source docs:
- `docs/plans/2026-05-12-custom-app-v1.md`, Task 4
- `docs/LLM_PRODUCT_GUIDANCE_ASSISTANT_PLAN.md`
- `guidance/source_base.example.json`
- `scripts/guidance_assistant_lib.mjs`

Scope:
- Add `site/app/api/guidance/recommend/route.ts`.
- Add source-base loader and output validation.
- Return safe fallback or human follow-up when source data/config is missing.

Acceptance criteria:
- API returns structured output only.
- Missing source data escalates.
- Disallowed advice requests escalate.
- No LLM credentials or model calls appear in frontend code.
```

### SCI-5: Add product and vendor data models

Status: Todo
Priority: Medium
Labels: Feature

Description:

```text
Purpose: create source-controlled product/vendor data structures without inventing owner facts.

Source docs:
- `docs/plans/2026-05-12-custom-app-v1.md`, Task 5
- `docs/VENDOR_READY_SITEMAP.md`
- product/vendor workbooks in `outputs/` if present

Scope:
- Add product example data and types.
- Separate public product fields from vendor/wholesale fields.
- Render placeholders on product and wholesale pages.

Acceptance criteria:
- Missing facts are marked `[OWNER DATA NEEDED]`.
- Claim-sensitive fields are marked `[REVIEW REQUIRED]`.
- No SKUs, prices, UPC/GTIN, ingredients, labels, claims, or shipping terms are invented.
```

### SCI-6: Add Authorize.net checkout gate scaffold

Status: Todo
Priority: Medium
Labels: Feature

Description:

```text
Purpose: add a review-gated Authorize.net checkout handoff scaffold without implying payment approval.

Source docs:
- `docs/plans/2026-05-12-custom-app-v1.md`, Task 6
- `docs/SECURE_SUPPORT_CHECKOUT_OPTIONS.md`
- `docs/CUSTOM_APP_SOURCE_MATRIX.md`

Scope:
- Add server-side checkout route stub.
- Add env var names only.
- Return review-gated unavailable status until owner/payment review is complete.

Acceptance criteria:
- No raw card data is collected.
- No payment secrets are exposed.
- No payment method, merchant-account term, approval, refund, dispute, or risk-review status is invented.
```

### SCI-7: Add support, contact, and wholesale inquiry routing

Status: Todo
Priority: Medium
Labels: Feature

Description:

```text
Purpose: add validated intake routes without overcollecting sensitive data.

Source docs:
- `docs/plans/2026-05-12-custom-app-v1.md`, Task 7
- `docs/PUBLIC_SITE_MESSAGING_RULES.md`
- `docs/CUSTOM_APP_QA_CHECKLIST.md`

Scope:
- Add inquiry validation and route handler.
- Support inquiry types: product guidance follow-up, order/shipping, return/refund, wholesale/vendor, general.
- Return safe fallback if destination is not configured.

Acceptance criteria:
- Minimal fields only.
- No response-time, outcome, privacy, or confidentiality overclaims.
- Missing destination details are marked `[OWNER DATA NEEDED]`.
```

### SCI-8: Run custom app QA and launch-blocker review

Status: Todo
Priority: Medium
Labels: Improvement

Description:

```text
Purpose: produce evidence-based QA after implementation slices are ready.

Source docs:
- `docs/plans/2026-05-12-custom-app-v1.md`, Task 8
- `docs/CUSTOM_APP_QA_CHECKLIST.md`
- `docs/PUBLIC_SITE_MESSAGING_RULES.md`

Scope:
- Run build/lint/tests.
- Run browser layout QA.
- Scan claim/privacy/payment/vendor risk language.
- Document launch blockers.

Acceptance criteria:
- QA report includes verification output and screenshots/evidence where relevant.
- No launch readiness is claimed unless every gate is satisfied.
- Unresolved items are marked `[REVIEW REQUIRED]` or `[OWNER DATA NEEDED]`.
```

### SCI-9: Track root @oai/artifact-tool verifier blocker

Status: Backlog
Priority: Low
Labels: Bug

Description:

```text
Purpose: track the known WSL root verifier blocker without fixing it during scaffold work.

Observed issue:
- `npm run verify:public-site-extraction` fails in WSL because `@oai/artifact-tool` is unavailable.
- `npm view @oai/artifact-tool version` returns 404 from the public registry.

Boundary:
- Do not fix unless explicitly assigned.
- Treat this as dependency/source availability, not evidence that workbook outputs are invalid.

Acceptance criteria for future fix:
- Determine the intended source for `@oai/artifact-tool` or replace the dependency with a repo-supported verifier path.
- Root artifact verification command is documented and repeatable in WSL.
```

## Cleanup Completed In Old Workspace

The earlier `VOID - SciTOX Custom App Rebuild (wrong team)` project under `Gistlister` was canceled before this packet was created.

The later `VOID - SciTOX Custom App Rebuild (wrong workspace)` project under the old `Scitox rebuild` team in the `gistlister` workspace was also canceled after this packet was created.

Remaining manual cleanup:
- Delete or archive the old `Scitox rebuild` team manually in Linear if it is no longer needed. The current connector does not expose team deletion.

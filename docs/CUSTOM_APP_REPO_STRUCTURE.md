# Custom App Repo Structure

This document defines the recommended repo layout for the SciTOX custom app build. The existing repo remains the source-of-truth workspace for documents, outputs, source captures, scripts, and the static owner-review demo.

## Recommended Structure

```text
site/
  app/
    page.tsx
    layout.tsx
    globals.css
    products/
    guidance/
    support/
    contact/
    wholesale/
    policies/
    api/
      guidance/
        recommend/
          route.ts
      inquiries/
        route.ts
      checkout/
        authorize-net/
          route.ts
  components/
  data/
  lib/
    guidance/
    payments/
    validation/
  public/
  tests/

docs/
demo/
guidance/
outputs/
project_sources/
scripts/
assets/
```

## Ownership

| Path | Purpose |
| --- | --- |
| `site/` | Custom Next.js app. This should be the main implementation surface for the live rebuild. |
| `site/app/` | App Router pages and API routes. |
| `site/components/` | Shared UI components. |
| `site/data/` | Draft data files for products, guidance source base, policy placeholders, and vendor data. |
| `site/lib/guidance/` | Source-grounded assistant logic, validation, and safe fallback. |
| `site/lib/payments/` | Authorize.net helpers and checkout handoff logic after review. |
| `site/lib/validation/` | Shared schema validation for forms and API input/output. |
| `site/tests/` | Unit, API, and UI tests. |
| `docs/` | Strategy, prompt packets, plans, QA checklists, and review rules. |
| `demo/` | Existing static owner-review prototype. Keep as reference until superseded by `site/`. |
| `guidance/` | Current standalone source-base template and backend scaffold reference. |
| `outputs/` | Generated workbooks and deliverables. |
| `project_sources/` | Captured source evidence and imported shared-chat material. |
| `scripts/` | Root artifact-generation scripts and current standalone demo/guidance server. |

## Scaffold Rules

- Do not move existing root scripts during the first app scaffold.
- Keep root `package.json` artifact scripts working.
- Put app dependencies inside `site/package.json` unless the team explicitly chooses a monorepo workspace.
- Keep real environment secrets out of the repo.
- Add `site/.env.example` with variable names only.
- Prefer source-controlled JSON or TypeScript data files until owner data and CMS needs are stable.
- Do not add a database in V1 unless a task explicitly requires persistence beyond form submission and source files.

## Minimum App Routes

| Route | Purpose | V1 Status |
| --- | --- | --- |
| `/` | Calm customer lobby and primary routing. | V1 |
| `/products` | Product category/routing page. | V1 |
| `/products/[slug]` | Product detail template. | V1 |
| `/guidance` | Structured product guidance flow. | V1 |
| `/support` | FAQ and support routing. | V1 |
| `/contact` | Contact and callback request. | V1 |
| `/shipping-returns` | Shipping, returns, guarantee policy placeholders. | V1 |
| `/wholesale` | Partner/Wholesale inquiry. | V1 |
| `/reviews` | Customer experience handling, if owner-approved. | Later unless approved. |

## Minimum API Routes

| Route | Purpose | V1 Rule |
| --- | --- | --- |
| `/api/guidance/recommend` | Source-grounded guidance recommendation or fallback. | Backend-only, structured output, no frontend LLM secrets. |
| `/api/inquiries` | Contact, support, and vendor inquiry submission. | Validate input and route to owner-approved destination. |
| `/api/checkout/authorize-net` | Create Authorize.net hosted checkout session/token. | Stub until owner/payment review and sandbox credentials exist. |

## Defer

- Admin dashboard.
- Database-backed order management.
- Autonomous purchasing.
- Optional crypto/onramp checkout.
- Real-time encrypted chat.
- Public testimonial/review proof system.
- CMS migration before owner data is stable.


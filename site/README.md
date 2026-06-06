# SciTOX Custom App Scaffold

This is the V1 Next.js App Router scaffold for the private SciTOX rebuild.

## Boundaries

- Do not write final website copy in this app until owner and review gates are complete.
- Do not invent product data, claims, proof, payment approval, privacy/security claims, vendor acceptance, Amazon eligibility, or legal conclusions.
- Use `[OWNER DATA NEEDED]` where business, product, payment, policy, support, or vendor information is missing.
- Use `[REVIEW REQUIRED]` where language or behavior is claim-sensitive.
- Keep LLM, payment, CRM, analytics, and provider secrets server-side.

## Local Commands

```bash
npm run build
npm run dev
```

Open `http://localhost:3000` after starting the development server.

## V1 Routes

- `/`
- `/products`
- `/products/[slug]`
- `/guidance`
- `/support`
- `/contact`
- `/shipping-returns`
- `/wholesale`

## Required Environment Names

See `.env.example`. It contains variable names only.

## Source Docs

- `../AGENTS.md`
- `../docs/CONTINUE_HERE.md`
- `../docs/CUSTOM_APP_BUILD_BRIEF.md`
- `../docs/CUSTOM_APP_REPO_STRUCTURE.md`
- `../docs/CUSTOM_APP_AGENT_PROMPTS.md`
- `../docs/plans/2026-05-12-custom-app-v1.md`

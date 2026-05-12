# SciTOX Static Demo

This is an explorable owner-review prototype for the SciTOX rebuild.

## Purpose

Show the basic feel and flow of the new customer and vendor-facing site without presenting risky product claims, autonomous checkout, encrypted chat, AI advice, vendor approval, payment approval, or final website copy. The product guidance assistant is represented as a live backend-source-grounded feature path with safe fallback behavior.

## What It Demonstrates

- Customer guidance lobby.
- Common product paths.
- Controlled guided questions with a backend guidance check.
- Human follow-up route.
- Low-exposure product detail skeleton.
- Authorize.net as the owner-confirmed current checkout path.
- Optional comfort-oriented payment paths after review.
- Vendor / wholesale layer.
- Owner operations dashboard concepts.
- Parallel agent/service workstreams for Webflow, guidance automation, secure support/checkout, vendor assets, product data, messaging control, and QA.

## Boundaries

- Not final copy.
- Not a production site.
- Not a Webflow export.
- The backend guidance endpoint is live locally when served through `npm run serve:demo`, but it returns safe escalation unless LLM credentials and approved source data are configured.
- Product names, pricing, claims, privacy/security language, support promises, enabled Authorize.net payment methods, and alternate payment paths remain review-gated.

## Guidance Assistant Preview

Run `npm run serve:demo` and use the "Run backend check" button in the Guidance section. The endpoint at `/api/guidance/recommend` demonstrates the required behavior: use backend source material when available, otherwise route to human support instead of inventing a recommendation.

## Supporting Prompt Pack

Use `../docs/AGENT_SERVICE_BUILD_PROMPTS.md` to assign development work to future agents or service builders without drifting away from the current owner direction.

## Preview

Open `demo/index.html` directly, or run `npm run serve:demo` from the repository root for local QA.

See `QA_NOTES.md` for the latest local demo verification notes.

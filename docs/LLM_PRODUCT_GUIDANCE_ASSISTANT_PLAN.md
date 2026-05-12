# Live LLM Product Guidance Assistant Plan

Source context:
- Owner direction from May 12, 2026: the consulting feature should become a live product guidance feature.
- `docs/CUSTOMER_GUIDANCE_LOBBY_DIRECTION.md`
- `docs/PUBLIC_SITE_MESSAGING_RULES.md`
- `docs/SECURE_SUPPORT_CHECKOUT_OPTIONS.md`
- `guidance/source_base.example.json`
- `scripts/guidance_assistant_lib.mjs`

This document plans a live backend-source-grounded LLM product guidance assistant. It is not final website copy and does not approve product recommendations, privacy/security claims, legal conclusions, payment approval, or claim support.

## V1 Feature Goal

Create a live assistant that helps already-aware customers answer structured questions and receive a product path only when the backend source base supports that path.

The assistant should:
- Use a capable LLM through a backend endpoint.
- Refer only to owner-approved backend source information.
- Return a product path, ask for missing information, or route to human support.
- Reduce owner support load without creating unsupported claims or advice.
- Keep the public customer experience calm, serious, warm, direct, and competent.

## Non-Negotiable Boundaries

- Do not put an LLM API key in Webflow or frontend code.
- Do not let the browser directly control source retrieval or model prompting.
- Do not answer from general internet knowledge.
- Do not invent product facts, claims, mappings, instructions, warnings, prices, results, or checkout status.
- Do not use "prescribe," "counsel," "consultation," "diagnosis," "medical advice," "legal advice," or "test-result advice" in public feature language.
- Do not claim encrypted, confidential, anonymous, or private AI unless the exact system and policy language support it.
- Do not route to purchase unless payment/channel review has approved the exact flow.

## Live System Shape

1. Webflow page or embedded component collects structured answers.
2. Browser submits answers to a backend guidance endpoint.
3. Backend loads the approved source base.
4. Backend asks the LLM to choose only from the approved source base.
5. Backend validates the LLM response against a fixed output contract.
6. Frontend displays either a reviewed product path, a request for more information, or human follow-up.
7. Support intake receives escalations with only the minimum needed context.

## Backend Source Base

The source base should include only reviewed, owner-approved material:
- Product names and SKUs `[OWNER DATA NEEDED]`.
- Product category mapping rules `[OWNER DATA NEEDED]`.
- Product images, labels, ingredients, instructions, and warnings `[OWNER DATA NEEDED]`.
- Approved product descriptions `[REVIEW REQUIRED]`.
- Approved product comparison criteria `[REVIEW REQUIRED]`.
- Support escalation rules `[OWNER DATA NEEDED]`.
- Shipping, returns, guarantee, and checkout rules `[OWNER DATA NEEDED]`.
- Claims boundaries and banned language `[REVIEW REQUIRED]`.

The current template lives at `guidance/source_base.example.json`.

## Output Contract

The assistant must return structured data only:
- `recommendation_status`: `product_path`, `needs_more_info`, or `human_follow_up`.
- `recommended_product_id`: product ID only when owner-approved mapping exists.
- `recommended_path_label`: placeholder-safe path label.
- `explanation`: short source-grounded explanation, not final copy.
- `source_ids`: source records used.
- `missing_owner_data`: facts missing from the source base.
- `review_required`: review gates triggered.
- `next_step`: support-safe next action.

## Escalation Triggers

The assistant must route to human support when:
- Customer answers do not match approved product mapping.
- The source base is incomplete.
- The user asks for legal, medical, diagnostic, or test-result advice.
- The user asks for a guaranteed outcome.
- The user asks for privacy, payment, platform, or vendor claims.
- The product path depends on unreviewed claims, warnings, instructions, or checkout details.
- The customer situation appears sensitive, ambiguous, or outside reviewed flows.

## Implementation Scaffold

Current local scaffold:
- `scripts/guidance_assistant_lib.mjs`: backend guidance API logic.
- `scripts/guidance_assistant_server.mjs`: standalone local API server.
- `scripts/serve_demo.mjs`: demo server with the guidance API attached.
- `guidance/source_base.example.json`: source-base template.
- `demo/app.js`: frontend demo call to `/api/guidance/recommend`.

Local scripts:
- `npm run serve:demo` serves the demo and guidance endpoint together.
- `npm run serve:guidance-assistant` serves the guidance API only.

Environment variables for a live LLM adapter:
- `GUIDANCE_LLM_API_KEY`
- `GUIDANCE_LLM_MODEL`
- `GUIDANCE_LLM_BASE_URL` or `GUIDANCE_LLM_ENDPOINT`
- `GUIDANCE_SOURCE_BASE` for a production source-base JSON path
- `GUIDANCE_ALLOWED_ORIGIN` for frontend origin restriction

Without LLM credentials and approved source data, the endpoint returns a safe human-follow-up result instead of making a product recommendation.

## Owner Data Needed

- Approved product list and product IDs.
- Product-to-situation mapping rules.
- Product labels, ingredients, instructions, and warnings.
- Approved comparison criteria.
- Human support workflow and staffing.
- Response-time expectations.
- Privacy policy, data retention, and access rules.
- LLM provider selection and data-processing terms.
- CRM/helpdesk destination for escalations.
- Authorize.net checkout handoff rules.

## Review Required

- Legal/compliance review of guidance boundaries.
- Privacy/security review of answer collection, model processing, storage, logging, and retention.
- Claims review of every product explanation returned by the assistant.
- Payment/channel review before product recommendation flows expose a checkout route.
- Prompt and retrieval QA against hallucination, overclaiming, and unsupported recommendations.
- Human escalation QA.

## Demo Rule

The demo can show a live backend endpoint and source-grounded behavior. It must not present the assistant as a final consultation, counsel, prescription, encrypted chat, guaranteed recommender, or autonomous checkout system.

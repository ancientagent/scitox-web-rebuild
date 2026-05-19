# Continue Here

Use this file as the prompt anchor for future work in this folder.

## Context To Load First

Read these before making project decisions:

1. `AGENTS.md`
2. `docs/DEVELOPMENT_HANDOFF.md`
3. `docs/CUSTOM_APP_BUILD_BRIEF.md`
4. `docs/CUSTOM_APP_AGENT_PROMPTS.md`
5. `docs/CUSTOM_APP_DEVELOPMENT_BACKLOG.md`
6. `docs/CUSTOM_APP_QA_CHECKLIST.md`
7. `docs/CUSTOM_APP_SOURCE_MATRIX.md`
8. `docs/CUSTOM_APP_REPO_STRUCTURE.md`
9. `docs/plans/2026-05-12-custom-app-v1.md`
10. `docs/VENDOR_ROUTE_CONTEXT.md`
11. `docs/WEBSITE_REBUILD_BRIEF.md`
12. `docs/VENDOR_READY_STRATEGY_BRIEF.md`
13. `docs/CUSTOMER_GUIDANCE_LOBBY_DIRECTION.md`
14. `docs/SECURE_SUPPORT_CHECKOUT_OPTIONS.md`
15. `docs/LLM_PRODUCT_GUIDANCE_ASSISTANT_PLAN.md`
16. `docs/PUBLIC_SITE_MESSAGING_RULES.md`
17. `docs/VENDOR_READY_SITEMAP.md`
18. `docs/PAGE_BY_PAGE_WIREFRAME_PLAN.md`
19. `docs/AGENT_SERVICE_BUILD_PROMPTS.md` only for legacy Webflow/reference work
20. `docs/WEBFLOW_DEVELOPMENT_BACKLOG.md` only for legacy Webflow/reference work
21. `docs/WEBFLOW_QA_CHECKLIST.md` only for actual Webflow QA or legacy reference
22. `docs/SHARED_CHAT_CONTEXT.md`
23. `docs/SOURCE_INDEX.md`
24. `docs/TOTALTOX_SINGLE_PRODUCT_DIRECTION.md`
25. `docs/SHARED_CHAT_TRANSCRIPT_STRUCTURED.txt` when exact prior conversation wording is needed
26. `project_sources/external_pages_manifest.json` when checking which linked sources were archived successfully

## Working Rules

- This is the SciTOX site audit, rebuild, and expansion-prep project.
- Keep all claims and strategy evidence-based.
- Do not invent owner data, sales numbers, traffic, margins, conversion rates, product proof, Amazon eligibility, vendor acceptance, or legal conclusions.
- Mark claim-sensitive content as `REVIEW REQUIRED`.
- Treat Amazon as conditional.
- Treat non-Amazon growth as a serious path.
- Separate the public customer site from the partner/vendor-facing surface.
- Treat the public homepage as a calm product guidance lobby, not a dense product-explanation page.
- Treat the current V1 product direction as TotalTOX-first: one public product family with review-gated variant paths, unless the owner explicitly changes direction.
- Build the production implementation as a custom app under `site/` unless the owner explicitly changes the platform decision.
- Treat Webflow and Claude Design as prototype, visual-reference, CMS-reference, or handoff aids unless explicitly assigned as production.
- Build the product guidance assistant as a live backend-source-grounded feature, not as an open-ended frontend AI chat.
- Include secure support and assisted/autonomous checkout options as review-gated solution paths, not live promises.
- Use `docs/CUSTOM_APP_AGENT_PROMPTS.md` for Codex App, Codex CLI, service-builder, design, backend, checkout, vendor, data, messaging, and QA workstreams.
- Include explicit reasoning settings when assigning tasks: `high` for implementation/backend work and `xhigh` for payment, privacy/security, claims, source-grounded recommendations, and launch-blocker review.
- Build task packets and acceptance criteria before implementation work.

## Next Prompt Template

Use this when you want to continue:

```text
Use the SciTOX project sources in this folder.

First read AGENTS.md, docs/DEVELOPMENT_HANDOFF.md, docs/CUSTOM_APP_BUILD_BRIEF.md, docs/CUSTOM_APP_AGENT_PROMPTS.md, docs/CUSTOM_APP_DEVELOPMENT_BACKLOG.md, docs/CUSTOM_APP_QA_CHECKLIST.md, docs/CUSTOM_APP_SOURCE_MATRIX.md, docs/CUSTOM_APP_REPO_STRUCTURE.md, docs/plans/2026-05-12-custom-app-v1.md, docs/VENDOR_ROUTE_CONTEXT.md, docs/WEBSITE_REBUILD_BRIEF.md, docs/VENDOR_READY_STRATEGY_BRIEF.md, docs/CUSTOMER_GUIDANCE_LOBBY_DIRECTION.md, docs/SECURE_SUPPORT_CHECKOUT_OPTIONS.md, docs/LLM_PRODUCT_GUIDANCE_ASSISTANT_PLAN.md, docs/PUBLIC_SITE_MESSAGING_RULES.md, docs/VENDOR_READY_SITEMAP.md, docs/PAGE_BY_PAGE_WIREFRAME_PLAN.md, docs/SHARED_CHAT_CONTEXT.md, and docs/SOURCE_INDEX.md.
If exact prior chat wording matters, use docs/SHARED_CHAT_TRANSCRIPT_STRUCTURED.txt.

Continue the SciTOX site audit/rebuild work from the prior shared ChatGPT conversation.
Do not invent owner data, sales numbers, traffic, margins, proof, Amazon eligibility, vendor acceptance, or legal conclusions.
Keep claim-sensitive language marked REVIEW REQUIRED.
Treat Amazon as conditional and non-Amazon growth as serious.
Treat vendor readiness as the primary goal unless I explicitly change direction.
Treat the custom app under site/ as the primary implementation path unless I explicitly change direction.
Use explicit reasoning settings for assigned agents/tasks.

Current task:
[INSERT TASK HERE]
```

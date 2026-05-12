# Custom App Source Matrix

This matrix records the platform sources used to justify the custom-app build direction. It is a planning source map, not legal, payment, or compliance advice.

## Source Summary

| Source | What It Establishes | Project Impact |
| --- | --- | --- |
| Webflow custom code documentation | Webflow custom code supports HTML, CSS, and JavaScript in page/site code areas, but not server-side languages. Custom code has compatibility and support limitations, and ecommerce custom scripts can create PCI-related responsibilities. | Webflow can support embeds and visual pages, but should not be the primary home for backend guidance, server secrets, payment-session creation, or source-grounded LLM logic. |
| Webflow AI Site Builder documentation | Webflow AI Site Builder is useful for creating a responsive site structure, but is limited to AI-generated sites and initial structure/content generation workflows. | Useful for rough page structure or visual exploration, not the primary implementation authority for this project. |
| Webflow AI Code Components documentation | Webflow AI Code Components can help generate client-side components in Webflow. | Useful for prototype widgets only. Do not rely on it for secret-bearing backend logic, payment session creation, or source-grounded assistant rules. |
| Next.js Route Handlers documentation | Next.js App Router route handlers support server-side request handling for API-like endpoints. | Good fit for `/api/guidance/recommend`, inquiry submission, checkout handoff, and server-side validation. |
| Vercel environment variables documentation | Vercel supports environment variables for builds and runtime configuration. | Good fit for keeping LLM keys, Authorize.net credentials, source-base path, and integration secrets out of frontend code. |
| Authorize.net Accept Hosted documentation | Accept Hosted provides a hosted payment form flow where the merchant requests a hosted payment page token and redirects/embeds a payment form. | Good primary checkout direction because the site can hand off payment UI to Authorize.net rather than handling raw card data directly. Exact account settings still require owner/payment review. |

## Official Sources

- Webflow custom code in head/body tags: https://help.webflow.com/hc/en-us/articles/33961357265299-Custom-code-in-head-and-body-tags
- Webflow AI Site Builder: https://help.webflow.com/hc/en-us/articles/38840145286035-Build-a-site-with-Webflow-s-AI-site-builder
- Webflow AI Code Components: https://help.webflow.com/hc/en-us/articles/51168990228499-Build-AI-code-components
- Next.js Route Handlers: https://nextjs.org/docs/app/getting-started/route-handlers
- Vercel environment variables: https://vercel.com/docs/environment-variables
- Authorize.net Accept Hosted: https://developer.authorize.net/api/reference/features/accept-hosted.html

## Build Implications

1. Use Webflow only where it is strongest: visual prototyping, static sections, simple CMS/reference work, and owner-facing design review.
2. Use a custom app for source-controlled product guidance, server-side validation, secrets, checkout-session generation, forms, data routing, and automated QA.
3. Keep all LLM and payment credentials server-side.
4. Use hosted payment pages where possible to reduce custom payment handling.
5. Treat every payment, privacy, security, and claims statement as review-gated until the exact provider workflow and owner data are known.

## Unresolved Source Needs

- Authorize.net account-specific enabled payment methods, merchant account category, fraud settings, refund process, and Accept Hosted configuration `[OWNER DATA NEEDED]`.
- LLM provider, data-processing terms, retention/logging behavior, and model selection `[OWNER DATA NEEDED]`.
- CRM/helpdesk/form provider and data-routing policy `[OWNER DATA NEEDED]`.
- Optional crypto/onramp provider review, if the owner still wants alternate comfort-oriented payment paths `[REVIEW REQUIRED]`.
- Current public SciTOX site crawl if exact current wording matters before launch `[REVIEW REQUIRED]`.


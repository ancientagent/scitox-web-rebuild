# Custom App QA Checklist

Use this checklist before owner review, staging review, and public launch of the custom SciTOX app. This is not a legal review, payment approval, claims approval, vendor approval, or platform acceptance.

Status values:
- `PASS`
- `FAIL`
- `BLOCKER`
- `REVIEW REQUIRED`
- `OWNER DATA NEEDED`
- `N/A`

## App And Environment

| Check | Pass Criteria | Evidence To Capture | Status |
| --- | --- | --- | --- |
| Local app starts | `site/` app starts on the expected local URL. | URL and screenshot. |  |
| Build passes | Production build completes without errors. | Build output summary. |  |
| Secrets are server-side | No LLM, Authorize.net, CRM, analytics, or provider secrets appear in client bundles or public files. | Secret scan result. |  |
| Environment variables documented | Required env vars are listed without real secret values. | `.env.example` or docs screenshot. |  |
| Root artifact scripts still work | Existing root scripts for workbooks/demo are not broken by app package changes. | Script output summary. |  |
| Public UI marker scan | Public pages/components do not render `[REVIEW REQUIRED]`, `[OWNER DATA NEEDED]`, scaffold/demo labels, or developer-facing planning copy. | Source scan and rendered-route scan. |  |

## Mobile Layout

| Check | Pass Criteria | Evidence To Capture | Status |
| --- | --- | --- | --- |
| Home mobile layout | First viewport clearly shows calm routing and primary CTA without overlap. | Mobile screenshot. |  |
| Guidance mobile layout | Questions, controls, and results fit without crowding or panic framing. | Mobile screenshot. |  |
| Resources mobile layout | Knowledge Center explains fit, boundaries, official resources, and next steps without legal/medical advice or internal markers. | Mobile screenshot. |  |
| Product mobile layout | Product facts are readable, restrained, and not overclaiming; missing data does not render as internal markers. | Mobile screenshot. |  |
| Support/contact mobile layout | Forms are readable, minimal, and easy to complete. | Mobile screenshot and field list. |  |
| Wholesale mobile layout | Vendor form and product data placeholders are readable and restrained. | Mobile screenshot. |  |

## Desktop Layout

| Check | Pass Criteria | Evidence To Capture | Status |
| --- | --- | --- | --- |
| Home desktop layout | Hierarchy is clear and serious, with no oversized hype hero. | Desktop screenshot. |  |
| Guidance desktop layout | Structured flow is understandable and does not present advice claims. | Desktop screenshot. |  |
| Resources desktop layout | Knowledge Center is calm, readable, and free of internal/developer-facing copy. | Desktop screenshot. |  |
| Product desktop layout | Product sections separate facts, support, and checkout routing without exposing internal review markers. | Desktop screenshot. |  |
| Vendor desktop layout | Vendor page feels professional and data-forward. | Desktop screenshot. |  |

## Navigation And Routing

| Check | Pass Criteria | Evidence To Capture | Status |
| --- | --- | --- | --- |
| Header navigation | V1 routes are visible and not cluttered. | Link list. |  |
| Footer navigation | Product, support, policy, privacy, terms, contact, and wholesale links are available. | Link list. |  |
| Guidance first screen | `/guidance` first shows only the full-screen "Welcome to SciTOX." fade-in, then fades out to the current-situation question. | Browser timing evidence. |  |
| Guidance entry isolation | Welcome, current-situation, follow-up pills, and routing messages show no header, footer, privacy prep, guidance explainer, or other page sections. | Browser flow evidence. |  |
| Guidance information branch | First-time visitor -> information branch routes to `/resources`. | Browser flow evidence. |  |
| Guidance next-step branch | First-time visitor -> next-step branch continues to private-session product guidance. | Browser flow evidence. |  |
| Returning-client branch | Active/returning visitor routes toward support paths. | Browser flow evidence. |  |
| Mobile menu | Menu opens/closes and all links resolve. | Screenshot and link test. |  |
| 404/unknown paths | Unknown paths do not expose technical errors or risky language. | Test URL result. |  |
| Legacy URLs | Important current-site URLs redirect or are documented for later. | Redirect list. |  |

## Forms And Intake

| Check | Pass Criteria | Evidence To Capture | Status |
| --- | --- | --- | --- |
| Guidance intake | Collects only necessary structured answers and avoids advice framing. | Field list. |  |
| Contact form | Routes inquiry type clearly and validates required fields. | Test submission. |  |
| Vendor inquiry form | Captures business/contact fields without sensitive customer intake. | Test submission. |  |
| Error states | Validation errors are clear and calm. | Screenshot. |  |
| Success states | Confirmation copy does not overpromise response times, outcomes, privacy, or availability. | Screenshot. |  |
| Data destination | Form submissions reach approved owner destination. | Delivery evidence. |  |
| Spam protection | Spam protection works without breaking legitimate submissions. | Test result. |  |

## Product Guidance Assistant

| Check | Pass Criteria | Evidence To Capture | Status |
| --- | --- | --- | --- |
| Backend-only LLM access | Browser never calls the LLM provider directly. | Network inspection. |  |
| Source-base load | Backend loads approved source data or returns safe fallback. | API response evidence. |  |
| Structured response | API returns only approved fields from the output contract. | API response sample. |  |
| Missing owner data | Incomplete product mapping routes to `human_follow_up` or `needs_more_info`. | API test. |  |
| Disallowed advice | Legal, medical, diagnostic, test-result, guarantee, privacy, or platform questions escalate. | API test. |  |
| No invented products | Assistant never invents product IDs or facts outside source base. | API test. |  |
| Logging/data retention | Any logging is minimized and reviewed. | Config/review note. |  |

## Product Pages

| Check | Pass Criteria | Evidence To Capture | Status |
| --- | --- | --- | --- |
| Product facts | Product name, SKU, size, price, ingredients, instructions, warnings, images, and availability use owner-confirmed data or placeholders. | Page screenshot. |  |
| Claims markers | Claim-sensitive sections are hidden, reviewed, or gated internally. Public UI does not show review markers. | Copy scan. |  |
| Owner gaps | Missing product facts are marked `[OWNER DATA NEEDED]` in draft/admin/internal data context, not accidentally public as final copy. | Scan result. |  |
| Checkout CTA | Buy/checkout route only appears if payment path is approved for that environment. | CTA screenshot and approval note. |  |

## Knowledge Center

| Check | Pass Criteria | Evidence To Capture | Status |
| --- | --- | --- | --- |
| Fit explanation | Page explains that SciTOX is for prescribed-medication/private-medical-context privacy concerns in ordinary hiring/workplace settings without overclaiming. | Screenshot/copy scan. |  |
| Mandated-screening boundary | Page clearly states SciTOX is not for state, federal, court-ordered, probation, parole, DOT, government-regulated, or otherwise legally mandated screening. | Screenshot/copy scan. |  |
| Official resources | Page links to official resources for EEOC/ADA, HHS/HIPAA, CDC ADHD context, DOT/SAMHSA, and FTC background checks. | Link list. |  |
| Legal/medical boundary | Page does not provide legal advice, medical advice, claim evaluation, outcome guarantees, or employer-liability conclusions. | Copy review. |  |
| User-facing clarity | Page reads as a customer Knowledge Center, not an internal planning document. | Browser review. |  |

## Vendor / Wholesale Layer

| Check | Pass Criteria | Evidence To Capture | Status |
| --- | --- | --- | --- |
| Vendor tone | Page is restrained, organized, and separate from customer emotional flow. | Screenshot. |  |
| Product data table | SKU, MSRP, wholesale, MOQ, case pack, UPC/GTIN are present or owner-needed. | Table screenshot/export. |  |
| Documents checklist | Required vendor docs are listed without implying completion if unconfirmed. | Screenshot. |  |
| No false approvals | No vendor, retailer, marketplace, Amazon, payment, or distributor acceptance claims appear. | Copy scan. |  |
| Inquiry delivery | Vendor inquiry reaches approved owner destination. | Test evidence. |  |

## Authorize.net And Payments

| Check | Pass Criteria | Evidence To Capture | Status |
| --- | --- | --- | --- |
| Account details confirmed | API login, transaction key, signature key, environment, merchant terms, and enabled methods are owner-confirmed. | Owner checklist. |  |
| Hosted flow selected | Payment flow uses Authorize.net hosted/Accept Hosted pattern unless reviewed otherwise. | Integration note. |  |
| No raw card handling | App does not collect or store raw card data. | Code/network review. |  |
| Sandbox tested | Sandbox transaction path works before live credentials. | Sandbox evidence. |  |
| Refund/dispute policy reviewed | Public policy language matches actual process. | Policy review note. |  |
| Alternate payment paths | Crypto/onramp or other comfort options remain hidden or review-gated unless approved. | Review note. |  |

## Analytics And Search

| Check | Pass Criteria | Evidence To Capture | Status |
| --- | --- | --- | --- |
| GA4/tagging | Analytics fires on core pages if owner approves. | Debug evidence. |  |
| No sensitive analytics payloads | Intake answers, private details, and sensitive form content are not sent to analytics. | Payload review. |  |
| Search Console | Property, sitemap, and indexing settings are ready or owner-needed. | Access/submission evidence. |  |
| Metadata | Page titles/descriptions avoid unreviewed claims. | Metadata scan. |  |

## Launch Blockers

Any item below should block launch until resolved or explicitly deferred by owner:

| Blocker | Why It Blocks Launch | Resolution Needed | Status |
| --- | --- | --- | --- |
| Unreviewed high-risk claims | Customer, vendor, payment, ad, or legal risk. | Remove, hide, or review. |  |
| Public internal markers | Customer-facing UI exposes `[REVIEW REQUIRED]`, `[OWNER DATA NEEDED]`, scaffold/demo labels, or developer planning copy. | Remove from public UI; keep gates internally. |  |
| Frontend LLM or exposed secrets | Security and provider risk. | Move to server-side route. |  |
| Guidance can invent recommendations | Customer and claims risk. | Enforce source-grounded structured output. |  |
| Payment flow unverified | Customer, processor, refund, and dispute risk. | Confirm Authorize.net setup and sandbox test. |  |
| False privacy/security promises | Trust and compliance risk. | Technical and policy review. |  |
| Forms not delivering | Lost customer/vendor inquiries. | Fix destination and retest. |  |
| Missing product essentials | Site cannot support product or vendor review. | Add owner data or hide incomplete sections. |  |
| Analytics leaks sensitive data | Privacy risk. | Remove sensitive payloads. |  |
| Vendor page implies acceptance | False approval risk. | Remove or rewrite after review. |  |

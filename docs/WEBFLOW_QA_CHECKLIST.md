# SciTOX Webflow QA Checklist

Source context:
- `docs/WEBSITE_REBUILD_BRIEF.md`
- `docs/VENDOR_READY_SITEMAP.md`
- `docs/PAGE_BY_PAGE_WIREFRAME_PLAN.md`
- `docs/PUBLIC_SITE_MESSAGING_RULES.md`

Use this checklist before publishing the SciTOX Webflow rebuild. It is a QA and launch-readiness document, not a legal review, claim approval, or proof of platform/vendor acceptance.

Status values:
- `PASS`
- `FAIL`
- `BLOCKER`
- `REVIEW REQUIRED`
- `OWNER DATA NEEDED`
- `N/A`

## Mobile Layout

| Check | Pass Criteria | Evidence To Capture | Status |
|---|---|---|---|
| Home mobile layout | First viewport clearly shows product-first direction, primary CTA, and no overlapping text/buttons. | Mobile screenshot. |  |
| Product Category mobile layout | Product/category cards stack cleanly, CTAs are visible, and text wraps cleanly. | Mobile screenshot. |  |
| Product Detail mobile layout | Product image, facts, CTA, guidance/support links, and policy links are readable without crowding. | Mobile screenshot. |  |
| Private Product Guidance / Intake mobile layout | Form fields are readable, minimal, and easy to complete. | Mobile screenshot + form field list. |  |
| FAQ / Support mobile layout | FAQ categories and support CTAs are easy to scan and tap. | Mobile screenshot. |  |
| Reviews / Customer Experiences mobile layout | Review placeholders do not imply proof or guaranteed outcomes. | Mobile screenshot + copy check. |  |
| Shipping / Returns / Guarantee mobile layout | Policy sections are readable and not contradictory. | Mobile screenshot. |  |
| Contact mobile layout | Inquiry selector, form, and support links are usable. | Mobile screenshot + form test. |  |
| Partner / Wholesale Inquiry mobile layout | Vendor form and product/documentation sections are readable and restrained. | Mobile screenshot + form test. |  |

## Desktop Layout

| Check | Pass Criteria | Evidence To Capture | Status |
|---|---|---|---|
| Home desktop layout | Page hierarchy is clear, with no oversized hero, cluttered navigation, or hidden CTA. | Desktop screenshot. |  |
| Product Category desktop layout | Cards/table align cleanly and comparison content is not cramped. | Desktop screenshot. |  |
| Product Detail desktop layout | Product facts, image, CTA, and support/policy areas are balanced and readable. | Desktop screenshot. |  |
| Private Product Guidance / Intake desktop layout | Form does not feel overbuilt or overcollect sensitive data. | Desktop screenshot + form field list. |  |
| FAQ / Support desktop layout | Categories and support blocks are organized, not dense or repetitive. | Desktop screenshot. |  |
| Reviews desktop layout | Reviews/customer experience section remains neutral and not proof-framed. | Desktop screenshot + copy check. |  |
| Shipping / Returns / Guarantee desktop layout | Policy content is readable and structured. | Desktop screenshot. |  |
| Partner / Wholesale Inquiry desktop layout | Vendor-facing sections feel professional, restrained, and separate from customer tone. | Desktop screenshot. |  |

## Navigation

| Check | Pass Criteria | Evidence To Capture | Status |
|---|---|---|---|
| Header navigation | Header includes only lean V1 routes: Products, Product Guidance, FAQ / Support, Contact, Wholesale / Partners. | Header screenshot + link list. |  |
| Footer navigation | Footer includes product, support, contact, policy, privacy, terms, and wholesale links. | Footer screenshot + link list. |  |
| Mobile menu | Mobile menu opens/closes correctly and all links work. | Mobile menu screenshot + link test. |  |
| Active/current page state | User can tell where they are without confusing duplicate pages. | Screenshot on each core page. |  |
| Duplicate legacy paths | Old/duplicative pages are either redirected, removed, or intentionally parked. | Redirect/removal list. |  |

## Forms

| Check | Pass Criteria | Evidence To Capture | Status |
|---|---|---|---|
| Product guidance form | Collects only necessary product-support fields. No legal/medical/test-result advice framing. | Field list + test submission. |  |
| Contact form | Routes inquiry types cleanly: product, order/shipping, returns/refunds, wholesale, general. | Field list + test submission. |  |
| Vendor inquiry form | Includes business/contact fields and avoids sensitive customer-intake details. | Field list + test submission. |  |
| Confirmation states | Submit success/error states are clear and do not overpromise response time. | Screenshots. |  |
| Form delivery | Submissions reach approved email, spreadsheet, CRM, or Webflow inbox. | Test submission evidence. |  |
| Consent/privacy notice | Forms include reviewed privacy/data handling language or `[REVIEW REQUIRED]`. | Screenshot + privacy review note. |  |
| Spam prevention | Spam protection is enabled without breaking form submission. | Settings screenshot. |  |

## Product Pages

| Check | Pass Criteria | Evidence To Capture | Status |
|---|---|---|---|
| Product CMS fields | Required fields exist: product name, SKU, category, image, short description, use/directions, ingredients, price, availability, claim review status. | CMS field screenshot/export. |  |
| Product placeholders | Missing facts are clearly marked `[OWNER DATA NEEDED]`. | Product-page screenshot. |  |
| Review markers | Claim-sensitive descriptions, instructions, warnings, reviews, and results are marked `[REVIEW REQUIRED]`. | Product-page screenshot. |  |
| Product images | Images are owner-approved or marked `[OWNER DATA NEEDED]`. | Asset list. |  |
| Product CTA | Checkout/buy path is only present if owner/payment review approves it. | CTA screenshot + approval note. |  |
| Product support links | Product pages link to Product Guidance, FAQ / Support, Shipping / Returns, and Contact. | Link test. |  |

## Vendor Inquiry Page

| Check | Pass Criteria | Evidence To Capture | Status |
|---|---|---|---|
| Vendor tone | Page is restrained, product-data driven, and not customer-emotional or panic framed. | Screenshot + copy review. |  |
| Buyer fit section | Buyer types are clear without claiming vendor acceptance. | Screenshot. |  |
| Product line placeholders | SKU, MSRP, wholesale price, MOQ, case pack, UPC/GTIN, images, and ingredients are present or marked `[OWNER DATA NEEDED]`. | Screenshot/table export. |  |
| Documentation checklist | Vendor documents are listed without implying completion if not confirmed. | Screenshot. |  |
| Inquiry form | Captures company, contact, business type, website, product interest, and message. | Field list + test submission. |  |
| No false approvals | No Amazon, vendor, marketplace, payment, or retailer approval claims appear. | Copy scan. |  |

## Policy Links

| Check | Pass Criteria | Evidence To Capture | Status |
|---|---|---|---|
| Privacy link | Privacy page/link exists and is accessible from footer and forms. | Link test. |  |
| Terms link | Terms page/link exists and is accessible from footer. | Link test. |  |
| Shipping link | Shipping information is accessible from footer, product pages, and support page. | Link test. |  |
| Returns/refunds link | Returns/refund policy is accessible and not contradictory. | Link test + copy review. |  |
| Guarantee language | Any guarantee language is owner-approved and marked for review until cleared. | Copy review. |  |
| Contact/support policy route | Users can find support from policy pages. | Link test. |  |

## Analytics

| Check | Pass Criteria | Evidence To Capture | Status |
|---|---|---|---|
| GA4 installed | GA4 tag is installed and firing on all core pages. | Realtime/debug screenshot. |  |
| Form events | Product guidance, contact, and vendor inquiry submissions are tracked. | Debug event evidence. |  |
| CTA events | Main CTAs are tracked: product view, guidance start, contact, wholesale inquiry. | Debug event evidence. |  |
| Phone/email clicks | Phone, SMS, email, and other contact clicks are tracked if used. | Debug event evidence. |  |
| No sensitive data in analytics | URLs/events do not send personal, sensitive, or intake details to analytics. | Event payload review. |  |
| Internal traffic note | Owner/team test traffic handling is documented. | Settings note. |  |

## Search Console

| Check | Pass Criteria | Evidence To Capture | Status |
|---|---|---|---|
| Property access | Search Console property is available or marked `[OWNER DATA NEEDED]`. | Access screenshot/note. |  |
| Sitemap submitted | Webflow sitemap is generated and submitted after launch. | Submission screenshot. |  |
| Indexing check | Core public pages are indexable unless intentionally noindexed. | URL inspection evidence. |  |
| Redirect check | Important legacy URLs redirect or are intentionally handled. | Redirect list. |  |
| Page titles/descriptions | Metadata is present but does not include unreviewed claims. | Metadata export/screenshot. |  |

## Claim-Sensitive Language

| Check | Pass Criteria | Evidence To Capture | Status |
|---|---|---|---|
| Outcome claims | No unreviewed pass-result, drug-test, guarantee, success-rate, or result claims are published. | Site copy scan. |  |
| Scientific/proven claims | No "proven," "tested," "#1," "most effective," or similar claims appear unless reviewed. | Site copy scan. |  |
| Testimonials/reviews | Reviews are not treated as proof or typical outcomes. | Reviews page scan. |  |
| Competitor claims | No competitor attack language appears. | Site copy scan. |  |
| Legal/medical advice | No copy implies legal advice, medical advice, diagnosis, or professional consultation. | Site copy scan. |  |
| Placeholder markers | Unresolved claim-sensitive areas remain `[REVIEW REQUIRED]` or are removed before public launch. | Marker scan. |  |

## Privacy / Security Claims

| Check | Pass Criteria | Evidence To Capture | Status |
|---|---|---|---|
| Encryption claims | No "encrypted AI consultation" or encryption claim appears unless technically and legally verified. | Site copy scan. |  |
| Confidentiality claims | No absolute confidentiality/privacy guarantee appears unless policy and system support it. | Site copy scan. |  |
| AI guidance | No open-ended AI chat is launched in V1. Any product guidance is controlled and review-marked. | Feature check. |  |
| Form privacy | Forms explain data use only in reviewed language or placeholders. | Form screenshot. |  |
| Data minimization | Intake forms collect only needed fields. | Field list. |  |

## Owner Data Placeholders

| Check | Pass Criteria | Evidence To Capture | Status |
|---|---|---|---|
| Product data | Missing product names, SKUs, ingredients, images, prices, availability, and directions are marked `[OWNER DATA NEEDED]`. | Product-page scan. |  |
| Wholesale data | Missing MSRP, wholesale price, MOQ, case pack, UPC/GTIN, shipping terms, and insurance are marked `[OWNER DATA NEEDED]`. | Vendor-page scan. |  |
| Support data | Missing support hours, response times, phone/text/email routing, and CRM/helpdesk details are marked `[OWNER DATA NEEDED]`. | Support/contact scan. |  |
| Policy data | Missing shipping, return, guarantee, privacy, and terms details are marked `[OWNER DATA NEEDED]`. | Policy scan. |  |
| Placeholder policy before launch | Public launch either keeps placeholders intentionally, replaces them after approval, or hides incomplete sections. | Launch decision note. |  |

## Broken Links

| Check | Pass Criteria | Evidence To Capture | Status |
|---|---|---|---|
| Header links | Every header link resolves correctly on desktop and mobile. | Link test. |  |
| Footer links | Every footer link resolves correctly. | Link test. |  |
| Product links | Product category and product detail links resolve correctly. | Link test. |  |
| Form redirects | Form success/error routes work. | Form test. |  |
| Policy links | Privacy, terms, shipping, returns/refunds, and contact links work. | Link test. |  |
| Vendor links | Vendor inquiry, documentation placeholders, and public product links work. | Link test. |  |
| Legacy links | Retired old-site links are redirected or documented. | Redirect report. |  |

## Launch Blockers

Any item below should block public launch until resolved or explicitly accepted by the owner:

| Blocker | Why It Blocks Launch | Resolution Needed | Status |
|---|---|---|---|
| Unreviewed high-risk claims | Could create customer, vendor, payment, ad, or legal risk. | Remove, rewrite later, or keep `[REVIEW REQUIRED]` only in non-public draft state. |  |
| Contradictory refund/guarantee language | Creates customer, payment, and vendor trust risk. | Owner-approved policy and review. |  |
| False privacy/security promises | Could overpromise data protection or confidentiality. | Technical verification, policy review, and copy review. |  |
| Forms not delivering | Customer/vendor inquiries may be lost. | Test and confirm delivery. |  |
| Overcollection of sensitive data | Creates privacy and trust risk. | Minimize fields and review policy language. |  |
| Broken core navigation | Users cannot complete primary flows. | Fix links/menu/routes. |  |
| Missing product essentials | Product pages are not usable or vendor-ready. | Add owner data or hide incomplete sections. |  |
| Missing policy links | Reduces customer/vendor/payment reviewer trust. | Publish and link policy pages. |  |
| Analytics absent or leaking sensitive data | Either blind launch or privacy issue. | Install/verify analytics and payloads. |  |
| Vendor page implies acceptance/approval | Creates false vendor/platform claims. | Remove or rewrite as placeholder. |  |

## Final Launch Decision

| Decision Item | Required Before Launch | Status |
|---|---|---|
| Owner approval | Owner approves visible pages, policy language, forms, and known unresolved placeholders. |  |
| Claims review complete or unresolved claims removed | No unreviewed high-risk claims are published. |  |
| Privacy/form review complete | Intake/contact/vendor forms are safe and deliver correctly. |  |
| Mobile QA passed | Core mobile pages pass layout and usability checks. |  |
| Desktop QA passed | Core desktop pages pass layout and usability checks. |  |
| Link QA passed | No broken core links remain. |  |
| Analytics/Search Console plan accepted | Tracking is working or owner knowingly accepts launch without complete setup. |  |


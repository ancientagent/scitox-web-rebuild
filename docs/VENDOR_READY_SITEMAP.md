# SciTOX Vendor-Ready Sitemap

Source context:
- `docs/WEBSITE_REBUILD_BRIEF.md`
- `docs/VENDOR_READY_STRATEGY_BRIEF.md`
- `docs/PUBLIC_SITE_MESSAGING_RULES.md`
- `docs/SHARED_CHAT_CONTEXT.md`

This sitemap is for a lean, buildable rebuild. The current primary implementation path is the custom app described in `docs/CUSTOM_APP_BUILD_BRIEF.md`; Webflow references are legacy/reference unless Webflow is explicitly selected. This document does not include final copy, approved claims, vendor acceptance, Amazon eligibility, legal conclusions, or proof claims.

Internal docs/data should use `[REVIEW REQUIRED]` and `[OWNER DATA NEEDED]` where facts are not verified. Public customer-facing UI must not render those internal markers; it should hide incomplete sections, use neutral boundaries, or route to guidance/support.

## Build Principle

Use the custom app as the primary marketing/product, guidance, intake, and vendor-readiness surface. Keep checkout/payment migration outside V1 unless owner and payment review clear it.

Suggested custom app structure:
- Static pages for home, products, support, contact/intake, wholesale inquiry, and policy pages.
- Source-controlled product/SKU data first; CMS can be added later if product data is ready enough.
- Server-side forms for customer support/intake and vendor inquiry, routed to email plus spreadsheet/CRM if approved.
- A customer product lobby pattern on the homepage, with direct TotalTOX product entry, optional add-ons, and escalation for nuanced situations.

## Layer 1: Public Customer Site

| Page | Purpose | Target Audience | Must-Have Sections | Claim-Sensitive Areas | Owner Data Needed | V1 or Later |
|---|---|---|---|---|---|---|
| Home / Product Lobby | Establish trust, orient visitors, and route them to product review, optional add-ons, support, or checkout without panic-sales framing or dense first-screen product explanation. | Direct customers; vendor/payment reviewers who inspect the public site. | Calm lobby hero placeholder; product entry points; optional add-on path; human support/callback placeholder; support reassurance placeholders; review-safe trust section; policy/support footer. | Outcome language; choice-direction logic; AI/private guidance; privacy/security/encryption claims; testimonials/results; guarantee/refund mentions. | Current product categories; approved support path; product/support boundaries; privacy policy details; chat/form/callback tooling; review/testimonial source status; owner-approved positioning. | V1 |
| Product Category / Product Finder | Let customers compare product paths or categories without overclaiming results. | Direct customers deciding what product area applies to them. | Category cards; short category explanations; product routing CTA; support/intake CTA; review markers for claim-heavy areas; links to product detail pages. | Category names or framing tied to unapproved outcomes; "works for" language; timing/result promises. | Final product category list; SKU mapping; approved category language; current inventory/availability. | V1 |
| Product Detail Template | Present each product cleanly with structured, review-safe product information. | Direct customers; support team; vendor reviewers checking public product quality. | Product name; image; short description placeholder; product facts; neutral customer-experience link to the live Trustpilot profile; use/directions placeholder; FAQ snippets; support CTA; shipping/returns links; claim review markers. | Product efficacy; directions that imply guaranteed outcomes; ingredients/safety; timing; refunds/guarantee; copied reviews; ratings/counts; review-as-proof language. | SKU; product name; images; ingredients; directions; price; availability; shipping details; refund/guarantee rules; substantiation status; Trustpilot Business/widget or API permission if embedded reviews are desired. | V1 if product data is available; otherwise build template with placeholders |
| Support | Present a focused help path after product review is not enough. | Direct customers; returning clients; support team; vendor/payment reviewers. | Product routing; order and follow-up support framing; minimal support form; support boundary language. | Claims embedded in answers; refund/guarantee language; privacy/security statements; result expectations; overcollection of sensitive data. | Support logs; top questions; actual support channels; refund policy; shipping timelines; privacy/data handling workflow. | V1 |
| Contact / Product Support Intake | Provide a minimal, structured way for customers to ask product questions or request human follow-up. | Direct customers needing product support; support team. | Minimal form; product interest; order question option; human callback/follow-up routing; privacy notice placeholder; expected response timing placeholder. | "Private," "confidential," or "encrypted" claims; AI/counsel/consultation claims; overcollection of sensitive data; support response promises. | Form routing; CRM/helpdesk/chat choice; data retention; support ownership; response-time policy; callback workflow; privacy policy; product/support boundaries. | V1 |
| Shipping, Returns, Privacy, Terms Hub | Make policies visible and reduce vendor/payment-review friction. | Customers; payment reviewers; vendors; support team. | Links to privacy, shipping, returns/refunds, terms, contact/support; short placeholders for each policy. | Refund/guarantee claims; privacy/security commitments; liability/disclaimer language; payment/checkout representations. | Current policies; legal review status; refund handling; shipping times; payment processor details; data retention policy. | V1 |
| Reviews / Customer Experience | Preserve trust assets without treating reviews as proof. | Direct customers; vendor reviewers. | Neutral review module placeholder; source/permission notes; no success-rate framing; link back to product/support. | Testimonials, result screenshots, pass-result claims, AI summaries, ratings/counts, typical-result implications. | Verified review sources; permissions; platform data; moderation policy; legal/compliance review. | Later, unless review data and approval are ready |

## Layer 2: Vendor / Wholesale Layer

| Page | Purpose | Target Audience | Must-Have Sections | Claim-Sensitive Areas | Owner Data Needed | V1 or Later |
|---|---|---|---|---|---|---|
| Partner / Wholesale Inquiry | Create a professional, restrained entry point for retailers, smoke shops, head shops, distributors, online vendors, and wholesale buyers. | Vendors; wholesalers; distributors; retailers; partner reviewers. | Page purpose; restrained brand/product overview; buyer type selector; product line overview placeholder; documentation checklist; inquiry process; vendor inquiry form; policy/support links. | Vendor acceptance; marketplace eligibility; Amazon language; product outcome claims; wholesale success claims; unsupported proof. | Buyer workflow; approved product overview; inquiry routing; response owner; required business qualification fields; privacy/form handling. | V1 |
| Product Line Overview | Show the product line in a buyer-friendly structure without final wholesale economics unless confirmed. | Wholesale buyers; distributors; retailers; internal sales prep. | Product line table/card layout; SKU placeholders; product images; MSRP/wholesale placeholders; case pack/MOQ placeholders; documentation status. | Product performance claims; retailer-safe claims; proof/test language; pricing/margin claims if unconfirmed. | SKU list; product names; images; MSRP; wholesale price; MOQ; case packs; UPC/GTIN; inventory status. | V1 if data is available; otherwise page section inside Wholesale Inquiry |
| Vendor Documentation Checklist | Show what SciTOX can provide and what is still pending before outreach. | Wholesale buyers; internal owner/team; vendor prep agents. | Checklist for product data, labels, images, ingredients, policies, insurance, line sheet, claims review, fulfillment readiness. | Any statement implying documents are complete or approved when they are not. | Label files; product images; ingredients; insurance; policies; claims review; line sheet; fulfillment details. | V1 |
| Wholesale FAQ | Answer buyer-process questions without exposing unapproved terms. | Wholesale buyers; distributors; internal sales prep. | Account/inquiry process; order process placeholder; product documentation; support handoff; policy links. | Wholesale pricing; MOQ; returns; payment terms; exclusivity; vendor acceptance; legal/compliance claims. | Wholesale terms; MOQ; shipping terms; returns/damaged goods; payment terms; account approval process. | Later unless owner terms are ready |
| Vendor Resource / Download Area | Provide gated or semi-private documents after owner approval. | Qualified vendors or distributors. | Line sheet download; product images; labels; policy docs; contact owner/support. | Any document containing unreviewed product claims, pricing, or legal statements. | Final line sheet; approved docs; access/gating process; file storage workflow. | Later |
| Buyer Tracker / Outreach Admin | Internal-only operating surface, not public site content. | Owner/team; outreach agents. | Buyer list; contact status; risk level; notes; next step; owner approval state. | Vendor acceptance claims; unsupported notes presented as fact. | Target list; outreach rules; owner approvals; CRM/sheet workflow. | Later/internal, not public app page |

## V1 Navigation Direction

Public header:
- Products
- Support
- Contact
- Wholesale / Partners

Footer:
- Products
- TotalTOX
- Support
- Contact
- Shipping
- Returns / Refunds
- Privacy
- Terms
- Wholesale / Partners

Avoid crowding the header with every policy page. Keep policies accessible in the footer and from relevant page sections.

## Product Data Direction

Use source-controlled product data in the custom app first. A CMS can be added later if product data can be provided cleanly and owner workflow requires it.

Suggested product data fields:
- Product name `[OWNER DATA NEEDED]`
- SKU `[OWNER DATA NEEDED]`
- Category `[OWNER DATA NEEDED]`
- Image `[OWNER DATA NEEDED]`
- Short description `[REVIEW REQUIRED]`
- Use/directions placeholder `[REVIEW REQUIRED]`
- Ingredients `[OWNER DATA NEEDED]`
- Price `[OWNER DATA NEEDED]`
- Availability `[OWNER DATA NEEDED]`
- Claim review status `[REVIEW REQUIRED]`
- Vendor readiness notes `[OWNER DATA NEEDED]`

Use static placeholder blocks instead of CMS fields if owner data is not ready.

## V1 Exclusions

Do not include in V1:
- Open-ended AI chat as a live feature.
- "Encrypted AI consultation" language.
- Product-choice direction logic.
- Third-party autonomous purchasing through messaging unless owner/payment/privacy review clears it.
- Amazon, marketplace, or vendor approval claims.
- Checkout/payment migration unless reviewed.
- Review/result proof pages unless source, permission, and claims review are complete.
- Wholesale portal login.
- Wholesale pricing unless owner confirms it.
- Vendor outreach automation.
- Unnecessary custom complexity beyond the V1 app, intake, support, and reviewed checkout scope.
- Final product claims.

## Approval Gates

Before custom app build:
- Sitemap approved.
- Messaging rules approved.
- Claims cleanup template started.
- Owner-data gaps accepted as placeholders.

Before public launch:
- Claim-sensitive areas still marked or reviewed.
- Policy pages reviewed.
- Forms tested and not overcollecting.
- No fake trust badges, fake vendor logos, fake proof, or unverified privacy/security claims.

Before vendor outreach:
- Product line data completed.
- Claims reviewed.
- Wholesale terms confirmed.
- Vendor packet prepared.
- Owner approves target list and outreach language.

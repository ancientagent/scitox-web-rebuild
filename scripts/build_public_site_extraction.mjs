import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const ROOT = "https://scitoxdetox.com";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspace = path.resolve(__dirname, "..");
const evidenceDir = path.join(workspace, "project_sources", "live_public_site");
const outputDir = path.join(workspace, "outputs", "public_site_extraction");

const STATUS = {
  KEEP: "[KEEP]",
  CONSOLIDATE: "[CONSOLIDATE]",
  REMOVE: "[REMOVE]",
  HIDE: "[HIDE]",
  REVIEW: "[REVIEW REQUIRED]",
  OWNER: "[OWNER DATA NEEDED]",
  BROKEN: "[BROKEN / VERIFY]",
  DUPLICATE: "[DUPLICATE]",
  CLAIM: "[CLAIM-SENSITIVE]",
};

const seedPaths = [
  "/",
  "/why-scitox%3F",
  "/detox-methods-comparison",
  "/how-it-works",
  "/results-%26-testimonials",
  "/macujo-vs-scitox-reviews",
  "/reviews",
  "/f-a-q-1",
  "/online-store",
  "/ols/all?sortOption=descend_by_created_at",
  "/ols/categories/hair-follicle-drug-test-detox-shampoos-and-full-scitox-systems",
  "/featured-products",
  "/products",
  "/terms-and-conditions",
  "/returns-%26-refunds",
  "/privacy-policy",
  "/about-us",
  "/contact",
  "/the-macujo-method-scam",
  "/?olsPage=cart",
];

function decodeEntities(text = "") {
  const named = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    nbsp: " ",
    quot: '"',
    reg: "(R)",
    copy: "(C)",
    trade: "(TM)",
  };
  return text
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(Number.parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number.parseInt(d, 10)))
    .replace(/&([a-z]+);/gi, (m, n) => named[n.toLowerCase()] ?? m);
}

function stripHtml(html = "") {
  let expanded = html;
  for (const m of html.matchAll(/srcDoc="([\s\S]*?)"/gi)) {
    expanded += "\n\n" + decodeEntities(m[1]);
  }
  expanded = expanded
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<\/(h\d|p|div|section|article|li|tr|br)>/gi, "\n")
    .replace(/<[^>]+>/g, " ");
  return decodeEntities(expanded)
    .replace(/\r/g, "\n")
    .replace(/[ \t\f\v]+/g, " ")
    .replace(/\n\s+/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function flatText(text = "") {
  return text.replace(/\s+/g, " ").trim();
}

function titleFromHtml(html) {
  return decodeEntities(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "").trim();
}

function metaDescription(html) {
  return decodeEntities(
    html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)?.[1] ??
      html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i)?.[1] ??
      "",
  ).trim();
}

function headingsFromHtml(html) {
  const rows = [];
  for (const m of html.matchAll(/<h([1-4])[^>]*>([\s\S]*?)<\/h\1>/gi)) {
    const text = flatText(stripHtml(m[2]));
    if (text) rows.push(`H${m[1]}: ${text}`);
  }
  return [...new Set(rows)].slice(0, 25);
}

function attrs(tag) {
  const out = {};
  for (const m of tag.matchAll(/([a-zA-Z0-9:-]+)=["']([^"']*)["']/g)) {
    out[m[1].toLowerCase()] = decodeEntities(m[2]);
  }
  return out;
}

function normalizeUrl(href, base = ROOT) {
  if (!href || href.startsWith("#") || href.startsWith("javascript:")) return null;
  try {
    const url = href.startsWith("//") ? new URL(`https:${href}`) : new URL(href, base);
    url.hash = "";
    if (url.hostname === "www.scitoxdetox.com") url.hostname = "scitoxdetox.com";
    return url;
  } catch {
    return null;
  }
}

function archiveName(url) {
  const u = new URL(url);
  const raw = `${u.pathname === "/" ? "home" : u.pathname.replace(/^\//, "")}${u.search ? "_" + u.search.slice(1) : ""}`;
  return raw.replace(/[^a-z0-9._-]+/gi, "_").slice(0, 110) || "home";
}

function extractLinks(html, pageUrl) {
  const links = [];
  for (const m of html.matchAll(/<a\b[\s\S]*?<\/a>/gi)) {
    const tag = m[0];
    const a = attrs(tag);
    const label = flatText(stripHtml(tag));
    if (!a.href) continue;
    const normalized = normalizeUrl(a.href, pageUrl);
    links.push({
      label,
      href: a.href,
      normalized: normalized?.href ?? a.href,
      type: a.href.startsWith("tel:") ? "phone" : a.href.startsWith("mailto:") ? "email" : normalized?.hostname === "scitoxdetox.com" ? "internal" : "external",
    });
  }
  return links;
}

function statusFromResponse(status) {
  if (!status) return STATUS.BROKEN;
  if (status >= 400) return STATUS.BROKEN;
  return STATUS.KEEP;
}

async function fetchPage(url) {
  const res = await fetch(url, {
    redirect: "follow",
    headers: {
      "user-agent": "Mozilla/5.0 Codex SciTox public extractor",
      accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
  });
  const html = await res.text();
  return { status: res.status, finalUrl: res.url, html };
}

function classifyPage(url, title, text) {
  const p = new URL(url).pathname.toLowerCase();
  const t = `${title} ${text.slice(0, 1000)}`.toLowerCase();
  if (p === "/" || p === "") return "Homepage";
  if (p.includes("ols") || p.includes("online-store") || p.includes("products") || p.includes("featured-products")) return "Store/Product";
  if (p.includes("privacy") || p.includes("terms") || p.includes("refund")) return "Policy/Trust";
  if (p.includes("contact")) return "Contact";
  if (p.includes("review") || p.includes("testimonial") || t.includes("testimonial")) return "Reviews/Proof";
  if (p.includes("faq") || p.includes("how-it-works")) return "Education/FAQ";
  if (p.includes("macujo") || p.includes("comparison") || p.includes("scam")) return "Comparison/Competitor";
  if (p.includes("about")) return "About";
  return "Content";
}

function markerJoin(markers) {
  return [...new Set(markers.filter(Boolean))].join(" ");
}

const claimRules = [
  ["Efficacy / pass-test outcome", /\b(pass|passing|passed|works|worked|effective|clean|detox(?:ify)?|masking|remove toxins|toxin)\b/i],
  ["Scientific / testing / proof", /\b(scientific|scientifically|tested|proven|lab|doctor|documented|research|before-and-after|results|proof|science)\b/i],
  ["Guarantee / refund", /\b(guarantee|guaranteed|money back|refund|returns?|charge ?back)\b/i],
  ["Superlative / ranking", /\b(#1|number one|best|highest rated|only company|most effective|fastest|every other company|lowest prices)\b/i],
  ["Competitor attack / comparison", /\b(scam|competitor|macujo|aloe rid|trash our products|prey on people|fake|bashing us|cannot compete)\b/i],
  ["AI-generated proof / summaries", /\b(ChatGPT|Reddit AI|Trustpilot AI|artificial intelligence|AI summary|AI summaries)\b/i],
  ["Sensitive user context", /\b(drug test|hair follicle test|urine drug test|saliva drug test|oral fluid|nail detox|consultation|situation)\b/i],
  ["Privacy / security / operational claim", /\b(private|privacy|secure|encrypted|hackers|intercepting|foreign accents|data security|data retention)\b/i],
];

function splitSentences(text) {
  return flatText(text)
    .split(/(?<=[.!?])\s+|\n+/)
    .map((s) => s.trim())
    .filter((s) => s.length >= 18 && s.length <= 750);
}

function classifyClaim(sentence) {
  const cats = claimRules.filter(([, rx]) => rx.test(sentence)).map(([name]) => name);
  return cats.length ? cats.join("; ") : "";
}

function claimDisposition(sentence, category) {
  if (/scam|prey on|trash our products|foreign accents|hackers|intercepting|cannot compete|fake/i.test(sentence)) {
    return `${STATUS.REMOVE} ${STATUS.REVIEW} ${STATUS.CLAIM}`;
  }
  if (/ChatGPT|Reddit AI|Trustpilot AI|artificial intelligence|AI summary/i.test(sentence)) {
    return `${STATUS.HIDE} ${STATUS.REVIEW} ${STATUS.CLAIM}`;
  }
  if (/guarantee|money back|refund|charge ?back/i.test(sentence)) {
    return `${STATUS.REVIEW} ${STATUS.CLAIM}`;
  }
  if (category) return `${STATUS.REVIEW} ${STATUS.CLAIM}`;
  return STATUS.KEEP;
}

function recommendedClaimAction(sentence) {
  if (/scam|prey on|trash our products|foreign accents|hackers|intercepting|cannot compete|fake/i.test(sentence)) {
    return "Remove from vendor-ready surface or replace later with restrained, verifiable support/policy language after owner review.";
  }
  if (/ChatGPT|Reddit AI|Trustpilot AI|artificial intelligence|AI summary/i.test(sentence)) {
    return "Do not reuse as proof without source verification and review-platform evidence; avoid AI-generated proof framing.";
  }
  if (/guarantee|money back|refund/i.test(sentence)) {
    return "Verify actual policy, eligibility, evidence, and processor risk before reuse.";
  }
  if (/scientific|tested|proven|lab|documented|before-and-after|#1|most effective|highest rated|only company/i.test(sentence)) {
    return "Require substantiation package before reuse; consider neutral positioning during rebuild planning.";
  }
  return "Review before reuse because the sentence touches product outcome, sensitive context, or vendor-risk language.";
}

function extractClaims(pages) {
  const rows = [];
  const seen = new Set();
  for (const page of pages) {
    for (const sentence of splitSentences(`${page.title}. ${page.description}. ${page.headings.join(". ")}. ${page.text}`)) {
      const category = classifyClaim(sentence);
      if (!category) continue;
      const key = `${page.url}|${sentence.toLowerCase()}`;
      if (seen.has(key)) continue;
      seen.add(key);
      rows.push({
        "Page Title": page.title,
        URL: page.url,
        "Claim Text / Public Language": sentence,
        "Claim Category": category,
        "Status Markers": claimDisposition(sentence, category),
        "Evidence Source": "Live public website text/meta/headings",
        "Rebuild Handling Note": recommendedClaimAction(sentence),
      });
    }
  }
  return rows.slice(0, 350);
}

function extractProductRows(pages) {
  const productRows = [];
  const add = (row) => productRows.push(row);
  const productPages = pages.filter((p) => p.type === "Store/Product" || /product|store|ols|nailtox|hair detox|urine|saliva/i.test(p.text));
  const seen = new Set();

  for (const page of productPages) {
    const path = new URL(page.url).pathname.toLowerCase();
    if (path.includes("/ols/products/")) {
      const prices = [...new Set(page.text.match(/\$\s?\d+(?:\.\d{2})?/g) ?? [])];
      const category = inferProductCategory(`${page.title} ${page.path} ${page.text.slice(0, 1200)}`);
      const key = `product-page|${page.url}`;
      if (!seen.has(key)) {
        seen.add(key);
        add({
          "Product / Category Name": page.title,
          "Category": category,
          "Visible Price": prices.length ? prices.join("; ") : STATUS.OWNER,
          "Source Page": page.title,
          URL: page.url,
          "Public Description / Context": flatText(`${page.description || ""} ${page.headings.slice(0, 6).join(" | ")}`) || nearbyText(page.text, 0, 500),
          "Status Markers": `${STATUS.KEEP} ${STATUS.REVIEW} ${STATUS.CLAIM} ${STATUS.OWNER}`,
          "Rebuild Note": "Individual public product page found. Confirm SKU, active status, price, inventory, approved claims, fulfillment, and vendor eligibility before reuse.",
          "Source Type": "Public product page",
        });
      }
    } else if (path.includes("/ols/categories/")) {
      const key = `category-page|${page.url}`;
      if (!seen.has(key)) {
        seen.add(key);
        add({
          "Product / Category Name": page.title,
          "Category": "Public store category",
          "Visible Price": STATUS.OWNER,
          "Source Page": page.title,
          URL: page.url,
          "Public Description / Context": flatText(`${page.description || ""} ${page.headings.slice(0, 6).join(" | ")}`) || nearbyText(page.text, 0, 500),
          "Status Markers": `${STATUS.KEEP} ${STATUS.REVIEW} ${STATUS.OWNER}`,
          "Rebuild Note": "Public category page found. Confirm whether this category remains active and vendor-ready.",
          "Source Type": "Public category page",
        });
      }
    }
  }

  const patterns = [
    [/NailTOX 1\.0[^\n.]*/i, "Nail detox", "Product name visible"],
    [/Hair, Urine, Saliva, Nails/i, "Category group", "Public product category text"],
    [/hair detox products to pass hair follicle drug tests/i, "Hair detox", "Public category"],
    [/urine detox Products to pass urine drug test/i, "Urine detox", "Public category"],
    [/saliva detox Products to pass oral fluid saliva drug test/i, "Saliva detox", "Public category"],
    [/Custom Detox and Masking Products for Each Drug/i, "Custom detox/masking", "Public category/positioning"],
    [/Pass a Hair Follicle Drug Test for Any Drug/i, "Hair detox", "Public product heading"],
    [/Hair Cleansing and Detoxifying Products/i, "Hair detox", "Public product/category heading"],
    [/Free Additional Products/i, "Add-on/free products", "Public footer/section heading"],
    [/All standard kits \$239/i, "Standard kits", "Public sale/price statement"],
  ];

  for (const page of productPages) {
    const text = page.text;
    for (const [rx, category, sourceType] of patterns) {
      const m = text.match(rx);
      if (!m) continue;
      const key = `${category}|${m[0]}`;
      if (seen.has(key)) continue;
      seen.add(key);
      add({
        "Product / Category Name": flatText(m[0]),
        "Category": category,
        "Visible Price": (m[0].match(/\$\s?\d+(?:\.\d{2})?/) ?? ["[OWNER DATA NEEDED]"])[0],
        "Source Page": page.title,
        URL: page.url,
        "Public Description / Context": nearbyText(text, m.index ?? 0, 340),
        "Status Markers": markerJoin([STATUS.REVIEW, STATUS.CLAIM, /\$/.test(m[0]) ? STATUS.OWNER : STATUS.OWNER]),
        "Rebuild Note": "Inventory pulled from public text only; confirm SKUs, current prices, categories, product eligibility, and approved descriptions with owner.",
        "Source Type": sourceType,
      });
    }
    for (const price of text.matchAll(/\$\s?\d+(?:\.\d{2})?/g)) {
      const context = nearbyText(text, price.index ?? 0, 180);
      const key = `price|${price[0]}|${context}`;
      if (seen.has(key)) continue;
      seen.add(key);
      add({
        "Product / Category Name": context.includes("kit") ? "Standard kits / sale language" : "Public price mention",
        "Category": "Price mention",
        "Visible Price": price[0],
        "Source Page": page.title,
        URL: page.url,
        "Public Description / Context": context,
        "Status Markers": `${STATUS.REVIEW} ${STATUS.OWNER}`,
        "Rebuild Note": "Verify whether this is current product pricing, promotional pricing, fee/deposit language, or policy text before reuse.",
        "Source Type": "Public price mention",
      });
    }
  }
  return productRows;
}

function inferProductCategory(text) {
  if (/hair|follicle|shampoo/i.test(text)) return "Hair detox";
  if (/urine/i.test(text)) return "Urine detox";
  if (/saliva|oral fluid/i.test(text)) return "Saliva/oral fluid";
  if (/nail|fingernail|toenail/i.test(text)) return "Nail detox";
  if (/mask/i.test(text)) return "Masking product";
  return "Product/category";
}

function nearbyText(text, index, radius = 260) {
  const clean = flatText(text);
  const idx = Math.max(0, Math.min(clean.length - 1, index));
  return clean.slice(Math.max(0, idx - radius), Math.min(clean.length, idx + radius)).trim();
}

function extractPolicyRows(pages) {
  const rows = [];
  const policySignals = [
    ["Privacy / SMS data handling", /privacy|sms|data collection|data usage|data security|data retention|opt/i],
    ["Terms / SMS terms", /terms and conditions|messages and data rates|STOP|HELP/i],
    ["Returns / refunds", /refund|return|charge back|handling and administrative fee|consultation fee/i],
    ["Cookie notice", /cookies|analyze website traffic|Accept/i],
    ["reCAPTCHA notice", /recaptcha|Google Privacy Policy|Terms of Service/i],
    ["Guarantee policy", /money back guarantee|guarantee/i],
    ["Business identity", /Innovatum Labs LLC|DBA SciTOX|info@scitoxdetox.com/i],
    ["Payment / processor risk language", /credit card|original method of payment|charge back|process payments/i],
  ];
  for (const page of pages) {
    for (const [area, rx] of policySignals) {
      if (!rx.test(page.text)) continue;
      const match = page.text.match(rx);
      rows.push({
        "Trust / Policy Area": area,
        "Source Page": page.title,
        URL: page.url,
        "Public Evidence / Extract": nearbyText(page.text, match?.index ?? 0, 420),
        "Status Markers": area.includes("Guarantee") || area.includes("Returns") || area.includes("Payment")
          ? `${STATUS.REVIEW} ${STATUS.CLAIM}`
          : `${STATUS.KEEP} ${STATUS.REVIEW}`,
        "Vendor-Readiness Issue": vendorPolicyIssue(area),
        "Owner Data Needed": ownerPolicyNeed(area),
      });
    }
  }
  return dedupeObjects(rows, ["Trust / Policy Area", "Source Page", "Public Evidence / Extract"]);
}

function vendorPolicyIssue(area) {
  if (area.includes("Returns")) return "Refund/chargeback language is aggressive and should be reviewed before vendor or retail partner review.";
  if (area.includes("Guarantee")) return "Guarantee language can be high-risk in this product category and needs exact approved policy support.";
  if (area.includes("Payment")) return "Payment/chargeback language may signal processor risk and should be cleaned up for vendor-facing credibility.";
  if (area.includes("Privacy")) return "Privacy/SMS language is useful but should be confirmed for completeness and current platform behavior.";
  return "Useful trust surface, but verify accuracy and completeness before reuse.";
}

function ownerPolicyNeed(area) {
  if (area.includes("Privacy")) return "Current data flows, storage systems, SMS provider, retention policy, deletion process.";
  if (area.includes("Returns") || area.includes("Guarantee")) return "Actual refund/guarantee terms, eligibility, exclusions, dispute history, approved public wording.";
  if (area.includes("Business")) return "Legal entity, address/public contact preferences, support ownership, vendor-facing identity.";
  if (area.includes("Payment")) return "Current processor, restrictions, dispute policy, compliance obligations.";
  return "Confirm current policy wording and operational backing.";
}

function extractContactRows(pages) {
  const rows = [];
  const allLinks = pages.flatMap((p) => p.links.map((l) => ({ ...l, page: p })));
  const phones = new Set();
  const emails = new Set();
  for (const p of pages) {
    for (const phone of p.text.matchAll(/\b(?:\+?1[-.\s]?)?\(?214\)?[-.\s]?(?:997|245)[-.\s]?(?:1978|8835)\b/g)) phones.add(phone[0]);
    for (const email of p.text.matchAll(/[A-Z0-9._%+-]+@scitoxdetox\.com/gi)) emails.add(email[0]);
  }
  for (const phone of phones) {
    rows.push({
      "Flow / Method": "Phone/Text",
      "Public Detail": phone,
      "Source Page(s)": pages.filter((p) => p.text.includes(phone)).map((p) => p.title).join("; "),
      URL: pages.find((p) => p.text.includes(phone))?.url ?? ROOT,
      "Fields / Steps": "Call or text path; public page says faster response by text and lists urgent/outside-hours language.",
      "Status Markers": `${STATUS.KEEP} ${STATUS.REVIEW}`,
      "Risk / Gap": "Confirm current support coverage, approved urgency language, and whether both numbers remain active.",
      "Vendor-Ready Handling": "Keep a verified primary support channel; reduce alarm-style operational warnings.",
    });
  }
  for (const email of emails) {
    rows.push({
      "Flow / Method": "Email",
      "Public Detail": email,
      "Source Page(s)": pages.filter((p) => p.text.toLowerCase().includes(email.toLowerCase())).map((p) => p.title).join("; "),
      URL: pages.find((p) => p.text.toLowerCase().includes(email.toLowerCase()))?.url ?? ROOT,
      "Fields / Steps": "Public support email.",
      "Status Markers": `${STATUS.KEEP} ${STATUS.OWNER}`,
      "Risk / Gap": "Confirm inbox owner, response SLA, and vendor inquiry routing.",
      "Vendor-Ready Handling": "Keep as support contact if monitored; add separate wholesale/vendor contact later if approved.",
    });
  }
  const contact = pages.find((p) => new URL(p.url).pathname.includes("contact"));
  if (contact) {
    const fields = ["Name", "Email*", "Phone Number*", "How did you find us?*", "Sign up for our email list", "Send", "reCAPTCHA", "WhatsApp"];
    rows.push({
      "Flow / Method": "Contact form",
      "Public Detail": "Contact Us form",
      "Source Page(s)": contact.title,
      URL: contact.url,
      "Fields / Steps": fields.join("; "),
      "Status Markers": `${STATUS.KEEP} ${STATUS.REVIEW} ${STATUS.OWNER}`,
      "Risk / Gap": "Attribution field exists publicly; confirm where submissions go, consent handling, CRM/storage, and spam/reCAPTCHA behavior.",
      "Vendor-Ready Handling": "Useful foundation; likely needs cleaner vendor inquiry path and explicit routing.",
    });
  }
  for (const l of allLinks.filter((l) => /whatsapp/i.test(l.label + l.href + l.normalized))) {
    rows.push({
      "Flow / Method": "WhatsApp",
      "Public Detail": l.label || l.href,
      "Source Page(s)": l.page.title,
      URL: l.page.url,
      "Fields / Steps": "Public WhatsApp message link.",
      "Status Markers": `${STATUS.KEEP} ${STATUS.REVIEW} ${STATUS.OWNER}`,
      "Risk / Gap": "Confirm account ownership, compliance with sensitive support content, and routing.",
      "Vendor-Ready Handling": "Keep only if monitored and privacy language supports it.",
    });
  }
  const hours = contact?.text.match(/Hours[\s\S]{0,420}/i)?.[0];
  if (hours) {
    rows.push({
      "Flow / Method": "Hours / availability",
      "Public Detail": "Public business hours and urgent/outside-hours note",
      "Source Page(s)": contact.title,
      URL: contact.url,
      "Fields / Steps": flatText(hours),
      "Status Markers": `${STATUS.KEEP} ${STATUS.REVIEW}`,
      "Risk / Gap": "Verify current support hours and whether urgent/outside-hours language should remain.",
      "Vendor-Ready Handling": "Use simple support hours and SLA language later.",
    });
  }
  return dedupeObjects(rows, ["Flow / Method", "Public Detail", "URL"]);
}

function extractReviewRows(pages) {
  const rows = [];
  const reviewSignals = [
    ["Reviews page / public review surface", /reviews?|testimonials?/i],
    ["Trustpilot", /Trustpilot/i],
    ["Yotpo", /Yotpo/i],
    ["Reddit", /Reddit/i],
    ["AI-generated review summary", /Trustpilot AI|Reddit AI|ChatGPT|artificial intelligence/i],
    ["Before/after test results", /before-and-after|before & after|test results|pass confirmations|screenshots/i],
    ["Star rating / 5-star claims", /5-star|highest rated|great experience|overwhelmingly/i],
  ];
  for (const page of pages) {
    if (!/review|testimonial|trustpilot|yotpo|reddit|before|after|pass confirmation|5-star|AI/i.test(page.text + page.title)) continue;
    for (const [assetType, rx] of reviewSignals) {
      const match = page.text.match(rx);
      if (!match) continue;
      rows.push({
        "Review / Proof Asset Type": assetType,
        "Source Page": page.title,
        URL: page.url,
        "Public Evidence / Extract": nearbyText(page.text, match.index ?? 0, 430),
        "Status Markers": assetType.includes("AI") || assetType.includes("Before") || assetType.includes("Star")
          ? `${STATUS.REVIEW} ${STATUS.CLAIM}`
          : `${STATUS.REVIEW}`,
        "Reuse Risk": reviewRisk(assetType),
        "Owner Data Needed": "Raw review source URLs, review platform access/exports, permissions, screenshot originals, substantiation rules, and approved testimonial handling.",
      });
    }
  }
  return dedupeObjects(rows, ["Review / Proof Asset Type", "Source Page", "Public Evidence / Extract"]);
}

function reviewRisk(assetType) {
  if (assetType.includes("AI")) return "AI summaries should not be reused as proof without verification; likely remove from vendor-ready surface.";
  if (assetType.includes("Before")) return "Outcome proof/test-result claims require substantiation, permission, privacy review, and careful claims handling.";
  if (assetType.includes("Star")) return "Ratings and superlatives need current source evidence and review-platform compliance.";
  return "Can inform audit, but must be source-verified before reuse.";
}

function contentDispositionRows(pages, claims) {
  const rows = [];
  const pageMap = new Map(pages.map((p) => [p.url, p]));
  for (const page of pages) {
    const baseStatus = page.status >= 400 ? STATUS.BROKEN : page.type === "Policy/Trust" ? `${STATUS.KEEP} ${STATUS.REVIEW}` : STATUS.KEEP;
    rows.push({
      "Page / Content Area": page.title || page.path,
      URL: page.url,
      "Current Role": page.type,
      "Disposition": baseStatus,
      "Reason": page.type === "Store/Product" ? "Product/category surface needed, but product facts and claim language require owner validation." : "Public site page exists and should be considered during rebuild planning.",
      "Rebuild Note": page.claimCount ? `${page.claimCount} claim-sensitive matches detected.` : "No major claim-sensitive matches detected by keyword scan.",
    });
  }
  const buckets = [
    ["Main navigation", `${STATUS.CONSOLIDATE}`, "Navigation repeats across desktop/mobile/footer and includes many items; simplify for vendor-ready rebuild."],
    ["High-risk hero headline", `${STATUS.REVIEW} ${STATUS.CLAIM}`, "Contains #1, most effective, guaranteed, tested/proven language; do not reuse until substantiated."],
    ["Competitor/scam pages and language", `${STATUS.REMOVE} ${STATUS.REVIEW} ${STATUS.CLAIM}`, "Aggressive competitor attack language conflicts with vendor-ready credibility."],
    ["AI-generated review/proof summaries", `${STATUS.HIDE} ${STATUS.REVIEW} ${STATUS.CLAIM}`, "AI summaries are not proof; remove from proof surface unless replaced with verified sources."],
    ["Hacker/call-interception warning", `${STATUS.HIDE} ${STATUS.REVIEW}`, "Operational alarm language may reduce trust; replace later with clean support notice if needed."],
    ["Contact channels", `${STATUS.KEEP} ${STATUS.REVIEW} ${STATUS.OWNER}`, "Phone/text/email/WhatsApp paths are useful but need ownership and routing confirmation."],
    ["Policies: privacy, terms, returns", `${STATUS.KEEP} ${STATUS.CONSOLIDATE} ${STATUS.REVIEW}`, "Policies exist but should be consolidated, cleaned, and checked for current operations."],
    ["Product/category information", `${STATUS.KEEP} ${STATUS.REVIEW} ${STATUS.OWNER}`, "Useful for catalog planning, but SKUs, prices, inventory, and approved descriptions are missing from public-only pull."],
  ];
  for (const [area, status, reason] of buckets) {
    rows.push({
      "Page / Content Area": area,
      URL: ROOT,
      "Current Role": "Cross-site content",
      "Disposition": status,
      "Reason": reason,
      "Rebuild Note": "Handle before visual design so wireframes do not preserve risky structure or content.",
    });
  }
  for (const c of claims.slice(0, 80)) {
    rows.push({
      "Page / Content Area": "Claim-sensitive language",
      URL: c.URL,
      "Current Role": c["Claim Category"],
      "Disposition": c["Status Markers"],
      "Reason": c["Claim Text / Public Language"],
      "Rebuild Note": c["Rebuild Handling Note"],
    });
  }
  return rows;
}

function ownerDataRows() {
  return [
    ["Business identity", "Confirm legal entity, DBA, address/public contact preferences, vendor-facing business identity.", "[OWNER DATA NEEDED]", "Required before vendor deck/site trust section."],
    ["Product catalog", "Current SKUs, product names, categories, live prices, sale rules, bundles, inventory status, discontinued/future products.", "[OWNER DATA NEEDED]", "Required before product page rebuild."],
    ["Claim substantiation", "Evidence for scientifically formulated/tested/proven, #1/highest rated, success, clean/pass, before/after, and guarantee claims.", "[OWNER DATA NEEDED] [REVIEW REQUIRED] [CLAIM-SENSITIVE]", "Required before any claim reuse."],
    ["Review assets", "Raw review exports/links, Trustpilot/Yotpo access, permissions, screenshot originals, testimonial consent.", "[OWNER DATA NEEDED] [REVIEW REQUIRED]", "Required before proof/testimonial sections."],
    ["Policies", "Approved refund/return/guarantee terms, privacy/SMS terms, data retention/deletion process, chargeback policy, legal review status.", "[OWNER DATA NEEDED] [REVIEW REQUIRED]", "Required before trust/policy redesign."],
    ["Payment and platform", "Current payment processor, platform restrictions, dispute rate, chargeback history, merchant category constraints.", "[OWNER DATA NEEDED]", "Required before ecommerce and vendor-readiness decisions."],
    ["Operations/support", "Who answers calls/texts/email/WhatsApp, coverage hours, scripts, escalation rules, CRM/help desk, call-tracking ownership.", "[OWNER DATA NEEDED]", "Required before contact/support flow design."],
    ["Analytics", "GA4, Search Console, tag manager, ad accounts, call attribution, ecommerce conversion tracking, traffic source data.", "[OWNER DATA NEEDED]", "Required before marketing/channel decisions."],
    ["Fulfillment", "Shipping methods, packaging, discreet shipping truth, fulfillment partners, inventory constraints, returns handling.", "[OWNER DATA NEEDED]", "Required before vendor/wholesale readiness."],
    ["Vendor readiness", "Wholesale pricing, MOQ, UPC/GTIN, sell sheets, insurance, product safety docs, reseller terms, distributor constraints.", "[OWNER DATA NEEDED]", "Required before outreach."],
    ["Amazon path", "Amazon eligibility research inputs, category restrictions, seller account status, UPC/GTIN, fulfillment economics.", "[OWNER DATA NEEDED]", "Amazon remains conditional."],
  ].map(([area, request, markers, dependency]) => ({
    "Data Area": area,
    "Owner Request": request,
    "Status Markers": markers,
    "Why Needed": dependency,
    "Priority": /claim|product catalog|policies|payment|vendor/i.test(area) ? "High" : "Medium",
  }));
}

function dedupeObjects(rows, keys) {
  const seen = new Set();
  const out = [];
  for (const row of rows) {
    const key = keys.map((k) => String(row[k] ?? "").toLowerCase()).join("|");
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(row);
  }
  return out;
}

function colName(index) {
  let n = index + 1;
  let s = "";
  while (n > 0) {
    const mod = (n - 1) % 26;
    s = String.fromCharCode(65 + mod) + s;
    n = Math.floor((n - mod) / 26);
  }
  return s;
}

function matrixFromRows(rows) {
  const headers = [...new Set(rows.flatMap((r) => Object.keys(r)))];
  return [headers, ...rows.map((r) => headers.map((h) => r[h] ?? ""))];
}

function applySheetFormatting(sheet, matrix, tableName) {
  const rowCount = Math.max(1, matrix.length);
  const colCount = Math.max(1, matrix[0]?.length ?? 1);
  const end = `${colName(colCount - 1)}${rowCount}`;
  const range = sheet.getRange(`A1:${end}`);
  range.values = matrix;
  sheet.showGridLines = false;
  sheet.freezePanes.freezeRows(1);
  sheet.getRange(`A1:${colName(colCount - 1)}1`).format = {
    fill: "#1F4E78",
    font: { bold: true, color: "#FFFFFF" },
    wrapText: true,
  };
  range.format.wrapText = true;
  range.format.verticalAlignment = "Top";
  for (let c = 0; c < colCount; c++) {
    const width = c === 0 ? 190 : c <= 2 ? 240 : 340;
    sheet.getRange(`${colName(c)}:${colName(c)}`).format.columnWidthPx = Math.min(width, 420);
  }
  try {
    sheet.tables.add(`A1:${end}`, true, tableName);
  } catch {
    // Tables are helpful but not required for export.
  }
}

function addLegend(workbook) {
  const sheet = workbook.worksheets.add("Marker Legend");
  const rows = [
    ["Marker", "Meaning"],
    [STATUS.KEEP, "Candidate to retain after verification."],
    [STATUS.CONSOLIDATE, "Useful but should be merged/simplified."],
    [STATUS.REMOVE, "Do not carry forward in vendor-ready rebuild."],
    [STATUS.HIDE, "Hide or de-emphasize until reviewed/reworked."],
    [STATUS.REVIEW, "Needs owner/legal/compliance/content review before reuse."],
    [STATUS.OWNER, "Missing owner/business/product data."],
    [STATUS.BROKEN, "Broken or needs manual verification."],
    [STATUS.DUPLICATE, "Repeated content or navigation."],
    [STATUS.CLAIM, "Claim-sensitive product/proof/compliance language."],
  ];
  sheet.getRange(`A1:B${rows.length}`).values = rows;
  sheet.getRange("A1:B1").format = { fill: "#1F4E78", font: { bold: true, color: "#FFFFFF" } };
  sheet.getRange("A:B").format.wrapText = true;
  sheet.getRange("A:A").format.columnWidthPx = 190;
  sheet.getRange("B:B").format.columnWidthPx = 520;
  sheet.freezePanes.freezeRows(1);
}

async function writeWorkbook(filename, rows, tableName) {
  const workbook = Workbook.create();
  const sheet = workbook.worksheets.add("Data");
  const matrix = matrixFromRows(rows.length ? rows : [{ Note: "No rows extracted." }]);
  applySheetFormatting(sheet, matrix, tableName);
  addLegend(workbook);
  await workbook.inspect({
    kind: "table",
    range: `Data!A1:${colName(Math.min(matrix[0].length, 8) - 1)}${Math.min(matrix.length, 8)}`,
    include: "values",
    maxChars: 2500,
  });
  await workbook.render({
    sheetName: "Data",
    range: `A1:${colName(Math.min(matrix[0].length, 8) - 1)}${Math.min(matrix.length, 18)}`,
    scale: 1,
    format: "png",
  });
  const xlsx = await SpreadsheetFile.exportXlsx(workbook);
  const filePath = path.join(outputDir, filename);
  await xlsx.save(filePath);
  return filePath;
}

async function crawl() {
  await fs.mkdir(evidenceDir, { recursive: true });
  await fs.mkdir(outputDir, { recursive: true });
  const queue = seedPaths.map((p) => new URL(p, ROOT).href);
  const queued = new Set(queue);
  const pages = [];

  while (queue.length && pages.length < 45) {
    const url = queue.shift();
    let page;
    try {
      const { status, finalUrl, html } = await fetchPage(url);
      const normalizedFinal = normalizeUrl(finalUrl)?.href ?? url;
      const text = stripHtml(html);
      page = {
        url: normalizedFinal,
        requestedUrl: url,
        path: new URL(normalizedFinal).pathname + new URL(normalizedFinal).search,
        status,
        title: titleFromHtml(html),
        description: metaDescription(html),
        headings: headingsFromHtml(html),
        links: extractLinks(html, normalizedFinal),
        text,
        html,
      };
      const basename = archiveName(normalizedFinal);
      await fs.writeFile(path.join(evidenceDir, `${basename}.html`), html, "utf8");
      await fs.writeFile(path.join(evidenceDir, `${basename}.txt`), text, "utf8");
      for (const l of page.links) {
        const n = normalizeUrl(l.normalized, normalizedFinal);
        if (!n || n.hostname !== "scitoxdetox.com") continue;
        if (/\.(jpg|jpeg|png|gif|webp|svg|ico|css|js|pdf|json|webmanifest)$/i.test(n.pathname)) continue;
        if (!queued.has(n.href) && pages.length + queue.length < 60) {
          queued.add(n.href);
          queue.push(n.href);
        }
      }
    } catch (err) {
      page = {
        url,
        requestedUrl: url,
        path: new URL(url).pathname + new URL(url).search,
        status: 0,
        title: "",
        description: "",
        headings: [],
        links: [],
        text: "",
        html: "",
        error: err.message,
      };
    }
    pages.push(page);
  }

  try {
    const rendered = await fs.readFile(path.join(evidenceDir, "rendered_ols_all_text.txt"), "utf8");
    const target = pages.find((p) => p.path.startsWith("/ols/all"));
    if (target && rendered.length > target.text.length * 0.5) {
      target.text = `${target.text}\n\n${rendered}`;
    }
  } catch {
    // Rendered browser evidence is optional.
  }

  for (const p of pages) {
    p.type = classifyPage(p.url, p.title, p.text);
    p.claimCount = splitSentences(`${p.title}. ${p.description}. ${p.headings.join(". ")}. ${p.text}`).filter((s) => classifyClaim(s)).length;
  }

  await fs.writeFile(
    path.join(evidenceDir, "crawl_manifest.json"),
    JSON.stringify(
      pages.map((p) => ({
        url: p.url,
        requestedUrl: p.requestedUrl,
        status: p.status,
        title: p.title,
        type: p.type,
        textLength: p.text.length,
        linkCount: p.links.length,
        claimSensitiveMatches: p.claimCount,
        error: p.error ?? "",
      })),
      null,
      2,
    ),
    "utf8",
  );
  return pages;
}

function buildSiteMapRows(pages) {
  return pages.map((p, i) => {
    const internal = p.links.filter((l) => l.type === "internal");
    const external = p.links.filter((l) => l.type === "external");
    const contacts = [
      ...new Set([
        ...[...p.text.matchAll(/\b(?:\+?1[-.\s]?)?\(?214\)?[-.\s]?(?:997|245)[-.\s]?(?:1978|8835)\b/g)].map((m) => m[0]),
        ...[...p.text.matchAll(/[A-Z0-9._%+-]+@scitoxdetox\.com/gi)].map((m) => m[0]),
        /WhatsApp/i.test(p.text) ? "WhatsApp" : "",
      ].filter(Boolean)),
    ];
    return {
      "Page ID": `P${String(i + 1).padStart(2, "0")}`,
      "Page Type": p.type,
      "HTTP Status": p.status || "FETCH FAILED",
      "Status Markers": markerJoin([
        statusFromResponse(p.status),
        p.claimCount ? STATUS.REVIEW : "",
        p.claimCount ? STATUS.CLAIM : "",
        p.error ? STATUS.BROKEN : "",
      ]),
      "Page Title": p.title,
      URL: p.url,
      "Normalized Path": p.path,
      "Meta Description": p.description,
      "Headings Found": p.headings.join(" | "),
      "Internal Link Count": internal.length,
      "External Link Count": external.length,
      "Visible Contact Markers": contacts.join("; "),
      "Product / Price Markers": [...new Set(p.text.match(/\$\s?\d+(?:\.\d{2})?|NailTOX|Hair Detox|urine detox|saliva detox/gi) ?? [])].join("; "),
      "Claim-Sensitive Match Count": p.claimCount,
      "Rebuild Notes": p.type === "Comparison/Competitor" ? "Likely not vendor-ready as-is; audit for aggressive tone and competitor attack language." : "Use as extraction input only; do not reuse final copy without review.",
      "Raw Evidence File": `project_sources/live_public_site/${archiveName(p.url)}.html`,
    };
  });
}

function buildSummaryMarkdown({ pages, claims, products, policies, contacts, reviews, disposition, ownerRows }) {
  const highRiskClaims = claims.filter((r) => /\[REMOVE\]|\[HIDE\]|AI|Competitor|Superlative|Scientific|Guarantee/i.test(`${r["Status Markers"]} ${r["Claim Category"]}`));
  const lines = [
    "# Public Site Extraction Summary",
    "",
    `Source website: ${ROOT}/`,
    `Generated from live public crawl on ${new Date().toISOString().slice(0, 10)}.`,
    "",
    "## Crawl Scope",
    "",
    `- Pages crawled: ${pages.length}`,
    `- Claim-sensitive rows extracted: ${claims.length}`,
    `- Public product/category rows extracted: ${products.length}`,
    `- Policy/trust rows extracted: ${policies.length}`,
    `- Contact flow rows extracted: ${contacts.length}`,
    `- Review/proof rows extracted: ${reviews.length}`,
    "",
    "## 1. What can be safely used in the rebuild",
    "",
    "- Existing public page inventory, navigation labels, category labels, contact methods, business hours, and policy-page existence can be used as planning inputs.",
    "- Phone/text/email/WhatsApp contact paths can be retained only after owner verifies current ownership, routing, and support coverage.",
    "- Product/category structure can inform catalog planning, but not final product copy or pricing until owner validates the catalog.",
    "",
    "## 2. What must be removed or hidden",
    "",
    "- Aggressive competitor/scam language and broad attacks on other companies.",
    "- Alarm-style hacker/call-interception warnings from the main customer/vendor credibility path.",
    "- AI-generated review/proof language as evidence.",
    "- Any unsupported #1, highest-rated, most-effective, guaranteed-pass, or fast-clean outcome language until substantiated.",
    "",
    "## 3. What must be reviewed before reuse",
    "",
    "- Scientific, tested, proven, lab-developed, documented-success, pass-result, and before/after test language.",
    "- Guarantee, refund, chargeback, and policy language.",
    "- Testimonials, Trustpilot/Yotpo/Reddit references, screenshots, and customer result claims.",
    "- Privacy/SMS/cookie/reCAPTCHA language against actual systems and current legal obligations.",
    "",
    "## 4. What owner data is needed",
    "",
    ...ownerRows.slice(0, 8).map((r) => `- ${r["Data Area"]}: ${r["Owner Request"]}`),
    "",
    "## 5. What matters most for vendor outreach",
    "",
    "- Vendor reviewers need a clean, calm, credible public site before outreach.",
    "- Product catalog, pricing, guarantee, reviews, compliance posture, and business identity need owner verification.",
    "- Claims must be restrained and substantiated; vendor-ready surfaces should avoid customer-panic language and competitor attacks.",
    "- A separate wholesale/vendor inquiry path is needed; the current contact form is customer-support oriented.",
    "",
    "## 6. What should be handled before design begins",
    "",
    "- Decide what claims are allowed, review-required, hidden, or removed.",
    "- Confirm product catalog, prices, categories, bundles, and discontinued/future products.",
    "- Clean up information architecture and reduce duplicate navigation/content.",
    "- Confirm policies, refund/guarantee rules, privacy/SMS handling, and support routing.",
    "- Create a vendor-ready content boundary before visual mockups.",
    "",
    "## High-Risk Extraction Notes",
    "",
    ...highRiskClaims.slice(0, 12).map((r) => `- ${r["Claim Category"]}: ${r["Claim Text / Public Language"].slice(0, 240)}`),
    "",
    "## Output Files",
    "",
    "- Current_Site_Map.xlsx",
    "- Claims_Inventory.xlsx",
    "- Product_Catalog_Public_Pull.xlsx",
    "- Policy_Trust_Audit.xlsx",
    "- Contact_Flow_Audit.xlsx",
    "- Review_Asset_Audit.xlsx",
    "- Content_Disposition_Map.xlsx",
    "- Owner_Data_Request_List.xlsx",
  ];
  return lines.join("\n");
}

async function main() {
  const pages = await crawl();
  const claims = extractClaims(pages);
  const products = extractProductRows(pages);
  const policies = extractPolicyRows(pages);
  const contacts = extractContactRows(pages);
  const reviews = extractReviewRows(pages);
  const disposition = contentDispositionRows(pages, claims);
  const ownerRows = ownerDataRows();
  const siteMap = buildSiteMapRows(pages);

  const files = {};
  files.Current_Site_Map = await writeWorkbook("Current_Site_Map.xlsx", siteMap, "CurrentSiteMap");
  files.Claims_Inventory = await writeWorkbook("Claims_Inventory.xlsx", claims, "ClaimsInventory");
  files.Product_Catalog_Public_Pull = await writeWorkbook("Product_Catalog_Public_Pull.xlsx", products, "ProductCatalogPublicPull");
  files.Policy_Trust_Audit = await writeWorkbook("Policy_Trust_Audit.xlsx", policies, "PolicyTrustAudit");
  files.Contact_Flow_Audit = await writeWorkbook("Contact_Flow_Audit.xlsx", contacts, "ContactFlowAudit");
  files.Review_Asset_Audit = await writeWorkbook("Review_Asset_Audit.xlsx", reviews, "ReviewAssetAudit");
  files.Content_Disposition_Map = await writeWorkbook("Content_Disposition_Map.xlsx", disposition, "ContentDispositionMap");
  files.Owner_Data_Request_List = await writeWorkbook("Owner_Data_Request_List.xlsx", ownerRows, "OwnerDataRequestList");

  const summary = buildSummaryMarkdown({ pages, claims, products, policies, contacts, reviews, disposition, ownerRows });
  const summaryPath = path.join(outputDir, "Public_Site_Extraction_Summary.md");
  await fs.writeFile(summaryPath, summary, "utf8");

  const manifest = {
    generatedAt: new Date().toISOString(),
    website: ROOT,
    pageCount: pages.length,
    counts: {
      claims: claims.length,
      products: products.length,
      policies: policies.length,
      contacts: contacts.length,
      reviews: reviews.length,
      disposition: disposition.length,
      ownerRequests: ownerRows.length,
    },
    files,
    summary: summaryPath,
  };
  await fs.writeFile(path.join(outputDir, "packet_manifest.json"), JSON.stringify(manifest, null, 2), "utf8");
  console.log(JSON.stringify(manifest, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspace = path.resolve(__dirname, "..");
const rootUrl = "https://scitoxdetox.com";
const evidenceDir = path.join(workspace, "project_sources", "claims_inventory");
const priorEvidenceDir = path.join(workspace, "project_sources", "live_public_site");
const outputDir = path.join(workspace, "outputs", "public_site_extraction");
const outputFile = path.join(outputDir, "Claims_Inventory.xlsx");
const summaryFile = path.join(outputDir, "Claims_Inventory_Summary.md");

const categoryOrder = [
  "drug-test outcome",
  "detox/removal",
  "toxin/metabolite",
  "scientific/proven/tested",
  "success rate",
  "guarantee/refund",
  "testimonial/result",
  "competitor attack/comparison",
  "safety",
  "privacy/security",
  "medical/clinical",
  "AI-generated proof",
  "future/unrelated product claim",
  "other",
];

const columns = [
  "Claim ID",
  "Exact claim text",
  "URL",
  "Page title",
  "Page section",
  "Product/SKU if applicable",
  "Claim category",
  "Consumer takeaway",
  "Why it may be risky",
  "Evidence shown publicly",
  "Evidence needed from owner",
  "Vendor-readiness impact",
  "Payment/platform risk flag",
  "Amazon risk flag",
  "Advertising risk flag",
  "Recommended status",
  "Notes",
];

const seedPaths = [
  "/",
  "/?olsPage=cart",
  "/why-scitox%3F",
  "/detox-methods-comparison",
  "/how-it-works",
  "/results-%26-testimonials",
  "/macujo-vs-scitox-reviews",
  "/reviews",
  "/f-a-q-1",
  "/online-store",
  "/ols/all?sortOption=descend_by_created_at",
  "/ols/all?sortOption=descend_by_popularity",
  "/ols/categories/hair-follicle-drug-test-detox-shampoos-and-full-scitox-systems",
  "/ols/categories/scientifically-proven-urine-drug-test-products",
  "/featured-products",
  "/products",
  "/terms-and-conditions",
  "/returns-%26-refunds",
  "/privacy-policy",
  "/about-us",
  "/contact",
  "/the-macujo-method-scam",
];

const categoryRules = [
  ["drug-test outcome", /\b(pass(?:ed|ing)?|fail(?:ed|ure)?|clean|negative|drug test|hair follicle test|urine drug test|saliva drug test|oral fluid test)\b/i],
  ["detox/removal", /\b(detox(?:ify|ification)?|cleanse|cleansing|remove|removal|rid|mask(?:ing)?|flush|out)\b/i],
  ["toxin/metabolite", /\b(toxin|toxins|metabolite|THC|weed|cannabis|cocaine|amphetamine|benzodiazepine|benzo|ETG|alcohol|drug residues?)\b/i],
  ["scientific/proven/tested", /\b(scientific|scientifically|science|formulated|tested|proven|lab|laboratory|research|documented|R&D|engineered|developed by)\b/i],
  ["success rate", /\b(success rate|99(?:\.\d+)?%|100%|90%|rate|odds|guaranteed to|guaranteed)\b/i],
  ["guarantee/refund", /\b(guarantee|guaranteed|money back|refund|returns?|charge ?back|double your money|handling and administrative fee)\b/i],
  ["testimonial/result", /\b(testimonial|testimony|review|reviews|Trustpilot|Yotpo|Reddit|customer|screenshot|before-and-after|before & after|confirmation|experience|passed)\b/i],
  ["competitor attack/comparison", /\b(competitor|competitors|scam|Macujo|Aloe Rid|Hair Razor|trash our products|prey on people|bashing|can't compete|fake|every other company)\b/i],
  ["safety", /\b(warning|pregnant|physician|irritation|scalp|laxative|protective|eyes|children|safe|safety|do not use)\b/i],
  ["privacy/security", /\b(privacy|secure|data collection|data usage|data security|data retention|cookies|reCAPTCHA|SMS|STOP|HELP|hackers|intercepting|foreign accents|chat is glitching|confidential|private)\b/i],
  ["medical/clinical", /\b(physician|clinical|medical|doctor|laxative|scalp irritation|drug testing science|drug testing industry professionals)\b/i],
  ["AI-generated proof", /\b(ChatGPT|Trustpilot AI|Reddit AI|AI summary|artificial intelligence|AI)\b/i],
  ["future/unrelated product claim", /\b(NailTOX|urine detox|saliva detox|oral fluid|available now|coming soon|new product|future)\b/i],
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

function normalizeWhitespace(text = "") {
  return decodeEntities(text)
    .replace(/\r/g, "\n")
    .replace(/[ \t\f\v]+/g, " ")
    .replace(/\u00a0/g, " ")
    .replace(/ *\n */g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function stripHtml(html = "") {
  let expanded = html;
  for (const m of html.matchAll(/srcDoc="([\s\S]*?)"/gi)) expanded += "\n\n" + decodeEntities(m[1]);
  expanded = expanded
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<\/(h\d|p|div|section|article|li|tr|td|th|br)>/gi, "\n")
    .replace(/<[^>]+>/g, " ");
  return normalizeWhitespace(expanded);
}

function textFromInner(html = "") {
  return normalizeWhitespace(stripHtml(html));
}

function normalizeUrl(href, base = rootUrl) {
  if (!href || href.startsWith("#") || href.startsWith("javascript:") || href.startsWith("mailto:") || href.startsWith("tel:")) return null;
  try {
    const url = href.startsWith("//") ? new URL(`https:${href}`) : new URL(href, base);
    url.hash = "";
    if (url.hostname === "www.scitoxdetox.com") url.hostname = "scitoxdetox.com";
    return url;
  } catch {
    return null;
  }
}

function titleFromHtml(html) {
  return textFromInner(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "");
}

function metaTags(html) {
  const rows = [];
  for (const m of html.matchAll(/<meta\b[^>]*>/gi)) {
    const tag = m[0];
    const name = attr(tag, "name") || attr(tag, "property");
    const content = attr(tag, "content");
    if (name && content && /(description|title|og:description|og:title|twitter:description|twitter:title)/i.test(name)) {
      rows.push({ section: `Meta: ${name}`, text: normalizeWhitespace(content) });
    }
  }
  return rows;
}

function attr(tag, name) {
  return decodeEntities(tag.match(new RegExp(`${name}=["']([^"']*)["']`, "i"))?.[1] ?? "");
}

function archiveName(url) {
  const u = new URL(url);
  return `${u.pathname === "/" ? "home" : u.pathname.replace(/^\//, "")}${u.search ? "_" + u.search.slice(1) : ""}`
    .replace(/[^a-z0-9._-]+/gi, "_")
    .slice(0, 120) || "home";
}

async function fetchHtml(url) {
  const res = await fetch(url, {
    redirect: "follow",
    headers: {
      "user-agent": "Mozilla/5.0 Codex SciTox claims inventory",
      accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
  });
  return { status: res.status, finalUrl: res.url, html: await res.text() };
}

function extractInternalUrls(html, pageUrl) {
  const urls = [];
  for (const m of html.matchAll(/href=["']([^"']+)["']/gi)) {
    const normalized = normalizeUrl(decodeEntities(m[1]), pageUrl);
    if (!normalized || normalized.hostname !== "scitoxdetox.com") continue;
    if (/\.(jpg|jpeg|png|gif|webp|svg|ico|css|js|pdf|json|webmanifest)$/i.test(normalized.pathname)) continue;
    urls.push(normalized.href);
  }
  return urls;
}

function extractBlocks(html) {
  const blocks = [];
  blocks.push(...metaTags(html));
  const title = titleFromHtml(html);
  if (title) blocks.push({ section: "Title tag", text: title });

  let currentHeading = "";
  const blockPattern = /<(h[1-6]|p|li|a|button|td|th|figcaption|span)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  for (const m of html.matchAll(blockPattern)) {
    const tag = m[1].toLowerCase();
    const text = textFromInner(m[2]);
    if (!text || text.length < 4) continue;
    if (/^h[1-6]$/.test(tag)) currentHeading = text;
    blocks.push({ section: /^h[1-6]$/.test(tag) ? `Heading ${tag.toUpperCase()}` : currentHeading || tag.toUpperCase(), text });
  }

  for (const m of html.matchAll(/\b(?:aria-label|alt)=["']([^"']{10,})["']/gi)) {
    blocks.push({ section: "Image/ARIA text", text: normalizeWhitespace(m[1]) });
  }

  const fullText = stripHtml(html);
  for (const paragraph of fullText.split(/\n{1,}/).map((x) => x.trim()).filter(Boolean)) {
    if (paragraph.length >= 10) blocks.push({ section: currentHeading || "Body text", text: paragraph });
  }

  return dedupe(blocks, (b) => `${b.section}|${b.text.toLowerCase()}`);
}

function claimCategories(text) {
  const categories = categoryRules.filter(([, rx]) => rx.test(text)).map(([category]) => category);
  if (!categories.length && likelyClaim(text)) categories.push("other");
  return categoryOrder.filter((c) => categories.includes(c));
}

function likelyClaim(text) {
  return /\b(best|only|most|help|support|product|system|solution|private|call|text|hours|policy|terms)\b/i.test(text);
}

function splitClaimCandidates(text) {
  const cleaned = normalizeWhitespace(text);
  if (!cleaned) return [];
  const parts = [];
  if (cleaned.length <= 260) {
    parts.push(cleaned);
  } else {
    for (const sentence of cleaned.split(/(?<=[.!?])\s+(?=[A-Z0-9"“])|\n+/)) {
      const s = sentence.trim();
      if (s.length >= 10) parts.push(s);
    }
    if (!parts.length) parts.push(cleaned);
  }
  return parts.map((p) => p.trim()).filter((p) => p.length >= 10 && p.length <= 900);
}

function productSku(page, claimText) {
  const path = new URL(page.url).pathname;
  if (path.includes("/ols/products/")) return page.title || path.split("/").pop();
  if (/NailTOX/i.test(claimText)) return "NailTOX";
  if (/GreenOUT/i.test(claimText)) return "GreenOUT";
  if (/CrystalCLEAR/i.test(claimText)) return "CrystalCLEAR";
  if (/WhiteOUT/i.test(claimText)) return "WhiteOUT";
  if (/BenzoRID/i.test(claimText)) return "BenzoRID";
  if (/ETGTox/i.test(claimText)) return "ETGTox";
  if (/TotalTOX/i.test(claimText)) return "TotalTOX";
  if (/hair|follicle|shampoo/i.test(claimText)) return "Hair detox products";
  if (/urine/i.test(claimText)) return "Urine detox products";
  if (/saliva|oral fluid/i.test(claimText)) return "Saliva detox products";
  return "";
}

function consumerTakeaway(categories, text) {
  if (categories.includes("drug-test outcome")) return "A consumer may understand this as help passing or changing the outcome of a drug test.";
  if (categories.includes("success rate")) return "A consumer may understand this as a quantified likelihood of success.";
  if (categories.includes("scientific/proven/tested")) return "A consumer may understand this as scientific validation or testing support.";
  if (categories.includes("guarantee/refund")) return "A consumer may expect a specific refund or guarantee right.";
  if (categories.includes("testimonial/result")) return "A consumer may treat this as proof from prior customers or test results.";
  if (categories.includes("competitor attack/comparison")) return "A consumer may understand SciTOX as superior to named competitors.";
  if (categories.includes("safety")) return "A consumer may rely on this for safety or use-risk decisions.";
  if (categories.includes("privacy/security")) return "A consumer may rely on this for privacy, communication, or data-handling expectations.";
  if (/price|sale|lowest/i.test(text)) return "A consumer may understand this as current pricing or promotional terms.";
  return "A consumer may treat this as a material product or brand representation.";
}

function riskExplanation(categories) {
  const reasons = [];
  if (categories.includes("drug-test outcome")) reasons.push("Drug-test outcome language can be high-risk for vendors, marketplaces, payment processors, and ad platforms.");
  if (categories.includes("detox/removal")) reasons.push("Detox/removal language may imply biological or test-result effects that need substantiation.");
  if (categories.includes("toxin/metabolite")) reasons.push("Specific toxin/metabolite references can increase claim sensitivity and platform review risk.");
  if (categories.includes("scientific/proven/tested")) reasons.push("Scientific/proven/tested language requires substantiation before reuse.");
  if (categories.includes("success rate")) reasons.push("Numerical success claims require reliable support and methodology.");
  if (categories.includes("guarantee/refund")) reasons.push("Guarantee/refund language must match actual policy, eligibility, and payment-platform limits.");
  if (categories.includes("testimonial/result")) reasons.push("Testimonials/results need source verification, permissions, and substantiation of typicality where relevant.");
  if (categories.includes("competitor attack/comparison")) reasons.push("Aggressive comparison or attack language weakens vendor-ready credibility and may require review.");
  if (categories.includes("safety")) reasons.push("Safety and warning language should match real product directions and approved safety review.");
  if (categories.includes("privacy/security")) reasons.push("Privacy/security statements must match actual systems and data handling.");
  if (categories.includes("medical/clinical")) reasons.push("Medical or clinical-adjacent language needs careful review before reuse.");
  if (categories.includes("AI-generated proof")) reasons.push("AI-generated summaries should not be treated as proof without independent verification.");
  if (categories.includes("future/unrelated product claim")) reasons.push("Future or non-core product claims need owner confirmation before inclusion.");
  return reasons.join(" ");
}

function evidenceShown(text, categories) {
  if (/Trustpilot|Yotpo|Reddit/i.test(text)) return "Public text names review/community sources; source records were not validated in this inventory.";
  if (/screenshot|before-and-after|test result|confirmation/i.test(text)) return "Public text says screenshots/results exist; underlying evidence was not validated in this inventory.";
  if (/AI|ChatGPT|artificial intelligence/i.test(text)) return "Public text references AI-generated summaries; this is not owner substantiation.";
  if (/guarantee|refund|returns/i.test(text)) return "Public policy/guarantee wording appears on the site; current owner-approved terms still need confirmation.";
  return "No specific substantiation was verified from public text alone.";
}

function evidenceNeeded(categories) {
  const needs = new Set();
  if (categories.includes("scientific/proven/tested")) needs.add("testing records, formulation documentation, lab/professional support, approved substantiation");
  if (categories.includes("drug-test outcome") || categories.includes("detox/removal") || categories.includes("toxin/metabolite")) needs.add("claim substantiation for product mechanism and outcome language");
  if (categories.includes("success rate")) needs.add("success-rate methodology, data source, date range, sample size, and failure handling");
  if (categories.includes("guarantee/refund")) needs.add("current refund/guarantee policy, eligibility rules, exclusions, dispute history");
  if (categories.includes("testimonial/result")) needs.add("raw review links/exports, permissions, testimonial policies, original screenshots/results");
  if (categories.includes("safety") || categories.includes("medical/clinical")) needs.add("ingredient/safety review, use directions, warnings, adverse event handling");
  if (categories.includes("privacy/security")) needs.add("actual data flows, SMS/chat/WhatsApp systems, privacy policy support, retention/deletion process");
  if (categories.includes("competitor attack/comparison")) needs.add("documented comparison basis and approved review posture");
  if (categories.includes("future/unrelated product claim")) needs.add("current product availability, SKU status, inventory, approved launch scope");
  if (!needs.size) needs.add("owner confirmation before reuse");
  return `[OWNER DATA NEEDED] ${[...needs].join("; ")}`;
}

function vendorImpact(categories) {
  if (categories.includes("competitor attack/comparison")) return "Negative for vendor readiness; likely remove from vendor-facing materials.";
  if (categories.includes("drug-test outcome") || categories.includes("success rate") || categories.includes("scientific/proven/tested")) return "High impact; vendor-facing materials should avoid or heavily substantiate this wording.";
  if (categories.includes("testimonial/result") || categories.includes("guarantee/refund")) return "Moderate to high impact; proof/policy must be verified before vendor use.";
  if (categories.includes("privacy/security") || categories.includes("safety")) return "Can support trust only if accurate and operationally backed.";
  return "May inform structure but needs rewritten later for vendor-ready tone.";
}

function riskFlag(type, categories) {
  const highShared = ["drug-test outcome", "detox/removal", "toxin/metabolite", "success rate"];
  if (categories.some((c) => highShared.includes(c))) return "HIGH - [REVIEW REQUIRED]";
  if (type === "Payment" && categories.includes("guarantee/refund")) return "HIGH - [REVIEW REQUIRED]";
  if (type === "Amazon" && (categories.includes("scientific/proven/tested") || categories.includes("testimonial/result"))) return "HIGH - [REVIEW REQUIRED]";
  if (type === "Advertising" && (categories.includes("testimonial/result") || categories.includes("scientific/proven/tested") || categories.includes("medical/clinical"))) return "HIGH - [REVIEW REQUIRED]";
  if (categories.includes("competitor attack/comparison") || categories.includes("AI-generated proof") || categories.includes("safety") || categories.includes("privacy/security") || categories.includes("guarantee/refund")) return "MEDIUM - [REVIEW REQUIRED]";
  return "LOW / VERIFY";
}

function recommendedStatus(categories) {
  if (categories.includes("competitor attack/comparison")) return "REMOVE FROM PUBLIC REBUILD";
  if (categories.includes("AI-generated proof")) return "HIDE / ARCHIVE";
  if (categories.includes("medical/clinical") || categories.includes("safety") || categories.includes("privacy/security")) return "LEGAL REVIEW";
  if (categories.includes("drug-test outcome") || categories.includes("success rate") || categories.includes("scientific/proven/tested") || categories.includes("detox/removal") || categories.includes("toxin/metabolite")) return "OWNER DATA NEEDED";
  if (categories.includes("testimonial/result") || categories.includes("guarantee/refund") || categories.includes("future/unrelated product claim")) return "REVIEW REQUIRED";
  return "REWRITE LATER";
}

function notesFor(categories, text) {
  const notes = ["[REVIEW REQUIRED]"];
  if (!/Trustpilot|Yotpo|Reddit|screenshot|before-and-after|test result|confirmation|policy|terms|refund|guarantee/i.test(text)) {
    notes.push("[OWNER DATA NEEDED]");
  }
  if (categories.includes("AI-generated proof")) notes.push("Do not use AI output as proof.");
  if (categories.includes("competitor attack/comparison")) notes.push("Likely incompatible with vendor-facing materials.");
  return notes.join(" ");
}

function dedupe(items, keyFn) {
  const out = [];
  const seen = new Set();
  for (const item of items) {
    const key = keyFn(item);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
}

async function crawlPages() {
  await fs.mkdir(evidenceDir, { recursive: true });
  const queue = [];
  const queued = new Set();

  for (const p of seedPaths) {
    const href = new URL(p, rootUrl).href;
    queue.push(href);
    queued.add(href);
  }

  try {
    const manifest = JSON.parse(await fs.readFile(path.join(priorEvidenceDir, "crawl_manifest.json"), "utf8"));
    for (const p of manifest) {
      const href = normalizeUrl(p.url)?.href;
      if (href && !queued.has(href)) {
        queue.push(href);
        queued.add(href);
      }
    }
  } catch {
    // Prior extraction is helpful but not required.
  }

  const pages = [];
  while (queue.length && pages.length < 90) {
    const url = queue.shift();
    try {
      const { status, finalUrl, html } = await fetchHtml(url);
      const normalized = normalizeUrl(finalUrl)?.href ?? url;
      const title = titleFromHtml(html);
      const blocks = extractBlocks(html);
      const text = stripHtml(html);
      const page = { url: normalized, requestedUrl: url, status, title, html, text, blocks };
      pages.push(page);
      await fs.writeFile(path.join(evidenceDir, `${archiveName(normalized)}.html`), html, "utf8");
      await fs.writeFile(path.join(evidenceDir, `${archiveName(normalized)}.txt`), text, "utf8");

      for (const href of extractInternalUrls(html, normalized)) {
        if (!queued.has(href) && queue.length + pages.length < 110) {
          queued.add(href);
          queue.push(href);
        }
      }
    } catch (error) {
      pages.push({ url, requestedUrl: url, status: 0, title: "", html: "", text: "", blocks: [], error: error.message });
    }
  }

  await fs.writeFile(
    path.join(evidenceDir, "claims_crawl_manifest.json"),
    JSON.stringify(pages.map((p) => ({ url: p.url, status: p.status, title: p.title, textLength: p.text.length, blockCount: p.blocks.length, error: p.error ?? "" })), null, 2),
    "utf8",
  );
  return pages;
}

function makeRows(pages) {
  const rows = [];
  const seen = new Set();
  for (const page of pages) {
    for (const block of page.blocks) {
      for (const exactText of splitClaimCandidates(block.text)) {
        const categories = claimCategories(exactText);
        if (!categories.length) continue;
        const key = `${page.url}|${exactText.toLowerCase()}`;
        if (seen.has(key)) continue;
        seen.add(key);
        rows.push({
          "Claim ID": `CL-${String(rows.length + 1).padStart(4, "0")}`,
          "Exact claim text": exactText,
          URL: page.url,
          "Page title": page.title,
          "Page section": block.section,
          "Product/SKU if applicable": productSku(page, exactText),
          "Claim category": categories.join("; "),
          "Consumer takeaway": consumerTakeaway(categories, exactText),
          "Why it may be risky": riskExplanation(categories),
          "Evidence shown publicly": evidenceShown(exactText, categories),
          "Evidence needed from owner": evidenceNeeded(categories),
          "Vendor-readiness impact": vendorImpact(categories),
          "Payment/platform risk flag": riskFlag("Payment", categories),
          "Amazon risk flag": riskFlag("Amazon", categories),
          "Advertising risk flag": riskFlag("Advertising", categories),
          "Recommended status": recommendedStatus(categories),
          Notes: notesFor(categories, exactText),
        });
      }
    }
  }
  return rows.sort((a, b) => {
    const statusWeight = (row) => {
      if (row["Recommended status"] === "REMOVE FROM PUBLIC REBUILD") return 0;
      if (row["Recommended status"] === "HIDE / ARCHIVE") return 1;
      if (row["Recommended status"] === "OWNER DATA NEEDED") return 2;
      if (row["Recommended status"] === "LEGAL REVIEW") return 3;
      if (row["Recommended status"] === "REVIEW REQUIRED") return 4;
      return 5;
    };
    return statusWeight(a) - statusWeight(b) || a.URL.localeCompare(b.URL);
  }).map((row, i) => ({ ...row, "Claim ID": `CL-${String(i + 1).padStart(4, "0")}` }));
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

function writeMatrix(sheet, rows) {
  const matrix = [columns, ...rows.map((row) => columns.map((col) => row[col] ?? ""))];
  const end = `${colName(columns.length - 1)}${matrix.length}`;
  sheet.getRange(`A1:${end}`).values = matrix;
  sheet.showGridLines = false;
  sheet.freezePanes.freezeRows(1);
  sheet.getRange(`A1:${colName(columns.length - 1)}1`).format = {
    fill: "#1F4E78",
    font: { bold: true, color: "#FFFFFF" },
    wrapText: true,
  };
  sheet.getRange(`A1:${end}`).format.wrapText = true;
  sheet.getRange(`A1:${end}`).format.verticalAlignment = "Top";
  const widths = [90, 520, 360, 260, 180, 220, 240, 330, 420, 360, 430, 360, 190, 190, 190, 190, 360];
  widths.forEach((width, i) => {
    sheet.getRange(`${colName(i)}:${colName(i)}`).format.columnWidthPx = width;
  });
  try {
    sheet.tables.add(`A1:${end}`, true, "ClaimsInventory");
  } catch {
    // Export can proceed without a native table.
  }
}

function addSummarySheet(workbook, rows) {
  const sheet = workbook.worksheets.add("Summary");
  const countBy = (field) => {
    const map = new Map();
    for (const row of rows) {
      for (const value of String(row[field] ?? "").split(";").map((x) => x.trim()).filter(Boolean)) {
        map.set(value, (map.get(value) ?? 0) + 1);
      }
    }
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  };
  const statusCounts = countBy("Recommended status");
  const categoryCounts = countBy("Claim category");
  const matrix = [
    ["Claims Inventory Summary", ""],
    ["Total claims inventoried", rows.length],
    ["Generated from", "Live public SciTOX website plus existing public extraction files"],
    ["Important boundary", "Inventory only; no claim approval, rewrite, legal conclusion, or invented evidence."],
    ["", ""],
    ["Recommended status", "Count"],
    ...statusCounts,
    ["", ""],
    ["Claim category", "Count"],
    ...categoryCounts,
  ];
  sheet.getRange(`A1:B${matrix.length}`).values = matrix;
  sheet.getRange("A1:B1").format = { fill: "#1F4E78", font: { bold: true, color: "#FFFFFF" } };
  sheet.getRange("A:B").format.wrapText = true;
  sheet.getRange("A:A").format.columnWidthPx = 280;
  sheet.getRange("B:B").format.columnWidthPx = 220;
}

function buildMarkdownSummary(rows) {
  const has = (category) => rows.filter((r) => r["Claim category"].includes(category)).length;
  const statuses = (status) => rows.filter((r) => r["Recommended status"] === status).length;
  const examples = (predicate, max = 8) => rows.filter(predicate).slice(0, max).map((r) => `- ${r["Claim ID"]}: ${r["Exact claim text"].slice(0, 260)}`);
  const lines = [
    "# Claims Inventory Summary",
    "",
    `Claims inventoried: ${rows.length}`,
    "",
    "## 1. Highest-risk claim types",
    "",
    `- Drug-test outcome claims: ${has("drug-test outcome")}`,
    `- Detox/removal claims: ${has("detox/removal")}`,
    `- Scientific/proven/tested claims: ${has("scientific/proven/tested")}`,
    `- Success-rate claims: ${has("success rate")}`,
    `- Guarantee/refund claims: ${has("guarantee/refund")}`,
    `- Testimonial/result claims: ${has("testimonial/result")}`,
    `- Competitor attack/comparison claims: ${has("competitor attack/comparison")}`,
    `- AI-generated proof claims: ${has("AI-generated proof")}`,
    "",
    "## 2. Claims that should not appear in vendor-facing materials",
    "",
    ...examples((r) => r["Recommended status"] === "REMOVE FROM PUBLIC REBUILD" || r["Recommended status"] === "HIDE / ARCHIVE"),
    "",
    "## 3. Claims that need owner evidence",
    "",
    ...examples((r) => r["Recommended status"] === "OWNER DATA NEEDED" || r["Evidence needed from owner"].includes("[OWNER DATA NEEDED]")),
    "",
    "## 4. Claims that should be removed or hidden before redesign",
    "",
    `- REMOVE FROM PUBLIC REBUILD: ${statuses("REMOVE FROM PUBLIC REBUILD")}`,
    `- HIDE / ARCHIVE: ${statuses("HIDE / ARCHIVE")}`,
    "- Main reasons: competitor attack language, scam/comparison framing, AI-generated proof, and unsupported high-risk outcome/proof language.",
    "",
    "## 5. Claims that may be safe as structure only but need rewritten later",
    "",
    "- Product/category structure can inform the rebuild but final copy needs owner catalog data and claim review.",
    "- Contact/support/privacy structure can inform the rebuild but final wording needs operations and policy confirmation.",
    "- Review/testimonial structure can inform proof architecture but public proof needs source verification and approved handling.",
    "",
    "## Boundary",
    "",
    "This inventory copies public claims for review. It does not approve claims, rewrite copy, make legal conclusions, or invent evidence.",
  ];
  return lines.join("\n");
}

async function main() {
  await fs.mkdir(outputDir, { recursive: true });
  const pages = await crawlPages();
  const rows = makeRows(pages);

  const workbook = Workbook.create();
  const data = workbook.worksheets.add("Claims Inventory");
  writeMatrix(data, rows);
  addSummarySheet(workbook, rows);

  await workbook.inspect({ kind: "table", range: "Claims Inventory!A1:Q8", include: "values", maxChars: 4000 });
  await workbook.inspect({
    kind: "match",
    searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
    options: { useRegex: true, maxResults: 50 },
    maxChars: 1000,
  });
  await workbook.render({ sheetName: "Claims Inventory", range: "A1:Q12", scale: 1, format: "png" });
  await workbook.render({ sheetName: "Summary", range: "A1:B28", scale: 1, format: "png" });

  const output = await SpreadsheetFile.exportXlsx(workbook);
  await output.save(outputFile);
  await fs.writeFile(summaryFile, buildMarkdownSummary(rows), "utf8");
  await fs.writeFile(
    path.join(outputDir, "Claims_Inventory_manifest.json"),
    JSON.stringify({
      generatedAt: new Date().toISOString(),
      outputFile,
      summaryFile,
      pagesCrawled: pages.length,
      claimsInventoried: rows.length,
      source: "Live public SciTOX website plus existing public extraction files",
    }, null, 2),
    "utf8",
  );
  console.log(JSON.stringify({ outputFile, summaryFile, pagesCrawled: pages.length, claimsInventoried: rows.length }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

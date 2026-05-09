import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const outputDir = path.join(projectRoot, "outputs", "scitox_claims_cleanup");
const outputPath = path.join(outputDir, "Risky_Claims_Cleanup_List.xlsx");

const headers = [
  "Claim ID",
  "Exact current claim",
  "Page/source",
  "Claim type",
  "Risk reason",
  "Evidence needed",
  "Owner data needed",
  "Recommended status: Keep / Review / Remove / Rewrite Later / Legal Review",
  "Notes",
];

const rows = [
  [
    "RC-001",
    '"scientifically formulated, tested & proven" [REVIEW REQUIRED]',
    "Public-site audit discussion / current site claim example [REVIEW REQUIRED]",
    "Scientific/proven claim",
    "May require substantiation and review before reuse. [REVIEW REQUIRED]",
    "Testing records, substantiation, reviewer approval. [OWNER DATA NEEDED]",
    "Owner proof/testing files and prior review status. [OWNER DATA NEEDED]",
    "Review",
    "Do not rewrite or approve until source page and evidence are verified.",
  ],
  [
    "RC-002",
    '"pass hair follicle drug test" [REVIEW REQUIRED]',
    "Public-site audit discussion / current site claim example [REVIEW REQUIRED]",
    "Drug-test/pass-result claim",
    "Direct result framing may create claims, platform, vendor, and advertising risk. [REVIEW REQUIRED]",
    "Claims substantiation, policy review, legal/compliance review. [OWNER DATA NEEDED]",
    "Owner evidence, prior legal review, platform history. [OWNER DATA NEEDED]",
    "Legal Review",
    "Do not reuse in vendor-facing material without review.",
  ],
  [
    "RC-003",
    '"money-back guarantee" [REVIEW REQUIRED]',
    "Public-site audit discussion / current site claim example [REVIEW REQUIRED]",
    "Guarantee/refund claim",
    "Guarantee language must match actual refund terms and support process. [REVIEW REQUIRED]",
    "Current refund policy, guarantee terms, dispute/chargeback history. [OWNER DATA NEEDED]",
    "Refund handling, chargebacks, policy source, owner approval. [OWNER DATA NEEDED]",
    "Review",
    "Verify against policy pages and checkout/support language.",
  ],
  [
    "RC-004",
    '"99.75% success rate" [REVIEW REQUIRED]',
    "Public-site audit discussion / current site claim example [REVIEW REQUIRED]",
    "Success-rate claim",
    "Numeric performance claims require strong evidence and review. [REVIEW REQUIRED]",
    "Source data, methodology, sample size, date range, substantiation review. [OWNER DATA NEEDED]",
    "Owner source records and permission to use claim. [OWNER DATA NEEDED]",
    "Legal Review",
    "Do not use as proof or typical result without review.",
  ],
  [
    "RC-005",
    '"products to pass" drug tests [REVIEW REQUIRED]',
    "Products page/category framing from public-site audit discussion [REVIEW REQUIRED]",
    "Product/category result framing",
    "Broad pass-result category language may create vendor, marketplace, payment, and ad-platform risk. [REVIEW REQUIRED]",
    "Exact page text, product/category proof, compliance review. [OWNER DATA NEEDED]",
    "Owner-approved product positioning and source page confirmation. [OWNER DATA NEEDED]",
    "Review",
    "Verify exact page wording before action.",
  ],
  [
    "RC-006",
    "[PASTE EXACT CURRENT CLAIM] [REVIEW REQUIRED]",
    "[PAGE URL / SCREENSHOT / SOURCE] [OWNER DATA NEEDED]",
    "Testimonial/result claim",
    "Testimonials do not prove claims by themselves and can imply expected results. [REVIEW REQUIRED]",
    "Review source, permission, context, and substantiation. [OWNER DATA NEEDED]",
    "Review platform/source, permission, proof status. [OWNER DATA NEEDED]",
    "Review",
    "Template row for review/testimonial/result claims.",
  ],
  [
    "RC-007",
    "[PASTE EXACT CURRENT CLAIM] [REVIEW REQUIRED]",
    "[PAGE URL / SCREENSHOT / SOURCE] [OWNER DATA NEEDED]",
    "Privacy/security claim",
    "Privacy, confidentiality, encryption, or AI consultation language must match actual system behavior. [REVIEW REQUIRED]",
    "Technical workflow, privacy policy, data retention, tool routing. [OWNER DATA NEEDED]",
    "Form/chat/CRM stack and owner privacy policy. [OWNER DATA NEEDED]",
    "Legal Review",
    "Template row for privacy/discretion/intake language.",
  ],
  [
    "RC-008",
    "[PASTE EXACT CURRENT CLAIM] [REVIEW REQUIRED]",
    "[PAGE URL / SCREENSHOT / SOURCE] [OWNER DATA NEEDED]",
    "Competitor comparison",
    "Comparison or attack language may make the brand look unstable and may create legal risk. [REVIEW REQUIRED]",
    "Comparison evidence, legal review, business rationale. [OWNER DATA NEEDED]",
    "Owner approval and source evidence. [OWNER DATA NEEDED]",
    "Remove",
    "Template row for competitor claims or attack language.",
  ],
];

const instructions = [
  ["Purpose", "Use this workbook to inventory risky SciTOX public-site claims before rewriting or approving anything."],
  ["Boundary", "Do not rewrite claims in this file. Do not approve claims in this file. Mark uncertain items [REVIEW REQUIRED]."],
  ["Exact claim field", "Paste exact current wording from the live page, screenshot, transcript, or archived extraction."],
  ["Status options", "Use only: Keep, Review, Remove, Rewrite Later, Legal Review."],
  ["Owner data", "Use [OWNER DATA NEEDED] for proof, testing, platform history, refund details, traffic, sales, margins, or support details not yet confirmed."],
  ["Review marker", "Use [REVIEW REQUIRED] for claim-sensitive or uncertain language."],
  ["Source context", "docs/WEBSITE_REBUILD_BRIEF.md, docs/PUBLIC_SITE_MESSAGING_RULES.md, docs/VENDOR_READY_STRATEGY_BRIEF.md"],
];

const claimTypes = [
  "Drug-test/pass-result claim",
  "Guarantee/refund claim",
  "Success-rate claim",
  "Scientific/proven claim",
  "Product/category result framing",
  "Substance-specific claim",
  "Mechanism-of-action claim",
  "Testimonial/result claim",
  "Competitor comparison",
  "Safety/health/ingredient claim",
  "Privacy/security claim",
  "AI/private consultation claim",
  "Vendor/marketplace/payment claim",
  "Other [REVIEW REQUIRED]",
];

const statuses = ["Keep", "Review", "Remove", "Rewrite Later", "Legal Review"];

await fs.mkdir(outputDir, { recursive: true });

const workbook = Workbook.create();
const log = workbook.worksheets.add("Claims Cleanup List");
const lists = workbook.worksheets.add("Lists");
const guide = workbook.worksheets.add("Instructions");

log.showGridLines = false;
lists.showGridLines = false;
guide.showGridLines = false;

log.getRange("A1:I1").values = [headers];
log.getRange(`A2:I${rows.length + 1}`).values = rows;

const blankRows = Array.from({ length: 92 }, (_, i) => [
  `RC-${String(i + rows.length + 1).padStart(3, "0")}`,
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
]);
log.getRange(`A${rows.length + 2}:I${rows.length + 1 + blankRows.length}`).values = blankRows;

const totalRows = rows.length + 1 + blankRows.length;
const tableRange = `A1:I${totalRows}`;
const table = log.tables.add(tableRange, true, "RiskyClaimsCleanupTable");
table.style = "TableStyleMedium4";
table.showFilterButton = true;

log.freezePanes.freezeRows(1);
log.getRange("A1:I1").format = {
  fill: "#0B3D2E",
  font: { bold: true, color: "#FFFFFF" },
  wrapText: true,
};
log.getRange(`A2:I${totalRows}`).format = {
  wrapText: true,
  verticalAlignment: "top",
};
log.getRange("A:A").format.columnWidthPx = 90;
log.getRange("B:B").format.columnWidthPx = 260;
log.getRange("C:C").format.columnWidthPx = 220;
log.getRange("D:D").format.columnWidthPx = 190;
log.getRange("E:E").format.columnWidthPx = 270;
log.getRange("F:F").format.columnWidthPx = 260;
log.getRange("G:G").format.columnWidthPx = 250;
log.getRange("H:H").format.columnWidthPx = 210;
log.getRange("I:I").format.columnWidthPx = 260;
log.getRange(`A2:I${totalRows}`).format.rowHeightPx = 72;
log.getRange("A1:I1").format.rowHeightPx = 42;

lists.getRange("A1").values = [["Claim Types"]];
lists.getRange(`A2:A${claimTypes.length + 1}`).values = claimTypes.map((v) => [v]);
lists.getRange("C1").values = [["Recommended Status"]];
lists.getRange(`C2:C${statuses.length + 1}`).values = statuses.map((v) => [v]);
lists.getRange("A1:C1").format = {
  fill: "#0B3D2E",
  font: { bold: true, color: "#FFFFFF" },
};
lists.getRange("A:A").format.columnWidthPx = 230;
lists.getRange("C:C").format.columnWidthPx = 180;

log.getRange(`D2:D${totalRows}`).dataValidation = {
  rule: { type: "list", formula1: `Lists!$A$2:$A$${claimTypes.length + 1}` },
};
log.getRange(`H2:H${totalRows}`).dataValidation = {
  rule: { type: "list", formula1: `Lists!$C$2:$C$${statuses.length + 1}` },
};

guide.getRange("A1:B1").values = [["SciTOX Risky Claims Cleanup List", "Template Rules"]];
guide.getRange("A1:B1").merge();
guide.getRange("A1:B1").format = {
  fill: "#0B3D2E",
  font: { bold: true, color: "#FFFFFF", size: 16 },
};
guide.getRange(`A3:B${instructions.length + 2}`).values = instructions;
guide.getRange("A3:A9").format = {
  fill: "#E7F5EF",
  font: { bold: true, color: "#0B3D2E" },
};
guide.getRange("B3:B9").format = { wrapText: true };
guide.getRange("A:A").format.columnWidthPx = 180;
guide.getRange("B:B").format.columnWidthPx = 700;
guide.getRange("A3:B9").format.rowHeightPx = 52;

const inspect = await workbook.inspect({
  kind: "table",
  range: "Claims Cleanup List!A1:I10",
  include: "values",
  tableMaxRows: 10,
  tableMaxCols: 9,
  maxChars: 4000,
});
console.log(inspect.ndjson);

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 50 },
  summary: "formula error scan",
});
console.log(errors.ndjson);

const preview = await workbook.render({
  sheetName: "Claims Cleanup List",
  range: "A1:I12",
  scale: 1,
  format: "png",
});
await fs.writeFile(path.join(outputDir, "claims_cleanup_preview.png"), new Uint8Array(await preview.arrayBuffer()));

const xlsx = await SpreadsheetFile.exportXlsx(workbook);
await xlsx.save(outputPath);

console.log(`Saved ${outputPath}`);

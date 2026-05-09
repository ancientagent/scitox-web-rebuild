import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const outputDir = path.join(projectRoot, "outputs", "scitox_buyer_outreach");
const outputPath = path.join(outputDir, "Buyer_Outreach_Tracker.xlsx");

const headers = [
  "Company",
  "Website",
  "Buyer/contact",
  "Category type",
  "Store/distributor/online vendor",
  "Product fit",
  "Risk level",
  "Vendor form link",
  "Required docs",
  "Notes",
  "Outreach status",
  "Follow-up date",
  "Owner approval required",
];

const templateRows = Array.from({ length: 100 }, () => Array(headers.length).fill(""));

const categoryTypes = [
  "Smoke shop",
  "Head shop",
  "Online retailer",
  "Distributor",
  "Wholesaler",
  "Specialty retailer",
  "Marketplace",
  "Affiliate/referral partner",
  "Other [REVIEW REQUIRED]",
];

const channelTypes = [
  "Store",
  "Distributor",
  "Online vendor",
  "Wholesale platform",
  "Retail chain",
  "Other [REVIEW REQUIRED]",
];

const productFit = [
  "Strong fit",
  "Possible fit",
  "Low fit",
  "Unknown [OWNER DATA NEEDED]",
  "Blocked [REVIEW REQUIRED]",
];

const riskLevels = [
  "Low",
  "Medium",
  "High",
  "Unknown [REVIEW REQUIRED]",
  "Do not contact yet",
];

const outreachStatuses = [
  "Not started",
  "Researching",
  "Ready for owner review",
  "Approved to contact",
  "Contacted",
  "Follow-up needed",
  "Responded",
  "Not a fit",
  "Paused [REVIEW REQUIRED]",
];

const approvalOptions = [
  "Yes - owner approval required",
  "Approved",
  "No - research only",
  "Blocked [REVIEW REQUIRED]",
];

const requiredDocsOptions = [
  "Product line sheet",
  "Product images",
  "Label files",
  "Ingredients",
  "MSRP/wholesale pricing",
  "MOQ/case pack",
  "UPC/GTIN",
  "Shipping/returns terms",
  "Insurance",
  "Claims review",
  "Other [OWNER DATA NEEDED]",
];

const instructions = [
  ["Purpose", "Track potential SciTOX buyers, vendors, wholesalers, distributors, smoke shops, head shops, and online retailers."],
  ["Boundary", "Do not contact vendors from this tracker until owner approval is recorded."],
  ["Research rule", "Use public information only unless the owner provides private buyer details."],
  ["Claims rule", "Do not include unreviewed product claims, success rates, guarantees, Amazon eligibility, vendor acceptance, or legal conclusions in notes."],
  ["Risk rule", "Use High or Unknown [REVIEW REQUIRED] when a buyer/channel could create platform, payment, claims, fulfillment, or reputation risk."],
  ["Owner approval", "Set Owner approval required before outreach. Do not mark Approved unless the owner explicitly approves that company/contact."],
  ["Required docs", "List documents needed before outreach, such as line sheet, images, labels, wholesale pricing, MOQ/case pack, UPC/GTIN, shipping terms, and claims review."],
];

await fs.mkdir(outputDir, { recursive: true });

const workbook = Workbook.create();
const tracker = workbook.worksheets.add("Buyer Outreach Tracker");
const guide = workbook.worksheets.add("Instructions");
const lists = workbook.worksheets.add("Lists");

tracker.showGridLines = false;
guide.showGridLines = false;
lists.showGridLines = false;

tracker.getRange("A1:M1").values = [["SciTOX Buyer Outreach Tracker", ...Array(headers.length - 1).fill("")]];
tracker.getRange("A1:M1").merge();
tracker.getRange("A1:M1").format = {
  fill: "#0B3D2E",
  font: { bold: true, color: "#FFFFFF", size: 16 },
};
tracker.getRange("A2:M2").values = [["Research and approval tracker only. Do not contact vendors until owner approval is recorded.", ...Array(headers.length - 1).fill("")]];
tracker.getRange("A2:M2").merge();
tracker.getRange("A2:M2").format = {
  fill: "#E7F5EF",
  font: { color: "#0B3D2E" },
  wrapText: true,
};

tracker.getRange("A4:M4").values = [headers];
tracker.getRange(`A5:M${templateRows.length + 4}`).values = templateRows;
const table = tracker.tables.add(`A4:M${templateRows.length + 4}`, true, "BuyerOutreachTrackerTable");
table.style = "TableStyleMedium4";
table.showFilterButton = true;
tracker.freezePanes.freezeRows(4);

tracker.getRange("A4:M4").format = {
  fill: "#0B3D2E",
  font: { bold: true, color: "#FFFFFF" },
  wrapText: true,
};
tracker.getRange(`A5:M${templateRows.length + 4}`).format = {
  wrapText: true,
  verticalAlignment: "top",
};

const widths = [190, 220, 180, 170, 210, 150, 150, 220, 260, 280, 180, 140, 210];
for (let i = 0; i < widths.length; i++) {
  tracker.getRangeByIndexes(0, i, 1, 1).format.columnWidthPx = widths[i];
}
tracker.getRange("A1:M1").format.rowHeightPx = 34;
tracker.getRange("A2:M2").format.rowHeightPx = 38;
tracker.getRange("A4:M4").format.rowHeightPx = 44;
tracker.getRange(`A5:M${templateRows.length + 4}`).format.rowHeightPx = 64;
tracker.getRange("L5:L104").setNumberFormat("yyyy-mm-dd");

lists.getRange("A1").values = [["Category type"]];
lists.getRange(`A2:A${categoryTypes.length + 1}`).values = categoryTypes.map((v) => [v]);
lists.getRange("C1").values = [["Channel type"]];
lists.getRange(`C2:C${channelTypes.length + 1}`).values = channelTypes.map((v) => [v]);
lists.getRange("E1").values = [["Product fit"]];
lists.getRange(`E2:E${productFit.length + 1}`).values = productFit.map((v) => [v]);
lists.getRange("G1").values = [["Risk level"]];
lists.getRange(`G2:G${riskLevels.length + 1}`).values = riskLevels.map((v) => [v]);
lists.getRange("I1").values = [["Outreach status"]];
lists.getRange(`I2:I${outreachStatuses.length + 1}`).values = outreachStatuses.map((v) => [v]);
lists.getRange("K1").values = [["Owner approval"]];
lists.getRange(`K2:K${approvalOptions.length + 1}`).values = approvalOptions.map((v) => [v]);
lists.getRange("M1").values = [["Required docs examples"]];
lists.getRange(`M2:M${requiredDocsOptions.length + 1}`).values = requiredDocsOptions.map((v) => [v]);

lists.getRange("A1:M1").format = {
  fill: "#0B3D2E",
  font: { bold: true, color: "#FFFFFF" },
};
for (const col of ["A", "C", "E", "G", "I", "K", "M"]) {
  lists.getRange(`${col}:${col}`).format.columnWidthPx = 230;
}

tracker.getRange("D5:D104").dataValidation = {
  rule: { type: "list", formula1: `Lists!$A$2:$A$${categoryTypes.length + 1}` },
};
tracker.getRange("E5:E104").dataValidation = {
  rule: { type: "list", formula1: `Lists!$C$2:$C$${channelTypes.length + 1}` },
};
tracker.getRange("F5:F104").dataValidation = {
  rule: { type: "list", formula1: `Lists!$E$2:$E$${productFit.length + 1}` },
};
tracker.getRange("G5:G104").dataValidation = {
  rule: { type: "list", formula1: `Lists!$G$2:$G$${riskLevels.length + 1}` },
};
tracker.getRange("K5:K104").dataValidation = {
  rule: { type: "list", formula1: `Lists!$I$2:$I$${outreachStatuses.length + 1}` },
};
tracker.getRange("M5:M104").dataValidation = {
  rule: { type: "list", formula1: `Lists!$K$2:$K$${approvalOptions.length + 1}` },
};

guide.getRange("A1:B1").values = [["Buyer Outreach Tracker Instructions", ""]];
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
guide.getRange("A:B").format = { wrapText: true, verticalAlignment: "top" };
guide.getRange("A:A").format.columnWidthPx = 180;
guide.getRange("B:B").format.columnWidthPx = 680;
guide.getRange("A3:B9").format.rowHeightPx = 54;

const inspect = await workbook.inspect({
  kind: "table",
  range: "Buyer Outreach Tracker!A1:M8",
  include: "values",
  tableMaxRows: 8,
  tableMaxCols: 13,
  maxChars: 5000,
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
  sheetName: "Buyer Outreach Tracker",
  range: "A1:M12",
  scale: 1,
  format: "png",
});
await fs.writeFile(path.join(outputDir, "buyer_outreach_preview.png"), new Uint8Array(await preview.arrayBuffer()));

const xlsx = await SpreadsheetFile.exportXlsx(workbook);
await xlsx.save(outputPath);

console.log(`Saved ${outputPath}`);

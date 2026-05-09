import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const outputDir = path.join(projectRoot, "outputs", "scitox_product_data");
const outputPath = path.join(outputDir, "Product_Data_Requirements.xlsx");

const headers = [
  "Product name",
  "SKU",
  "Size",
  "Price",
  "MSRP",
  "Wholesale price",
  "MOQ",
  "Case pack",
  "UPC/GTIN",
  "Ingredients",
  "Label file",
  "Product image",
  "Instructions",
  "Warnings",
  "Shipping notes",
  "Review-required claims",
  "Owner data needed",
];

const placeholderRows = [
  [
    "[OWNER DATA NEEDED]",
    "[OWNER DATA NEEDED]",
    "[OWNER DATA NEEDED]",
    "[OWNER DATA NEEDED]",
    "[OWNER DATA NEEDED]",
    "[OWNER DATA NEEDED]",
    "[OWNER DATA NEEDED]",
    "[OWNER DATA NEEDED]",
    "[OWNER DATA NEEDED]",
    "[OWNER DATA NEEDED]",
    "[OWNER DATA NEEDED]",
    "[OWNER DATA NEEDED]",
    "[REVIEW REQUIRED]",
    "[REVIEW REQUIRED]",
    "[OWNER DATA NEEDED]",
    "[REVIEW REQUIRED]",
    "Confirm all fields with owner before public or vendor use.",
  ],
  ...Array.from({ length: 99 }, () => Array(headers.length).fill("")),
];

const fieldGuideRows = [
  ["Field", "Public product page use", "Vendor/wholesale use", "Review / data rule"],
  ["Product name", "Primary product display label.", "Line sheet and buyer-facing product list.", "Owner-confirmed source required."],
  ["SKU", "Product template metadata.", "Required for line sheet, inventory, and wholesale ordering.", "Owner-confirmed source required."],
  ["Size", "Product facts panel.", "Buyer comparison and case-pack planning.", "Owner-confirmed source required."],
  ["Price", "Public price or current checkout reference.", "May be excluded from vendor materials.", "Owner/payment review required."],
  ["MSRP", "Usually not central on public page unless approved.", "Core vendor/wholesale field.", "Owner-confirmed source required."],
  ["Wholesale price", "Do not show publicly unless approved.", "Core wholesale field.", "Owner-confirmed source required."],
  ["MOQ", "Do not show publicly unless approved.", "Wholesale ordering requirement.", "Owner-confirmed source required."],
  ["Case pack", "Usually not public-facing.", "Wholesale ordering and fulfillment requirement.", "Owner-confirmed source required."],
  ["UPC/GTIN", "May support structured product data.", "Buyer/platform product identifier.", "Owner-confirmed source required."],
  ["Ingredients", "Product detail section.", "Buyer documentation and review packet.", "Owner-confirmed source plus review."],
  ["Label file", "Source for public product facts.", "Vendor documentation packet.", "Owner file path/link required."],
  ["Product image", "Main product media.", "Line sheet and vendor packet.", "Owner-approved asset required."],
  ["Instructions", "Use/directions section.", "Buyer/support documentation.", "Claim-sensitive; mark [REVIEW REQUIRED]."],
  ["Warnings", "Policy/support section.", "Buyer safety/compliance documentation.", "Review required before use."],
  ["Shipping notes", "Shipping/support expectations.", "Wholesale fulfillment terms.", "Owner-confirmed source required."],
  ["Review-required claims", "Flags copy that cannot become final yet.", "Prevents risky vendor-facing language.", "Use [REVIEW REQUIRED]."],
  ["Owner data needed", "Tracks missing facts before launch.", "Tracks missing facts before outreach.", "Use [OWNER DATA NEEDED]."],
];

const instructions = [
  ["Purpose", "Collect product data needed for SciTOX public product pages and vendor/wholesale materials."],
  ["Boundary", "Do not invent product data. Do not approve claims. Use [OWNER DATA NEEDED] and [REVIEW REQUIRED]."],
  ["Public site use", "Product name, size, price, image, ingredients, instructions, warnings, shipping notes, and reviewed claims support Webflow product pages."],
  ["Vendor use", "SKU, MSRP, wholesale price, MOQ, case pack, UPC/GTIN, label file, image, ingredients, and shipping notes support line sheets and wholesale review."],
  ["Claims", "Instructions, warnings, and claims fields are review-sensitive until owner data and legal/compliance review are complete."],
  ["V1 rule", "Leave fields blank or marked [OWNER DATA NEEDED] rather than filling guessed values."],
];

const claimStatus = ["[REVIEW REQUIRED]", "No public claim", "Owner proof needed", "Legal review needed", "Ready after review"];
const ownerDataStatus = ["[OWNER DATA NEEDED]", "Owner confirmed", "Source file needed", "Review pending", "Not applicable"];

await fs.mkdir(outputDir, { recursive: true });

const workbook = Workbook.create();
const data = workbook.worksheets.add("Product Data");
const guide = workbook.worksheets.add("Field Guide");
const lists = workbook.worksheets.add("Lists");

data.showGridLines = false;
guide.showGridLines = false;
lists.showGridLines = false;

data.getRange("A1:Q1").values = [["SciTOX Product Data Requirements", ...Array(headers.length - 1).fill("")]];
data.getRange("A1:Q1").merge();
data.getRange("A1:Q1").format = {
  fill: "#0B3D2E",
  font: { bold: true, color: "#FFFFFF", size: 16 },
};
data.getRange("A2:Q2").values = [["Use this sheet for Webflow product pages and vendor/wholesale materials. Do not invent data; use [OWNER DATA NEEDED] and [REVIEW REQUIRED].", ...Array(headers.length - 1).fill("")]];
data.getRange("A2:Q2").merge();
data.getRange("A2:Q2").format = {
  fill: "#E7F5EF",
  font: { color: "#0B3D2E" },
  wrapText: true,
};

data.getRange("A4:Q4").values = [headers];
data.getRange(`A5:Q${placeholderRows.length + 4}`).values = placeholderRows;
const table = data.tables.add(`A4:Q${placeholderRows.length + 4}`, true, "ProductDataRequirementsTable");
table.style = "TableStyleMedium4";
table.showFilterButton = true;

data.freezePanes.freezeRows(4);
data.getRange("A4:Q4").format = {
  fill: "#0B3D2E",
  font: { bold: true, color: "#FFFFFF" },
  wrapText: true,
};
data.getRange(`A5:Q${placeholderRows.length + 4}`).format = {
  wrapText: true,
  verticalAlignment: "top",
};

const widths = [180, 120, 100, 100, 100, 130, 90, 110, 130, 260, 200, 200, 260, 240, 220, 260, 260];
for (let i = 0; i < widths.length; i++) {
  data.getRangeByIndexes(0, i, 1, 1).format.columnWidthPx = widths[i];
}
data.getRange("A1:Q1").format.rowHeightPx = 34;
data.getRange("A2:Q2").format.rowHeightPx = 42;
data.getRange("A4:Q4").format.rowHeightPx = 44;
data.getRange(`A5:Q${placeholderRows.length + 4}`).format.rowHeightPx = 70;
data.getRange("D5:F104").format.numberFormat = "$#,##0.00";
data.getRange("G5:H104").format.numberFormat = "0";

lists.getRange("A1").values = [["Review-required claims options"]];
lists.getRange(`A2:A${claimStatus.length + 1}`).values = claimStatus.map((v) => [v]);
lists.getRange("C1").values = [["Owner data needed options"]];
lists.getRange(`C2:C${ownerDataStatus.length + 1}`).values = ownerDataStatus.map((v) => [v]);
lists.getRange("A1:C1").format = {
  fill: "#0B3D2E",
  font: { bold: true, color: "#FFFFFF" },
};
lists.getRange("A:A").format.columnWidthPx = 230;
lists.getRange("C:C").format.columnWidthPx = 220;

data.getRange("P5:P104").dataValidation = {
  rule: { type: "list", formula1: `Lists!$A$2:$A$${claimStatus.length + 1}` },
};
data.getRange("Q5:Q104").dataValidation = {
  rule: { type: "list", formula1: `Lists!$C$2:$C$${ownerDataStatus.length + 1}` },
};

guide.getRange("A1:D1").values = [["Product Data Field Guide", "", "", ""]];
guide.getRange("A1:D1").merge();
guide.getRange("A1:D1").format = {
  fill: "#0B3D2E",
  font: { bold: true, color: "#FFFFFF", size: 16 },
};
guide.getRange(`A3:D${fieldGuideRows.length + 2}`).values = fieldGuideRows;
const guideTable = guide.tables.add(`A3:D${fieldGuideRows.length + 2}`, true, "ProductFieldGuideTable");
guideTable.style = "TableStyleMedium4";
guide.getRange("A:D").format = { wrapText: true, verticalAlignment: "top" };
guide.getRange("A:A").format.columnWidthPx = 170;
guide.getRange("B:B").format.columnWidthPx = 280;
guide.getRange("C:C").format.columnWidthPx = 280;
guide.getRange("D:D").format.columnWidthPx = 280;
guide.freezePanes.freezeRows(3);

guide.getRange("F1:G1").values = [["Template Instructions", ""]];
guide.getRange("F1:G1").merge();
guide.getRange("F1:G1").format = {
  fill: "#0B3D2E",
  font: { bold: true, color: "#FFFFFF" },
};
guide.getRange(`F3:G${instructions.length + 2}`).values = instructions;
guide.getRange("F:G").format = { wrapText: true, verticalAlignment: "top" };
guide.getRange("F:F").format.columnWidthPx = 160;
guide.getRange("G:G").format.columnWidthPx = 520;

const inspect = await workbook.inspect({
  kind: "table",
  range: "Product Data!A1:Q8",
  include: "values",
  tableMaxRows: 8,
  tableMaxCols: 17,
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
  sheetName: "Product Data",
  range: "A1:Q10",
  scale: 1,
  format: "png",
});
await fs.writeFile(path.join(outputDir, "product_data_preview.png"), new Uint8Array(await preview.arrayBuffer()));

const xlsx = await SpreadsheetFile.exportXlsx(workbook);
await xlsx.save(outputPath);

console.log(`Saved ${outputPath}`);

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const outputDir = path.join(projectRoot, "outputs", "scitox_product_line_sheet");
const outputPath = path.join(outputDir, "Product_Line_Sheet_Template.xlsx");

const headers = [
  "SKU",
  "Product name",
  "Product category",
  "Size",
  "MSRP",
  "Wholesale price",
  "Case pack",
  "MOQ",
  "UPC/GTIN",
  "Short safe description [REVIEW REQUIRED]",
  "Product image",
  "Ingredients [OWNER DATA NEEDED]",
  "Shipping notes",
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
    "[REVIEW REQUIRED]",
    "[OWNER DATA NEEDED]",
    "[OWNER DATA NEEDED]",
    "[OWNER DATA NEEDED]",
  ],
  ...Array.from({ length: 49 }, () => Array(headers.length).fill("")),
];

const instructions = [
  ["Purpose", "Vendor-facing line sheet template for SciTOX wholesale, distributor, smoke shop, head shop, online retailer, and partner outreach."],
  ["Boundary", "Do not invent product data. Do not approve claims. Leave missing fields blank or mark [OWNER DATA NEEDED]."],
  ["Claims rule", "The short safe description field is always [REVIEW REQUIRED] until owner, substantiation, and compliance review are complete."],
  ["Pricing rule", "MSRP, wholesale price, MOQ, and case pack must come from the owner before use."],
  ["Image rule", "Use owner-approved product image paths or links only."],
  ["Ingredients rule", "Ingredients must come from owner-provided label, packaging, or product docs."],
  ["Outreach rule", "Do not send this line sheet to vendors until owner approval and claims review are complete."],
];

const categories = [
  "[OWNER DATA NEEDED]",
  "Hair detox [REVIEW REQUIRED]",
  "Product support item [REVIEW REQUIRED]",
  "Bundle [REVIEW REQUIRED]",
  "Other [REVIEW REQUIRED]",
];

const reviewMarkers = [
  "[REVIEW REQUIRED]",
  "Owner proof needed",
  "Legal review needed",
  "Ready after review",
];

await fs.mkdir(outputDir, { recursive: true });

const workbook = Workbook.create();
const lineSheet = workbook.worksheets.add("Line Sheet");
const guide = workbook.worksheets.add("Instructions");
const lists = workbook.worksheets.add("Lists");

lineSheet.showGridLines = false;
guide.showGridLines = false;
lists.showGridLines = false;

lineSheet.getRange("A1:M1").values = [["SciTOX Product Line Sheet Template", ...Array(headers.length - 1).fill("")]];
lineSheet.getRange("A1:M1").merge();
lineSheet.getRange("A1:M1").format = {
  fill: "#0B3D2E",
  font: { bold: true, color: "#FFFFFF", size: 16 },
};

lineSheet.getRange("A2:M2").values = [["Vendor outreach draft only. No product data, pricing, or claims are approved until owner review is complete.", ...Array(headers.length - 1).fill("")]];
lineSheet.getRange("A2:M2").merge();
lineSheet.getRange("A2:M2").format = {
  fill: "#E7F5EF",
  font: { color: "#0B3D2E" },
  wrapText: true,
};

lineSheet.getRange("A4:M4").values = [headers];
lineSheet.getRange(`A5:M${placeholderRows.length + 4}`).values = placeholderRows;

const table = lineSheet.tables.add(`A4:M${placeholderRows.length + 4}`, true, "ProductLineSheetTable");
table.style = "TableStyleMedium4";
table.showFilterButton = true;

lineSheet.freezePanes.freezeRows(4);
lineSheet.getRange("A4:M4").format = {
  fill: "#0B3D2E",
  font: { bold: true, color: "#FFFFFF" },
  wrapText: true,
};
lineSheet.getRange(`A5:M${placeholderRows.length + 4}`).format = {
  wrapText: true,
  verticalAlignment: "top",
};

const widths = [120, 190, 190, 110, 110, 135, 110, 90, 130, 310, 220, 270, 230];
for (let i = 0; i < widths.length; i++) {
  lineSheet.getRangeByIndexes(0, i, 1, 1).format.columnWidthPx = widths[i];
}

lineSheet.getRange("A1:M1").format.rowHeightPx = 34;
lineSheet.getRange("A2:M2").format.rowHeightPx = 40;
lineSheet.getRange("A4:M4").format.rowHeightPx = 48;
lineSheet.getRange(`A5:M${placeholderRows.length + 4}`).format.rowHeightPx = 76;
lineSheet.getRange("E5:F54").format.numberFormat = "$#,##0.00";
lineSheet.getRange("G5:H54").format.numberFormat = "0";

lists.getRange("A1").values = [["Product category options"]];
lists.getRange(`A2:A${categories.length + 1}`).values = categories.map((value) => [value]);
lists.getRange("C1").values = [["Review marker options"]];
lists.getRange(`C2:C${reviewMarkers.length + 1}`).values = reviewMarkers.map((value) => [value]);
lists.getRange("A1:C1").format = {
  fill: "#0B3D2E",
  font: { bold: true, color: "#FFFFFF" },
};
lists.getRange("A:A").format.columnWidthPx = 240;
lists.getRange("C:C").format.columnWidthPx = 200;

lineSheet.getRange("C5:C54").dataValidation = {
  rule: { type: "list", formula1: `Lists!$A$2:$A$${categories.length + 1}` },
};
lineSheet.getRange("J5:J54").dataValidation = {
  rule: { type: "list", formula1: `Lists!$C$2:$C$${reviewMarkers.length + 1}` },
};

guide.getRange("A1:B1").values = [["Product Line Sheet Instructions", ""]];
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
guide.getRange("A:A").format.columnWidthPx = 170;
guide.getRange("B:B").format.columnWidthPx = 720;
guide.getRange("A3:B9").format.rowHeightPx = 54;

const inspect = await workbook.inspect({
  kind: "table",
  range: "Line Sheet!A1:M8",
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
  sheetName: "Line Sheet",
  range: "A1:M12",
  scale: 1,
  format: "png",
});
await fs.writeFile(path.join(outputDir, "product_line_sheet_preview.png"), new Uint8Array(await preview.arrayBuffer()));

const xlsx = await SpreadsheetFile.exportXlsx(workbook);
await xlsx.save(outputPath);

console.log(`Saved ${outputPath}`);

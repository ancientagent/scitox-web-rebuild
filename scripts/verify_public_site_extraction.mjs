import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const outputDir = path.join(projectRoot, "outputs", "public_site_extraction");
const files = [
  "Current_Site_Map.xlsx",
  "Claims_Inventory.xlsx",
  "Product_Catalog_Public_Pull.xlsx",
  "Policy_Trust_Audit.xlsx",
  "Contact_Flow_Audit.xlsx",
  "Review_Asset_Audit.xlsx",
  "Content_Disposition_Map.xlsx",
  "Owner_Data_Request_List.xlsx",
];

const results = [];
for (const file of files) {
  const filePath = path.join(outputDir, file);
  const stat = await fs.stat(filePath);
  const blob = await FileBlob.load(filePath);
  const workbook = await SpreadsheetFile.importXlsx(blob);
  const sheets = await workbook.inspect({ kind: "sheet", include: "name", maxChars: 2000 });
  const sheetRows = sheets.ndjson
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line));
  const errors = await workbook.inspect({
    kind: "match",
    searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
    options: { useRegex: true, maxResults: 50 },
    maxChars: 2000,
  });
  const firstSheetName = sheetRows[0]?.name;
  const markerLegend = sheetRows.find((sheet) => sheet.name === "Marker Legend");
  if (firstSheetName) {
    await workbook.render({ sheetName: firstSheetName, range: "A1:H12", scale: 1, format: "png" });
  }
  if (markerLegend) {
    await workbook.render({ sheetName: markerLegend.name, range: "A1:B10", scale: 1, format: "png" });
  }
  results.push({
    file,
    bytes: stat.size,
    sheets: sheetRows.length,
    previewSheet: firstSheetName ?? null,
    formulaErrorMatches: errors.ndjson.includes("#") ? "CHECK" : "none",
  });
}

console.log(JSON.stringify(results, null, 2));

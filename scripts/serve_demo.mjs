import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const portArgIndex = args.findIndex((arg) => arg === "--port");
const port =
  portArgIndex >= 0 && args[portArgIndex + 1] ? Number(args[portArgIndex + 1]) : 4173;

const contentTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".md", "text/markdown; charset=utf-8"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".png", "image/png"],
]);

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);
  let requestedPath = decodeURIComponent(url.pathname);

  if (requestedPath === "/" || requestedPath === "/demo" || requestedPath === "/demo/") {
    requestedPath = "/demo/index.html";
  }

  const filePath = path.normalize(path.join(repoRoot, requestedPath));

  if (!filePath.startsWith(repoRoot)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const body = await readFile(filePath);
    response.writeHead(200, {
      "Content-Type": contentTypes.get(path.extname(filePath).toLowerCase()) ?? "application/octet-stream",
    });
    response.end(body);
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`SciTOX demo preview: http://127.0.0.1:${port}/demo/`);
});

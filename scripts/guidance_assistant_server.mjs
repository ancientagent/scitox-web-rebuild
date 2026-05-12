import { createServer } from "node:http";
import { handleGuidanceApiRequest, isGuidanceApiPath } from "./guidance_assistant_lib.mjs";

const args = process.argv.slice(2);
const portArgIndex = args.findIndex((arg) => arg === "--port");
const port =
  portArgIndex >= 0 && args[portArgIndex + 1] ? Number(args[portArgIndex + 1]) : 4183;

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);

  if (isGuidanceApiPath(url.pathname)) {
    await handleGuidanceApiRequest(request, response);
    return;
  }

  response.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify({ error: "Not found" }));
});

server.listen(port, "127.0.0.1", () => {
  console.log(`SciTOX guidance assistant API: http://127.0.0.1:${port}/api/guidance/health`);
});

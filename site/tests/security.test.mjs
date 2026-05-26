import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFile } from "node:fs/promises";
import test from "node:test";

const require = createRequire(import.meta.url);
const nextConfig = require("../next.config.js");

test("Next config applies baseline privacy and security headers", async () => {
  const headerRules = await nextConfig.headers();
  const allHeaders = Object.fromEntries(
    headerRules.flatMap((rule) => rule.headers.map((header) => [header.key, header.value])),
  );

  assert.equal(allHeaders["X-Content-Type-Options"], "nosniff");
  assert.equal(allHeaders["X-Frame-Options"], "DENY");
  assert.equal(allHeaders["Referrer-Policy"], "no-referrer");
  assert.match(allHeaders["Permissions-Policy"], /camera=\(\)/);
  assert.match(allHeaders["Content-Security-Policy"], /frame-ancestors 'none'/);
  assert.match(allHeaders["Content-Security-Policy"], /form-action 'self'/);
  assert.match(allHeaders["Strict-Transport-Security"], /max-age=31536000/);
});

test("privacy prep UI avoids unsupported security promises", async () => {
  const files = await Promise.all([
    readFile(new URL("../components/PrivacyPrepNotice.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/WelcomeGreeting.tsx", import.meta.url), "utf8"),
  ]);
  const source = files.join("\n");

  assert.match(source, /prepare your private session/i);
  assert.match(source, /right\s+product and on your way/i);
  assert.match(source, /Opening product guidance/i);
  assert.match(source, /No payment details/i);
  assert.doesNotMatch(source, /encrypted|anonymous|guaranteed|fully private/i);
});

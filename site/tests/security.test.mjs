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

test("public payment and support UI avoids unsupported security promises", async () => {
  const files = await Promise.all([
    readFile(new URL("../app/privacy/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/products/[slug]/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/support/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/WelcomeGreeting.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/CheckoutGateDemo.tsx", import.meta.url), "utf8"),
  ]);
  const source = files.join("\n");
  const privacySource = files[0];
  const productSource = files[1];
  const welcomeSource = files[3];
  const checkoutSource = files[4];

  assert.match(productSource, /Introducing the all new TotalTOX 2\.0 Ultra Series/i);
  assert.doesNotMatch(welcomeSource, /Opening product guidance|prepare your private session/i);
  assert.match(checkoutSource, /Payment details are entered on Authorize\.net/i);
  assert.match(privacySource, /Keep support messages focused/i);
  assert.doesNotMatch(source, /encrypted|anonymous|guaranteed|fully private/i);
});

test("homepage avoids developer-facing planning copy", async () => {
  const files = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/faq/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/products/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/products/[slug]/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/not-found.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/privacy/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/shipping-returns/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/terms/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/SiteFooter.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/SiteHeader.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/WelcomeGreeting.tsx", import.meta.url), "utf8"),
  ]);
  const publicSource = files.join("\n");

  assert.match(publicSource, /TotalTOX 2\.0 Ultra Max/i);
  assert.match(publicSource, /UV light and custom developer/i);
  assert.match(publicSource, /href: "\/faq"|href="\/faq"/);
  assert.match(publicSource, /aria-label="Shopping cart"/);
  assert.doesNotMatch(files[9], />\s*Buy now\s*</i);
  assert.doesNotMatch(
    publicSource,
    /Customer lobby|Product path|focused product path|Separate partner path|partner surface|Support fallback|Product line overview|Documentation checklist|current customer path/i,
  );
  assert.doesNotMatch(publicSource, /Get Started|reserved|placeholder/i);
});

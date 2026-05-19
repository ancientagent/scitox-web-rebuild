import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  createAuthorizeNetCheckoutGate,
  validateAuthorizeNetCheckoutRequest,
} from "../lib/payments/authorizeNet.mjs";

test("missing Authorize.net config returns review-gated unavailable state", () => {
  const result = createAuthorizeNetCheckoutGate(
    { productSlug: "totaltox-hair-detox-shampoo-system" },
    { env: { AUTHORIZE_NET_ENVIRONMENT: "sandbox" } },
  );

  assert.equal(result.checkout_status, "review_required");
  assert.equal(result.available, false);
  assert.equal(result.payment_collection_enabled, false);
  assert.equal(result.provider, "authorize_net");
  assert.match(result.missing_owner_data.join(" "), /AUTHORIZE_NET_API_LOGIN_ID/);
  assert.match(result.missing_owner_data.join(" "), /\[OWNER DATA NEEDED\]/);
});

test("malformed checkout request returns safe validation errors", () => {
  const result = validateAuthorizeNetCheckoutRequest({ productSlug: "" });

  assert.equal(result.ok, false);
  assert.deepEqual(result.fieldErrors.productSlug, [
    "Provide a product slug for the checkout gate.",
  ]);
});

test("explicit sandbox config still returns unavailable review-gated state", () => {
  const result = createAuthorizeNetCheckoutGate(
    { productSlug: "totaltox-hair-detox-shampoo-system" },
    {
      env: {
        AUTHORIZE_NET_API_LOGIN_ID: "configured-for-test",
        AUTHORIZE_NET_TRANSACTION_KEY: "configured-for-test",
        AUTHORIZE_NET_SIGNATURE_KEY: "configured-for-test",
        AUTHORIZE_NET_ENVIRONMENT: "sandbox",
        AUTHORIZE_NET_ACCEPT_HOSTED_RETURN_URL: "https://example.test/return",
        AUTHORIZE_NET_ACCEPT_HOSTED_CANCEL_URL: "https://example.test/cancel",
      },
    },
  );

  assert.equal(result.checkout_status, "review_required");
  assert.equal(result.available, false);
  assert.equal(result.payment_collection_enabled, false);
  assert.match(result.review_required.join(" "), /payment review/i);
});

test("raw card fields are not accepted by the checkout gate", () => {
  const result = validateAuthorizeNetCheckoutRequest({
    productSlug: "totaltox-hair-detox-shampoo-system",
    cardNumber: "4111111111111111",
    cvv: "123",
  });

  assert.equal(result.ok, false);
  assert.deepEqual(result.fieldErrors.payment, [
    "Do not send raw card, bank, or payment credential fields to this route.",
  ]);
});

test("checkout demo UI stays review-gated and has no raw payment fields", async () => {
  const source = await readFile(
    new URL("../components/CheckoutGateDemo.tsx", import.meta.url),
    "utf8",
  );

  assert.match(source, /\[REVIEW REQUIRED/);
  assert.match(source, /\[OWNER DATA NEEDED/);
  assert.doesNotMatch(source, /cardNumber|cvv|cvc|expiration|accountNumber/i);
});

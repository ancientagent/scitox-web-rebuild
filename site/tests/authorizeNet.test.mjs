import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  buildAcceptHostedRequest,
  createAuthorizeNetCheckoutGate,
  createAuthorizeNetCheckoutSession,
  validateAuthorizeNetCheckoutRequest,
} from "../lib/payments/authorizeNet.mjs";

test("missing Authorize.net config returns review-gated unavailable state", () => {
  const result = createAuthorizeNetCheckoutGate(
    { productSlug: "totaltox-hair-treatment-system" },
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

test("unknown checkout add-ons are rejected", () => {
  const result = validateAuthorizeNetCheckoutRequest({
    addOns: ["unknown-add-on"],
    productSlug: "totaltox-hair-treatment-system",
  });

  assert.equal(result.ok, false);
  assert.deepEqual(result.fieldErrors.addOns, [
    "One or more selected add-ons are not configured for this product.",
  ]);
});

test("explicit sandbox config still returns unavailable review-gated state", () => {
  const result = createAuthorizeNetCheckoutGate(
    { productSlug: "totaltox-hair-treatment-system" },
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

test("selected add-ons require owner-provided pricing before checkout", () => {
  const result = createAuthorizeNetCheckoutGate(
    { addOns: ["uv-light"], productSlug: "totaltox-hair-treatment-system" },
    {
      env: {
        AUTHORIZE_NET_API_LOGIN_ID: "configured-for-test",
        AUTHORIZE_NET_TRANSACTION_KEY: "configured-for-test",
        AUTHORIZE_NET_SIGNATURE_KEY: "configured-for-test",
        AUTHORIZE_NET_CHECKOUT_ENABLED: "true",
        AUTHORIZE_NET_ENVIRONMENT: "sandbox",
        AUTHORIZE_NET_TOTALTOX_AMOUNT: "249.00",
        AUTHORIZE_NET_ACCEPT_HOSTED_RETURN_URL: "https://example.test/return",
        AUTHORIZE_NET_ACCEPT_HOSTED_CANCEL_URL: "https://example.test/cancel",
      },
    },
  );

  assert.equal(result.checkout_status, "review_required");
  assert.match(result.missing_owner_data.join(" "), /AUTHORIZE_NET_ADDON_UV_LIGHT_AMOUNT/);
});

test("Accept Hosted request keeps raw payment fields off the site", () => {
  const request = buildAcceptHostedRequest({
    amount: "249.00",
    productSlug: "totaltox-hair-treatment-system",
    env: {
      AUTHORIZE_NET_API_LOGIN_ID: "configured-for-test",
      AUTHORIZE_NET_TRANSACTION_KEY: "configured-for-test",
      AUTHORIZE_NET_ENVIRONMENT: "sandbox",
      AUTHORIZE_NET_ACCEPT_HOSTED_RETURN_URL: "https://example.test/return",
      AUTHORIZE_NET_ACCEPT_HOSTED_CANCEL_URL: "https://example.test/cancel",
      AUTHORIZE_NET_MERCHANT_NAME: "SciTOX",
    },
  });

  const hostedSettings =
    request.getHostedPaymentPageRequest.hostedPaymentSettings.setting;
  const paymentOptions = hostedSettings.find(
    (setting) => setting.settingName === "hostedPaymentPaymentOptions",
  );

  assert.equal(
    request.getHostedPaymentPageRequest.transactionRequest.amount,
    "249.00",
  );
  assert.deepEqual(JSON.parse(paymentOptions.settingValue), {
    cardCodeRequired: true,
    showCreditCard: true,
    showBankAccount: false,
  });
  assert.doesNotMatch(JSON.stringify(request), /cardNumber|cvv|cvc|pan/i);
});

test("Accept Hosted request includes selected add-ons in total and description", () => {
  const request = buildAcceptHostedRequest({
    addOns: ["uv-light", "custom-developer"],
    amount: "348.00",
    productSlug: "totaltox-hair-treatment-system",
    env: {
      AUTHORIZE_NET_API_LOGIN_ID: "configured-for-test",
      AUTHORIZE_NET_TRANSACTION_KEY: "configured-for-test",
      AUTHORIZE_NET_ENVIRONMENT: "sandbox",
      AUTHORIZE_NET_TOTALTOX_AMOUNT: "249.00",
      AUTHORIZE_NET_ADDON_UV_LIGHT_AMOUNT: "79.00",
      AUTHORIZE_NET_ADDON_CUSTOM_DEVELOPER_AMOUNT: "20.00",
      AUTHORIZE_NET_ACCEPT_HOSTED_RETURN_URL: "https://example.test/return",
      AUTHORIZE_NET_ACCEPT_HOSTED_CANCEL_URL: "https://example.test/cancel",
      AUTHORIZE_NET_MERCHANT_NAME: "SciTOX",
    },
  });

  assert.equal(
    request.getHostedPaymentPageRequest.transactionRequest.amount,
    "348.00",
  );
  assert.equal(
    request.getHostedPaymentPageRequest.transactionRequest.order.description,
    "TotalTOX Hair Treatment System + UV light + Custom developer",
  );
});

test("configured sandbox checkout can return an Accept Hosted token", async () => {
  const calls = [];
  const result = await createAuthorizeNetCheckoutSession(
    { productSlug: "totaltox-hair-treatment-system" },
    {
      env: {
        AUTHORIZE_NET_API_LOGIN_ID: "configured-for-test",
        AUTHORIZE_NET_TRANSACTION_KEY: "configured-for-test",
        AUTHORIZE_NET_SIGNATURE_KEY: "configured-for-test",
        AUTHORIZE_NET_CHECKOUT_ENABLED: "true",
        AUTHORIZE_NET_ENVIRONMENT: "sandbox",
        AUTHORIZE_NET_TOTALTOX_AMOUNT: "249.00",
        AUTHORIZE_NET_ACCEPT_HOSTED_RETURN_URL: "https://example.test/return",
        AUTHORIZE_NET_ACCEPT_HOSTED_CANCEL_URL: "https://example.test/cancel",
      },
      fetchImpl: async (url, init) => {
        calls.push({ body: JSON.parse(init.body), url });
        return {
          ok: true,
          async json() {
            return {
              messages: { resultCode: "Ok", message: [{ code: "I00001", text: "Successful." }] },
              token: "hosted-token-for-test",
            };
          },
        };
      },
    },
  );

  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "https://apitest.authorize.net/xml/v1/request.api");
  assert.equal(result.checkout_status, "hosted_payment_ready");
  assert.equal(result.available, true);
  assert.equal(result.payment_collection_enabled, true);
  assert.equal(result.site_payment_collection_enabled, false);
  assert.equal(result.hosted_payment_token, "hosted-token-for-test");
  assert.equal(result.checkout_url, "https://test.authorize.net/payment/payment");
});

test("configured checkout can add priced add-ons to the hosted amount", async () => {
  const calls = [];
  const result = await createAuthorizeNetCheckoutSession(
    {
      addOns: ["uv-light", "custom-developer"],
      productSlug: "totaltox-hair-treatment-system",
    },
    {
      env: {
        AUTHORIZE_NET_API_LOGIN_ID: "configured-for-test",
        AUTHORIZE_NET_TRANSACTION_KEY: "configured-for-test",
        AUTHORIZE_NET_SIGNATURE_KEY: "configured-for-test",
        AUTHORIZE_NET_CHECKOUT_ENABLED: "true",
        AUTHORIZE_NET_ENVIRONMENT: "sandbox",
        AUTHORIZE_NET_TOTALTOX_AMOUNT: "249.00",
        AUTHORIZE_NET_ADDON_UV_LIGHT_AMOUNT: "79.00",
        AUTHORIZE_NET_ADDON_CUSTOM_DEVELOPER_AMOUNT: "20.00",
        AUTHORIZE_NET_ACCEPT_HOSTED_RETURN_URL: "https://example.test/return",
        AUTHORIZE_NET_ACCEPT_HOSTED_CANCEL_URL: "https://example.test/cancel",
      },
      fetchImpl: async (url, init) => {
        calls.push({ body: JSON.parse(init.body), url });
        return {
          ok: true,
          async json() {
            return {
              messages: { resultCode: "Ok", message: [{ code: "I00001", text: "Successful." }] },
              token: "hosted-token-for-test",
            };
          },
        };
      },
    },
  );

  assert.equal(result.checkout_status, "hosted_payment_ready");
  assert.equal(result.checkout_total, "348.00");
  assert.deepEqual(
    result.add_ons.map((addOn) => addOn.id),
    ["uv-light", "custom-developer"],
  );
  assert.equal(
    calls[0].body.getHostedPaymentPageRequest.transactionRequest.amount,
    "348.00",
  );
});

test("raw card fields are not accepted by the checkout gate", () => {
  const result = validateAuthorizeNetCheckoutRequest({
    productSlug: "totaltox-hair-treatment-system",
    cardNumber: "4111111111111111",
    cvv: "123",
  });

  assert.equal(result.ok, false);
  assert.deepEqual(result.fieldErrors.payment, [
    "Do not send raw card, bank, or payment credential fields to this route.",
  ]);
});

test("checkout UI hides internal review markers and has no raw payment fields", async () => {
  const source = await readFile(
    new URL("../components/CheckoutGateDemo.tsx", import.meta.url),
    "utf8",
  );

  assert.doesNotMatch(source, /\[REVIEW REQUIRED/);
  assert.doesNotMatch(source, /\[OWNER DATA NEEDED/);
  assert.doesNotMatch(source, /cardNumber|cvv|cvc|expiration|accountNumber/i);
});

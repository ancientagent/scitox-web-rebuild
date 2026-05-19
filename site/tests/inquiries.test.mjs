import assert from "node:assert/strict";
import test from "node:test";

import {
  sanitizeInquiryPayload,
  validateInquiryPayload,
} from "../lib/inquiries/validation.mjs";

test("contact inquiry requires a valid email and message", () => {
  const result = validateInquiryPayload({
    surface: "contact",
    inquiryType: "product",
    email: "not-email",
    message: "",
  });

  assert.equal(result.ok, false);
  assert.deepEqual(result.fieldErrors.email, ["Enter a valid contact email."]);
  assert.deepEqual(result.fieldErrors.message, [
    "Add a short product or support question.",
  ]);
});

test("wholesale inquiry requires business routing fields", () => {
  const result = validateInquiryPayload({
    surface: "wholesale",
    inquiryType: "vendor",
    email: "buyer@example.com",
    message: "Please send partner details.",
  });

  assert.equal(result.ok, false);
  assert.deepEqual(result.fieldErrors.contactName, ["Add a contact name."]);
  assert.deepEqual(result.fieldErrors.companyName, ["Add a business name."]);
});

test("valid inquiry payload is sanitized for the route stub", () => {
  const result = validateInquiryPayload({
    surface: "support",
    inquiryType: "order",
    contactName: "  Owner Reviewer  ",
    email: "owner@example.com ",
    phone: " 555-0100 ",
    message: " Order question ",
  });

  assert.equal(result.ok, true);
  assert.deepEqual(result.data, {
    surface: "support",
    inquiryType: "order",
    contactName: "Owner Reviewer",
    companyName: "",
    email: "owner@example.com",
    phone: "555-0100",
    message: "Order question",
  });
});

test("sanitizer caps long text without throwing", () => {
  const payload = sanitizeInquiryPayload({
    surface: "contact",
    inquiryType: "product",
    email: "owner@example.com",
    message: "x".repeat(900),
  });

  assert.equal(payload.message.length, 600);
});

const ALLOWED_ENVIRONMENTS = new Set(["sandbox", "live"]);
const RAW_PAYMENT_FIELD_NAMES = new Set([
  "accountnumber",
  "bankaccount",
  "cardcode",
  "cardnumber",
  "cvc",
  "cvv",
  "expirationdate",
  "expiry",
  "pan",
  "routingnumber",
  "securitycode",
]);

const OWNER_NEEDED = "[OWNER DATA NEEDED]";
const REVIEW_NEEDED = "[REVIEW REQUIRED]";

function cleanText(value, maxLength = 160) {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function normalizeKey(value) {
  return String(value).replace(/[^a-z0-9]/gi, "").toLowerCase();
}

function includesRawPaymentField(value) {
  if (!value || typeof value !== "object") {
    return false;
  }

  if (Array.isArray(value)) {
    return value.some((item) => includesRawPaymentField(item));
  }

  return Object.entries(value).some(([key, nestedValue]) => {
    if (RAW_PAYMENT_FIELD_NAMES.has(normalizeKey(key))) {
      return true;
    }

    return includesRawPaymentField(nestedValue);
  });
}

export function validateAuthorizeNetCheckoutRequest(payload) {
  const fieldErrors = {};

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return {
      ok: false,
      data: { productSlug: "" },
      fieldErrors: {
        request: ["Provide a structured checkout gate request."],
      },
    };
  }

  if (includesRawPaymentField(payload)) {
    fieldErrors.payment = [
      "Do not send raw card, bank, or payment credential fields to this route.",
    ];
  }

  const productSlug = cleanText(payload.productSlug, 120);

  if (!productSlug) {
    fieldErrors.productSlug = ["Provide a product slug for the checkout gate."];
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      data: { productSlug },
      fieldErrors,
    };
  }

  return {
    ok: true,
    data: { productSlug },
    fieldErrors: {},
  };
}

export function getAuthorizeNetConfigState(env = process.env) {
  const environment = cleanText(env.AUTHORIZE_NET_ENVIRONMENT, 20);
  const missingOwnerData = [];

  if (!cleanText(env.AUTHORIZE_NET_API_LOGIN_ID)) {
    missingOwnerData.push(`AUTHORIZE_NET_API_LOGIN_ID ${OWNER_NEEDED}`);
  }

  if (!cleanText(env.AUTHORIZE_NET_TRANSACTION_KEY)) {
    missingOwnerData.push(`AUTHORIZE_NET_TRANSACTION_KEY ${OWNER_NEEDED}`);
  }

  if (!cleanText(env.AUTHORIZE_NET_SIGNATURE_KEY)) {
    missingOwnerData.push(`AUTHORIZE_NET_SIGNATURE_KEY ${OWNER_NEEDED}`);
  }

  if (!ALLOWED_ENVIRONMENTS.has(environment)) {
    missingOwnerData.push(`AUTHORIZE_NET_ENVIRONMENT sandbox/live ${OWNER_NEEDED}`);
  }

  if (!cleanText(env.AUTHORIZE_NET_ACCEPT_HOSTED_RETURN_URL)) {
    missingOwnerData.push(
      `AUTHORIZE_NET_ACCEPT_HOSTED_RETURN_URL ${OWNER_NEEDED}`,
    );
  }

  if (!cleanText(env.AUTHORIZE_NET_ACCEPT_HOSTED_CANCEL_URL)) {
    missingOwnerData.push(
      `AUTHORIZE_NET_ACCEPT_HOSTED_CANCEL_URL ${OWNER_NEEDED}`,
    );
  }

  return {
    environment: ALLOWED_ENVIRONMENTS.has(environment) ? environment : "unconfigured",
    missingOwnerData,
  };
}

export function createAuthorizeNetCheckoutGate(payload, options = {}) {
  const request = validateAuthorizeNetCheckoutRequest(payload);
  const config = getAuthorizeNetConfigState(options.env ?? process.env);

  if (!request.ok) {
    return {
      checkout_status: "invalid_request",
      provider: "authorize_net",
      mode: "server_stub",
      available: false,
      payment_collection_enabled: false,
      product_slug: request.data.productSlug || null,
      hosted_payment_token: null,
      checkout_url: null,
      environment: config.environment,
      field_errors: request.fieldErrors,
      missing_owner_data: config.missingOwnerData,
      review_required: [
        `Checkout request validation ${REVIEW_NEEDED}`,
        `Raw payment field handling ${REVIEW_NEEDED}`,
      ],
      next_step: `Use product support or inquiry routing until checkout is reviewed. ${REVIEW_NEEDED}`,
    };
  }

  return {
    checkout_status: "review_required",
    provider: "authorize_net",
    mode: "server_stub",
    available: false,
    payment_collection_enabled: false,
    product_slug: request.data.productSlug,
    hosted_payment_token: null,
    checkout_url: null,
    environment: config.environment,
    field_errors: {},
    missing_owner_data: [
      ...config.missingOwnerData,
      `Authorize.net Accept Hosted integration type ${OWNER_NEEDED}`,
      `Merchant account/payment method settings ${OWNER_NEEDED}`,
      `Refund, fraud, dispute, and support workflow ${OWNER_NEEDED}`,
    ],
    review_required: [
      `Authorize.net checkout flow payment review ${REVIEW_NEEDED}`,
      `Payment, refund, dispute, and policy language ${REVIEW_NEEDED}`,
      `Checkout copy and product routing review ${REVIEW_NEEDED}`,
    ],
    next_step: `Route to support or owner-reviewed checkout handoff after configuration review. ${REVIEW_NEEDED}`,
  };
}

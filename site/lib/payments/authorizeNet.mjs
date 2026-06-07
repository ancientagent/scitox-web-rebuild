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
const TOTALTOX_SLUG = "totaltox-hair-treatment-system";
const MAX_PRODUCT_QUANTITY = 10;
const MIN_PRODUCT_QUANTITY = 1;

const API_ENDPOINTS = {
  sandbox: "https://apitest.authorize.net/xml/v1/request.api",
  live: "https://api.authorize.net/xml/v1/request.api",
};

const HOSTED_PAYMENT_URLS = {
  sandbox: "https://test.authorize.net/payment/payment",
  live: "https://accept.authorize.net/payment/payment",
};

const PRODUCT_OPTIONS_BY_PRODUCT = {
  [TOTALTOX_SLUG]: [
    {
      defaultAmount: "329.00",
      envName: "AUTHORIZE_NET_TOTALTOX_AMOUNT",
      id: "totaltox",
      label: "TotalTOX 2.0 Ultra",
    },
    {
      defaultAmount: "399.00",
      envName: "AUTHORIZE_NET_TOTALTOX_ADVANCED_AMOUNT",
      id: "totaltox-advanced",
      label: "TotalTOX 2.0 Ultra Max",
    },
  ],
};

const ADD_ONS_BY_PRODUCT = {
  [TOTALTOX_SLUG]: [
    {
      defaultAmount: "79.00",
      envName: "AUTHORIZE_NET_ADDON_UV_LIGHT_AMOUNT",
      id: "uv-light",
      label: "UV light",
    },
    {
      defaultAmount: "20.00",
      envName: "AUTHORIZE_NET_ADDON_CUSTOM_DEVELOPER_AMOUNT",
      id: "custom-developer",
      label: "Custom developer",
    },
  ],
};

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

function normalizeBoolean(value) {
  return ["1", "true", "yes", "on"].includes(cleanText(value, 12).toLowerCase());
}

function normalizeAmount(value) {
  const raw = cleanText(value, 24).replace(/^\$/, "");

  if (!/^\d+(\.\d{1,2})?$/.test(raw)) {
    return "";
  }

  const amount = Number(raw);

  if (!Number.isFinite(amount) || amount <= 0 || amount > 10000) {
    return "";
  }

  return amount.toFixed(2);
}

function productOptionsForSlug(productSlug) {
  return PRODUCT_OPTIONS_BY_PRODUCT[productSlug] ?? [];
}

function productOptionForRequest(productSlug, productOptionId = "") {
  const options = productOptionsForSlug(productSlug);

  if (options.length === 0) {
    return null;
  }

  return options.find((option) => option.id === productOptionId) ?? options[0];
}

function productAmountForSlug(productSlug, env, productOptionId = "") {
  const option = productOptionForRequest(productSlug, productOptionId);

  if (!option) {
    return "";
  }

  return normalizeAmount(env[option.envName]) || option.defaultAmount;
}

function addOnsForSlug(productSlug) {
  return ADD_ONS_BY_PRODUCT[productSlug] ?? [];
}

function normalizeAddOns(value) {
  if (value === undefined) {
    return { addOns: [], fieldErrors: {} };
  }

  if (!Array.isArray(value)) {
    return {
      addOns: [],
      fieldErrors: {
        addOns: ["Provide add-ons as a list."],
      },
    };
  }

  const addOns = [...new Set(value.map((item) => cleanText(item, 80)).filter(Boolean))];

  return { addOns, fieldErrors: {} };
}

function normalizeProductOptionId(value) {
  if (value === undefined) {
    return { fieldErrors: {}, productOptionId: "" };
  }

  if (typeof value !== "string") {
    return {
      fieldErrors: {
        productOptionId: ["Choose one product option."],
      },
      productOptionId: "",
    };
  }

  return { fieldErrors: {}, productOptionId: cleanText(value, 80) };
}

function normalizeQuantity(value) {
  if (value === undefined) {
    return { fieldErrors: {}, quantity: MIN_PRODUCT_QUANTITY };
  }

  const quantity =
    typeof value === "number" ? value : typeof value === "string" ? Number(value) : Number.NaN;

  if (
    !Number.isInteger(quantity) ||
    quantity < MIN_PRODUCT_QUANTITY ||
    quantity > MAX_PRODUCT_QUANTITY
  ) {
    return {
      fieldErrors: {
        quantity: [`Choose a quantity from ${MIN_PRODUCT_QUANTITY} to ${MAX_PRODUCT_QUANTITY}.`],
      },
      quantity: MIN_PRODUCT_QUANTITY,
    };
  }

  return { fieldErrors: {}, quantity };
}

function selectedAddOnsForRequest(productSlug, addOns, env) {
  const availableAddOns = addOnsForSlug(productSlug);
  const selected = [];
  const missingOwnerData = [];

  for (const addOnId of addOns) {
    const addOn = availableAddOns.find((item) => item.id === addOnId);

    if (!addOn) {
      continue;
    }

    const amount = normalizeAmount(env[addOn.envName]) || addOn.defaultAmount;

    if (!amount) {
      missingOwnerData.push(`${addOn.envName} ${OWNER_NEEDED}`);
      continue;
    }

    selected.push({
      amount,
      id: addOn.id,
      label: addOn.label,
    });
  }

  return { missingOwnerData, selected };
}

function checkoutAmountForRequest(
  productSlug,
  addOns,
  env,
  quantity = MIN_PRODUCT_QUANTITY,
  productOptionId = "",
) {
  const baseAmount = productAmountForSlug(productSlug, env, productOptionId);

  if (!baseAmount) {
    return "";
  }

  const { selected } = selectedAddOnsForRequest(productSlug, addOns, env);
  const productTotal = Number(baseAmount) * quantity;
  const total = selected.reduce((sum, addOn) => sum + Number(addOn.amount), productTotal);

  return total.toFixed(2);
}

function orderDescriptionForRequest(
  productSlug,
  addOns,
  env,
  quantity = MIN_PRODUCT_QUANTITY,
  productOptionId = "",
) {
  const option = productOptionForRequest(productSlug, productOptionId);
  const base = option?.label ?? (productSlug === TOTALTOX_SLUG ? "TotalTOX Hair Treatment System" : "SciTOX order");
  const { selected } = selectedAddOnsForRequest(productSlug, addOns, env);
  const productLabel = quantity > 1 ? `${base} x${quantity}` : base;

  return [productLabel, ...selected.map((addOn) => addOn.label)].join(" + ").slice(0, 255);
}

function parseAuthorizeNetMessages(payload) {
  const messages = payload?.messages?.message;

  if (!Array.isArray(messages)) {
    return [];
  }

  return messages
    .map((message) =>
      cleanText(`${message?.code || ""} ${message?.text || ""}`, 220),
    )
    .filter(Boolean);
}

export function validateAuthorizeNetCheckoutRequest(payload) {
  const fieldErrors = {};

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return {
      ok: false,
      data: { productOptionId: "", productSlug: "" },
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
  const normalizedAddOns = normalizeAddOns(payload.addOns);
  const normalizedProductOption = normalizeProductOptionId(payload.productOptionId);
  const normalizedQuantity = normalizeQuantity(payload.quantity);

  Object.assign(fieldErrors, normalizedAddOns.fieldErrors);
  Object.assign(fieldErrors, normalizedProductOption.fieldErrors);
  Object.assign(fieldErrors, normalizedQuantity.fieldErrors);

  if (!productSlug) {
    fieldErrors.productSlug = ["Provide a product slug for the checkout gate."];
  }

  if (productSlug && productOptionsForSlug(productSlug).length === 0) {
    fieldErrors.productSlug = ["This product is not configured for online checkout yet."];
  }

  if (
    productSlug &&
    normalizedProductOption.productOptionId &&
    !productOptionsForSlug(productSlug).some(
      (option) => option.id === normalizedProductOption.productOptionId,
    )
  ) {
    fieldErrors.productOptionId = ["Choose a configured product option."];
  }

  const allowedAddOnIds = new Set(addOnsForSlug(productSlug).map((addOn) => addOn.id));
  const unknownAddOns = normalizedAddOns.addOns.filter((addOn) => !allowedAddOnIds.has(addOn));

  if (unknownAddOns.length > 0) {
    fieldErrors.addOns = ["One or more selected add-ons are not configured for this product."];
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      data: {
        addOns: normalizedAddOns.addOns,
        productOptionId: normalizedProductOption.productOptionId,
        productSlug,
        quantity: normalizedQuantity.quantity,
      },
      fieldErrors,
    };
  }

  return {
    ok: true,
    data: {
      addOns: normalizedAddOns.addOns,
      productOptionId: normalizedProductOption.productOptionId,
      productSlug,
      quantity: normalizedQuantity.quantity,
    },
    fieldErrors: {},
  };
}

export function getAuthorizeNetConfigState(
  env = process.env,
  productSlug = "",
  addOns = [],
  productOptionId = "",
) {
  const environment = cleanText(env.AUTHORIZE_NET_ENVIRONMENT, 20);
  const normalizedEnvironment = ALLOWED_ENVIRONMENTS.has(environment)
    ? environment
    : "unconfigured";
  const missingOwnerData = [];
  const reviewRequired = [];

  if (!normalizeBoolean(env.AUTHORIZE_NET_CHECKOUT_ENABLED)) {
    reviewRequired.push(`AUTHORIZE_NET_CHECKOUT_ENABLED true ${REVIEW_NEEDED}`);
  }

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

  if (productSlug && !productAmountForSlug(productSlug, env, productOptionId)) {
    const envName =
      productOptionForRequest(productSlug, productOptionId)?.envName ||
      "AUTHORIZE_NET_PRODUCT_AMOUNT";
    missingOwnerData.push(`${envName} ${OWNER_NEEDED}`);
  }

  if (productSlug && addOns.length > 0) {
    missingOwnerData.push(
      ...selectedAddOnsForRequest(productSlug, addOns, env).missingOwnerData,
    );
  }

  return {
    apiEndpoint: normalizedEnvironment === "unconfigured" ? null : API_ENDPOINTS[normalizedEnvironment],
    checkoutEnabled: normalizeBoolean(env.AUTHORIZE_NET_CHECKOUT_ENABLED),
    environment: normalizedEnvironment,
    hostedPaymentUrl:
      normalizedEnvironment === "unconfigured" ? null : HOSTED_PAYMENT_URLS[normalizedEnvironment],
    merchantName: cleanText(env.AUTHORIZE_NET_MERCHANT_NAME, 80) || "SciTOX",
    missingOwnerData,
    reviewRequired,
    showBankAccount: normalizeBoolean(env.AUTHORIZE_NET_SHOW_BANK_ACCOUNT),
  };
}

export function buildAcceptHostedRequest({
  addOns = [],
  amount,
  env = process.env,
  productOptionId = "",
  productSlug,
  quantity = MIN_PRODUCT_QUANTITY,
}) {
  const config = getAuthorizeNetConfigState(env, productSlug, addOns, productOptionId);
  const invoiceNumber = `SCI-${Date.now().toString(36).toUpperCase()}`.slice(0, 20);

  return {
    getHostedPaymentPageRequest: {
      merchantAuthentication: {
        name: cleanText(env.AUTHORIZE_NET_API_LOGIN_ID, 120),
        transactionKey: cleanText(env.AUTHORIZE_NET_TRANSACTION_KEY, 120),
      },
      refId: invoiceNumber,
      transactionRequest: {
        transactionType: "authCaptureTransaction",
        amount,
        order: {
          invoiceNumber,
          description: orderDescriptionForRequest(
            productSlug,
            addOns,
            env,
            quantity,
            productOptionId,
          ),
        },
      },
      hostedPaymentSettings: {
        setting: [
          {
            settingName: "hostedPaymentReturnOptions",
            settingValue: JSON.stringify({
              showReceipt: true,
              url: cleanText(env.AUTHORIZE_NET_ACCEPT_HOSTED_RETURN_URL, 500),
              urlText: "Continue",
              cancelUrl: cleanText(env.AUTHORIZE_NET_ACCEPT_HOSTED_CANCEL_URL, 500),
              cancelUrlText: "Cancel",
            }),
          },
          {
            settingName: "hostedPaymentButtonOptions",
            settingValue: JSON.stringify({ text: "Pay" }),
          },
          {
            settingName: "hostedPaymentPaymentOptions",
            settingValue: JSON.stringify({
              cardCodeRequired: true,
              showCreditCard: true,
              showBankAccount: config.showBankAccount,
            }),
          },
          {
            settingName: "hostedPaymentShippingAddressOptions",
            settingValue: JSON.stringify({ show: true, required: true }),
          },
          {
            settingName: "hostedPaymentBillingAddressOptions",
            settingValue: JSON.stringify({ show: true, required: false }),
          },
          {
            settingName: "hostedPaymentCustomerOptions",
            settingValue: JSON.stringify({ showEmail: true, requiredEmail: true }),
          },
          {
            settingName: "hostedPaymentOrderOptions",
            settingValue: JSON.stringify({ show: true, merchantName: config.merchantName }),
          },
        ],
      },
    },
  };
}

export function createAuthorizeNetCheckoutGate(payload, options = {}) {
  const request = validateAuthorizeNetCheckoutRequest(payload);
  const productSlug = request.data.productSlug || "";
  const addOns = request.data.addOns ?? [];
  const productOptionId = request.data.productOptionId || "";
  const quantity = request.data.quantity ?? MIN_PRODUCT_QUANTITY;
  const env = options.env ?? process.env;
  const config = getAuthorizeNetConfigState(env, productSlug, addOns, productOptionId);
  const productOption = productOptionForRequest(productSlug, productOptionId);
  const selectedAddOns = selectedAddOnsForRequest(productSlug, addOns, env).selected;

  if (!request.ok) {
    return {
      checkout_status: "invalid_request",
      provider: "authorize_net",
      mode: "server_stub",
      available: false,
      payment_collection_enabled: false,
      site_payment_collection_enabled: false,
      add_ons: selectedAddOns,
      product_option_id: productOption?.id ?? null,
      product_option_label: productOption?.label ?? null,
      product_slug: productSlug || null,
      quantity,
      checkout_total: null,
      hosted_payment_token: null,
      checkout_url: null,
      environment: config.environment,
      field_errors: request.fieldErrors,
      missing_owner_data: config.missingOwnerData,
      review_required: [
        `Checkout request validation ${REVIEW_NEEDED}`,
        `Raw payment field handling ${REVIEW_NEEDED}`,
        ...config.reviewRequired,
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
    site_payment_collection_enabled: false,
    add_ons: selectedAddOns,
    product_option_id: productOption?.id ?? null,
    product_option_label: productOption?.label ?? null,
    product_slug: productSlug,
    quantity,
    checkout_total: null,
    hosted_payment_token: null,
    checkout_url: null,
    environment: config.environment,
    field_errors: {},
    missing_owner_data: [
      ...config.missingOwnerData,
      `Merchant account/payment method settings ${OWNER_NEEDED}`,
      `Refund, fraud, dispute, and support workflow ${OWNER_NEEDED}`,
    ],
    review_required: [
      ...config.reviewRequired,
      `Authorize.net checkout flow payment review ${REVIEW_NEEDED}`,
      `Payment, refund, dispute, and policy language ${REVIEW_NEEDED}`,
      `Checkout copy and product routing review ${REVIEW_NEEDED}`,
    ],
    next_step: `Route to support or owner-reviewed checkout handoff after configuration review. ${REVIEW_NEEDED}`,
  };
}

export async function createAuthorizeNetCheckoutSession(payload, options = {}) {
  const request = validateAuthorizeNetCheckoutRequest(payload);
  const env = options.env ?? process.env;
  const productSlug = request.data.productSlug || "";
  const addOns = request.data.addOns ?? [];
  const productOptionId = request.data.productOptionId || "";
  const quantity = request.data.quantity ?? MIN_PRODUCT_QUANTITY;
  const config = getAuthorizeNetConfigState(env, productSlug, addOns, productOptionId);
  const productOption = productOptionForRequest(productSlug, productOptionId);
  const selectedAddOns = selectedAddOnsForRequest(productSlug, addOns, env).selected;

  if (!request.ok || config.missingOwnerData.length > 0 || config.reviewRequired.length > 0) {
    return createAuthorizeNetCheckoutGate(payload, { env });
  }

  const amount = checkoutAmountForRequest(
    productSlug,
    addOns,
    env,
    quantity,
    productOptionId,
  );
  const requestBody = buildAcceptHostedRequest({
    addOns,
    amount,
    env,
    productOptionId,
    productSlug,
    quantity,
  });
  const fetchImpl = options.fetchImpl ?? fetch;

  try {
    const response = await fetchImpl(config.apiEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    const responseBody = await response.json();
    const token = cleanText(responseBody?.token, 4096);
    const messages = parseAuthorizeNetMessages(responseBody);

    if (!response.ok || responseBody?.messages?.resultCode !== "Ok" || !token) {
      return {
        ...createAuthorizeNetCheckoutGate(payload, { env }),
        checkout_status: "processor_error",
        processor_messages: messages,
        review_required: [
          `Authorize.net hosted payment token response review ${REVIEW_NEEDED}`,
        ],
        next_step: `Use support while checkout setup is reviewed. ${REVIEW_NEEDED}`,
      };
    }

    return {
      checkout_status: "hosted_payment_ready",
      provider: "authorize_net",
      mode: "accept_hosted",
      available: true,
      payment_collection_enabled: true,
      site_payment_collection_enabled: false,
      add_ons: selectedAddOns,
      product_option_id: productOption?.id ?? null,
      product_option_label: productOption?.label ?? null,
      product_slug: productSlug,
      quantity,
      checkout_total: amount,
      hosted_payment_token: token,
      checkout_url: config.hostedPaymentUrl,
      environment: config.environment,
      field_errors: {},
      missing_owner_data: [],
      review_required: [],
      next_step: "Continue to the hosted payment form.",
    };
  } catch {
    return {
      ...createAuthorizeNetCheckoutGate(payload, { env }),
      checkout_status: "processor_error",
      processor_messages: [],
      review_required: [
        `Authorize.net hosted payment token request review ${REVIEW_NEEDED}`,
      ],
      next_step: `Use support while checkout setup is reviewed. ${REVIEW_NEEDED}`,
    };
  }
}

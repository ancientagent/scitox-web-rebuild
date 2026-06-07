const CHECKOUT_PRODUCT_OPTIONS_BY_PRODUCT: Record<
  string,
  Array<{
    amount: number;
    description: string;
    envName: string;
    id: string;
    label: string;
  }>
> = {
  "totaltox-hair-treatment-system": [
    {
      amount: 329,
      description: "For most orders.",
      envName: "AUTHORIZE_NET_TOTALTOX_AMOUNT",
      id: "totaltox",
      label: "TotalTOX 2.0 Ultra",
    },
    {
      amount: 399,
      description: "For long hair and/or daily buildup.",
      envName: "AUTHORIZE_NET_TOTALTOX_ADVANCED_AMOUNT",
      id: "totaltox-advanced",
      label: "TotalTOX 2.0 Ultra Max",
    },
  ],
};

const CHECKOUT_ADD_ONS_BY_PRODUCT: Record<
  string,
  Array<{ amount: number; envName: string; id: string; label: string }>
> = {
  "totaltox-hair-treatment-system": [
    {
      amount: 79,
      envName: "AUTHORIZE_NET_ADDON_UV_LIGHT_AMOUNT",
      id: "uv-light",
      label: "UV light",
    },
    {
      amount: 20,
      envName: "AUTHORIZE_NET_ADDON_CUSTOM_DEVELOPER_AMOUNT",
      id: "custom-developer",
      label: "Custom developer",
    },
  ],
};

function normalizeAmount(value: string | undefined): number | null {
  const raw = String(value ?? "")
    .replace(/^\$/, "")
    .trim();

  if (!/^\d+(\.\d{1,2})?$/.test(raw)) {
    return null;
  }

  const amount = Number(raw);

  if (!Number.isFinite(amount) || amount <= 0 || amount > 10000) {
    return null;
  }

  return amount;
}

function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    style: "currency",
  }).format(amount);
}

function getDefaultProductOption(productSlug: string) {
  return CHECKOUT_PRODUCT_OPTIONS_BY_PRODUCT[productSlug]?.[0] ?? null;
}

function getResolvedProductOptionAmount(
  option: { amount: number; envName: string },
  env: NodeJS.ProcessEnv,
) {
  return normalizeAmount(env[option.envName]) ?? option.amount;
}

function getResolvedAddOnAmount(
  addOn: { amount: number; envName: string },
  env: NodeJS.ProcessEnv,
) {
  return normalizeAmount(env[addOn.envName]) ?? addOn.amount;
}

function getBaseAmount(productSlug: string, env: NodeJS.ProcessEnv): number | null {
  const option = getDefaultProductOption(productSlug);

  return option ? getResolvedProductOptionAmount(option, env) : null;
}

export function getCheckoutPriceLabel(
  productSlug: string,
  env: NodeJS.ProcessEnv = process.env,
): string | null {
  const amount = getBaseAmount(productSlug, env);

  if (amount === null) {
    return null;
  }

  return formatUsd(amount);
}

export function getCheckoutSummary(
  productSlug: string,
  env: NodeJS.ProcessEnv = process.env,
) {
  const baseAmount = getBaseAmount(productSlug, env);
  const productOptions = CHECKOUT_PRODUCT_OPTIONS_BY_PRODUCT[productSlug] ?? [];

  return {
    addOns: (CHECKOUT_ADD_ONS_BY_PRODUCT[productSlug] ?? []).map((addOn) => {
      const amount = getResolvedAddOnAmount(addOn, env);

      return {
        amount,
        enabled: true,
        id: addOn.id,
        label: addOn.label,
        priceLabel: formatUsd(amount),
      };
    }),
    baseAmount,
    defaultProductOptionId: getDefaultProductOption(productSlug)?.id ?? null,
    priceLabel: baseAmount === null ? null : formatUsd(baseAmount),
    productOptions: productOptions.map((option) => {
      const amount = getResolvedProductOptionAmount(option, env);

      return {
        amount,
        description: option.description,
        id: option.id,
        label: option.label,
        priceLabel: formatUsd(amount),
      };
    }),
  };
}

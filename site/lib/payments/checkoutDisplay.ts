const CHECKOUT_AMOUNT_ENV_BY_PRODUCT: Record<string, string> = {
  "totaltox-hair-treatment-system": "AUTHORIZE_NET_TOTALTOX_AMOUNT",
};

const CHECKOUT_ADD_ONS_BY_PRODUCT: Record<
  string,
  Array<{ envName: string; id: string; label: string }>
> = {
  "totaltox-hair-treatment-system": [
    {
      envName: "AUTHORIZE_NET_ADDON_UV_LIGHT_AMOUNT",
      id: "uv-light",
      label: "UV light",
    },
    {
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

function getBaseAmount(productSlug: string, env: NodeJS.ProcessEnv): number | null {
  const envName = CHECKOUT_AMOUNT_ENV_BY_PRODUCT[productSlug];

  return envName ? normalizeAmount(env[envName]) : null;
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

  return {
    addOns: (CHECKOUT_ADD_ONS_BY_PRODUCT[productSlug] ?? []).map((addOn) => {
      const amount = normalizeAmount(env[addOn.envName]);

      return {
        amount,
        enabled: amount !== null,
        id: addOn.id,
        label: addOn.label,
        priceLabel: amount === null ? null : formatUsd(amount),
      };
    }),
    baseAmount,
    priceLabel: baseAmount === null ? null : formatUsd(baseAmount),
  };
}

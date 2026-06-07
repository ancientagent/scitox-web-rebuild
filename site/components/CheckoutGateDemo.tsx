"use client";

import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";

type CheckoutAddOn = {
  amount: number | null;
  enabled: boolean;
  id: string;
  label: string;
  priceLabel: string | null;
};

type CheckoutProductOption = {
  amount: number | null;
  description: string;
  id: string;
  label: string;
  priceLabel: string | null;
};

type CheckoutGateResult = {
  checkout_status: "invalid_request" | "review_required" | "processor_error" | "hosted_payment_ready";
  provider: string;
  mode: string;
  available: boolean;
  payment_collection_enabled: boolean;
  site_payment_collection_enabled: boolean;
  add_ons: Array<{ amount: string; id: string; label: string }>;
  product_option_id?: string | null;
  product_option_label?: string | null;
  product_slug: string | null;
  quantity: number;
  checkout_total: string | null;
  hosted_payment_token: string | null;
  checkout_url: string | null;
  environment: string;
  missing_owner_data: string[];
  review_required: string[];
  next_step: string;
};

const initialResult: CheckoutGateResult = {
  checkout_status: "review_required",
  provider: "authorize_net",
  mode: "server_stub",
  available: false,
  payment_collection_enabled: false,
  site_payment_collection_enabled: false,
  add_ons: [],
  product_slug: null,
  quantity: 1,
  checkout_total: null,
  hosted_payment_token: null,
  checkout_url: null,
  environment: "unconfigured",
  missing_owner_data: ["Authorize.net configuration"],
  review_required: ["Checkout flow and policy language"],
  next_step: "Use support when checkout is not available.",
};

const maxProductQuantity = 10;
const minProductQuantity = 1;

export function CheckoutGateDemo({
  addOns = [],
  baseAmount,
  defaultProductOptionId,
  priceLabel,
  productName = "TotalTOX Hair Treatment System",
  productOptions = [],
  productSlug,
}: {
  addOns?: CheckoutAddOn[];
  baseAmount?: number | null;
  defaultProductOptionId?: string | null;
  priceLabel?: string | null;
  productName?: string;
  productOptions?: CheckoutProductOption[];
  productSlug: string;
}) {
  const initialProductOptionId =
    defaultProductOptionId ?? productOptions[0]?.id ?? "";
  const productOptionIds = productOptions.map((option) => option.id).join("|");
  const [result, setResult] = useState<CheckoutGateResult>(initialResult);
  const [quantity, setQuantity] = useState(1);
  const [selectedProductOptionId, setSelectedProductOptionId] = useState(initialProductOptionId);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const validProductOptionIds = new Set(
      productOptionIds.split("|").filter(Boolean),
    );

    function syncOptionFromHash() {
      const optionId = window.location.hash.replace(/^#checkout-?/, "");

      if (optionId && validProductOptionIds.has(optionId)) {
        setSelectedProductOptionId(optionId);
        setResult(initialResult);
        setMessage("");
        setStatus("idle");
      }
    }

    syncOptionFromHash();
    window.addEventListener("hashchange", syncOptionFromHash);

    return () => window.removeEventListener("hashchange", syncOptionFromHash);
  }, [productOptionIds]);

  function formatUsd(amount: number) {
    return new Intl.NumberFormat("en-US", {
      currency: "USD",
      maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
      minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
      style: "currency",
    }).format(amount);
  }

  function resetPreparedPayment() {
    setResult(initialResult);
    setMessage("");
    setStatus("idle");
  }

  function clampQuantity(value: number) {
    if (!Number.isFinite(value)) {
      return minProductQuantity;
    }

    return Math.min(maxProductQuantity, Math.max(minProductQuantity, Math.trunc(value)));
  }

  function updateQuantity(nextQuantity: number) {
    resetPreparedPayment();
    setQuantity(clampQuantity(nextQuantity));
  }

  function updateProductOption(optionId: string) {
    resetPreparedPayment();
    setSelectedProductOptionId(optionId);
  }

  function handleQuantityChange(event: ChangeEvent<HTMLInputElement>) {
    updateQuantity(Number(event.target.value));
  }

  function toggleAddOn(addOnId: string) {
    resetPreparedPayment();
    setSelectedAddOns((current) =>
      current.includes(addOnId)
        ? current.filter((id) => id !== addOnId)
        : [...current, addOnId],
    );
  }

  async function prepareCheckout() {
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/checkout/authorize-net", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          addOns: selectedAddOns,
          productOptionId: selectedProductOptionId,
          productSlug,
          quantity,
        }),
      });
      const payload = await response.json();

      if (!payload?.result) {
        setStatus("error");
        setMessage("Checkout is not available here right now. Use support for the next step.");
        return;
      }

      setResult(payload.result);
      setStatus(response.ok ? "idle" : "error");
      setMessage(
        payload.result.checkout_status === "hosted_payment_ready"
          ? "Your payment form is ready."
          : "Checkout is not available here right now. Use support for the next step.",
      );
    } catch {
      setStatus("error");
      setResult(initialResult);
      setMessage("Checkout is not available here right now. Use support for the next step.");
    }
  }

  const isReady = result.available && result.payment_collection_enabled;
  const canOpenHostedPayment =
    isReady && Boolean(result.checkout_url && result.hosted_payment_token);
  const selectedProductOption =
    productOptions.find((option) => option.id === selectedProductOptionId) ??
    productOptions[0] ??
    null;
  const selectedAddOnAmount = addOns.reduce((sum, addOn) => {
    if (!selectedAddOns.includes(addOn.id) || addOn.amount === null) {
      return sum;
    }

    return sum + addOn.amount;
  }, 0);
  const treatmentAmount =
    typeof selectedProductOption?.amount === "number"
      ? selectedProductOption.amount * quantity
      : typeof baseAmount === "number"
        ? baseAmount * quantity
        : null;
  const totalLabel =
    typeof treatmentAmount === "number"
      ? formatUsd(treatmentAmount + selectedAddOnAmount)
      : selectedProductOption?.priceLabel ?? priceLabel;
  const treatmentName = selectedProductOption?.label ?? productName;
  const treatmentPrice =
    typeof selectedProductOption?.amount === "number"
      ? selectedProductOption.amount
      : baseAmount;

  return (
    <div className="checkout-gate checkout-gate--single">
      <div className="checkout-anchor-stack" aria-hidden="true">
        {productOptions.map((option) => (
          <span className="checkout-anchor" id={`checkout-${option.id}`} key={option.id} />
        ))}
      </div>
      <div className="checkout-gate__panel">
        <div>
          <p className="tag">Order summary</p>
          <h2>{isReady ? "Payment form is ready." : "Review your order."}</h2>
        </div>
        {totalLabel ? <p className="checkout-gate__price">{totalLabel}</p> : null}
        <p>Choose treatment, quantity, and optional add-ons before checkout.</p>
        {productOptions.length > 1 ? (
          <fieldset className="checkout-product-options">
            <legend>Treatment</legend>
            <div className="checkout-product-options__list">
              {productOptions.map((option) => (
                <label className="checkout-product-option" key={option.id}>
                  <input
                    checked={selectedProductOptionId === option.id}
                    disabled={status === "loading"}
                    name="product-option"
                    onChange={() => updateProductOption(option.id)}
                    type="radio"
                  />
                  <span>
                    <strong>{option.label}</strong>
                    <small>{option.description}</small>
                  </span>
                  <b>{option.priceLabel ?? "Shown at checkout"}</b>
                </label>
              ))}
            </div>
          </fieldset>
        ) : null}
        <div className="checkout-order-summary" aria-label="Order summary">
          <div className="checkout-order-summary__line">
            <span>
              <small>Treatment</small>
              <strong>{treatmentName}</strong>
            </span>
            {typeof treatmentPrice === "number" ? (
              <b>{formatUsd(treatmentPrice)} each</b>
            ) : null}
          </div>
          <div className="checkout-quantity">
            <span>Quantity</span>
            <span className="checkout-quantity__control">
              <button
                aria-label="Decrease quantity"
                disabled={status === "loading" || quantity <= minProductQuantity}
                onClick={() => updateQuantity(quantity - 1)}
                type="button"
              >
                -
              </button>
              <input
                aria-label="Treatment quantity"
                disabled={status === "loading"}
                inputMode="numeric"
                max={maxProductQuantity}
                min={minProductQuantity}
                onChange={handleQuantityChange}
                type="number"
                value={quantity}
              />
              <button
                aria-label="Increase quantity"
                disabled={status === "loading" || quantity >= maxProductQuantity}
                onClick={() => updateQuantity(quantity + 1)}
                type="button"
              >
                +
              </button>
            </span>
          </div>
        </div>
        {addOns.length > 0 ? (
          <fieldset className="checkout-add-ons">
            <legend>Optional add-ons</legend>
            <div className="checkout-add-ons__list">
              {addOns.map((addOn) => (
                <label
                  className={`checkout-add-on ${addOn.enabled ? "" : "checkout-add-on--disabled"}`}
                  key={addOn.id}
                >
                  <input
                    checked={selectedAddOns.includes(addOn.id)}
                    disabled={!addOn.enabled || status === "loading"}
                    onChange={() => toggleAddOn(addOn.id)}
                    type="checkbox"
                  />
                  <span>
                    <strong>{addOn.label}</strong>
                    <small>{addOn.priceLabel ?? "Price pending"}</small>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        ) : null}
        {!canOpenHostedPayment ? (
          <div className="form-actions">
            <button disabled={status === "loading"} onClick={prepareCheckout} type="button">
              {status === "loading" ? "Preparing checkout" : "Continue to checkout"}
            </button>
            {message ? (
              <span
                className={`form-status ${
                  status === "error" ? "form-status--error" : "form-status--success"
                }`}
                role="status"
              >
                {message}
              </span>
            ) : null}
          </div>
        ) : null}
        {canOpenHostedPayment ? (
          <form action={result.checkout_url || ""} method="post">
            <input name="token" type="hidden" value={result.hosted_payment_token || ""} />
            <div className="form-actions">
              <button type="submit">Continue to payment form</button>
            </div>
          </form>
        ) : null}
        <div className="notice-list">
          <span>Payment details are entered on Authorize.net.</span>
          <span>Support is available before or after checkout.</span>
        </div>
      </div>
    </div>
  );
}

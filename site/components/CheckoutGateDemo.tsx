"use client";

import { useState } from "react";

type CheckoutAddOn = {
  amount: number | null;
  enabled: boolean;
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
  product_slug: string | null;
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
  checkout_total: null,
  hosted_payment_token: null,
  checkout_url: null,
  environment: "unconfigured",
  missing_owner_data: ["Authorize.net configuration"],
  review_required: ["Checkout flow and policy language"],
  next_step: "Use support when checkout is not available.",
};

export function CheckoutGateDemo({
  addOns = [],
  baseAmount,
  priceLabel,
  productSlug,
}: {
  addOns?: CheckoutAddOn[];
  baseAmount?: number | null;
  priceLabel?: string | null;
  productSlug: string;
}) {
  const [result, setResult] = useState<CheckoutGateResult>(initialResult);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

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
        body: JSON.stringify({ addOns: selectedAddOns, productSlug }),
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
  const selectedAddOnAmount = addOns.reduce((sum, addOn) => {
    if (!selectedAddOns.includes(addOn.id) || addOn.amount === null) {
      return sum;
    }

    return sum + addOn.amount;
  }, 0);
  const totalLabel =
    typeof baseAmount === "number" ? formatUsd(baseAmount + selectedAddOnAmount) : priceLabel;

  return (
    <div className="checkout-gate checkout-gate--single">
      <div className="checkout-gate__panel">
        <div>
          <p className="tag">Online checkout</p>
          <h2>{isReady ? "Payment form is ready." : "Ready when you are."}</h2>
        </div>
        {totalLabel ? <p className="checkout-gate__price">{totalLabel}</p> : null}
        <p>Payment and shipping details are completed on Authorize.net.</p>
        {addOns.length > 0 ? (
          <fieldset className="checkout-add-ons">
            <legend>Recommended add ons</legend>
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
              {status === "loading" ? "Preparing payment form" : "Start checkout"}
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

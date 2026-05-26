"use client";

import { FormEvent, useState } from "react";

type CheckoutGateResult = {
  checkout_status: "invalid_request" | "review_required";
  provider: string;
  mode: string;
  available: boolean;
  payment_collection_enabled: boolean;
  product_slug: string | null;
  hosted_payment_token: null;
  checkout_url: null;
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
  product_slug: null,
  hosted_payment_token: null,
  checkout_url: null,
  environment: "unconfigured",
  missing_owner_data: ["Authorize.net configuration"],
  review_required: ["Checkout flow and policy language"],
  next_step: "Use support or a guided handoff when checkout is not available.",
};

export function CheckoutGateDemo({ productSlug }: { productSlug: string }) {
  const [result, setResult] = useState<CheckoutGateResult>(initialResult);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submitCheckoutGate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/checkout/authorize-net", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productSlug }),
      });
      const payload = await response.json();

      if (!payload?.result) {
        setStatus("error");
        setMessage("Checkout is not available here right now. Use support for the next step.");
        return;
      }

      setResult(payload.result);
      setStatus(response.ok ? "idle" : "error");
      setMessage("Checkout is not available here right now. Use support for the next step.");
    } catch {
      setStatus("error");
      setResult(initialResult);
      setMessage("Checkout is not available here right now. Use support for the next step.");
    }
  }

  const isReady = result.available && result.payment_collection_enabled;

  return (
    <div className="checkout-gate">
      <form className="checkout-gate__panel" onSubmit={submitCheckoutGate}>
        <p className="tag">Checkout</p>
        <h2>{isReady ? "Checkout is ready." : "Checkout is not open here yet."}</h2>
        <p>
          Product guidance and support stay available when online checkout is not
          the right next step.
        </p>
        <div className="form-actions">
          <button disabled={status === "loading"} type="submit">
            {status === "loading" ? "Checking" : "Check checkout"}
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
      </form>
      <div className="checkout-gate__panel">
        <p className="tag">Next step</p>
        <h2>{isReady ? "Continue to checkout." : "Use guidance or support first."}</h2>
        <dl className="fact-list">
          <div>
            <dt>Checkout status</dt>
            <dd>{isReady ? "Available" : "Not available here yet"}</dd>
          </div>
          <div>
            <dt>Product path</dt>
            <dd>{result.product_slug ? "Selected" : "Not selected yet"}</dd>
          </div>
          <div>
            <dt>Recommended next step</dt>
            <dd>
              {isReady
                ? "Continue through checkout."
                : "Start guidance or use support if your question needs more context."}
            </dd>
          </div>
        </dl>
        <div className="notice-list">
          <span>Payment details are not collected on this page.</span>
          <span>Support is available when checkout is not the right next step.</span>
        </div>
      </div>
    </div>
  );
}

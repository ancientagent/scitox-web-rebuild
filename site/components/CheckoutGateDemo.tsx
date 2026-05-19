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
  missing_owner_data: [
    "Authorize.net sandbox/config details [OWNER DATA NEEDED]",
  ],
  review_required: [
    "Checkout flow, payment settings, and policy language [REVIEW REQUIRED]",
  ],
  next_step:
    "Use support or owner-reviewed checkout handoff after payment review. [REVIEW REQUIRED]",
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
        setMessage("[REVIEW REQUIRED: checkout gate returned no structured state]");
        return;
      }

      setResult(payload.result);
      setStatus(response.ok ? "idle" : "error");
      setMessage(
        "[REVIEW REQUIRED: checkout remains unavailable until payment review is complete]",
      );
    } catch {
      setStatus("error");
      setResult(initialResult);
      setMessage("[REVIEW REQUIRED: checkout gate unavailable; use support route]");
    }
  }

  return (
    <div className="checkout-gate">
      <form className="checkout-gate__panel" onSubmit={submitCheckoutGate}>
        <p className="tag">Checkout gate</p>
        <h2>[PLACEHOLDER: Authorize.net checkout handoff - REVIEW REQUIRED]</h2>
        <p>
          [OWNER DATA NEEDED: Authorize.net sandbox/config details before checkout
          can open]
        </p>
        <div className="form-actions">
          <button disabled={status === "loading"} type="submit">
            {status === "loading" ? "Checking gate" : "Check checkout gate"}
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
        <p className="tag">Checkout state</p>
        <h2>{result.checkout_status}</h2>
        <dl className="fact-list">
          <div>
            <dt>Provider</dt>
            <dd>[REVIEW REQUIRED: {result.provider} planning path]</dd>
          </div>
          <div>
            <dt>Mode</dt>
            <dd>{result.mode}</dd>
          </div>
          <div>
            <dt>Environment</dt>
            <dd>{result.environment}</dd>
          </div>
          <div>
            <dt>Available</dt>
            <dd>{result.available ? "Available" : "Unavailable [REVIEW REQUIRED]"}</dd>
          </div>
          <div>
            <dt>Payment collection</dt>
            <dd>
              {result.payment_collection_enabled
                ? "Enabled [REVIEW REQUIRED]"
                : "Disabled [REVIEW REQUIRED]"}
            </dd>
          </div>
          <div>
            <dt>Hosted token</dt>
            <dd>{result.hosted_payment_token ?? "[OWNER DATA NEEDED]"}</dd>
          </div>
          <div>
            <dt>Checkout URL</dt>
            <dd>{result.checkout_url ?? "[OWNER DATA NEEDED]"}</dd>
          </div>
          <div>
            <dt>Next step</dt>
            <dd>{result.next_step}</dd>
          </div>
        </dl>
        <div className="notice-list">
          <span>{formatList("Owner data needed", result.missing_owner_data)}</span>
          <span>{formatList("Review required", result.review_required)}</span>
        </div>
      </div>
    </div>
  );
}

function formatList(label: string, values: string[]) {
  return `${label}: ${values.length ? values.join("; ") : "[OWNER DATA NEEDED]"}`;
}

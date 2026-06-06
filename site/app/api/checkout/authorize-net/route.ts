import { NextResponse } from "next/server";
import {
  createAuthorizeNetCheckoutGate,
  createAuthorizeNetCheckoutSession,
} from "@/lib/payments/authorizeNet.mjs";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    const result = createAuthorizeNetCheckoutGate({});

    return NextResponse.json(
      {
        ok: false,
        status: "invalid_json",
        result,
        message: "[REVIEW REQUIRED: checkout gate request could not be read]",
      },
      { status: 400 },
    );
  }

  const result = await createAuthorizeNetCheckoutSession(payload);
  const status = result.checkout_status === "invalid_request" ? 400 : 200;
  const isReady = result.checkout_status === "hosted_payment_ready";

  return NextResponse.json(
    {
      ok: result.checkout_status !== "invalid_request",
      status: "authorize_net_checkout_gate",
      result,
      message: isReady
        ? "Hosted payment handoff is ready."
        : "[REVIEW REQUIRED: checkout is unavailable until owner/payment review is complete]",
    },
    { status },
  );
}

import { NextResponse } from "next/server";
import { validateInquiryPayload } from "@/lib/inquiries/validation.mjs";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        status: "invalid_json",
        message: "[REVIEW REQUIRED: inquiry request could not be read]",
      },
      { status: 400 },
    );
  }

  const result = validateInquiryPayload(payload);

  if (!result.ok) {
    return NextResponse.json(
      {
        ok: false,
        status: "validation_error",
        fieldErrors: result.fieldErrors,
        message: "[REVIEW REQUIRED: complete the required intake fields]",
      },
      { status: 400 },
    );
  }

  return NextResponse.json(
    {
      ok: true,
      status: "stub_received",
      deliveryStatus: "owner_destination_needed",
      inquiry: result.data,
      message:
        "[OWNER DATA NEEDED: inquiry destination and delivery integration before live use]",
      reviewRequired: [
        "[REVIEW REQUIRED: confirmation copy]",
        "[REVIEW REQUIRED: consent and privacy notice]",
      ],
      nextStep:
        "[OWNER DATA NEEDED: owner routing destination for this inquiry surface]",
    },
    { status: 202 },
  );
}

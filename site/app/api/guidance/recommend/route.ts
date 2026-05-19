import { NextResponse } from "next/server";
import {
  createGuidanceResponse,
  loadGuidanceSourceBase,
  validateGuidanceRequest,
} from "@/lib/guidance/recommend.mjs";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        status: "invalid_json",
        result: createGuidanceResponse({}, { sourceBase: null }),
        fieldErrors: {
          request: ["Provide a structured guidance request."],
        },
        message: "[REVIEW REQUIRED: guidance request could not be read]",
      },
      { status: 400 },
    );
  }

  const validation = validateGuidanceRequest(payload);

  if (!validation.ok) {
    return NextResponse.json(
      {
        ok: false,
        status: "validation_error",
        result: createGuidanceResponse(payload, { sourceBase: null }),
        fieldErrors: validation.fieldErrors,
        message: "[REVIEW REQUIRED: complete the structured guidance fields]",
      },
      { status: 400 },
    );
  }

  let sourceBase: unknown = null;

  try {
    sourceBase = await loadGuidanceSourceBase();
  } catch {
    sourceBase = null;
  }

  return NextResponse.json(
    {
      ok: true,
      status: "source_grounded_response",
      result: createGuidanceResponse(validation.data, { sourceBase }),
    },
    { status: 200 },
  );
}

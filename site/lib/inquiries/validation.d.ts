export type InquirySurface = "contact" | "support" | "wholesale";

export type InquiryPayload = {
  surface: string;
  inquiryType: string;
  contactName: string;
  companyName: string;
  email: string;
  phone: string;
  message: string;
};

export type InquiryValidationResult =
  | {
      ok: true;
      data: InquiryPayload;
      fieldErrors: Record<string, string[]>;
    }
  | {
      ok: false;
      data: InquiryPayload;
      fieldErrors: Record<string, string[]>;
    };

export function sanitizeInquiryPayload(payload: unknown): InquiryPayload;

export function validateInquiryPayload(
  payload: unknown,
): InquiryValidationResult;

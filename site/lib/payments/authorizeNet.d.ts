export type AuthorizeNetCheckoutRequest = {
  productSlug: string;
};

export type AuthorizeNetCheckoutStatus = "invalid_request" | "review_required";

export type AuthorizeNetCheckoutGate = {
  checkout_status: AuthorizeNetCheckoutStatus;
  provider: "authorize_net";
  mode: "server_stub";
  available: false;
  payment_collection_enabled: false;
  product_slug: string | null;
  hosted_payment_token: null;
  checkout_url: null;
  environment: "sandbox" | "live" | "unconfigured";
  field_errors: Record<string, string[]>;
  missing_owner_data: string[];
  review_required: string[];
  next_step: string;
};

export function validateAuthorizeNetCheckoutRequest(payload: unknown):
  | {
      ok: true;
      data: AuthorizeNetCheckoutRequest;
      fieldErrors: Record<string, string[]>;
    }
  | {
      ok: false;
      data: AuthorizeNetCheckoutRequest;
      fieldErrors: Record<string, string[]>;
    };

export function getAuthorizeNetConfigState(
  env?: Record<string, string | undefined>,
): {
  environment: "sandbox" | "live" | "unconfigured";
  missingOwnerData: string[];
};

export function createAuthorizeNetCheckoutGate(
  payload: unknown,
  options?: { env?: Record<string, string | undefined> },
): AuthorizeNetCheckoutGate;

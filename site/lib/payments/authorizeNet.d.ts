export type AuthorizeNetCheckoutRequest = {
  addOns?: string[];
  productSlug: string;
};

export type AuthorizeNetCheckoutStatus =
  | "invalid_request"
  | "review_required"
  | "processor_error"
  | "hosted_payment_ready";

export type AuthorizeNetCheckoutGate = {
  checkout_status: AuthorizeNetCheckoutStatus;
  provider: "authorize_net";
  mode: "accept_hosted" | "server_stub";
  available: boolean;
  payment_collection_enabled: boolean;
  site_payment_collection_enabled: false;
  add_ons: Array<{
    amount: string;
    id: string;
    label: string;
  }>;
  product_slug: string | null;
  checkout_total: string | null;
  hosted_payment_token: string | null;
  checkout_url: string | null;
  environment: "sandbox" | "live" | "unconfigured";
  field_errors: Record<string, string[]>;
  missing_owner_data: string[];
  review_required: string[];
  processor_messages?: string[];
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
  productSlug?: string,
  addOns?: string[],
): {
  environment: "sandbox" | "live" | "unconfigured";
  missingOwnerData: string[];
  reviewRequired: string[];
};

export function buildAcceptHostedRequest(options: {
  addOns?: string[];
  amount: string;
  env?: Record<string, string | undefined>;
  productSlug: string;
}): Record<string, unknown>;

export function createAuthorizeNetCheckoutGate(
  payload: unknown,
  options?: { env?: Record<string, string | undefined> },
): AuthorizeNetCheckoutGate;

export function createAuthorizeNetCheckoutSession(
  payload: unknown,
  options?: {
    env?: Record<string, string | undefined>;
    fetchImpl?: typeof fetch;
  },
): Promise<AuthorizeNetCheckoutGate>;

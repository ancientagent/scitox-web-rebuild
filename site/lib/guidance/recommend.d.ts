export type GuidanceAnswer = {
  id: string;
  label?: string;
  value: string;
};

export type GuidanceRequestPayload = {
  answers: GuidanceAnswer[];
};

export type GuidanceRecommendationStatus =
  | "product_path"
  | "needs_more_info"
  | "human_follow_up";

export type GuidanceResponse = {
  recommendation_status: GuidanceRecommendationStatus;
  recommended_product_id: string | null;
  recommended_path_label: string;
  explanation: string;
  source_ids: string[];
  missing_owner_data: string[];
  review_required: string[];
  next_step: string;
};

export type GuidanceValidationResult =
  | {
      ok: true;
      data: GuidanceRequestPayload;
      fieldErrors: Record<string, string[]>;
    }
  | {
      ok: false;
      data: GuidanceRequestPayload;
      fieldErrors: Record<string, string[]>;
    };

export function validateGuidanceRequest(
  payload: unknown,
): GuidanceValidationResult;

export function createGuidanceResponse(
  payload: unknown,
  options?: { sourceBase?: unknown },
): GuidanceResponse;

export function createGuidanceResponseFromSourcePath(
  payload: unknown,
  sourcePath: string,
): Promise<GuidanceResponse>;

export function loadGuidanceSourceBase(sourcePath?: string): Promise<unknown>;

export function getDefaultSourceBasePath(): string;

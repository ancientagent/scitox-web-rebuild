import type {
  ProductCatalog,
  PublicProductDetail,
  VendorProductRow,
} from "./types";

export function validateProductCatalog(catalog: unknown): {
  ok: boolean;
  errors: string[];
};

export function getPublicProductDetails(
  catalog: ProductCatalog,
): PublicProductDetail[];

export function getVendorProductRows(catalog: ProductCatalog): VendorProductRow[];

export function findPublicProductBySlug(
  catalog: ProductCatalog,
  slug: string,
): PublicProductDetail | null;

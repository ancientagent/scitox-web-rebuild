import productsCatalog from "@/data/products.example.json";
import {
  findPublicProductBySlug,
  getPublicProductDetails,
  getVendorProductRows,
} from "./model.mjs";
import type {
  ProductCatalog,
  PublicProductDetail,
  VendorProductRow,
} from "./types";

const catalog = productsCatalog as ProductCatalog;

export function getPublicProducts(): PublicProductDetail[] {
  return getPublicProductDetails(catalog);
}

export function getPublicProduct(slug: string): PublicProductDetail | null {
  return findPublicProductBySlug(catalog, slug);
}

export function getVendorProducts(): VendorProductRow[] {
  return getVendorProductRows(catalog);
}

import { existsSync } from "node:fs";
import { join } from "node:path";

const HERO_IMAGE_BY_PRODUCT: Record<string, string> = {
  "totaltox-hair-treatment-system": "/product-images/totaltox-hero.jpg",
};

export function getProductHeroImage(productSlug: string, fallbackImage: string): string {
  const heroImage = HERO_IMAGE_BY_PRODUCT[productSlug];

  if (!heroImage) {
    return fallbackImage;
  }

  const publicPath = join(process.cwd(), "public", heroImage.replace(/^\//, ""));

  return existsSync(publicPath) ? heroImage : fallbackImage;
}

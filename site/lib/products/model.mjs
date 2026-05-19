const OWNER_MARKER = "[OWNER DATA NEEDED";
const REVIEW_MARKER = "[REVIEW REQUIRED";

const PUBLIC_OWNER_FIELDS = [
  "ingredients",
];

const PUBLIC_REVIEW_FIELDS = [
  "category",
  "size",
  "price",
  "availability",
  "shortDescription",
  "longDescription",
  "directions",
  "warnings",
  "shippingNotes",
  "claimReviewStatus",
  "supportCta",
];

const VENDOR_OWNER_FIELDS = [
  "sku",
  "wholesalePrice",
  "moq",
  "casePack",
  "upcGtin",
  "labelFile",
  "dimensionsWeight",
  "packagingDetails",
  "insuranceStatus",
];

const VENDOR_REVIEW_FIELDS = ["msrp", "shippingTerms", "returnPolicy", "claimSubstantiation"];

const REQUIRED_PUBLIC_FIELDS = [
  "name",
  "category",
  "size",
  "price",
  "availability",
  "image",
  "shortDescription",
  "longDescription",
  "ingredients",
  "directions",
  "warnings",
  "shippingNotes",
  "claimReviewStatus",
  "supportCta",
];

function text(value) {
  return typeof value === "string" ? value : "";
}

function hasMarker(value, marker) {
  return text(value).includes(marker);
}

function validateMarker(errors, product, section, field, marker) {
  if (!hasMarker(product?.[section]?.[field], marker)) {
    errors.push(`${product?.slug ?? "unknown"}.${section}.${field} missing ${marker}]`);
  }
}

function validateText(errors, product, section, field) {
  if (!text(product?.[section]?.[field])) {
    errors.push(`${product?.slug ?? "unknown"}.${section}.${field} missing text`);
  }
}

export function validateProductCatalog(catalog) {
  const errors = [];

  if (!catalog || typeof catalog !== "object" || !Array.isArray(catalog.products)) {
    return {
      ok: false,
      errors: ["catalog.products missing"],
    };
  }

  for (const product of catalog.products) {
    if (!hasMarker(product?.status, OWNER_MARKER) && !hasMarker(product?.status, REVIEW_MARKER)) {
      errors.push(`${product?.slug ?? "unknown"}.status missing review or owner marker`);
    }

    if (!text(product?.slug)) {
      errors.push("product.slug missing");
    }

    for (const field of REQUIRED_PUBLIC_FIELDS) {
      validateText(errors, product, "public", field);
    }

    for (const field of PUBLIC_OWNER_FIELDS) {
      validateMarker(errors, product, "public", field, OWNER_MARKER);
    }

    for (const field of PUBLIC_REVIEW_FIELDS) {
      validateMarker(errors, product, "public", field, REVIEW_MARKER);
    }

    for (const field of VENDOR_OWNER_FIELDS) {
      validateMarker(errors, product, "vendor", field, OWNER_MARKER);
    }

    for (const field of VENDOR_REVIEW_FIELDS) {
      validateMarker(errors, product, "vendor", field, REVIEW_MARKER);
    }

    const notes = Array.isArray(product?.vendor?.vendorReadinessNotes)
      ? product.vendor.vendorReadinessNotes
      : [];
    if (
      !notes.some((note) => hasMarker(note, OWNER_MARKER)) ||
      !notes.some((note) => hasMarker(note, REVIEW_MARKER))
    ) {
      errors.push(`${product?.slug ?? "unknown"}.vendor.vendorReadinessNotes missing markers`);
    }
  }

  return {
    ok: errors.length === 0,
    errors,
  };
}

export function getPublicProductDetails(catalog) {
  if (!catalog || !Array.isArray(catalog.products)) {
    return [];
  }

  return catalog.products.map((product) => ({
    slug: text(product.slug),
    name: text(product.public?.name),
    category: text(product.public?.category),
    size: text(product.public?.size),
    price: text(product.public?.price),
    availability: text(product.public?.availability),
    image: text(product.public?.image),
    shortDescription: text(product.public?.shortDescription),
    longDescription: text(product.public?.longDescription),
    ingredients: text(product.public?.ingredients),
    directions: text(product.public?.directions),
    warnings: text(product.public?.warnings),
    shippingNotes: text(product.public?.shippingNotes),
    claimReviewStatus: text(product.public?.claimReviewStatus),
    supportCta: text(product.public?.supportCta),
  }));
}

export function getVendorProductRows(catalog) {
  if (!catalog || !Array.isArray(catalog.products)) {
    return [];
  }

  return catalog.products.map((product) => ({
    slug: text(product.slug),
    publicName: text(product.public?.name),
    publicCategory: text(product.public?.category),
    sku: text(product.vendor?.sku),
    msrp: text(product.vendor?.msrp),
    wholesalePrice: text(product.vendor?.wholesalePrice),
    moq: text(product.vendor?.moq),
    casePack: text(product.vendor?.casePack),
    upcGtin: text(product.vendor?.upcGtin),
    labelFile: text(product.vendor?.labelFile),
    dimensionsWeight: text(product.vendor?.dimensionsWeight),
    packagingDetails: text(product.vendor?.packagingDetails),
    shippingTerms: text(product.vendor?.shippingTerms),
    returnPolicy: text(product.vendor?.returnPolicy),
    insuranceStatus: text(product.vendor?.insuranceStatus),
    claimSubstantiation: text(product.vendor?.claimSubstantiation),
    vendorReadinessNotes: Array.isArray(product.vendor?.vendorReadinessNotes)
      ? product.vendor.vendorReadinessNotes.map(text).filter(Boolean)
      : [],
  }));
}

export function findPublicProductBySlug(catalog, slug) {
  return getPublicProductDetails(catalog).find((product) => product.slug === slug) ?? null;
}

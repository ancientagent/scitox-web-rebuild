export type PublicProductFields = {
  name: string;
  category: string;
  size: string;
  price: string;
  availability: string;
  image: string;
  packageAccent: string;
  packageWindowLabel: string;
  shortDescription: string;
  longDescription: string;
  ingredients: string;
  directions: string;
  warnings: string;
  shippingNotes: string;
  claimReviewStatus: string;
  supportCta: string;
};

export type VendorProductFields = {
  sku: string;
  msrp: string;
  wholesalePrice: string;
  moq: string;
  casePack: string;
  upcGtin: string;
  labelFile: string;
  dimensionsWeight: string;
  packagingDetails: string;
  shippingTerms: string;
  returnPolicy: string;
  insuranceStatus: string;
  claimSubstantiation: string;
  vendorReadinessNotes: string[];
};

export type ProductRecord = {
  slug: string;
  status: string;
  public: PublicProductFields;
  vendor: VendorProductFields;
};

export type ProductCatalog = {
  status: string;
  notes: string[];
  products: ProductRecord[];
};

export type PublicProductDetail = PublicProductFields & {
  slug: string;
};

export type VendorProductRow = VendorProductFields & {
  slug: string;
  publicName: string;
  publicCategory: string;
};

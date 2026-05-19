import { notFound } from "next/navigation";
import { CheckoutGateDemo } from "@/components/CheckoutGateDemo";
import { ProductImage } from "@/components/ProductImage";
import { Section } from "@/components/Section";
import { StatusTag } from "@/components/StatusTag";
import { getPublicProduct, getPublicProducts } from "@/lib/products/getProducts";

type ProductDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getPublicProducts().map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = getPublicProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="page-flow">
      <Section
        eyebrow="Product detail preview"
        title={product.name}
        actions={
          <>
            <StatusTag tone="review">[REVIEW REQUIRED]</StatusTag>
          </>
        }
      >
        <p>{product.shortDescription}</p>
      </Section>
      <section className="content-band">
        <div className="band-inner two-column">
          <div className="product-data-card">
            <ProductImage
              accent={product.packageAccent}
              alt={product.name}
              src={product.image}
              windowLabel={product.packageWindowLabel}
            />
            <p className="tag">{product.category}</p>
            <h2>{product.longDescription}</h2>
            <p>{product.supportCta}</p>
          </div>
          <div className="product-data-card">
            <p className="tag">Public product facts</p>
            <h2>Source-backed facts with gated details</h2>
            <dl className="fact-list">
              <div>
                <dt>Size</dt>
                <dd>{product.size}</dd>
              </div>
              <div>
                <dt>Price</dt>
                <dd>{product.price}</dd>
              </div>
              <div>
                <dt>Availability</dt>
                <dd>{product.availability}</dd>
              </div>
              <div>
                <dt>Ingredients</dt>
                <dd>{product.ingredients}</dd>
              </div>
              <div>
                <dt>Directions</dt>
                <dd>{product.directions}</dd>
              </div>
              <div>
                <dt>Warnings</dt>
                <dd>{product.warnings}</dd>
              </div>
              <div>
                <dt>Shipping notes</dt>
                <dd>{product.shippingNotes}</dd>
              </div>
              <div>
                <dt>Claim review</dt>
                <dd>{product.claimReviewStatus}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
      <section className="content-band content-band--muted">
        <div className="band-inner">
          <div className="section-heading">
            <p className="eyebrow">Checkout gate</p>
            <h2>Reviewed policy details required before checkout [REVIEW REQUIRED]</h2>
            <p>
              [OWNER DATA NEEDED: Authorize.net configuration, payment settings,
              policy wording, and owner-reviewed handoff path]
            </p>
          </div>
          <CheckoutGateDemo productSlug={product.slug} />
        </div>
      </section>
    </div>
  );
}

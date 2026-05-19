import Link from "next/link";
import { Section } from "@/components/Section";
import { StatusTag } from "@/components/StatusTag";
import { ProductImage } from "@/components/ProductImage";
import { ProductPathPreview } from "@/components/ProductPathPreview";
import { getPublicProducts } from "@/lib/products/getProducts";

export default function ProductsPage() {
  const products = getPublicProducts();

  return (
    <div className="page-flow">
      <Section
        eyebrow="Products route"
        title="TotalTOX product line [REVIEW REQUIRED]"
        actions={<StatusTag tone="review">[REVIEW REQUIRED]</StatusTag>}
      >
        <p>
          The V1 product route now centers on one TotalTOX system with
          review-gated variant paths for hair length, kit volume, and
          timing-sensitive support needs.
        </p>
      </Section>
      <section className="content-band content-band--muted">
        <div className="band-inner two-column">
          <div className="section-heading section-heading--compact">
            <p className="eyebrow">Product path states</p>
            <h2>Choose a reviewed TotalTOX path [REVIEW REQUIRED]</h2>
            <p>
              Product browsing is now simpler: one core product, variant
              selection through reviewed rules, and support fallback for
              nuanced situations.
            </p>
          </div>
          <ProductPathPreview />
        </div>
      </section>
      <section className="content-band">
        <div className="band-inner">
          <div className="section-heading">
            <p className="eyebrow">Product data</p>
            <h2>One product record with review-gated variants</h2>
            <p>
              The prior category-specific catalog is no longer the public V1
              direction. Variant details still need owner confirmation before
              they become launch data.
            </p>
          </div>
          <div className="product-data-grid">
            {products.map((product) => (
              <article className="product-data-card" key={product.slug}>
                <ProductImage alt={product.name} src={product.image} />
                <p className="tag">{product.category}</p>
                <h2>{product.name}</h2>
                <p>{product.shortDescription}</p>
                <dl className="fact-list">
                  <div>
                    <dt>Size</dt>
                    <dd>{product.size}</dd>
                  </div>
                  <div>
                    <dt>Kit / variant structure</dt>
                    <dd>{product.kitComposition}</dd>
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
                    <dt>Claim review</dt>
                    <dd>{product.claimReviewStatus}</dd>
                  </div>
                </dl>
                {product.variants?.length ? (
                  <div className="variant-list" aria-label={`${product.name} variant paths`}>
                    {product.variants.map((variant) => (
                      <article className="variant-card" key={variant.id}>
                        <h3>{variant.label}</h3>
                        <p>{variant.fit}</p>
                      </article>
                    ))}
                  </div>
                ) : null}
                <Link className="text-link" href={`/products/${product.slug}`}>
                  View owner-review detail
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

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
        title="Source-backed product paths [REVIEW REQUIRED]"
        actions={<StatusTag tone="review">[REVIEW REQUIRED]</StatusTag>}
      >
        <p>
          Product names, photos, path labels, and standard-kit price context
          have been pulled from captured SciTOX store sources. Claims,
          directions, and recommendation rules remain review-gated.
        </p>
      </Section>
      <section className="content-band content-band--muted">
        <div className="band-inner two-column">
          <div className="section-heading section-heading--compact">
            <p className="eyebrow">Product path states</p>
            <h2>Choose a reviewed product path [REVIEW REQUIRED]</h2>
            <p>
              Source-backed products can be browsed now; comparison logic,
              support fallback, and recommendations still need review.
            </p>
          </div>
          <ProductPathPreview />
        </div>
      </section>
      <section className="content-band">
        <div className="band-inner">
          <div className="section-heading">
            <p className="eyebrow">Product data</p>
            <h2>Store-sourced product records with review gates</h2>
            <p>
              These records make the demo feel like a real product catalog
              while keeping sensitive claims and missing vendor fields clearly
              marked.
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

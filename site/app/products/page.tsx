import Link from "next/link";
import { Section } from "@/components/Section";
import { StatusTag } from "@/components/StatusTag";
import { ProductPathPreview } from "@/components/ProductPathPreview";
import { getPublicProducts } from "@/lib/products/getProducts";

export default function ProductsPage() {
  const products = getPublicProducts();

  return (
    <div className="page-flow">
      <Section
        eyebrow="Products route"
        title="[PLACEHOLDER: product category routing - REVIEW REQUIRED]"
        actions={<StatusTag tone="owner">[OWNER DATA NEEDED]</StatusTag>}
      >
        <p>
          [OWNER DATA NEEDED: product categories, product names, images, and
          reviewed public descriptions]
        </p>
      </Section>
      <section className="content-band content-band--muted">
        <div className="band-inner two-column">
          <div className="section-heading section-heading--compact">
            <p className="eyebrow">Product path states</p>
            <h2>[PLACEHOLDER: product self-service preview - REVIEW REQUIRED]</h2>
            <p>[REVIEW REQUIRED: product category labels and comparison criteria]</p>
          </div>
          <ProductPathPreview />
        </div>
      </section>
      <section className="content-band">
        <div className="band-inner">
          <div className="section-heading">
            <p className="eyebrow">Product data placeholders</p>
            <h2>[PLACEHOLDER: public product records - REVIEW REQUIRED]</h2>
            <p>
              [OWNER DATA NEEDED: owner-reviewed product facts before public product
              descriptions are final]
            </p>
          </div>
          <div className="product-data-grid">
            {products.map((product) => (
              <article className="product-data-card" key={product.slug}>
                <div className="product-data-card__media">{product.image}</div>
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
                  View placeholder detail
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

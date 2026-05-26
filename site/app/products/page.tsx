import Link from "next/link";
import { ProductImage } from "@/components/ProductImage";
import { ProductPathPreview } from "@/components/ProductPathPreview";
import { Section } from "@/components/Section";
import { getPublicProducts } from "@/lib/products/getProducts";

export default function ProductsPage() {
  const products = getPublicProducts();

  return (
    <div className="page-flow">
      <Section eyebrow="Products" title="TotalTOX Hair Treatment System">
        <p>
          Start with the core TotalTOX product family. If the right setup is not
          obvious, product guidance or support can help narrow the next step.
        </p>
      </Section>
      <section className="content-band content-band--muted">
        <div className="band-inner two-column">
          <div className="section-heading section-heading--compact">
            <p className="eyebrow">Choosing a path</p>
            <h2>One product family, a few ways to get oriented.</h2>
            <p>
              Browse the product family when you already know what you need, or
              use guidance when you want the site to ask a few focused questions first.
            </p>
          </div>
          <ProductPathPreview />
        </div>
      </section>
      <section className="content-band">
        <div className="band-inner">
          <div className="section-heading">
            <p className="eyebrow">Product family</p>
            <h2>Keep the choice focused.</h2>
            <p>
              The current public path centers on TotalTOX, with support available
              when the situation needs more context.
            </p>
          </div>
          <div className="product-data-grid">
            {products.map((product) => (
              <article className="product-data-card" key={product.slug}>
                <ProductImage alt={product.name} src={product.image} />
                <p className="tag">TotalTOX system</p>
                <h2>{product.name}</h2>
                <p>
                  A focused product family with guided questions available when
                  you want help choosing the right path.
                </p>
                <dl className="fact-list">
                  <div>
                    <dt>Best next step</dt>
                    <dd>Use product guidance if you want help narrowing the path.</dd>
                  </div>
                  <div>
                    <dt>Support</dt>
                    <dd>Available when your question needs more context.</dd>
                  </div>
                </dl>
                {product.variants?.length ? (
                  <div className="variant-list" aria-label={`${product.name} paths`}>
                    {product.variants.map((variant) => (
                      <article className="variant-card" key={variant.id}>
                        <h3>{variant.label}</h3>
                        <p>Guidance can help confirm whether this path fits.</p>
                      </article>
                    ))}
                  </div>
                ) : null}
                <Link className="text-link" href={`/products/${product.slug}`}>
                  View product details
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

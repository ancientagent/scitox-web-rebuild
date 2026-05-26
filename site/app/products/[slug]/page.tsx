import { notFound } from "next/navigation";
import { CheckoutGateDemo } from "@/components/CheckoutGateDemo";
import { ProductImage } from "@/components/ProductImage";
import { Section } from "@/components/Section";
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
      <Section eyebrow="Product details" title={product.name}>
        <p>
          Use this page to get oriented. If you are not sure which path fits,
          start product guidance or reach support before making a decision.
        </p>
      </Section>
      <section className="content-band">
        <div className="band-inner two-column">
          <div className="product-data-card">
            <ProductImage alt={product.name} src={product.image} />
            <p className="tag">TotalTOX system</p>
            <h2>A focused product family with guided support available.</h2>
            <p>
              The site keeps the product path simple and points you toward
              guidance when a few questions would make the next step clearer.
            </p>
          </div>
          <div className="product-data-card">
            <p className="tag">How to continue</p>
            <h2>Choose the level of help that fits.</h2>
            <dl className="fact-list">
              <div>
                <dt>Product family</dt>
                <dd>TotalTOX Hair Treatment System</dd>
              </div>
              <div>
                <dt>Guidance</dt>
                <dd>A few focused questions can help narrow the product path.</dd>
              </div>
              <div>
                <dt>Support</dt>
                <dd>Use support when your question needs more context.</dd>
              </div>
              <div>
                <dt>Checkout</dt>
                <dd>Online checkout opens only after the product path is ready.</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
      {product.variants?.length ? (
        <section className="content-band content-band--muted">
          <div className="band-inner">
            <div className="section-heading">
              <p className="eyebrow">Product paths</p>
              <h2>Different situations may need different guidance.</h2>
              <p>
                Start with the closest path, then use guidance or support if you
                want help confirming the next step.
              </p>
            </div>
            <div className="variant-grid">
              {product.variants.map((variant) => (
                <article className="variant-card" key={variant.id}>
                  <p className="tag">{variant.label}</p>
                  <h2>Guidance can help confirm whether this fits.</h2>
                  <p>
                    If your situation is timing-sensitive or unclear, support is
                    the better place to continue.
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <section className="content-band content-band--muted">
        <div className="band-inner">
          <div className="section-heading">
            <p className="eyebrow">Checkout</p>
            <h2>Continue when the product path is ready.</h2>
            <p>
              Online checkout is kept separate from product guidance. If checkout
              is not available here, use support for the next step.
            </p>
          </div>
          <CheckoutGateDemo productSlug={product.slug} />
        </div>
      </section>
    </div>
  );
}

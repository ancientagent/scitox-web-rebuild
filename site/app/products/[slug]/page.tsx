import { notFound } from "next/navigation";
import Image from "next/image";
import { CheckoutGateDemo } from "@/components/CheckoutGateDemo";
import { getCheckoutSummary } from "@/lib/payments/checkoutDisplay";
import { getPublicProduct, getPublicProducts } from "@/lib/products/getProducts";
import { getProductHeroImage } from "@/lib/products/heroImage";

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

  const checkoutSummary = getCheckoutSummary(product.slug);
  const checkoutPrice = checkoutSummary.priceLabel;
  const heroImage = getProductHeroImage(product.slug, product.image);

  return (
    <div className="page-flow">
      <section className="product-hero" aria-labelledby="product-hero-title">
        <Image
          alt={product.name}
          className="product-hero__image"
          height={900}
          priority
          sizes="100vw"
          src={heroImage}
          width={1440}
        />
        <div className="product-hero__shade" />
        <div className="product-hero__content">
          <p className="eyebrow">We recommend</p>
          <h1 id="product-hero-title">TotalTOX Treatment System</h1>
          <p>
            Review the product and price, then continue when you are ready.
          </p>
          <div className="product-hero__actions">
            {checkoutPrice ? (
              <span className="product-hero__price">{checkoutPrice}</span>
            ) : null}
            <a className="button-link button-link--primary" href="#checkout">
              Review order
            </a>
          </div>
        </div>
      </section>
      {product.variants?.length ? (
        <section className="content-band content-band--muted">
          <div className="band-inner">
            <div className="section-heading">
              <p className="eyebrow">Treatment options</p>
              <h2>Four TotalTOX treatments.</h2>
              <p>
                TotalTOX is organized into four treatment options. If you are not sure
                which one fits, use the quick questions or contact support before ordering.
              </p>
            </div>
            <div className="variant-list" aria-label={`${product.name} treatments`}>
              {product.variants.map((variant) => (
                <article className="variant-card" key={variant.id}>
                  <h3>{variant.label}</h3>
                  <p>Use the quick questions or support if you want help choosing.</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <section className="content-band product-order-band" id="checkout">
        <div className="band-inner product-order-layout">
          <div className="product-order-copy">
            <p className="eyebrow">Your selection</p>
            <h2>{product.name}</h2>
            <p>
              Your selected product is below. If you want help choosing between
              Light, Plus, Max, and Ultra Max, support is available before you order.
            </p>
            <dl className="fact-list">
              <div>
                <dt>Product</dt>
                <dd>TotalTOX Hair Treatment System</dd>
              </div>
              <div>
                <dt>Price</dt>
                <dd>{checkoutPrice ?? "Shown at checkout"}</dd>
              </div>
              <div>
                <dt>Payment</dt>
                <dd>Payment details are entered on Authorize.net.</dd>
              </div>
            </dl>
          </div>
          <CheckoutGateDemo
            addOns={checkoutSummary.addOns}
            baseAmount={checkoutSummary.baseAmount}
            priceLabel={checkoutPrice}
            productSlug={product.slug}
          />
        </div>
      </section>
      <section className="content-band content-band--muted">
        <div className="band-inner product-support-strip">
          <div>
            <p className="eyebrow">Before you order</p>
            <h2>Questions can still go to support.</h2>
            <p>
              Use support if you want a person to review your situation before
              you continue.
            </p>
          </div>
          <div className="product-support-strip__actions">
            <a className="button-link button-link--primary" href="/support">
              Contact support
            </a>
            <a className="text-link" href="/guidance">
              Answer quick questions
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

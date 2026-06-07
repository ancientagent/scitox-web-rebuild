import { notFound } from "next/navigation";
import Image from "next/image";
import { CheckoutGateDemo } from "@/components/CheckoutGateDemo";
import { getCheckoutSummary } from "@/lib/payments/checkoutDisplay";
import { getPublicProduct, getPublicProducts } from "@/lib/products/getProducts";
import { getProductHeroImage } from "@/lib/products/heroImage";

const trustpilotProfileUrl = "https://www.trustpilot.com/review/scitoxdetox.com";

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
      <section className="product-hero product-hero--product-reveal" aria-labelledby="product-hero-title">
        <div className="product-hero__content">
          <h1
            aria-label="SciTOX TotalTOX 2.0 Ultra. Powered by Folliclear Technology. Available Now."
            id="product-hero-title"
          >
            <span className="product-hero__launch-title">
              SciTOX TotalTOX 2.0 Ultra
            </span>
          </h1>
          <p className="product-hero__technology">
            <em>Powered by Folliclear™ Technology</em>
          </p>
          <p className="product-hero__availability">Available Now</p>
          <p className="product-hero__description">
            Our first all-in-one full follicle solution for the many ways life
            shows up in our hair.
          </p>
          <div className="product-hero__actions">
            {checkoutPrice ? (
              <span className="product-hero__price">{checkoutPrice}</span>
            ) : null}
            <a className="button-link button-link--primary" href="#checkout">
              Buy now
            </a>
            <a className="button-link" href="#options">
              Compare options
            </a>
          </div>
        </div>
        <div className="product-hero__media">
          <Image
            alt={product.name}
            className="product-hero__image"
            height={900}
            priority
            sizes="(max-width: 820px) 100vw, 58vw"
            src={heroImage}
            width={1440}
          />
        </div>
      </section>
      {product.options?.length ? (
        <section className="content-band content-band--muted" id="options">
          <div className="band-inner">
            <div className="section-heading">
              <p className="eyebrow">Product options</p>
              <h2>Two TotalTOX options.</h2>
              <p>
                TotalTOX is the standard complete hair detox treatment system.
                TotalTOX Advanced is for long hair and/or daily buildup.
              </p>
            </div>
            <div className="variant-list" aria-label={`${product.name} options`}>
              {product.options.map((option) => (
                <article className="variant-card" key={option.id}>
                  <h3>{option.label}</h3>
                  <p>{option.whoItsFor}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <section className="content-band product-order-band" id="checkout">
        <div className="band-inner product-order-layout">
          <div className="product-order-copy">
            <p className="eyebrow">Checkout</p>
            <h2>Buy TotalTOX online.</h2>
            <p>
              Choose quantity, add optional items, and continue to the hosted
              payment form when you are ready.
            </p>
            <dl className="fact-list">
              <div>
                <dt>Product family</dt>
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
            productName={product.name}
            productSlug={product.slug}
          />
        </div>
      </section>
      <section className="content-band">
        <div className="band-inner customer-experience">
          <div className="section-heading section-heading--compact">
            <p className="eyebrow">Customer experiences</p>
            <h2>Customer reviews live on Trustpilot.</h2>
            <p>
              Read what customers have shared on the SciTOX Trustpilot profile.
              Reviews are a reference point, not a substitute for product
              information or support.
            </p>
          </div>
          <article className="trustpilot-panel" aria-label="Trustpilot reviews">
            <p className="trustpilot-panel__source">Trustpilot</p>
            <h3>Open the live SciTOX review profile.</h3>
            <p>
              Ratings, dates, and review details are maintained on Trustpilot.
            </p>
            <a
              className="button-link button-link--primary"
              href={trustpilotProfileUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              Read reviews on Trustpilot
            </a>
          </article>
        </div>
      </section>
      <section className="content-band content-band--muted">
        <div className="band-inner product-support-strip">
          <div>
            <p className="eyebrow">Before you order</p>
            <h2>Questions can still go to support.</h2>
            <p>
              Use support if you want a person to answer a product or order
              question before you continue.
            </p>
          </div>
          <div className="product-support-strip__actions">
            <a className="button-link button-link--primary" href="/support">
              Contact support
            </a>
            <a className="text-link" href="#checkout">
              Buy now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

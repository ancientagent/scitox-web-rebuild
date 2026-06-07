import { notFound } from "next/navigation";
import Image from "next/image";
import { CheckoutGateDemo } from "@/components/CheckoutGateDemo";
import { getCheckoutSummary } from "@/lib/payments/checkoutDisplay";
import { getPublicProduct, getPublicProducts } from "@/lib/products/getProducts";
import { getProductHeroImage } from "@/lib/products/heroImage";

const trustpilotProfileUrl = "https://www.trustpilot.com/review/scitoxdetox.com";

function getProductOptionPrice(optionId: string, checkoutPrice: string | null) {
  if (optionId === "totaltox") {
    return checkoutPrice ?? "Shown at checkout";
  }

  if (optionId === "totaltox-advanced") {
    return "$399";
  }

  return "Shown at checkout";
}

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
  const checkoutOptionById = new Map(
    checkoutSummary.productOptions.map((option) => [option.id, option]),
  );
  const heroImage = getProductHeroImage(product.slug, product.image);

  return (
    <div className="page-flow">
      <section className="product-hero product-hero--product-reveal" aria-labelledby="product-hero-title">
        <div className="product-hero__content">
          <p className="product-hero__intro">SciTOX is now simpler.</p>
          <h1
            aria-label="SciTOX is now simpler. Introducing the all new TotalTOX 2.0 Ultra Series. Available Now."
            id="product-hero-title"
          >
            <span className="product-hero__launch-title">
              Introducing the all new TotalTOX 2.0 Ultra Series.
            </span>
          </h1>
          <p className="product-hero__description">
            Our number one selling solution reformulated with our revolutionary
            new Folliclear™ Treatment Technology.
          </p>
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
        <section className="content-band content-band--muted product-availability-band" id="options">
          <div className="band-inner product-availability">
            <div className="section-heading section-heading--compact">
              <p className="eyebrow">Now available</p>
              <h2>TotalTOX 2.0 Ultra Series</h2>
            </div>
            <div className="product-offer-list" aria-label={`${product.name} options`}>
              {product.options.map((option) => (
                <article className="product-offer" key={option.id}>
                  <div>
                    <h3>{checkoutOptionById.get(option.id)?.label ?? option.label}</h3>
                    <p>{option.whoItsFor}</p>
                  </div>
                  <div className="product-offer__action">
                    <strong>
                      {checkoutOptionById.get(option.id)?.priceLabel ??
                        getProductOptionPrice(option.id, checkoutPrice)}
                    </strong>
                    <a
                      className="button-link button-link--primary"
                      href={`#checkout-${option.id}`}
                    >
                      Buy now
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <section className="content-band content-band--muted product-precheckout-band">
        <div className="band-inner product-purchase-info">
          <article className="trustpilot-panel" aria-label="Trustpilot reviews">
            <p className="trustpilot-panel__source">Trustpilot</p>
            <h3>Read live customer reviews.</h3>
            <p>
              Ratings, dates, and review details are maintained on Trustpilot.
              Reviews are a reference point, not a substitute for product
              information or support.
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
          <div className="purchase-info-list" aria-label="Purchase information">
            <article>
              <h3>Checkout</h3>
              <p>Payment details are entered on Authorize.net.</p>
            </article>
            <article>
              <h3>Optional add-ons</h3>
              <p>UV light and custom developer can be added before checkout.</p>
            </article>
            <article>
              <h3>Order information</h3>
              <p>
                Review <a href="/shipping-returns">shipping and returns</a>,{" "}
                <a href="/privacy">privacy</a>, or{" "}
                <a href="/terms">terms</a> before placing an order.
              </p>
            </article>
            <article>
              <h3>Questions before ordering</h3>
              <p>
                Review the <a href="/faq">FAQ</a> or contact support if you
                are unsure which option to choose or if your product question
                needs a person to respond.
              </p>
            </article>
          </div>
        </div>
      </section>
      <section className="content-band product-order-band" id="checkout">
        <div className="band-inner product-order-layout">
          <div className="product-order-copy">
            <p className="eyebrow">Checkout</p>
            <h2>Complete your TotalTOX order.</h2>
            <p>
              Choose the treatment, quantity, and optional add-ons before
              continuing to the hosted payment form.
            </p>
            <dl className="fact-list">
              <div>
                <dt>Treatments</dt>
                <dd>TotalTOX 2.0 Ultra and TotalTOX 2.0 Ultra Max</dd>
              </div>
              <div>
                <dt>Prices</dt>
                <dd>
                  TotalTOX 2.0 Ultra{" "}
                  {checkoutSummary.productOptions[0]?.priceLabel ??
                    "Shown at checkout"}
                  ; TotalTOX 2.0 Ultra Max{" "}
                  {checkoutSummary.productOptions[1]?.priceLabel ??
                    "Shown at checkout"}
                </dd>
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
            defaultProductOptionId={checkoutSummary.defaultProductOptionId}
            priceLabel={checkoutPrice}
            productName={product.name}
            productOptions={checkoutSummary.productOptions}
            productSlug={product.slug}
          />
        </div>
      </section>
      <section className="content-band content-band--muted">
        <div className="band-inner product-support-strip">
          <div>
            <p className="eyebrow">Support</p>
            <h2>Questions can still go to the team.</h2>
            <p>
              If you are unsure which option fits, or you have an unusually
              heavy buildup question, contact support before ordering.
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

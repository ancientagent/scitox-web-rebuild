import Link from "next/link";
import { Section } from "@/components/Section";
import { WelcomeGreeting } from "@/components/WelcomeGreeting";

export default function Home() {
  return (
    <div className="page-flow">
      <WelcomeGreeting />
      <Section
        eyebrow="Product line"
        title="Two TotalTOX options. One simple order path."
      >
        <p>
          TotalTOX is the complete hair detox treatment system. TotalTOX
          Advanced is for people with long hair and/or daily buildup.
        </p>
        <div className="route-grid" aria-label="Main paths">
          <Link className="route-card route-card--link" href="/products/totaltox-hair-treatment-system">
            <h2>TotalTOX</h2>
            <p>Review the complete hair detox treatment system.</p>
          </Link>
          <Link className="route-card route-card--link" href="/products/totaltox-hair-treatment-system">
            <h2>TotalTOX Advanced</h2>
            <p>For people with long hair and/or daily buildup.</p>
          </Link>
          <Link className="route-card route-card--link" href="/products/totaltox-hair-treatment-system#checkout">
            <h2>Optional add-ons</h2>
            <p>UV light and custom developer are available before checkout.</p>
          </Link>
        </div>
      </Section>
      <section className="content-band">
        <div className="band-inner two-column">
          <div className="section-heading section-heading--compact">
            <p className="eyebrow">Wholesale</p>
            <h2>For retailers and distributors.</h2>
            <p>
              Business buyers can use the wholesale page for product-line and
              partnership questions.
            </p>
          </div>
          <div className="vendor-preview">
            <article>
              <h2>Product-line questions</h2>
              <p>Ask about carrying TotalTOX through the wholesale contact form.</p>
            </article>
            <article>
              <h2>Business contact</h2>
              <p>Retail and distributor inquiries are handled separately from customer support.</p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}

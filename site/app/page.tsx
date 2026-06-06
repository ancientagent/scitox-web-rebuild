import Link from "next/link";
import { Section } from "@/components/Section";
import { GuidancePreview } from "@/components/GuidancePreview";
import { ProductPathPreview } from "@/components/ProductPathPreview";
import { WelcomeGreeting } from "@/components/WelcomeGreeting";

export default function Home() {
  return (
    <div className="page-flow">
      <WelcomeGreeting />
      <Section
        eyebrow="Customer lobby"
        title="Choose the path that feels most useful right now."
      >
        <p>
          The site is designed for people who already have some context and need
          a clear, low-pressure way to choose the next step.
        </p>
        <div className="route-grid" aria-label="Main paths">
          <Link className="route-card route-card--link" href="/guidance">
            <h2>Get started</h2>
            <p>Answer a few simple questions before choosing a path.</p>
          </Link>
          <Link className="route-card route-card--link" href="/support">
            <h2>Human support</h2>
            <p>Use support when the situation is not simple.</p>
          </Link>
          <Link className="route-card route-card--link" href="/wholesale">
            <h2>Wholesale path</h2>
            <p>Keep buyer and distributor inquiries separate from customer help.</p>
          </Link>
        </div>
      </Section>
      <section className="content-band">
        <div className="band-inner">
          <div className="section-heading">
            <p className="eyebrow">Next step</p>
            <h2>Choose the next path.</h2>
            <p>
              The site keeps product browsing, quick questions, and support
              follow-up easy to find without turning the site into a loud sales page.
            </p>
          </div>
          <div className="path-grid">
            <Link className="route-card route-card--link" href="/products">
              <span className="path-number">01</span>
              <h2>Common path</h2>
              <p>Open the product line when the choice is already clear.</p>
            </Link>
            <Link className="route-card route-card--featured route-card--link" href="/guidance">
              <span className="path-number">02</span>
              <h2>Quick questions</h2>
              <p>Let the site ask a few questions before showing a path.</p>
            </Link>
            <Link className="route-card route-card--link" href="/contact">
              <span className="path-number">03</span>
              <h2>Human follow-up</h2>
              <p>Send a note when the situation needs more context.</p>
            </Link>
          </div>
        </div>
      </section>
      <section className="content-band content-band--muted">
        <div className="band-inner two-column">
          <div className="section-heading section-heading--compact">
            <p className="eyebrow">Product path</p>
            <h2>A simple product path area.</h2>
            <p>
              The site can keep the product line visible while saving detailed
              fit decisions for quick questions or support.
            </p>
          </div>
          <ProductPathPreview />
        </div>
      </section>
      <section className="content-band content-band--dark">
        <div className="band-inner">
          <div className="section-heading">
            <p className="eyebrow">Get started</p>
            <h2>Simple questions, then a clear next step.</h2>
            <p>
              If the answer is not obvious, the flow moves toward support rather
              than forcing a customer to interpret everything alone.
            </p>
          </div>
          <GuidancePreview />
        </div>
      </section>
      <section className="content-band">
        <div className="band-inner two-column">
          <div className="section-heading section-heading--compact">
            <p className="eyebrow">Separate partner path</p>
            <h2>A separate partner surface.</h2>
            <p>
              Wholesale inquiries stay separate from the customer path so buyers
              can evaluate the brand in a cleaner context.
            </p>
          </div>
          <div className="vendor-preview">
            <article>
            <h2>Product line overview</h2>
              <p>TotalTOX is the focused product-line path.</p>
            </article>
            <article>
              <h2>Documentation checklist</h2>
              <p>Partner materials, policies, and final product data stay in the partner area.</p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}

import { PolicyRouteLinks } from "@/components/PolicyRouteLinks";
import { Section } from "@/components/Section";

export default function ShippingReturnsPage() {
  return (
    <div className="page-flow">
      <div className="route-shell">
        <Section eyebrow="Shipping and returns" title="Shipping, returns, and order support">
          <p>
            This page is reserved for shipping, damaged-item, return, and order
            support information. For a current order question, use support or contact.
          </p>
        </Section>
      </div>
      <section className="content-band content-band--muted">
        <div className="band-inner">
          <div className="section-heading">
            <p className="eyebrow">Related pages</p>
            <h2>Find the policy or support path you need.</h2>
            <p>
              Shipping, privacy, terms, and contact information stay close
              together so you do not have to hunt for the next step.
            </p>
          </div>
          <PolicyRouteLinks />
        </div>
      </section>
    </div>
  );
}

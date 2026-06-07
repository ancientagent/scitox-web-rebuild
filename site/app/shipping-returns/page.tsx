import { PolicyRouteLinks } from "@/components/PolicyRouteLinks";
import { Section } from "@/components/Section";

export default function ShippingReturnsPage() {
  return (
    <div className="page-flow">
      <div className="route-shell">
        <Section eyebrow="Shipping and returns" title="Shipping, returns, and order support">
          <p>
            Use support for shipping, damaged-item, return, or order questions.
            Include the order details needed to understand the issue and keep
            the message focused on the support request.
          </p>
        </Section>
      </div>
      <section className="content-band content-band--muted">
        <div className="band-inner">
          <div className="section-heading">
            <p className="eyebrow">Related pages</p>
            <h2>Find the policy or support path you need.</h2>
            <p>
              Shipping, privacy, terms, and support information stay close
              together so the next step is easy to find.
            </p>
          </div>
          <PolicyRouteLinks />
        </div>
      </section>
    </div>
  );
}

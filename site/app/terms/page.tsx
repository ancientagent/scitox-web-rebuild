import { PolicyRouteLinks } from "@/components/PolicyRouteLinks";
import { Section } from "@/components/Section";

export default function TermsPage() {
  return (
    <div className="page-flow">
      <div className="route-shell">
        <Section eyebrow="Terms" title="Terms and purchase information">
          <p>
            Review product information, checkout details, shipping and return
            information, and support options before ordering. Use support for
            questions that need a person.
          </p>
        </Section>
      </div>
      <section className="content-band content-band--muted">
        <div className="band-inner">
          <div className="section-heading">
            <p className="eyebrow">Related pages</p>
            <h2>Keep the important policies easy to find.</h2>
            <p>
              Review shipping, privacy, terms, or support information before
              continuing to checkout.
            </p>
          </div>
          <PolicyRouteLinks />
        </div>
      </section>
    </div>
  );
}

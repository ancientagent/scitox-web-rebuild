import { PolicyRouteLinks } from "@/components/PolicyRouteLinks";
import { Section } from "@/components/Section";

export default function TermsPage() {
  return (
    <div className="page-flow">
      <div className="route-shell">
        <Section eyebrow="Terms" title="Terms and purchase boundaries">
          <p>
            This page is reserved for site terms, purchase conditions, support
            boundaries, and other practical policies customers may want to review
            before continuing.
          </p>
        </Section>
      </div>
      <section className="content-band content-band--muted">
        <div className="band-inner">
          <div className="section-heading">
            <p className="eyebrow">Related pages</p>
            <h2>Keep the important policies easy to find.</h2>
            <p>
              Review shipping, privacy, terms, or contact information before
              choosing a product path.
            </p>
          </div>
          <PolicyRouteLinks />
        </div>
      </section>
    </div>
  );
}

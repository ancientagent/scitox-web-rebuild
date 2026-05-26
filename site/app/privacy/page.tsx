import { PolicyRouteLinks } from "@/components/PolicyRouteLinks";
import { Section } from "@/components/Section";

export default function PrivacyPage() {
  return (
    <div className="page-flow">
      <div className="route-shell">
        <Section eyebrow="Privacy" title="Privacy information">
          <p>
            This page is reserved for the site privacy notice, including what
            information is requested, how support messages are handled, and how
            to contact the team about privacy questions.
          </p>
        </Section>
      </div>
      <section className="content-band content-band--muted">
        <div className="band-inner">
          <div className="section-heading">
            <p className="eyebrow">Related pages</p>
            <h2>Review the practical site policies in one place.</h2>
            <p>
              Use these pages for shipping, terms, contact, and support
              information as the site is finalized.
            </p>
          </div>
          <PolicyRouteLinks />
        </div>
      </section>
    </div>
  );
}

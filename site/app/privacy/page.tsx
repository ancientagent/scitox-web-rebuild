import { PolicyRouteLinks } from "@/components/PolicyRouteLinks";
import { Section } from "@/components/Section";

export default function PrivacyPage() {
  return (
    <div className="page-flow">
      <div className="route-shell">
        <Section eyebrow="Privacy" title="Privacy information">
          <p>
            Use this page to understand what the site asks for during support
            and checkout. Keep support messages focused and share only what is
            needed for the team to respond.
          </p>
        </Section>
      </div>
      <section className="content-band content-band--muted">
        <div className="band-inner">
          <div className="section-heading">
            <p className="eyebrow">Related pages</p>
            <h2>Review the practical site policies in one place.</h2>
            <p>
              Shipping, return, terms, and support pages stay close together so
              you can find the next step without hunting.
            </p>
          </div>
          <PolicyRouteLinks />
        </div>
      </section>
    </div>
  );
}

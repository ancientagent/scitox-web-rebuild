import { PolicyRouteLinks } from "@/components/PolicyRouteLinks";
import { Section } from "@/components/Section";
import { StatusTag } from "@/components/StatusTag";

export default function PrivacyPage() {
  return (
    <div className="page-flow">
      <div className="route-shell">
        <Section
          eyebrow="Privacy route"
          title="[PLACEHOLDER: privacy and data-handling policy shell - REVIEW REQUIRED]"
          actions={
            <>
              <StatusTag tone="owner">[OWNER DATA NEEDED]</StatusTag>
              <StatusTag tone="review">[REVIEW REQUIRED]</StatusTag>
            </>
          }
        >
          <p>
            [OWNER DATA NEEDED: form routing, data handling, retention,
            provider review, consent language, and reviewed public wording]
          </p>
        </Section>
      </div>
      <section className="content-band content-band--muted">
        <div className="band-inner">
          <div className="section-heading">
            <p className="eyebrow">Policy review paths</p>
            <h2>[PLACEHOLDER: policy details required before launch - REVIEW REQUIRED]</h2>
            <p>[OWNER DATA NEEDED: reviewed privacy, terms, and support policy set]</p>
          </div>
          <PolicyRouteLinks />
        </div>
      </section>
    </div>
  );
}

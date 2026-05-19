import { PolicyRouteLinks } from "@/components/PolicyRouteLinks";
import { Section } from "@/components/Section";
import { StatusTag } from "@/components/StatusTag";

export default function TermsPage() {
  return (
    <div className="page-flow">
      <div className="route-shell">
        <Section
          eyebrow="Terms route"
          title="Terms and purchase-boundary shell [REVIEW REQUIRED]"
          actions={
            <>
              <StatusTag tone="owner">[OWNER DATA NEEDED]</StatusTag>
              <StatusTag tone="review">[REVIEW REQUIRED]</StatusTag>
            </>
          }
        >
          <p>
            [OWNER DATA NEEDED: terms, purchase conditions, support boundaries,
            messaging rules, policy review, and reviewed public wording]
          </p>
        </Section>
      </div>
      <section className="content-band content-band--muted">
        <div className="band-inner">
          <div className="section-heading">
            <p className="eyebrow">Policy review paths</p>
            <h2>Policy details required before launch [REVIEW REQUIRED]</h2>
            <p>[OWNER DATA NEEDED: reviewed terms, privacy, and support policy set]</p>
          </div>
          <PolicyRouteLinks />
        </div>
      </section>
    </div>
  );
}

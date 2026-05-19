import { PolicyRouteLinks } from "@/components/PolicyRouteLinks";
import { Section } from "@/components/Section";
import { StatusTag } from "@/components/StatusTag";

export default function ShippingReturnsPage() {
  return (
    <div className="page-flow">
      <div className="route-shell">
        <Section
          eyebrow="Policy route"
          title="[PLACEHOLDER: shipping, returns, and damage-policy shell - REVIEW REQUIRED]"
          actions={
            <>
              <StatusTag tone="owner">[OWNER DATA NEEDED]</StatusTag>
              <StatusTag tone="review">[REVIEW REQUIRED]</StatusTag>
            </>
          }
        >
          <p>
            [OWNER DATA NEEDED: shipping terms, damaged-goods handling, return
            process, refund process, payment review, and reviewed public wording]
          </p>
        </Section>
      </div>
      <section className="content-band content-band--muted">
        <div className="band-inner">
          <div className="section-heading">
            <p className="eyebrow">Policy review paths</p>
            <h2>[PLACEHOLDER: policy details required before checkout - REVIEW REQUIRED]</h2>
            <p>[OWNER DATA NEEDED: reviewed shipping, returns, payment, and support policy set]</p>
          </div>
          <PolicyRouteLinks />
        </div>
      </section>
    </div>
  );
}

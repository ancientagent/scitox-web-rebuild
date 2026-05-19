import { Section } from "@/components/Section";
import { StatusTag } from "@/components/StatusTag";

export default function WholesalePage() {
  return (
    <div className="page-flow">
      <Section
        eyebrow="Wholesale route"
        title="[PLACEHOLDER: partner and wholesale inquiry - REVIEW REQUIRED]"
        actions={
          <>
            <StatusTag tone="owner">[OWNER DATA NEEDED]</StatusTag>
            <StatusTag tone="review">[REVIEW REQUIRED]</StatusTag>
          </>
        }
      >
        <p>
          [OWNER DATA NEEDED: wholesale terms, MOQ, case pack, MSRP, wholesale
          price, UPC/GTIN, documentation checklist, and inquiry routing]
        </p>
      </Section>
      <section className="content-band">
        <div className="band-inner">
          <div className="section-heading">
            <p className="eyebrow">Vendor-facing preview</p>
            <h2>[PLACEHOLDER: restrained wholesale layer - REVIEW REQUIRED]</h2>
            <p>[REVIEW REQUIRED: vendor page language and product line overview]</p>
          </div>
          <div className="vendor-grid">
            <article>
              <h2>Product line overview</h2>
              <p>[OWNER DATA NEEDED: product line, SKU list, images, and labels]</p>
            </article>
            <article>
              <h2>Documentation checklist</h2>
              <p>[OWNER DATA NEEDED: wholesale docs, policies, and review status]</p>
            </article>
            <article>
              <h2>Inquiry process</h2>
              <p>[OWNER DATA NEEDED: buyer fields, routing, and follow-up workflow]</p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}

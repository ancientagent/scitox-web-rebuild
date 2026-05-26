import { InquiryForm } from "@/components/InquiryForm";
import { Section } from "@/components/Section";

export default function WholesalePage() {
  return (
    <div className="page-flow">
      <Section eyebrow="Wholesale and partners" title="Partner inquiries stay separate.">
        <p>
          This page is for buyer, distributor, and partner questions. Customer
          product support stays on the regular support path.
        </p>
      </Section>
      <section className="content-band">
        <div className="band-inner">
          <div className="section-heading">
            <p className="eyebrow">Partner information</p>
            <h2>A cleaner path for business questions.</h2>
            <p>
              Use the form below for wholesale, documentation, or buyer follow-up
              questions. Product support and customer questions should use support.
            </p>
          </div>
          <div className="vendor-grid">
            <article>
              <h2>Product line overview</h2>
              <p>TotalTOX is the focused product family for partner review.</p>
            </article>
            <article>
              <h2>Documentation</h2>
              <p>Business documentation can be requested through the partner form.</p>
            </article>
            <article>
              <h2>Inquiry process</h2>
              <p>Send the business context and the team can follow up with next steps.</p>
            </article>
          </div>
          <div className="inquiry-form-wrap">
            <InquiryForm surface="wholesale" />
          </div>
        </div>
      </section>
    </div>
  );
}

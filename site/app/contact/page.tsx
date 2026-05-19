import { Section } from "@/components/Section";
import { StatusTag } from "@/components/StatusTag";
import { InquiryForm } from "@/components/InquiryForm";

export default function ContactPage() {
  return (
    <div className="page-flow">
      <Section
        eyebrow="Contact route"
        title="[PLACEHOLDER: contact route for product questions - REVIEW REQUIRED]"
        actions={
          <>
            <StatusTag tone="owner">[OWNER DATA NEEDED]</StatusTag>
            <StatusTag tone="review">[REVIEW REQUIRED]</StatusTag>
          </>
        }
      >
        <p>
          [OWNER DATA NEEDED: approved contact destination, follow-up workflow,
          support expectations, and privacy notice]
        </p>
      </Section>
      <section className="content-band content-band--muted">
        <div className="band-inner two-column">
          <div className="section-heading section-heading--compact">
            <p className="eyebrow">Inquiry routing</p>
            <h2>[PLACEHOLDER: help-first inquiry route - REVIEW REQUIRED]</h2>
            <p>
              [REVIEW REQUIRED: contact form labels, consent language,
              privacy notice, and destination handling]
            </p>
          </div>
          <InquiryForm surface="contact" />
        </div>
      </section>
    </div>
  );
}

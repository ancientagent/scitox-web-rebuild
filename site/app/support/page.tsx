import { Section } from "@/components/Section";
import { StatusTag } from "@/components/StatusTag";
import { InquiryForm } from "@/components/InquiryForm";

export default function SupportPage() {
  return (
    <div className="page-flow">
      <Section
        eyebrow="Support route"
        title="[PLACEHOLDER: support route for nuanced product questions - REVIEW REQUIRED]"
        actions={
          <>
            <StatusTag tone="owner">[OWNER DATA NEEDED]</StatusTag>
            <StatusTag tone="review">[REVIEW REQUIRED]</StatusTag>
          </>
        }
      >
        <p>
          [OWNER DATA NEEDED: approved support channels, hours, destination,
          and reviewed policy language]
        </p>
      </Section>
      <section className="content-band">
        <div className="band-inner two-column">
          <div className="section-heading section-heading--compact">
            <p className="eyebrow">Support preview</p>
            <h2>[PLACEHOLDER: calm support intake without overcollection - REVIEW REQUIRED]</h2>
            <p>
              [OWNER DATA NEEDED: support categories, channel ownership,
              destination tooling, and reviewed expectations]
            </p>
          </div>
          <InquiryForm surface="support" />
        </div>
      </section>
    </div>
  );
}

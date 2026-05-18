import { Section } from "@/components/Section";
import { StatusTag } from "@/components/StatusTag";

export default function ShippingReturnsPage() {
  return (
    <div className="route-shell">
      <Section
        eyebrow="Policy route"
        title="[PLACEHOLDER: shipping, returns, and guarantee - REVIEW REQUIRED]"
        actions={
          <>
            <StatusTag tone="owner">[OWNER DATA NEEDED]</StatusTag>
            <StatusTag tone="review">[REVIEW REQUIRED]</StatusTag>
          </>
        }
      >
        <p>
          [OWNER DATA NEEDED: shipping terms, return process, refund process,
          guarantee language, and review-approved policy wording]
        </p>
      </Section>
    </div>
  );
}

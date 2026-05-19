import { Section } from "@/components/Section";
import { StatusTag } from "@/components/StatusTag";

export default function ShippingReturnsPage() {
  return (
    <div className="route-shell">
      <Section
        eyebrow="Policy route"
        title="[PLACEHOLDER: shipping and returns policy - REVIEW REQUIRED]"
        actions={
          <>
            <StatusTag tone="owner">[OWNER DATA NEEDED]</StatusTag>
            <StatusTag tone="review">[REVIEW REQUIRED]</StatusTag>
          </>
        }
      >
        <p>
          [OWNER DATA NEEDED: shipping terms, return process, refund process,
          claims-sensitive policy language, and reviewed public wording]
        </p>
      </Section>
    </div>
  );
}

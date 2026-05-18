import { Section } from "@/components/Section";
import { StatusTag } from "@/components/StatusTag";

export default function WholesalePage() {
  return (
    <div className="route-shell">
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
    </div>
  );
}

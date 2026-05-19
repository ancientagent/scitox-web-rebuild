import { Section } from "@/components/Section";
import { StatusTag } from "@/components/StatusTag";

export default function TermsPage() {
  return (
    <div className="route-shell">
      <Section
        eyebrow="Terms route"
        title="[PLACEHOLDER: terms shell - REVIEW REQUIRED]"
        actions={
          <>
            <StatusTag tone="owner">[OWNER DATA NEEDED]</StatusTag>
            <StatusTag tone="review">[REVIEW REQUIRED]</StatusTag>
          </>
        }
      >
        <p>
          [OWNER DATA NEEDED: terms, purchase conditions, support boundaries,
          policy review, and reviewed public wording]
        </p>
      </Section>
    </div>
  );
}

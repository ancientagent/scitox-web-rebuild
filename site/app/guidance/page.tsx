import { Section } from "@/components/Section";
import { StatusTag } from "@/components/StatusTag";

export default function GuidancePage() {
  return (
    <div className="route-shell">
      <Section
        eyebrow="Guidance route"
        title="[PLACEHOLDER: structured product guidance - REVIEW REQUIRED]"
        actions={
          <>
            <StatusTag tone="review">[REVIEW REQUIRED]</StatusTag>
            <StatusTag tone="owner">[OWNER DATA NEEDED]</StatusTag>
          </>
        }
      >
        <p>
          [OWNER DATA NEEDED: approved product mapping rules, support escalation
          workflow, privacy/data handling terms, and source-base records]
        </p>
      </Section>
    </div>
  );
}

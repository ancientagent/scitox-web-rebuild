import { Section } from "@/components/Section";
import { StatusTag } from "@/components/StatusTag";
import { GuidancePreview } from "@/components/GuidancePreview";

export default function GuidancePage() {
  return (
    <div className="page-flow">
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
          [OWNER DATA NEEDED: reviewed product mapping rules, support escalation
          workflow, privacy/data handling terms, and source-base records]
        </p>
      </Section>
      <section className="content-band content-band--dark">
        <div className="band-inner">
          <div className="section-heading">
            <p className="eyebrow">Guided product questions</p>
            <h2>[PLACEHOLDER: guidance preview states - REVIEW REQUIRED]</h2>
            <p>
              [REVIEW REQUIRED: backend-source-grounded assistant behavior,
              structured output, and fallback routing]
            </p>
          </div>
          <GuidancePreview />
        </div>
      </section>
    </div>
  );
}

import { Section } from "@/components/Section";
import { StatusTag } from "@/components/StatusTag";
import { GuidanceAssistantDemo } from "@/components/GuidanceAssistantDemo";
import { GuidancePreview } from "@/components/GuidancePreview";

export default function GuidancePage() {
  return (
    <div className="page-flow">
      <Section
        eyebrow="Guidance route"
        title="Guided product questions [REVIEW REQUIRED]"
        actions={
          <>
            <StatusTag tone="review">[REVIEW REQUIRED]</StatusTag>
            <StatusTag tone="owner">[OWNER DATA NEEDED]</StatusTag>
          </>
        }
      >
        <p>
          [OWNER DATA NEEDED: owner-reviewed source data, product mapping rules,
          support fallback workflow, and privacy/data handling terms]
        </p>
      </Section>
      <section className="content-band content-band--dark">
        <div className="band-inner">
          <div className="section-heading">
            <p className="eyebrow">Guided product questions</p>
            <h2>Source-gated route check [REVIEW REQUIRED]</h2>
            <p>
              [REVIEW REQUIRED: structured questions, source-backed output,
              and human follow-up when data is missing]
            </p>
          </div>
          <GuidanceAssistantDemo />
          <GuidancePreview />
        </div>
      </section>
    </div>
  );
}

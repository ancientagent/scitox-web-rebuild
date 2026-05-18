import { Section } from "@/components/Section";
import { StatusTag } from "@/components/StatusTag";

export default function Home() {
  return (
    <div className="route-shell">
      <Section
        eyebrow="V1 customer route shell"
        title="[PLACEHOLDER: calm customer lobby headline - REVIEW REQUIRED]"
        actions={
          <>
            <StatusTag tone="review">[REVIEW REQUIRED]</StatusTag>
            <StatusTag tone="owner">[OWNER DATA NEEDED]</StatusTag>
          </>
        }
      >
        <p>
          [PLACEHOLDER: already-aware visitor routing summary - REVIEW REQUIRED]
        </p>
        <div className="route-grid" aria-label="Draft route paths">
          <div className="route-card">
            <h2>Product guidance</h2>
            <p>[REVIEW REQUIRED: structured guidance entry point]</p>
          </div>
          <div className="route-card">
            <h2>Human support</h2>
            <p>[OWNER DATA NEEDED: support process and destination]</p>
          </div>
          <div className="route-card">
            <h2>Wholesale path</h2>
            <p>[OWNER DATA NEEDED: partner inquiry routing]</p>
          </div>
        </div>
      </Section>
    </div>
  );
}

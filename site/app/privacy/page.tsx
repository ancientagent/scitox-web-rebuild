import { Section } from "@/components/Section";
import { StatusTag } from "@/components/StatusTag";

export default function PrivacyPage() {
  return (
    <div className="route-shell">
      <Section
        eyebrow="Privacy route"
        title="[PLACEHOLDER: privacy policy shell - REVIEW REQUIRED]"
        actions={
          <>
            <StatusTag tone="owner">[OWNER DATA NEEDED]</StatusTag>
            <StatusTag tone="review">[REVIEW REQUIRED]</StatusTag>
          </>
        }
      >
        <p>
          [OWNER DATA NEEDED: privacy policy, data handling, provider review,
          retention rules, and reviewed public wording]
        </p>
      </Section>
    </div>
  );
}

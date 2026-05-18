import { Section } from "@/components/Section";
import { StatusTag } from "@/components/StatusTag";

export default function SupportPage() {
  return (
    <div className="route-shell">
      <Section
        eyebrow="Support route"
        title="[PLACEHOLDER: FAQ and support routing - REVIEW REQUIRED]"
        actions={<StatusTag tone="owner">[OWNER DATA NEEDED]</StatusTag>}
      >
        <p>
          [OWNER DATA NEEDED: support hours, response expectations, support
          channels, and approved policy language]
        </p>
      </Section>
    </div>
  );
}

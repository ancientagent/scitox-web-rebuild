import { Section } from "@/components/Section";
import { StatusTag } from "@/components/StatusTag";
import { ContactRoutePreview } from "@/components/ContactRoutePreview";

export default function SupportPage() {
  return (
    <div className="page-flow">
      <Section
        eyebrow="Support route"
        title="[PLACEHOLDER: FAQ and support routing - REVIEW REQUIRED]"
        actions={<StatusTag tone="owner">[OWNER DATA NEEDED]</StatusTag>}
      >
        <p>
          [OWNER DATA NEEDED: support hours, response expectations, support
          channels, and reviewed policy language]
        </p>
      </Section>
      <section className="content-band">
        <div className="band-inner two-column">
          <div className="section-heading section-heading--compact">
            <p className="eyebrow">Support preview</p>
            <h2>[PLACEHOLDER: support without overcollection - REVIEW REQUIRED]</h2>
            <p>
              [OWNER DATA NEEDED: support categories, channel ownership, response
              expectations, and destination tooling]
            </p>
          </div>
          <ContactRoutePreview />
        </div>
      </section>
    </div>
  );
}

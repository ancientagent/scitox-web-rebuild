import { Section } from "@/components/Section";
import { StatusTag } from "@/components/StatusTag";
import { ContactRoutePreview } from "@/components/ContactRoutePreview";

export default function ContactPage() {
  return (
    <div className="page-flow">
      <Section
        eyebrow="Contact route"
        title="[PLACEHOLDER: contact and callback request - REVIEW REQUIRED]"
        actions={
          <>
            <StatusTag tone="owner">[OWNER DATA NEEDED]</StatusTag>
            <StatusTag tone="review">[REVIEW REQUIRED]</StatusTag>
          </>
        }
      >
        <p>
          [OWNER DATA NEEDED: inquiry destination, callback workflow, response
          expectations, and privacy notice]
        </p>
      </Section>
      <section className="content-band content-band--muted">
        <div className="band-inner two-column">
          <div className="section-heading section-heading--compact">
            <p className="eyebrow">Inquiry routing</p>
            <h2>[PLACEHOLDER: reason-based contact preview - REVIEW REQUIRED]</h2>
            <p>
              [REVIEW REQUIRED: contact form labels, consent language, privacy
              notice, and support expectations]
            </p>
          </div>
          <ContactRoutePreview />
        </div>
      </section>
    </div>
  );
}

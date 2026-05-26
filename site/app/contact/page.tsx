import { InquiryForm } from "@/components/InquiryForm";
import { Section } from "@/components/Section";

export default function ContactPage() {
  return (
    <div className="page-flow">
      <Section eyebrow="Contact" title="Send a focused question.">
        <p>
          Use this page when you have a product, order, or follow-up question.
          Share only what is needed to understand the request.
        </p>
      </Section>
      <section className="content-band content-band--muted">
        <div className="band-inner two-column">
          <div className="section-heading section-heading--compact">
            <p className="eyebrow">Contact form</p>
            <h2>Keep the message simple.</h2>
            <p>
              Choose the reason for your note, add your contact details, and
              include the shortest explanation that helps the team respond.
            </p>
          </div>
          <InquiryForm surface="contact" />
        </div>
      </section>
    </div>
  );
}

import { InquiryForm } from "@/components/InquiryForm";
import { Section } from "@/components/Section";

export default function SupportPage() {
  return (
    <div className="page-flow">
      <Section eyebrow="Support" title="Use support when the situation needs more context.">
        <p>
          If product guidance does not feel like enough, send a focused support
          note. Keep the request simple and avoid sharing details that are not
          needed for product support.
        </p>
      </Section>
      <section className="content-band">
        <div className="band-inner two-column">
          <div className="section-heading section-heading--compact">
            <p className="eyebrow">Support form</p>
            <h2>A calmer place for nuanced questions.</h2>
            <p>
              Product, order, and follow-up questions can start here when the
              regular guidance path does not fit.
            </p>
          </div>
          <InquiryForm surface="support" />
        </div>
      </section>
    </div>
  );
}

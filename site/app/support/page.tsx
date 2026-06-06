import Link from "next/link";
import { InquiryForm } from "@/components/InquiryForm";
import { Section } from "@/components/Section";

const supportPaths = [
  {
    title: "Need product details first?",
    body:
      "Review the TotalTOX product page before sending a support request.",
    href: "/products/totaltox-hair-treatment-system",
    cta: "View TotalTOX",
  },
  {
    title: "Trying to choose a product path?",
    body:
      "Answer a few focused questions if you are ready for the site to point you toward the right next step.",
    href: "/guidance",
    cta: "Get started",
  },
  {
    title: "Already ordered or returning?",
    body:
      "Use the support form for order questions, follow-up help, or product questions that need more context.",
    href: "#support-form",
    cta: "Go to support form",
  },
];

export default function SupportPage() {
  return (
    <div className="page-flow">
      <Section eyebrow="Support" title="Use support when quick questions are not enough.">
        <p>
          This page is for order questions, follow-up help, returning clients,
          and product questions that need a person to review the context.
        </p>
      </Section>

      <section className="content-band content-band--muted">
        <div className="band-inner">
          <div className="section-heading">
            <p className="eyebrow">Before support</p>
            <h2>Choose the path that matches what you need.</h2>
            <p>
              Keeping product review, quick questions, and support separate makes the
              site easier to use and keeps support focused on questions that need follow-up.
            </p>
          </div>
          <div className="path-grid">
            {supportPaths.map((path) => (
              <article className="route-card" key={path.title}>
                <h2>{path.title}</h2>
                <p>{path.body}</p>
                <Link className="text-link" href={path.href}>
                  {path.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-band" id="support-form">
        <div className="band-inner two-column">
          <div className="section-heading section-heading--compact">
            <p className="eyebrow">Support form</p>
            <h2>Send the question that still needs a person.</h2>
            <p>
              Keep the request focused and share only what is needed for product
              or order support.
            </p>
          </div>
          <InquiryForm surface="support" />
        </div>
      </section>
    </div>
  );
}

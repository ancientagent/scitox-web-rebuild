import Link from "next/link";
import { InquiryForm } from "@/components/InquiryForm";
import { Section } from "@/components/Section";

const supportPaths = [
  {
    title: "Need general answers first?",
    body:
      "Use Help / Resources for the FAQ, medication privacy context, workplace stigma information, official links, and important screening boundaries.",
    href: "/resources",
    cta: "Open Help / Resources",
  },
  {
    title: "Trying to choose a product path?",
    body:
      "Use product guidance if you are ready for a few focused questions that can point you toward the right next step.",
    href: "/guidance",
    cta: "Start guidance",
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
      <Section eyebrow="Support" title="Use support when resources or guidance are not enough.">
        <p>
          This page is for order questions, follow-up help, returning clients,
          and product questions that need a person to review the context. For
          general FAQ answers, start with Help / Resources.
        </p>
      </Section>

      <section className="content-band content-band--muted">
        <div className="band-inner">
          <div className="section-heading">
            <p className="eyebrow">Before support</p>
            <h2>Choose the path that matches what you need.</h2>
            <p>
              Keeping FAQ, guidance, and support separate makes the site easier
              to use and keeps support focused on questions that need follow-up.
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
              or order support. For legal, medical, or workplace rights
              questions, use the official resources linked in Help / Resources
              or speak with a qualified professional.
            </p>
          </div>
          <InquiryForm surface="support" />
        </div>
      </section>
    </div>
  );
}

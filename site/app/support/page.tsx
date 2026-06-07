import Link from "next/link";
import { InquiryForm } from "@/components/InquiryForm";
import { Section } from "@/components/Section";

const supportPaths = [
  {
    title: "Product details",
    body:
      "Review TotalTOX 2.0 Ultra, TotalTOX 2.0 Ultra Max, optional add-ons, and checkout.",
    href: "/products/totaltox-hair-treatment-system",
    cta: "View TotalTOX",
  },
  {
    title: "Buy online",
    body:
      "Go directly to quantity, optional add-ons, and checkout.",
    href: "/products/totaltox-hair-treatment-system#checkout",
    cta: "Buy now",
  },
];

export default function SupportPage() {
  return (
    <div className="page-flow">
      <Section eyebrow="Support" title="Contact support.">
        <p>
          Use this page for product questions, order questions, follow-up help,
          or anything that needs a person to respond.
        </p>
      </Section>

      <section className="content-band content-band--muted">
        <div className="band-inner support-choice">
          <div className="section-heading section-heading--compact">
            <p className="eyebrow">Product questions</p>
            <h2>Unsure which option fits?</h2>
            <p>
              TotalTOX 2.0 Ultra is the standard option for most orders.
              TotalTOX 2.0 Ultra Max is for long hair and/or daily buildup.
            </p>
          </div>
          <article className="support-choice__note">
            <h3>When to contact the team</h3>
            <p>
              If you are unsure which option to order, or you believe there is
              unusually heavy buildup or a specific buildup concern, send a
              focused support question before checkout.
            </p>
          </article>
        </div>
      </section>

      <section className="content-band" id="support-form">
        <div className="band-inner two-column">
          <div className="section-heading section-heading--compact">
            <p className="eyebrow">Support form</p>
            <h2>Send the question that needs a person.</h2>
            <p>
              Keep the request focused and share only what is needed for product
              or order support.
            </p>
          </div>
          <InquiryForm surface="support" />
        </div>
      </section>

      <section className="content-band content-band--muted">
        <div className="band-inner">
          <div className="section-heading">
            <p className="eyebrow">Useful links</p>
            <h2>Product and checkout are one click away.</h2>
            <p>
              If you do not need to send a message, these links take you back
              to the product page.
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
    </div>
  );
}

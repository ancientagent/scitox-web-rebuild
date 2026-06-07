import Link from "next/link";
import { Section } from "@/components/Section";

const faqItems = [
  {
    question: "How do I know which product is right for me?",
    answer:
      "TotalTOX 2.0 Ultra is the standard complete hair detox treatment for most orders. TotalTOX 2.0 Ultra Max is for long hair and/or daily buildup.",
  },
  {
    question: "What if I am unsure?",
    answer:
      "If you are unsure which option fits, or if you believe there is unusually heavy buildup or a specific buildup concern, contact the team before ordering.",
  },
  {
    question: "What is TotalTOX 2.0 Ultra?",
    answer:
      "TotalTOX 2.0 Ultra is the standard option in the TotalTOX 2.0 Ultra Series.",
  },
  {
    question: "What is TotalTOX 2.0 Ultra Max?",
    answer:
      "TotalTOX 2.0 Ultra Max is the option for people with long hair and/or daily buildup.",
  },
  {
    question: "Can I buy more than one treatment?",
    answer:
      "Yes. Choose the treatment and quantity in checkout before continuing to the hosted payment form.",
  },
  {
    question: "What add-ons are available?",
    answer:
      "UV light and custom developer are available as optional add-ons before checkout.",
  },
  {
    question: "Where do I checkout?",
    answer:
      "Use the product page to choose treatment, quantity, optional add-ons, and continue to checkout.",
  },
  {
    question: "Where are payment details entered?",
    answer: "Payment details are entered on Authorize.net.",
  },
  {
    question: "Can I review order information first?",
    answer:
      "Yes. Shipping and returns, privacy, terms, product options, prices, quantity, optional add-ons, reviews, and support access are available before checkout.",
  },
  {
    question: "Where can I read customer reviews?",
    answer:
      "The live SciTOX Trustpilot profile is linked from the product page. Ratings, dates, and review details are maintained on Trustpilot.",
  },
  {
    question: "When should I contact support?",
    answer:
      "Contact support for product questions, order questions, follow-up help, uncertainty about which option to order, or unusually heavy buildup questions.",
  },
];

export default function FaqPage() {
  return (
    <div className="page-flow">
      <Section
        actions={
          <>
            <Link
              className="button-link button-link--primary"
              href="/products/totaltox-hair-treatment-system"
            >
              View products
            </Link>
            <Link className="button-link" href="/support">
              Contact support
            </Link>
          </>
        }
        eyebrow="FAQ"
        title="Product and ordering questions."
      >
        <p>
          Review the common product and order questions before choosing a
          treatment or continuing to checkout.
        </p>
      </Section>

      <section className="content-band content-band--muted">
        <div className="band-inner product-faq">
          <div className="section-heading section-heading--compact">
            <p className="eyebrow">Common questions</p>
            <h2>Find the product and ordering details you need.</h2>
          </div>
          <div className="product-faq-list product-faq-list--wide">
            {faqItems.map((item) => (
              <article className="product-faq-card" key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

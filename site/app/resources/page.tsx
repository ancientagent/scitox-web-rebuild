import Link from "next/link";
import { Section } from "@/components/Section";
import { StatusTag } from "@/components/StatusTag";

const resourceTopics = [
  {
    title: "What SciTOX is",
    body:
      "[REVIEW REQUIRED: owner-reviewed plain-language overview of the TotalTOX Hair Treatment System, without outcome, proof, or guarantee claims.]",
  },
  {
    title: "Who the product may be for",
    body:
      "[REVIEW REQUIRED: reviewed fit guidance based on owner-approved product data, with support routing when the situation is not simple.]",
  },
  {
    title: "Privacy-aware questions",
    body:
      "[REVIEW REQUIRED: careful resource language for privacy concerns, workplace stigma, and medication-related sensitivity without legal, medical, or security claims.]",
  },
];

export default function ResourcesPage() {
  return (
    <div className="page-flow">
      <Section
        eyebrow="Resource library"
        title="Learn what you need before making a decision."
        actions={
          <>
            <StatusTag tone="owner">[OWNER DATA NEEDED]</StatusTag>
            <StatusTag tone="review">[REVIEW REQUIRED]</StatusTag>
          </>
        }
      >
        <p>
          This route is for first-time visitors who want context before moving
          into product guidance. Final FAQ language, product explanations,
          privacy-sensitive resources, and support wording need owner data and review.
        </p>
      </Section>
      <section className="content-band content-band--muted">
        <div className="band-inner">
          <div className="section-heading">
            <p className="eyebrow">FAQ direction</p>
            <h2>Answer the practical questions without turning the page into a claim.</h2>
            <p>
              The library should help someone understand the product category,
              reduce uncertainty, and decide whether to continue to guidance or support.
            </p>
          </div>
          <div className="path-grid">
            {resourceTopics.map((topic) => (
              <article className="route-card" key={topic.title}>
                <h2>{topic.title}</h2>
                <p>{topic.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="content-band">
        <div className="band-inner two-column">
          <div className="section-heading section-heading--compact">
            <p className="eyebrow">When ready</p>
            <h2>Move into the next step only when it fits.</h2>
            <p>
              The resource path should give the visitor room to learn first,
              then make guidance or support easy to find.
            </p>
          </div>
          <div className="vendor-preview">
            <article>
              <h2>Product guidance</h2>
              <p>Use a few focused questions to route toward the right product path.</p>
              <Link className="text-link" href="/guidance">
                Start guidance
              </Link>
            </article>
            <article>
              <h2>Support</h2>
              <p>Use support when the question needs more context or reviewed guidance is missing.</p>
              <Link className="text-link" href="/support">
                Open support
              </Link>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}

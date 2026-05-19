import Link from "next/link";
import { Section } from "@/components/Section";
import { StatusTag } from "@/components/StatusTag";
import { GuidancePreview } from "@/components/GuidancePreview";
import { ProductPathPreview } from "@/components/ProductPathPreview";

export default function Home() {
  return (
    <div className="page-flow">
      <Section
        eyebrow="Customer lobby preview"
        title="[PLACEHOLDER: choose a product path or request human follow-up - REVIEW REQUIRED]"
        actions={
          <>
            <StatusTag tone="review">[REVIEW REQUIRED]</StatusTag>
            <StatusTag tone="owner">[OWNER DATA NEEDED]</StatusTag>
          </>
        }
      >
        <p>
          [REVIEW REQUIRED: already-aware visitor routing for guided product
          questions, common product paths, and human support fallback]
        </p>
        <div className="route-grid" aria-label="Draft route paths">
          <Link className="route-card route-card--link" href="/guidance">
            <h2>Product guidance</h2>
            <p>[REVIEW REQUIRED: structured product questions with source-gated output]</p>
          </Link>
          <Link className="route-card route-card--link" href="/support">
            <h2>Human support</h2>
            <p>[OWNER DATA NEEDED: approved call, text, email, or form destination]</p>
          </Link>
          <Link className="route-card route-card--link" href="/wholesale">
            <h2>Wholesale path</h2>
            <p>[OWNER DATA NEEDED: separate partner inquiry routing]</p>
          </Link>
        </div>
      </Section>
      <section className="content-band">
        <div className="band-inner">
          <div className="section-heading">
            <p className="eyebrow">Owner-review flow</p>
            <h2>[PLACEHOLDER: choose the next safe route - REVIEW REQUIRED]</h2>
            <p>
              [REVIEW REQUIRED: source-backed route model for common paths,
              structured questions, and human follow-up]
            </p>
          </div>
          <div className="path-grid">
            <Link className="route-card route-card--link" href="/products">
              <span className="path-number">01</span>
              <h2>Common path</h2>
              <p>[OWNER DATA NEEDED: owner-reviewed category labels and product path rules]</p>
            </Link>
            <Link className="route-card route-card--featured route-card--link" href="/guidance">
              <span className="path-number">02</span>
              <h2>Guided questions</h2>
              <p>[REVIEW REQUIRED: source-grounded questions before any product path]</p>
            </Link>
            <Link className="route-card route-card--link" href="/contact">
              <span className="path-number">03</span>
              <h2>Human follow-up</h2>
              <p>[OWNER DATA NEEDED: support escalation channel and routing workflow]</p>
            </Link>
          </div>
        </div>
      </section>
      <section className="content-band content-band--muted">
        <div className="band-inner two-column">
          <div className="section-heading section-heading--compact">
            <p className="eyebrow">Product path preview</p>
            <h2>[PLACEHOLDER: low-exposure product path area - REVIEW REQUIRED]</h2>
            <p>
              [OWNER DATA NEEDED: public category labels, product facts, images,
              pricing, availability, and review status]
            </p>
          </div>
          <ProductPathPreview />
        </div>
      </section>
      <section className="content-band content-band--dark">
        <div className="band-inner">
          <div className="section-heading">
            <p className="eyebrow">Guidance preview</p>
            <h2>[PLACEHOLDER: source-gated routing states - REVIEW REQUIRED]</h2>
            <p>
              [REVIEW REQUIRED: guided product questions, source-base behavior,
              and human fallback handling]
            </p>
          </div>
          <GuidancePreview />
        </div>
      </section>
      <section className="content-band">
        <div className="band-inner two-column">
          <div className="section-heading section-heading--compact">
            <p className="eyebrow">Separate vendor layer</p>
            <h2>[PLACEHOLDER: partner surface for data review - REVIEW REQUIRED]</h2>
            <p>
              [OWNER DATA NEEDED: partner data fields, documentation checklist,
              inquiry routing, and buyer qualification process]
            </p>
          </div>
          <div className="vendor-preview">
            <article>
              <h2>Product line overview</h2>
              <p>[OWNER DATA NEEDED: partner-facing product records and commercial fields]</p>
            </article>
            <article>
              <h2>Documentation checklist</h2>
              <p>[OWNER DATA NEEDED: labels, images, policies, and review status]</p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}

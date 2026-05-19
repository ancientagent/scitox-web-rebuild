import { Section } from "@/components/Section";
import { StatusTag } from "@/components/StatusTag";
import { GuidancePreview } from "@/components/GuidancePreview";
import { ProductPathPreview } from "@/components/ProductPathPreview";

export default function Home() {
  return (
    <div className="page-flow">
      <Section
        eyebrow="Customer lobby preview"
        title="[PLACEHOLDER: calm customer lobby headline - REVIEW REQUIRED]"
        actions={
          <>
            <StatusTag tone="review">[REVIEW REQUIRED]</StatusTag>
            <StatusTag tone="owner">[OWNER DATA NEEDED]</StatusTag>
          </>
        }
      >
        <p>
          [PLACEHOLDER: already-aware visitor routing summary - REVIEW REQUIRED]
        </p>
        <div className="route-grid" aria-label="Draft route paths">
          <div className="route-card">
            <h2>Product guidance</h2>
            <p>[REVIEW REQUIRED: structured guidance entry point]</p>
          </div>
          <div className="route-card">
            <h2>Human support</h2>
            <p>[OWNER DATA NEEDED: support process and destination]</p>
          </div>
          <div className="route-card">
            <h2>Wholesale path</h2>
            <p>[OWNER DATA NEEDED: partner inquiry routing]</p>
          </div>
        </div>
      </Section>
      <section className="content-band">
        <div className="band-inner">
          <div className="section-heading">
            <p className="eyebrow">Owner-review flow</p>
            <h2>[PLACEHOLDER: three-path customer decision model - REVIEW REQUIRED]</h2>
            <p>
              [REVIEW REQUIRED: calm routing explanation for common product paths,
              guided questions, and human follow-up]
            </p>
          </div>
          <div className="path-grid">
            <article className="route-card">
              <span className="path-number">01</span>
              <h2>Common path</h2>
              <p>[OWNER DATA NEEDED: category and product path rules]</p>
            </article>
            <article className="route-card route-card--featured">
              <span className="path-number">02</span>
              <h2>Guided questions</h2>
              <p>[REVIEW REQUIRED: backend-source-grounded guidance preview]</p>
            </article>
            <article className="route-card">
              <span className="path-number">03</span>
              <h2>Human follow-up</h2>
              <p>[OWNER DATA NEEDED: support escalation workflow]</p>
            </article>
          </div>
        </div>
      </section>
      <section className="content-band content-band--muted">
        <div className="band-inner two-column">
          <div className="section-heading section-heading--compact">
            <p className="eyebrow">Product path preview</p>
            <h2>[PLACEHOLDER: low-exposure product area - REVIEW REQUIRED]</h2>
            <p>
              [OWNER DATA NEEDED: product categories, product facts, reviewed labels,
              images, pricing, and availability]
            </p>
          </div>
          <ProductPathPreview />
        </div>
      </section>
      <section className="content-band content-band--dark">
        <div className="band-inner">
          <div className="section-heading">
            <p className="eyebrow">Guidance preview</p>
            <h2>[PLACEHOLDER: source-grounded routing states - REVIEW REQUIRED]</h2>
            <p>
              [REVIEW REQUIRED: guidance assistant language, source-base behavior,
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
            <h2>[PLACEHOLDER: wholesale surface remains separate - REVIEW REQUIRED]</h2>
            <p>
              [OWNER DATA NEEDED: vendor data fields, documentation checklist,
              inquiry routing, and buyer qualification process]
            </p>
          </div>
          <div className="vendor-preview">
            <article>
              <h2>Product line overview</h2>
              <p>[OWNER DATA NEEDED: SKU, MSRP, wholesale, MOQ, case pack, UPC/GTIN]</p>
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

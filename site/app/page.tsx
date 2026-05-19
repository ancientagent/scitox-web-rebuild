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
        title="Private product-routing lobby [REVIEW REQUIRED]"
        actions={
          <>
            <StatusTag tone="review">[REVIEW REQUIRED]</StatusTag>
            <StatusTag tone="owner">[OWNER DATA NEEDED]</StatusTag>
          </>
        }
      >
        <p>
          Already-aware visitors can review source-backed product paths, answer
          structured guidance questions, or request human follow-up without a
          loud public sales pitch.
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
            <h2>Choose the next safe route [REVIEW REQUIRED]</h2>
            <p>
              The demo now has a source-backed catalog behind the flow, while
              recommendations and sensitive claims still require review.
            </p>
          </div>
          <div className="path-grid">
            <Link className="route-card route-card--link" href="/products">
              <span className="path-number">01</span>
              <h2>Common path</h2>
              <p>Open the source-backed product catalog with photos, product names, and gated details.</p>
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
            <h2>Low-exposure product path area [REVIEW REQUIRED]</h2>
            <p>
              Product titles, photos, path labels, and standard-kit price
              context are present. Public claims and routing rules remain gated.
            </p>
          </div>
          <ProductPathPreview />
        </div>
      </section>
      <section className="content-band content-band--dark">
        <div className="band-inner">
          <div className="section-heading">
            <p className="eyebrow">Guidance preview</p>
            <h2>Source-gated routing states [REVIEW REQUIRED]</h2>
            <p>
              Guidance can reference reviewed source data and fall back to a
              human route when the source does not support a clear product path.
            </p>
          </div>
          <GuidancePreview />
        </div>
      </section>
      <section className="content-band">
        <div className="band-inner two-column">
          <div className="section-heading section-heading--compact">
            <p className="eyebrow">Separate vendor layer</p>
            <h2>Partner surface for data review [REVIEW REQUIRED]</h2>
            <p>
              The wholesale surface can now show the real product family while
              commercial fields, documents, and buyer routing remain gated.
            </p>
          </div>
          <div className="vendor-preview">
            <article>
            <h2>Product line overview</h2>
              <p>TotalTOX is now the V1 product-line focus; variant SKUs and commercial fields still need owner data.</p>
            </article>
            <article>
              <h2>Documentation checklist</h2>
              <p>Images are loaded; labels, final policies, and claim review remain gated.</p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}

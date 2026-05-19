import { Section } from "@/components/Section";
import { StatusTag } from "@/components/StatusTag";
import { ProductPathPreview } from "@/components/ProductPathPreview";

export default function ProductsPage() {
  return (
    <div className="page-flow">
      <Section
        eyebrow="Products route"
        title="[PLACEHOLDER: product category routing - REVIEW REQUIRED]"
        actions={<StatusTag tone="owner">[OWNER DATA NEEDED]</StatusTag>}
      >
        <p>
          [OWNER DATA NEEDED: product categories, product names, SKUs, images,
          and reviewed descriptions]
        </p>
      </Section>
      <section className="content-band content-band--muted">
        <div className="band-inner two-column">
          <div className="section-heading section-heading--compact">
            <p className="eyebrow">Product path states</p>
            <h2>[PLACEHOLDER: product self-service preview - REVIEW REQUIRED]</h2>
            <p>[REVIEW REQUIRED: product category labels and comparison criteria]</p>
          </div>
          <ProductPathPreview />
        </div>
      </section>
    </div>
  );
}

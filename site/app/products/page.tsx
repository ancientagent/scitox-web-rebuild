import { Section } from "@/components/Section";
import { StatusTag } from "@/components/StatusTag";

export default function ProductsPage() {
  return (
    <div className="route-shell">
      <Section
        eyebrow="Products route"
        title="[PLACEHOLDER: product category routing - REVIEW REQUIRED]"
        actions={<StatusTag tone="owner">[OWNER DATA NEEDED]</StatusTag>}
      >
        <p>
          [OWNER DATA NEEDED: product categories, product names, SKUs, images,
          and approved descriptions]
        </p>
      </Section>
    </div>
  );
}

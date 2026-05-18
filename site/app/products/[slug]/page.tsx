import { Section } from "@/components/Section";
import { StatusTag } from "@/components/StatusTag";

export default function ProductDetailPage() {
  return (
    <div className="route-shell">
      <Section
        eyebrow="Product detail route"
        title="[PLACEHOLDER: product detail headline - REVIEW REQUIRED]"
        actions={
          <>
            <StatusTag tone="owner">[OWNER DATA NEEDED]</StatusTag>
            <StatusTag tone="review">[REVIEW REQUIRED]</StatusTag>
          </>
        }
      >
        <p>
          [OWNER DATA NEEDED: product name, SKU, size, ingredients, label file,
          instructions, warnings, price, shipping notes, and approved checkout
          path]
        </p>
      </Section>
    </div>
  );
}

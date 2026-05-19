import { Section } from "@/components/Section";
import { InquiryForm } from "@/components/InquiryForm";
import { StatusTag } from "@/components/StatusTag";
import { getVendorProducts } from "@/lib/products/getProducts";

export default function WholesalePage() {
  const vendorProducts = getVendorProducts();

  return (
    <div className="page-flow">
      <Section
        eyebrow="Wholesale route"
        title="[PLACEHOLDER: partner and wholesale inquiry - REVIEW REQUIRED]"
        actions={
          <>
            <StatusTag tone="owner">[OWNER DATA NEEDED]</StatusTag>
            <StatusTag tone="review">[REVIEW REQUIRED]</StatusTag>
          </>
        }
      >
        <p>
          [OWNER DATA NEEDED: wholesale terms, MOQ, case pack, MSRP, wholesale
          price, UPC/GTIN, documentation checklist, and inquiry routing]
        </p>
      </Section>
      <section className="content-band">
        <div className="band-inner">
          <div className="section-heading">
            <p className="eyebrow">Vendor-facing preview</p>
            <h2>[PLACEHOLDER: restrained wholesale layer - REVIEW REQUIRED]</h2>
            <p>[REVIEW REQUIRED: vendor page language and product line overview]</p>
          </div>
          <div className="vendor-grid">
            <article>
              <h2>Product line overview</h2>
              <p>[OWNER DATA NEEDED: product line, SKU list, images, and labels]</p>
            </article>
            <article>
              <h2>Documentation checklist</h2>
              <p>[OWNER DATA NEEDED: wholesale docs, policies, and review status]</p>
            </article>
            <article>
              <h2>Inquiry process</h2>
              <p>[OWNER DATA NEEDED: buyer fields, routing, and follow-up workflow]</p>
            </article>
          </div>
          <div className="vendor-product-table-wrap">
            <table className="vendor-product-table">
              <caption>
                [PLACEHOLDER: vendor product data model - REVIEW REQUIRED]
              </caption>
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">SKU</th>
                  <th scope="col">MSRP</th>
                  <th scope="col">Wholesale</th>
                  <th scope="col">MOQ</th>
                  <th scope="col">Case pack</th>
                  <th scope="col">UPC/GTIN</th>
                </tr>
              </thead>
              <tbody>
                {vendorProducts.map((product) => (
                  <tr key={product.slug}>
                    <th scope="row">{product.publicName}</th>
                    <td>{product.sku}</td>
                    <td>{product.msrp}</td>
                    <td>{product.wholesalePrice}</td>
                    <td>{product.moq}</td>
                    <td>{product.casePack}</td>
                    <td>{product.upcGtin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="vendor-grid vendor-grid--detail">
            {vendorProducts.map((product) => (
              <article key={product.slug}>
                <h2>{product.publicCategory}</h2>
                <dl className="fact-list">
                  <div>
                    <dt>Label file</dt>
                    <dd>{product.labelFile}</dd>
                  </div>
                  <div>
                    <dt>Dimensions / weight</dt>
                    <dd>{product.dimensionsWeight}</dd>
                  </div>
                  <div>
                    <dt>Packaging</dt>
                    <dd>{product.packagingDetails}</dd>
                  </div>
                  <div>
                    <dt>Shipping terms</dt>
                    <dd>{product.shippingTerms}</dd>
                  </div>
                  <div>
                    <dt>Returns / damaged goods</dt>
                    <dd>{product.returnPolicy}</dd>
                  </div>
                  <div>
                    <dt>Insurance</dt>
                    <dd>{product.insuranceStatus}</dd>
                  </div>
                  <div>
                    <dt>Claim substantiation</dt>
                    <dd>{product.claimSubstantiation}</dd>
                  </div>
                </dl>
                <div className="notice-list">
                  {product.vendorReadinessNotes.map((note) => (
                    <span key={note}>{note}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <div className="inquiry-form-wrap">
            <InquiryForm surface="wholesale" />
          </div>
        </div>
      </section>
    </div>
  );
}

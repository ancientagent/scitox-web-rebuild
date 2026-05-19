import Link from "next/link";
import { Section } from "@/components/Section";
import { StatusTag } from "@/components/StatusTag";

const recoveryRoutes = [
  {
    href: "/products",
    title: "Products",
    body: "[OWNER DATA NEEDED: reviewed product route]",
  },
  {
    href: "/guidance",
    title: "Guidance",
    body: "[REVIEW REQUIRED: source-grounded intake route]",
  },
  {
    href: "/support",
    title: "Support",
    body: "[OWNER DATA NEEDED: support destination and routing]",
  },
  {
    href: "/contact",
    title: "Contact",
    body: "[OWNER DATA NEEDED: owner-reviewed inquiry destination]",
  },
  {
    href: "/wholesale",
    title: "Wholesale",
    body: "[OWNER DATA NEEDED: partner inquiry routing]",
  },
  {
    href: "/shipping-returns",
    title: "Policies",
    body: "[OWNER DATA NEEDED: reviewed launch policy set]",
  },
];

export default function NotFound() {
  return (
    <div className="page-flow">
      <div className="route-shell">
        <Section
          eyebrow="Route unavailable"
          title="[PLACEHOLDER: page not found - REVIEW REQUIRED]"
          actions={
            <>
              <StatusTag tone="owner">[OWNER DATA NEEDED]</StatusTag>
              <StatusTag tone="review">[REVIEW REQUIRED]</StatusTag>
            </>
          }
        >
          <p>
            [OWNER DATA NEEDED: legacy redirect map, launch routing rules, and reviewed
            unavailable-page wording]
          </p>
        </Section>
      </div>
      <section className="content-band content-band--muted">
        <div className="band-inner">
          <div className="section-heading">
            <p className="eyebrow">Demo recovery routes</p>
            <h2>[PLACEHOLDER: stable owner-demo navigation - REVIEW REQUIRED]</h2>
            <p>[OWNER DATA NEEDED: final launch route priorities]</p>
          </div>
          <div className="route-grid route-grid--wide">
            {recoveryRoutes.map((route) => (
              <Link className="route-card route-card--link" href={route.href} key={route.href}>
                <h2>{route.title}</h2>
                <p>{route.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import { Section } from "@/components/Section";

const recoveryRoutes = [
  {
    href: "/products",
    title: "Products",
    body: "View the TotalTOX product family.",
  },
  {
    href: "/guidance",
    title: "Guidance",
    body: "Answer a few focused questions before choosing a path.",
  },
  {
    href: "/resources",
    title: "Help / Resources",
    body: "Read the FAQ and background information before deciding what to do next.",
  },
  {
    href: "/support",
    title: "Support",
    body: "Use support when resources or guidance are not enough.",
  },
  {
    href: "/contact",
    title: "Contact",
    body: "Send a focused question to the team.",
  },
  {
    href: "/shipping-returns",
    title: "Policies",
    body: "Review shipping, returns, privacy, and terms pages.",
  },
];

export default function NotFound() {
  return (
    <div className="page-flow">
      <div className="route-shell">
        <Section eyebrow="Page not found" title="That page is not available.">
          <p>Use one of the paths below to get back to the right place.</p>
        </Section>
      </div>
      <section className="content-band content-band--muted">
        <div className="band-inner">
          <div className="section-heading">
            <p className="eyebrow">Where to go next</p>
            <h2>Choose the closest path.</h2>
            <p>
              Product guidance, resources, support, and policy information are
              available from here.
            </p>
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

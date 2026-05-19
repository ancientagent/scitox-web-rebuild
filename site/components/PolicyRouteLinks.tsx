import Link from "next/link";

const policyRoutes = [
  {
    href: "/shipping-returns",
    title: "Shipping / returns",
    body: "[OWNER DATA NEEDED: shipping, return, and refund policy details]",
  },
  {
    href: "/privacy",
    title: "Privacy",
    body: "[OWNER DATA NEEDED: data handling and provider review]",
  },
  {
    href: "/terms",
    title: "Terms",
    body: "[REVIEW REQUIRED: purchase, support, and site-use language]",
  },
  {
    href: "/contact",
    title: "Contact route",
    body: "[OWNER DATA NEEDED: owner-reviewed routing destination]",
  },
];

export function PolicyRouteLinks() {
  return (
    <div className="policy-route-links" aria-label="Policy and contact routes">
      {policyRoutes.map((route) => (
        <Link className="route-card route-card--link" href={route.href} key={route.href}>
          <h2>{route.title}</h2>
          <p>{route.body}</p>
        </Link>
      ))}
    </div>
  );
}

import Link from "next/link";

const policyRoutes = [
  {
    href: "/shipping-returns",
    title: "Shipping / returns",
    body: "Review shipping, damaged-item, return, and order support information.",
  },
  {
    href: "/privacy",
    title: "Privacy",
    body: "Review how privacy information is organized for the site.",
  },
  {
    href: "/terms",
    title: "Terms",
    body: "Review site terms and purchase boundaries.",
  },
  {
    href: "/contact",
    title: "Contact",
    body: "Send a focused question to the team.",
  },
];

export function PolicyRouteLinks() {
  return (
    <div className="policy-route-links" aria-label="Policy and contact pages">
      {policyRoutes.map((route) => (
        <Link className="route-card route-card--link" href={route.href} key={route.href}>
          <h2>{route.title}</h2>
          <p>{route.body}</p>
        </Link>
      ))}
    </div>
  );
}

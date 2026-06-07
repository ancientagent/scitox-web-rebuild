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
    href: "/support",
    title: "Support",
    body: "Contact support for product or order questions.",
  },
];

export function PolicyRouteLinks() {
  return (
    <div className="policy-route-links" aria-label="Policy and support pages">
      {policyRoutes.map((route) => (
        <Link className="route-card route-card--link" href={route.href} key={route.href}>
          <h2>{route.title}</h2>
          <p>{route.body}</p>
        </Link>
      ))}
    </div>
  );
}

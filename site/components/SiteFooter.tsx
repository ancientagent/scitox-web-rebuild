import Link from "next/link";

const footerRoutes = [
  { href: "/products/totaltox-hair-treatment-system", label: "Products" },
  { href: "/products/totaltox-hair-treatment-system#checkout", label: "Buy now" },
  { href: "/support", label: "Support" },
  { href: "/shipping-returns", label: "Shipping / Returns" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/wholesale", label: "Wholesale" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__note">
          Product details and support are here when you need a clearer next step.
        </p>
        <nav className="footer-nav" aria-label="Footer navigation">
          {footerRoutes.map((route) => (
            <Link key={route.href} href={route.href}>
              {route.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}

import Link from "next/link";

const footerRoutes = [
  { href: "/products", label: "Products" },
  { href: "/guidance", label: "Guidance" },
  { href: "/support", label: "Support" },
  { href: "/contact", label: "Contact" },
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
          SciTOX keeps customer guidance, support, and partner inquiries in separate paths.
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

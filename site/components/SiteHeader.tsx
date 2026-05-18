import Link from "next/link";

const primaryRoutes = [
  { href: "/products", label: "Products" },
  { href: "/guidance", label: "Product Guidance" },
  { href: "/support", label: "FAQ / Support" },
  { href: "/contact", label: "Contact" },
  { href: "/wholesale", label: "Wholesale / Partners" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="site-logo" href="/" aria-label="SciTOX home">
          SciTOX
        </Link>
        <nav className="site-nav" aria-label="Primary navigation">
          {primaryRoutes.map((route) => (
            <Link key={route.href} href={route.href}>
              {route.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

import Link from "next/link";

const primaryRoutes = [
  { href: "/products/totaltox-hair-treatment-system", label: "Products" },
  { href: "/support", label: "Support" },
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
          <Link className="site-nav__cta" href="/products/totaltox-hair-treatment-system#checkout">
            Buy now
          </Link>
        </nav>
      </div>
    </header>
  );
}

import Link from "next/link";

const primaryRoutes = [
  { href: "/products/totaltox-hair-treatment-system", label: "Products" },
  { href: "/faq", label: "FAQ" },
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
          <Link
            aria-label="Shopping cart"
            className="site-nav__cta"
            href="/products/totaltox-hair-treatment-system#checkout"
          >
            <svg
              aria-hidden="true"
              className="site-nav__cart-icon"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                d="M4 5h2l2.2 10.2a2 2 0 0 0 2 1.6h6.9a2 2 0 0 0 1.9-1.4L21 8H7"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <path
                d="M10 20h.01M17 20h.01"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="3"
              />
            </svg>
          </Link>
        </nav>
      </div>
    </header>
  );
}

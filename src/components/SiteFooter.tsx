import Link from "next/link";
import { fragrances } from "@/lib/fragrances";
import { Newsletter } from "@/components/Newsletter";

const columns = [
  {
    heading: "The House",
    links: [
      { href: "/about", label: "Our story" },
      { href: "/about#point-of-view", label: "A point of view" },
      { href: "/about#closet", label: "Why a closet" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Collection",
    links: [
      { href: "/collection", label: "All fragrances" },
      ...fragrances.slice(0, 3).map((f) => ({
        href: `/fragrance/${f.slug}`,
        label: f.name,
      })),
    ],
  },
  {
    heading: "Client Care",
    links: [
      { href: "/contact", label: "Enquiries" },
      { href: "/contact#stockists", label: "Stockists" },
      { href: "/contact#shipping", label: "Shipping & returns" },
      { href: "/contact#care", label: "Caring for your perfume" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="on-black bg-canvas">
      <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 sm:py-24">
        <div className="grid gap-14 md:grid-cols-[1.2fr_repeat(3,1fr)] md:gap-8">
          <Newsletter />

          {/* Link columns are desktop-only; mobile keeps the newsletter and the base row. */}
          {columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading} className="hidden md:block">
              <h2 className="t-label text-[11px] text-gold">{col.heading}</h2>
              <span aria-hidden className="rule-gold mt-4" />
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="t-body text-[15px] text-body transition-colors duration-300 hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* The house lockup, set the way the brand sheet closes: mark, rule, tagline. */}
        <div className="mt-20 flex flex-col items-center border-t border-hairline pt-16">
          <p className="t-wordmark text-center text-[13px] sm:text-[17px]">
            The Perfume Closet
          </p>
          <span aria-hidden className="rule-gold mt-5 w-16" />
          <p className="t-tagline mt-5 text-[16px] text-gold">
            …elegance in every bottle
          </p>

          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
            {["Fragrances", "Beauty", "Lifestyle", "Always Elegant"].map((pillar, i) => (
              <li key={pillar} className="flex items-center gap-2.5 sm:gap-5">
                {i > 0 ? (
                  <span aria-hidden className="hidden h-1 w-1 rounded-full bg-gold-soft sm:block" />
                ) : null}
                <span className="t-label text-[11px] text-muted">{pillar}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 flex flex-col gap-5 border-t border-hairline pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="t-body text-[14px] text-muted-soft">
            © {new Date().getFullYear()} The Perfume Closet. All rights reserved.
          </p>
          <p className="t-body text-[14px] text-muted-soft">
            Genderless throughout. Never tested on animals.
          </p>
        </div>
      </div>
    </footer>
  );
}

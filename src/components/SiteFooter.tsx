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
    <footer className="border-t border-hairline bg-canvas">
      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 md:grid-cols-[1.2fr_repeat(3,1fr)] md:gap-8">
          <Newsletter />

          {/* Link columns are desktop-only; mobile keeps the newsletter and the base row. */}
          {columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading} className="hidden md:block">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-soft">
                {col.heading}
              </h2>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="t-body text-[14px] text-body transition-colors duration-300 hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-hairline pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="t-body text-[13px] text-muted-soft">
            © {new Date().getFullYear()} The Perfume Closet. All rights reserved.
          </p>
          <p className="t-body text-[13px] text-muted-soft">
            Genderless throughout. Never tested on animals.
          </p>
        </div>

        <p className="t-wordmark mt-14 text-center text-[11px] text-muted sm:text-[13px]">
          The Perfume Closet
        </p>
      </div>
    </footer>
  );
}

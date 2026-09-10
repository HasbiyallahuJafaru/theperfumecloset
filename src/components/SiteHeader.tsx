"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { BagIcon, CloseIcon, MenuIcon } from "@/components/icons";

const links = [
  { href: "/", label: "Home" },
  { href: "/collection", label: "Collection" },
  { href: "/about", label: "The House" },
  { href: "/contact", label: "Contact" },
] as const;

// "/" is a prefix of every route, so it only counts as active on an exact match.
const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

export function SiteHeader() {
  const pathname = usePathname();
  const { count, open, hydrated } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // Only the home hero puts dark footage behind the bar. Everywhere else the
  // page is ivory from the first pixel, so the bar reads dark-on-light at once.
  const overHero = pathname === "/" && !scrolled && !menuOpen;
  const settled = !overHero;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-700 ${
        overHero ? "on-black border-b border-transparent" : ""
      } ${settled ? "border-b border-hairline bg-canvas/95 backdrop-blur-sm" : ""}`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-5 sm:px-8">
        {/* Left slot: hamburger below xl; otherwise it just balances the wordmark. */}
        <div className="flex flex-1 items-center">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="-ml-2 flex h-11 w-11 items-center justify-center text-ink transition-colors duration-300 hover:text-gold-ink xl:hidden"
          >
            {menuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>

        <Link
          href="/"
          className="absolute left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5"
        >
          <Image
            src="/logo-mark.png"
            alt=""
            width={549}
            height={640}
            priority
            sizes="32px"
            className="h-6 w-auto sm:h-7"
          />
          <span className="t-wordmark whitespace-nowrap text-[10px] sm:text-[11px] md:text-[12px]">
            The Perfume Closet
          </span>
        </Link>

        <div className="flex flex-1 items-center justify-end gap-8">
          <nav className="hidden items-center gap-8 xl:flex">
            {links.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`t-label text-[11px] transition-colors duration-300 ${
                    active
                      ? "text-gold-ink"
                      : "text-body hover:text-gold-ink"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={open}
            className="-mr-2 flex h-11 items-center gap-2.5 px-2 text-ink transition-colors duration-300 hover:text-gold-ink"
            aria-label={`Open bag${hydrated && count > 0 ? `, ${count} item${count === 1 ? "" : "s"}` : ", empty"}`}
          >
            <BagIcon className="h-[19px] w-[19px]" />
            <span className="tabular t-label text-[11px]">
              {hydrated && count > 0 ? String(count).padStart(2, "0") : "00"}
            </span>
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-t border-hairline bg-canvas transition-[max-height] duration-500 xl:hidden ${
          menuOpen ? "max-h-96" : "max-h-0 border-t-transparent"
        }`}
      >
        <nav className="flex flex-col px-5 py-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              aria-current={isActive(pathname, link.href) ? "page" : undefined}
              className={`t-label border-b border-hairline py-5 text-[12px] last:border-b-0 ${
                isActive(pathname, link.href) ? "text-gold-ink" : "text-body"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

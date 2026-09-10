"use client";

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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-700 ${
        scrolled || menuOpen
          ? "bg-canvas/95 backdrop-blur-sm border-b border-hairline"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-[1280px] items-center justify-between px-5 sm:px-8">
        {/* Left slot: hamburger below xl; otherwise it just balances the wordmark. */}
        <div className="flex flex-1 items-center">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="-ml-2 flex h-11 w-11 items-center justify-center text-ink xl:hidden"
          >
            {menuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>

        <Link
          href="/"
          className="t-wordmark absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] sm:text-[12px] md:text-[13px]"
        >
          The Perfume Closet
        </Link>

        <div className="flex flex-1 items-center justify-end gap-7">
          <nav className="hidden items-center gap-7 xl:flex">
            {links.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                    active ? "text-ink" : "text-muted hover:text-ink"
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
            className="-mr-2 flex h-11 items-center gap-2 px-2 text-ink transition-opacity duration-300 hover:opacity-70"
            aria-label={`Open bag${hydrated && count > 0 ? `, ${count} item${count === 1 ? "" : "s"}` : ", empty"}`}
          >
            <BagIcon className="h-[18px] w-[18px]" />
            <span className="tabular font-mono text-[11px] uppercase tracking-[0.2em]">
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
              className={`border-b border-hairline py-5 font-mono text-[12px] uppercase tracking-[0.2em] last:border-b-0 ${
                isActive(pathname, link.href) ? "text-ink" : "text-body"
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


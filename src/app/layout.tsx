import type { Metadata } from "next";
import Image from "next/image";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CartDrawer } from "@/components/CartDrawer";

// Self-hosted: no build-time or runtime dependency on a font CDN.

// One family, two cuts. The 600 carries every heading, label and the wordmark;
// the 400 carries running copy and the house italic. See DESIGN.md.
const cormorantDisplay = localFont({
  src: "../fonts/CormorantGaramond-600.woff2",
  weight: "500 700",
  style: "normal",
  display: "swap",
  variable: "--font-cormorant-display",
  fallback: ["Garamond", "Times New Roman", "serif"],
});

const cormorant = localFont({
  src: [
    { path: "../fonts/CormorantGaramond-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/CormorantGaramond-400-italic.woff2", weight: "400", style: "italic" },
  ],
  display: "swap",
  variable: "--font-cormorant",
  fallback: ["Garamond", "Times New Roman", "serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://theperfumecloset.example"),
  title: {
    default: "The Perfume Closet — Extrait de Parfum",
    template: "%s — The Perfume Closet",
  },
  description:
    "A small house of extrait-strength perfumes. Six compositions, made in limited batches, sold direct.",
  openGraph: {
    title: "The Perfume Closet",
    description:
      "A small house of extrait-strength perfumes. Six compositions, made in limited batches, sold direct.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorantDisplay.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-canvas text-body">
        <CartProvider>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <CartDrawer />
        </CartProvider>

        {/* The opening. Pure CSS: it animates out to visibility:hidden and stays
            there, so it needs no client component, no state and no script, and
            it clears itself even if JavaScript never runs. See globals.css. */}
        <div className="intro on-black" aria-hidden>
          <div>
            <Image
              src="/logo-mark.png"
              alt=""
              width={549}
              height={640}
              priority
              sizes="112px"
              className="intro-mark"
            />
            <p className="t-wordmark intro-word text-[13px] sm:text-[19px]">
              The Perfume Closet
            </p>
            <span className="intro-rule" />
            <p className="t-tagline intro-tagline text-[15px] text-gold sm:text-[17px]">
              …elegance in every bottle
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}

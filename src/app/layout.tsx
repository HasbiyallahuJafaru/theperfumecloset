import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CartDrawer } from "@/components/CartDrawer";

// Self-hosted: no build-time or runtime dependency on a font CDN.

// Variable weight axis 400–900; the design system only ever calls 400.
const bodoni = localFont({
  src: "../fonts/BodoniModa.woff2",
  weight: "400 900",
  style: "normal",
  display: "swap",
  variable: "--font-bodoni",
  fallback: ["Didot", "Bodoni MT", "Times New Roman", "serif"],
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

const jetbrains = localFont({
  src: "../fonts/JetBrainsMono-400.woff2",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-jetbrains",
  fallback: ["ui-monospace", "SF Mono", "Cascadia Mono", "monospace"],
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
      className={`${bodoni.variable} ${cormorant.variable} ${jetbrains.variable} h-full antialiased`}
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
      </body>
    </html>
  );
}

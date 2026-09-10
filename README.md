# The Perfume Closet

A premium storefront for a niche fragrance house. Next.js 16 (App Router), React 19,
TypeScript, Tailwind v4.

## Running it

```bash
npm install
npm run dev
```

Then open the URL it prints (http://localhost:3000, or the next free port).

### Why there is an `.npmrc`

This machine runs Avast/AVG HTTPS scanning, which re-signs TLS connections with a locally
installed root certificate. Node ships its own CA bundle and ignores the Windows certificate
store, so **without the flag in `.npmrc` every outbound HTTPS request from Node fails** with
`UNABLE_TO_VERIFY_LEAF_SIGNATURE` — `npm install` hangs, and the `next/image` optimizer
cannot fetch product photography, so images render broken.

`.npmrc` sets `node-options=--use-system-ca`, which keeps certificate verification **on** and
simply trusts the same roots Windows trusts. It needs Node 22.15+ or 24+ (you are on 24.19).

If you move this project to a machine without AV TLS interception, the file is harmless and
can stay.

## Structure

| Path | What it holds |
|---|---|
| `DESIGN.md` | The visual authority — tokens, type trinity, component rules, do's and don'ts |
| `PRODUCT.md` | Product context, scope, and the assumptions that must be replaced |
| `src/lib/fragrances.ts` | All product data and imagery. **The single file to edit for content.** |
| `src/lib/cart.tsx` | Cart state, persisted to `localStorage` |
| `src/components/` | Header, footer, cart drawer, product gallery, forms, icon set |
| `src/fonts/` | Self-hosted woff2 — no build-time or runtime font-CDN dependency |
| `public/video/hero.mp4` | Hero background video (3.3 MB) |

Routes: `/` · `/collection` · `/fragrance/[slug]` · `/about` · `/contact`. All 13 pages
prerender as static HTML.

## Before you launch — replace these

Everything below is placeholder and is **not** real business truth:

- **Product photography.** The bottle shots are free Unsplash stock and some carry another
  brand's mark (the hero bottle shows a faint "MSM Perfume" logo). Every product image must be
  replaced with your own photography. Swap the URLs in `src/lib/fragrances.ts`.
- **Fragrance names, taglines, descriptions, note pyramids, perfumers, prices.** Invented.
- **Stockists and contact details.** Fictional.
- **Currency** is USD, set once as `CURRENCY_SYMBOL` in `src/lib/fragrances.ts`.

## Not wired up

- **Checkout.** The cart is fully functional (add, remove, quantity, persistence) but the
  checkout button is a dead end that says so. No payment processor is connected.
- **Contact form** and **newsletter** validate and show success states, but nothing is sent.
  Replace the simulated calls in `ContactForm.tsx` and `Newsletter.tsx`.

## Credits

- Hero video: [Pexels](https://www.pexels.com/video/footage-of-smoke-against-black-background-9694807/)
  (cottonbro studio) — free to use, no attribution required.
- Placeholder photography: [Unsplash](https://unsplash.com) — free to use; not licensed as
  your own product imagery.
- Design language adapted from the Bugatti `DESIGN.md` in
  [voltagent/awesome-design-md](https://github.com/voltagent/awesome-design-md).
- Typefaces: Bodoni Moda (display), Cormorant Garamond (body), JetBrains Mono (labels) —
  all SIL Open Font License, self-hosted in `src/fonts/`.

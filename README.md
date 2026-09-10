# The Perfume Closet

A premium storefront for a niche fragrance house. Next.js 16 (App Router), React 19,
TypeScript, Tailwind v4.

## Running it

```bash
npm install
npm run dev
```

Then open the URL it prints (http://localhost:3000, or the next free port).

### If `npm install` hangs or images render broken locally

Machines running Avast/AVG HTTPS scanning re-sign TLS connections with a locally installed
root certificate. Node ships its own CA bundle and ignores the Windows certificate store, so
every outbound HTTPS request from Node fails with `UNABLE_TO_VERIFY_LEAF_SIGNATURE` —
`npm install` hangs, and the `next/image` optimizer cannot fetch photography.

Fix it with a **local, untracked** `.npmrc` in the project root:

```
node-options=--use-system-ca
```

That keeps certificate verification on and trusts the same roots Windows trusts. Requires
Node 22.15+ or 24+.

`.npmrc` is deliberately **gitignored**. The flag is machine-specific and must not reach a
build server: `NODE_OPTIONS` applies to every Node process, and on a builder running Node
older than 22.15 the unrecognised flag kills each one and the deploy fails.

## Deploying to Vercel

`vercel.json` pins `"framework": "nextjs"`. That field overrides the dashboard preset, so the
project builds as Next.js even if the preset was set to something else. Keep it.

1. Import the repo at [vercel.com/new](https://vercel.com/new).
2. **Root Directory:** `./` — leave it empty/root.
3. Build command, output directory and install command: leave all on the defaults.
4. No environment variables are required.

**Getting a 404 on every route?** In order of likelihood:

- **Framework Preset is `Other`.** Under that preset Vercel treats the output directory as
  `public` if it exists, publishes that folder as a static site, and ignores the `.next` build
  entirely — so every route 404s. The tell is a production build finishing in ~15–20s with a
  single `.` build artifact of 0ms (`vercel inspect <url>` shows this). The committed
  `vercel.json` now prevents it.
- **The project was imported while the repo was still empty.** Nothing to build. Push first,
  then redeploy — Deployments → ⋯ → Redeploy.
- **Root Directory points at a subfolder.** Reset it to the repository root.
- **The deployment built an older commit.** Check the hash on the deployment.

Useful for diagnosis:

```bash
npx vercel ls <project>          # deployment list — watch the build durations
npx vercel inspect <url>         # per-deployment build artifacts
npx vercel project inspect <p>   # framework preset, root directory, node version
```

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
- Typefaces: Fraunces (display), Cormorant Garamond (body), JetBrains Mono (labels) —
  all SIL Open Font License, self-hosted in `src/fonts/`.

# The Perfume Closet — Product Context

## What this is

A high-end niche fragrance house selling a small, curated collection of extrait-strength
perfumes direct to customers. The site is the brand's primary surface: it has to establish
that these are serious, expensive, considered fragrances before it asks for a sale.

## Surface & mode

**Mode: Persuade.** This is a marketing site where design *is* the product. The visitor
arrives not knowing the house, and leaves either wanting a bottle or wanting the sample set.
Scent cannot be transmitted through a screen — so the site sells atmosphere, materials, and
restraint. Every decision serves "this house is expensive and knows what it's doing."

## Audience

Fragrance-literate buyers who already know Le Labo, Byredo, Amouage, and Frederic Malle.
They read note pyramids. They are suspicious of hype, mass-market cues, and discounting.
They respond to provenance, concentration, perfumer credit, and silence.

## Scope (agreed with user, 2026-09-09)

Marketing site, cart-ready:

- `/` — home: hero, featured fragrances, the craft story, newsletter
- `/collection` — filterable fragrance grid
- `/fragrance/[slug]` — product detail: gallery, note pyramid, add to cart
- `/about` — house story, craft, provenance
- `/contact` — enquiry form, stockists

Cart is real (add/remove/quantity, persisted). Checkout is **not** wired to a payment
processor — the cart drawer ends at a disabled checkout affordance.

## Voice

Copy follows the register of the established niche houses (Byredo, Le Labo, Amouage), not
the artisan/maker register:

- **Lead with an idea, a feeling, or a scene** — never with process. "The hour after midnight,
  and no intention of leaving," not "macerated for six weeks."
- Describe the **wear** as a narrative with tension and resolution: how it opens, what the
  heart does, where it ends.
- Manufacturing detail (maceration times, batch counts, sourcing ethics, concentration
  percentages) reads as a small craft brand and is kept **out of prose entirely**.
- Hard metadata lives in the "Good to know" spec block — family, profile, intensity, sillage,
  longevity, perfumer, year — never in the description.

## Constraints

- Next.js App Router, TypeScript, Tailwind.
- Photography is placeholder Unsplash imagery pending real product shots. Some stock bottles
  carry other brands' marks and must all be replaced before launch.

## Assumptions (inferred, not supplied — replace before launch)

These are labelled because the user has not supplied real business truth:

- **Fragrance names, note pyramids, perfumer credits, and prices are invented placeholders.**
  Six fragrances at $185–$340. Replace wholesale in `src/lib/fragrances.ts`.
- **Currency is USD**, set once in `src/lib/fragrances.ts` as `CURRENCY`.
- **Stockist list and contact details are fictional.**
- No real inventory, SKU, or shipping logic exists.

---
version: 2
name: The-Perfume-Closet
description: A warm, light luxury interface built on the house brand sheet — Closet Ivory ground, Soft Cream alternates, Signature Black bands, and Closet Gold used only as an edge. One high-contrast garamond does all three type jobs, separated by weight, case and tracking. Contained imagery sits in a circular frame.

colors:
  primary: "#b58a4a"
  ivory: "#f8f5ef"
  cream: "#efe8dc"
  signature: "#0a0a0a"
  charcoal: "#292725"
  gold: "#b58a4a"
  gold-soft: "#d5b77a"
  gold-ink: "#8a6a34"
  canvas: "#f8f5ef"
  surface-soft: "#efe8dc"
  surface-card: "#efe8dc"
  surface-elevated: "#e6ddcc"
  ink: "#0a0a0a"
  body: "#292725"
  body-strong: "#171614"
  muted: "#57514a"
  muted-soft: "#6f685f"
  hairline: "#e2dacb"
  hairline-strong: "#c9bea8"
  warning: "#8f3a2e"
  success: "#4f6b45"

rounded:
  none: 0px
  pill: 9999px
  circle: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 40px
  xxl: 64px
  section: 120px
---

## Overview

The system is the brand sheet: Closet Ivory as the ground, Soft Cream for alternate bands,
Signature Black reserved for the hero, the closing calls and the footer, and Closet Gold used
sparingly — as a line, an edge, a mark, a hover fill. Never as a slab of colour.

The whitespace and the photography carry the page. There are no shadows, no gradients used as
decoration, and no second accent colour.

## Two grounds, one token set

Every component is written against semantic tokens (`canvas`, `ink`, `body`, `hairline`,
`gold`, …) and never against a literal. The light ground is the default. A band that should be
Signature Black gets the **`.on-black`** class, which re-points every one of those tokens for
its subtree — including swapping Closet Gold for Champagne Gold, which is the cast of gold that
holds against black.

```html
<section class="on-black bg-canvas"> … </section>
```

That is the whole mechanism. Nothing inside the band needs to know which ground it is on.

The three brand literals — `ivory`, `cream`, `signature` — never flip. They exist for the cases
where a value must survive the ground change, such as a button label that sits on a gold fill.

Role classes live in `@layer components` so that any Tailwind utility beats them. Do not move
them out of the layer: unlayered, `.t-display`'s own colour would silently outrank every
`text-*` utility placed beside it.

## Gold, and where it may go

Closet Gold `#b58a4a` fails contrast as running text on ivory (2.9:1). The palette therefore
splits into three tokens, and the split is not optional:

| Token | Value on ivory | Use |
|---|---|---|
| `gold` | `#b58a4a` | Rules, borders, icons, button edges, hover fills, the pillar dots |
| `gold-ink` | `#8a6a34` | Gold used as **text** — eyebrows, active nav, links (4.6:1) |
| `gold-soft` | `#d5b77a` | Highlights and the pressed state |

On `.on-black` all three re-point to Champagne Gold, which clears 10:1 on Signature Black.

**Never set body copy in gold.** Never fill a shape with gold and put ivory on it — a gold fill
always takes a `signature` label.

## The type voice

One family — Cormorant Garamond, the high-contrast garamond the brand sheet's own logotype is
set in — doing three jobs. The split is by weight, case and tracking, exactly as the sheet does
it. Nothing on this site is bolder than 600.

| Role | Cut | Use |
|---|---|---|
| **Display** (`.t-display`) | 600, +0.005em | Headings and fragrance names. **Title Case**. |
| **Label** (`.t-label`) | 600, UPPERCASE, 0.22em | Nav, buttons, eyebrows, captions, prices, spec keys. |
| **Body** (`.t-body`) | 400, 1.65 line-height | Running copy only. Sentence case, no tracking. |
| **Wordmark** (`.t-wordmark`) | 600, UPPERCASE, 0.3em | THE PERFUME CLOSET. The only tracking past 0.22em. |
| **Tagline** (`.t-tagline`) | 400 italic, gold-ink | "…elegance in every bottle". The house's one italic. |

Garamond caps sit small: **no label below 10px, and 11px is the working size.** Body copy runs
17–18px, a step up from where a sans would sit, because this face is delicate.

### Scale

| Token | Size | Use |
|---|---|---|
| display-xl | 82px (42px mobile) | Hero h1 |
| display-lg | 56px | Page h1 |
| display-md | 46px | Section heads |
| display-sm | 22–24px | Card titles, spec values |
| wordmark | 15px header / 17px footer | The mark |
| label | 11px (10px minimum) | Every metadata role |
| body | 17–18px | Running copy |
| button | 12px | Button labels |

## Layout

Base unit 4px. **120px between major bands** (80px mobile) — the whitespace is the brand and
must not be compressed to fit content. Max content width 1280px; photo bands bleed full-width.
Body measure caps at 68ch.

Bands alternate ivory → cream → black rather than running flat. A page closes on Signature
Black, which then runs into the black footer; the closing band's photograph fades into it so
the two read as one close rather than two stacked slabs.

## Depth

No shadows, no glassmorphism, no decorative gradients. Depth comes from photography, from the
ivory/cream step, and from 1px `hairline` rules. The only gradients in the system are the two
legibility scrims over the hero and closing photography.

## Shape

Three shapes, and only three. No 4px, no 8px, no 12px — intermediate radii read as consumer
tech rather than couture.

- **0px** — the default. Full-bleed bands, dividers, inputs, spec cells.
- **pill** (`9999px`) — buttons only.
- **`.frame-circle`** — the house frame for *contained* imagery: fragrance cards, the product
  gallery and its thumbnails, cart line thumbnails, the contained editorial portrait. The class
  carries `aspect-ratio: 1/1` with it, because a 50% radius on a portrait box gives back an
  ellipse rather than a circle. Never override that ratio.

The circle never applies to full-bleed imagery — the hero, the about banner and the closing band
stay rectangular and edge-to-edge. A circle that touches the viewport edge stops reading as a
frame.

Inside a circular frame, an edge-anchored indicator is clipped. Use an `outline` ring, which
follows the curve.

## Components

- **button/primary** — transparent, 1px `gold` edge, `ink` label, pill, 48px tall, label role.
  Hover fills with gold and the label turns `signature`. This is the house button.
- **button/solid** — Signature Black fill, ivory label; hover goes to a gold fill with a
  `signature` label. Reserved for the single most consequential action in a view (Add to bag,
  Proceed to checkout, Send).
- **button/quiet** — `hairline-strong` edge, `body` label. For the second of two buttons.
- **text-input** — transparent, no border except a 1px `hairline-strong` underline. Focus turns
  the underline gold.
- **nav** — 72px. Transparent and `.on-black` while it overlays the home hero; ivory with a
  hairline everywhere else and once scrolled. Wordmark centred at every breakpoint, with the
  house rule beneath it.
- **fragrance-card** — circular photo, name in display, a gold rule, then notes and metadata in
  the label role. No card surface, no border, no shadow. Hover draws a gold outline ring.
- **rule-gold** (`.rule-gold`) — a 40px gold hairline. The one decorative device, lifted from
  the brand sheet, where it sits under a label. **Once per band**, never twice.

## Do's and Don'ts

**Do** anchor every page with photography · alternate ivory, cream and black bands · open a band
with a gold eyebrow and one rule · set display in Title Case · keep gold to edges, rules and
marks · use `gold-ink` whenever gold is text · hold the 120px section rhythm · theme the browser
surfaces (selection, caret, scrollbar, focus ring) from the palette.

**Don't** introduce any colour outside the six-swatch palette · set body copy in gold · put an
ivory label on a gold fill · use a second gold rule in one band · wide-track a heading · bold
anything past 600 · compress section whitespace · round anything except buttons and the circular
frame · put a circular frame on full-bleed imagery · use emoji or unicode glyphs as icons.

## The opening

A Signature Black panel carrying the house lockup — wordmark, gold rule, tagline — played on
every page load and lasting 2.45s. It is **entirely CSS**: it animates out to
`visibility: hidden` on `forwards` and stays there, which makes it inert with no script, no
state and no client component, and clears it even with JavaScript disabled. Reduced motion
skips it outright.

Client-side navigation between pages does not replay it — the root layout persists, so it only
runs on a hard load or refresh.

Do not add a scroll lock to it: `overflow: hidden` on `<html>` drops the scrollbar for the
duration and the page jumps sideways by the scrollbar's width at the exact moment of reveal.

## Motion

One authored moment: photography and headlines rise and un-blur into place on scroll with an
exponential ease-out, from an already-visible default so a failed observer never hides content.
Never an identical entrance on every section, and never motion that blocks reading. All motion
respects `prefers-reduced-motion`.

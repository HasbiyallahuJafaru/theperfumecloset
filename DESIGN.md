---
version: 1
name: The-Perfume-Closet
description: An austere luxury interface on pure black, carrying white uppercase letterspaced display type and full-bleed fragrance photography as the only visual voltage. No accent colour, no gradients, no shadows, no decorative chrome. Adapted from the Bugatti design language (voltagent/awesome-design-md) for a niche perfume house.

colors:
  primary: "#ffffff"
  ink: "#ffffff"
  body: "#cccccc"
  body-strong: "#e6e6e6"
  muted: "#999999"
  muted-soft: "#666666"
  hairline: "#262626"
  hairline-strong: "#3a3a3a"
  canvas: "#000000"
  surface-soft: "#0d0d0d"
  surface-card: "#141414"
  surface-elevated: "#1f1f1f"
  on-primary: "#000000"
  on-dark: "#ffffff"
  link: "#c3d9f3"
  warning: "#d4a017"
  success: "#5fa657"

rounded:
  none: 0px
  pill: 9999px

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

Pure black canvas holding white uppercase display type and full-bleed photography. The empty
space, the photograph, and the precisely-tracked headline *are* the brand. There is no accent
colour, no shadow, no gradient, no card decoration. This system has no light mode.

## The type trinity

Three families, functionally split, split is absolute:

| Role | Face | Use |
|---|---|---|
| **Display** | Bodoni Moda (400) | All headlines, the wordmark, fragrance names. UPPERCASE, wide-tracked. |
| **Text** | Cormorant Garamond (400) | Running body copy only. Sentence case, no tracking. |
| **Mono** | JetBrains Mono (400) | Buttons, nav, captions, prices, metadata. UPPERCASE, 2–2.5px tracking. |

Never a display face in a button. Never mono in a paragraph. Never the serif in a control.

The source Bugatti system uses three licensed faces unavailable publicly; its own substitution
note states that **preserving the three-family split matters more than matching the exact
typeface**. Bodoni Moda replaces the suggested Saira Condensed: a high-contrast Didone is the
established display voice of fashion and fragrance houses, and its hairline/stem contrast reads
as couture against pure black in a way a geometric sans cannot. It holds the same uppercase,
wide-tracked, weight-400 discipline the system requires.

Bodoni is a display face. Below ~15px its hairlines thin out, so small labels, metadata and
button text stay in the mono role rather than being set in the display face.

### Scale

| Token | Size | Tracking | Use |
|---|---|---|---|
| display-xl | 64px (32px mobile) | 4px | Hero h1 |
| display-lg | 48px | 3px | Section heads |
| display-md | 32px | 2px | Fragrance names, sub-heads |
| display-sm | 24px | 1.5px | Card titles |
| wordmark | 14px | 6px | THE PERFUME CLOSET — widest tracking in the system |
| title-md | 20px | 1px | Row titles, leads |
| caption | 11px | 2px | Captions, metadata, notes — mono |
| body-md | 16px | 0 | Body — serif |
| button | 14px | 2.5px | Button labels — mono |
| nav-link | 12px | 2px | Nav items — mono |

**Weight is always 400.** The system has no bold role. Emphasis comes from size, tracking,
case, and family contrast — never weight. Bolding anything breaks the voice.

## Layout

Base unit 4px. **120px between major bands** (80px mobile) — the whitespace is part of the
brand and must not be compressed to fit content. Max content width 1280px; photo bands bleed
full-width with no max. Body measure caps at 68ch.

## Depth

No shadows. No glassmorphism. No gradients used as decoration. Depth comes from photography
and from the narrow gap between `canvas` (#000) and `surface-card` (#141414). Dividers are 1px
`hairline` (#262626).

## Shape

Three shapes, and only three. No 4px, no 8px, no 12px — intermediate radii read as
consumer-tech rather than couture.

- **0px** — the default. Full-bleed bands, dividers, inputs, spec cells.
- **pill** (`9999px`) — buttons only.
- **`.frame-oval`** (`border-radius: 50% / 38%`) — the house frame for *contained* product and
  editorial imagery: fragrance cards, the product gallery and its thumbnails, cart line
  thumbnails, the contained editorial portrait. A vertical oval — the horizontal radius is the
  full half-width so the sides bow completely, while the vertical radius stays under half-height
  so the top and bottom keep some body instead of closing into a true ellipse.

The oval never applies to full-bleed imagery — the hero, the about banner and the CTA band stay
rectangular and edge-to-edge. An oval that touches the viewport edge stops reading as a frame.

Inside an oval frame, an edge-anchored indicator (an underline, a bottom bar) is clipped to a
sliver. Use a `outline` ring, which follows the curve.

## Components

- **button-primary** — transparent fill, 1px white outline, pill, 44px tall, mono uppercase
  2.5px tracking. The transparent pill IS the brand button. Never fill it.
- **text-input** — transparent, no border except a 1px `hairline-strong` underline. Focus
  thickens the underline to white.
- **nav** — transparent, 56px, overlaid on the hero. Wordmark centred at every breakpoint.
- **fragrance-card** — photo on black at 0px radius, name in display-md, notes line in mono
  caption, price in mono. No card surface, no border, no shadow.
- **text-link** — `link` (#c3d9f3), underlined. The only non-monochrome colour in the system.

## Do's and Don'ts

**Do** anchor every page with full-bleed photography · keep display UPPERCASE at 2–4px tracking ·
keep buttons transparent · stay at weight 400 · hold the 120px section rhythm · theme the browser
surfaces (selection, caret, scrollbar, focus ring) from the palette.

**Don't** introduce any accent colour beyond `link` · bold anything · fill a primary button ·
compress section whitespace · round anything except buttons · tighten display tracking · blur
the type trinity · add an eyebrow above a heading · use emoji or unicode glyphs as icons.

## Motion

One authored moment: photography and headlines rise into place on scroll with an exponential
ease-out from an already-visible default. Never an identical entrance on every section, and
never motion that blocks reading. All motion respects `prefers-reduced-motion`.

// Placeholder content — see PRODUCT.md. Names, notes, prices and photography
// are illustrative and must be replaced with real business truth before launch.

export const CURRENCY = "USD";
export const CURRENCY_SYMBOL = "$";

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export type Family = "Woods" | "Florals" | "Amber" | "Leather" | "Citrus";
export type Intensity = "Light" | "Medium" | "Strong";

export type Fragrance = {
  slug: string;
  name: string;
  tagline: string;
  family: Family;
  concentration: string;
  intensity: Intensity;
  sillage: string;
  longevity: string;
  perfumer: string;
  year: number;
  price: number;
  sizeMl: number;
  description: string;
  notes: { top: string[]; heart: string[]; base: string[] };
  images: string[];
};

export const fragrances: Fragrance[] = [
  {
    slug: "noir-absolu",
    name: "Noir Absolu",
    tagline: "The hour after midnight, and no intention of leaving",
    family: "Woods",
    concentration: "Extrait de Parfum",
    intensity: "Strong",
    sillage: "Close",
    longevity: "12+ hours",
    perfumer: "Camille Aurand",
    year: 2023,
    price: 340,
    sizeMl: 50,
    description:
      "A study in darkness worn close. It opens without warning — black pepper, a flare of resin — before oud and incense settle into something slower: the air of a room where the candles have burned down and nobody has moved to light more. Leather and labdanum hold through the night. It does not announce itself across a room. It waits until someone is near enough to ask.",
    notes: {
      top: ["Black pepper", "Elemi"],
      heart: ["Oud", "Incense", "Dried rose"],
      base: ["Leather", "Labdanum", "Vetiver root"],
    },
    images: [
      img("photo-1643797517590-c44cb552ddcc"),
      img("photo-1657238672378-ae37f696b0ee"),
    ],
  },
  {
    slug: "rose-sauvage",
    name: "Rose Sauvage",
    tagline: "A rose with the dirt still on it",
    family: "Florals",
    concentration: "Extrait de Parfum",
    intensity: "Medium",
    sillage: "Moderate",
    longevity: "8–10 hours",
    perfumer: "Camille Aurand",
    year: 2021,
    price: 265,
    sizeMl: 50,
    description:
      "This refuses the version of rose that behaves. Pink pepper and blackcurrant bud tear the opening wide; Turkish rose floods the heart at a concentration bordering on indecent. Then it descends — patchouli, oakmoss, the cool of turned earth — until what began as a flower ends as the ground it grew in. Romantic, but never sentimental.",
    notes: {
      top: ["Pink pepper", "Blackcurrant bud"],
      heart: ["Turkish rose", "Geranium"],
      base: ["Patchouli", "Oakmoss", "Musk"],
    },
    images: [
      img("photo-1658751890679-ada5e8e53471"),
      img("photo-1520179737749-b7752f6f56fb"),
    ],
  },
  {
    slug: "ambre-nuit",
    name: "Ambre Nuit",
    tagline: "Warmth that arrives before you do",
    family: "Amber",
    concentration: "Extrait de Parfum",
    intensity: "Medium",
    sillage: "Close",
    longevity: "10–12 hours",
    perfumer: "Idris Fadel",
    year: 2022,
    price: 285,
    sizeMl: 50,
    description:
      "Amber at its most intimate. Labdanum and benzoin are built so densely they seem to hold their shape, lifted by tonka and a breath of vanilla — warm rather than sweet, nearer to skin than to sugar. It travels no further than an embrace, which is the entire intention. Worn on wool in winter, it is still there when the coat comes out again.",
    notes: {
      top: ["Bergamot", "Cardamom"],
      heart: ["Labdanum", "Benzoin", "Tonka bean"],
      base: ["Vanilla", "Sandalwood", "Ambergris"],
    },
    images: [
      img("photo-1608828201317-ce72715cb12a"),
      img("photo-1623672482674-a525831dc7a8"),
    ],
  },
  {
    slug: "cuir-blanc",
    name: "Cuir Blanc",
    tagline: "Leather with the shadow removed",
    family: "Leather",
    concentration: "Extrait de Parfum",
    intensity: "Medium",
    sillage: "Moderate",
    longevity: "8–10 hours",
    perfumer: "Idris Fadel",
    year: 2024,
    price: 310,
    sizeMl: 50,
    description:
      "Most leathers are written in brown. This one is written in white — suede rendered through orris, aldehydes and clean musk, the animal register deliberately withheld. What remains is texture: powdery, cool, faintly metallic. The feeling of a glove that has never been worn outdoors. Restraint at its most deliberate.",
    notes: {
      top: ["Aldehydes", "Violet leaf"],
      heart: ["Orris", "Suede", "Jasmine"],
      base: ["White musk", "Cashmere wood", "Ambrette"],
    },
    images: [
      img("photo-1643797519086-cc9a821fbcfe"),
      img("photo-1675830028194-02f405ff664b"),
    ],
  },
  {
    slug: "vetiver-fume",
    name: "Vétiver Fumé",
    tagline: "Green, then grey",
    family: "Woods",
    concentration: "Eau de Parfum",
    intensity: "Medium",
    sillage: "Moderate",
    longevity: "8 hours",
    perfumer: "Camille Aurand",
    year: 2020,
    price: 240,
    sizeMl: 100,
    description:
      "It begins in the field and ends in the fire. Grapefruit peel and juniper cut a bright path in, but the vetiver beneath is already smouldering — cade pulling the green toward ash, cedar and guaiac closing over the top. The easiest thing the house makes to wear, and the one people come back for, usually having finished the first bottle sooner than they meant to.",
    notes: {
      top: ["Grapefruit peel", "Juniper"],
      heart: ["Vetiver", "Cade"],
      base: ["Cedarwood", "Birch tar", "Guaiac"],
    },
    images: [
      img("photo-1721116253122-6f9a9bf592b1"),
      img("photo-1668066826260-09b99bbd31fe"),
    ],
  },
  {
    slug: "neroli-sel",
    name: "Néroli Sel",
    tagline: "Orange blossom, carried in off the water",
    family: "Citrus",
    concentration: "Eau de Parfum",
    intensity: "Light",
    sillage: "Airy",
    longevity: "6 hours",
    perfumer: "Marta Silvestri",
    year: 2019,
    price: 185,
    sizeMl: 100,
    description:
      "Less a citrus than a climate. Neroli and orange blossom open bright and clean, then meet a mineral salt accord that pulls everything seaward — bitter bergamot, driftwood, air moving over warm stone. It behaves like weather rather than perfume: light, shifting, gone and back again within the hour. The first fragrance the house released, and still the one worn in August.",
    notes: {
      top: ["Bergamot", "Petitgrain"],
      heart: ["Neroli", "Orange blossom"],
      base: ["Salt", "Driftwood", "Clean musk"],
    },
    images: [
      img("photo-1638303322580-5e6aacd59c0d"),
      img("photo-1669051759318-e3f68b839d1d"),
    ],
  },
];

export const families: Family[] = ["Woods", "Florals", "Amber", "Leather", "Citrus"];

export const editorial = {
  hero: img("photo-1643797517714-a273548abc3c", 2400),
  still: img("photo-1647107047182-4404b0aa0dbe", 1800),
  cta: img("photo-1761998066478-821bf52c2849", 2400),
};

export function getFragrance(slug: string) {
  return fragrances.find((f) => f.slug === slug);
}

export function formatPrice(value: number) {
  return `${CURRENCY_SYMBOL}${value.toLocaleString("en-US")}`;
}

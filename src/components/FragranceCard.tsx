import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Fragrance } from "@/lib/fragrances";

export function FragranceCard({
  fragrance,
  priority = false,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: {
  fragrance: Fragrance;
  priority?: boolean;
  sizes?: string;
}) {
  const notes = [...fragrance.notes.heart, ...fragrance.notes.base].slice(0, 3);

  return (
    <Link href={`/fragrance/${fragrance.slug}`} className="group block">
      <div className="frame-oval relative aspect-[4/5] overflow-hidden bg-surface-card">
        <Image
          src={fragrance.images[0]}
          alt={`${fragrance.name} — ${fragrance.concentration}`}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-canvas/0 transition-colors duration-700 group-hover:bg-canvas/20"
        />
      </div>

      <div className="mt-6 flex items-baseline justify-between gap-4">
        <h3 className="t-display text-[19px] sm:text-[21px]">
          {fragrance.name}
        </h3>
        <span className="tabular shrink-0 font-mono text-[12px] tracking-[0.1em] text-body">
          {formatPrice(fragrance.price)}
        </span>
      </div>

      <p className="mt-2 font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-muted">
        {notes.join(" · ")}
      </p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-soft">
        {fragrance.concentration} · {fragrance.sizeMl}ml
      </p>
    </Link>
  );
}

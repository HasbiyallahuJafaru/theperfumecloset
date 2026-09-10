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
      {/* The gold ring is an outline rather than a border so it follows the
          oval instead of being clipped to a sliver at the edges. */}
      <div className="frame-circle relative overflow-hidden bg-surface-card outline-offset-[6px] outline-gold/0 transition-[outline-color] duration-700 group-hover:outline group-hover:outline-1 group-hover:outline-gold/60">
        <Image
          src={fragrance.images[0]}
          alt={`${fragrance.name} — ${fragrance.concentration}`}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
      </div>

      <div className="mt-7 flex items-baseline justify-between gap-4">
        <h3 className="t-display text-[22px] transition-colors duration-500 group-hover:text-gold-ink sm:text-[24px]">
          {fragrance.name}
        </h3>
        <span className="tabular t-label shrink-0 text-[12px] text-body">
          {formatPrice(fragrance.price)}
        </span>
      </div>

      <span aria-hidden className="rule-gold mt-4" />

      <p className="t-label mt-4 text-[11px] leading-[1.9] text-muted">
        {notes.join(" · ")}
      </p>
      <p className="t-label mt-1.5 text-[11px] text-muted-soft">
        {fragrance.concentration} · {fragrance.sizeMl}ml
      </p>
    </Link>
  );
}

import type { Metadata } from "next";
import { CollectionGrid } from "@/components/CollectionGrid";

export const metadata: Metadata = {
  title: "The Collection",
  description:
    "Six genderless extrait-strength compositions from The Perfume Closet.",
};

export default function CollectionPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-5 pb-24 pt-36 sm:px-8 sm:pb-[120px] sm:pt-48">
      <span className="t-label text-[11px] text-gold-ink">Six compositions</span>
      <span aria-hidden className="rule-gold mt-4" />
      <h1 className="t-display mt-6 max-w-[16ch] text-[38px] leading-[1.08] sm:text-[56px]">
        The Collection
      </h1>
      <p className="t-body mt-8 text-[17px] leading-[1.75] text-muted sm:text-[18px]">
        Six compositions, released one at a time since 2019. None of them is a lighter
        version of another, and none was made to fill a gap in a range. All genderless,
        all built to be worn into the evening.
      </p>

      <CollectionGrid />
    </div>
  );
}

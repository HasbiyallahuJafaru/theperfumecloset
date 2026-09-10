import type { Metadata } from "next";
import { CollectionGrid } from "@/components/CollectionGrid";

export const metadata: Metadata = {
  title: "The Collection",
  description:
    "Six extrait-strength compositions from The Perfume Closet, made in batches of three hundred.",
};

export default function CollectionPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-5 pb-24 pt-32 sm:px-8 sm:pb-[120px] sm:pt-44">
      <h1 className="t-display max-w-[16ch] text-[32px] leading-[1.12] tracking-[0.1em] sm:text-[48px]">
        The Collection
      </h1>
      <p className="t-body mt-8 text-[16px] leading-[1.75] text-muted sm:text-[17px]">
        Six compositions, released one at a time since 2019. None of them is a lighter
        version of another, and none was made to fill a gap in a range. All genderless,
        all built to be worn into the evening.
      </p>

      <CollectionGrid />
    </div>
  );
}

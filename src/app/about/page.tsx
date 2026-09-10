import type { Metadata } from "next";
import Image from "next/image";
import { editorial } from "@/lib/fragrances";
import { ButtonLink } from "@/components/Button";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "The House",
  description:
    "The Perfume Closet makes six genderless extraits, written to be worn rather than collected.",
};

const chapters = [
  {
    id: "point-of-view",
    heading: "A point of view",
    body: [
      "Most perfume is built to be liked immediately, by as many people as possible, in the four seconds it takes to walk past a counter. It is a reasonable commercial instinct and it produces fragrances that are almost impossible to remember.",
      "We are interested in the opposite: perfume that takes a moment to resolve, that reads differently at the second hour than the first, and that someone has to stand close to understand. If a composition is charming on the blotter and finished by lunchtime, it does not leave this house.",
    ],
  },
  {
    id: "the-six",
    heading: "The six",
    body: [
      "There are six fragrances and they do not overlap. One is dark and resinous, one is a rose that refuses to behave, one is amber worn at the distance of an embrace. None of them is a lighter version of another, and none was made to fill a gap in a range.",
      "They are all genderless, because the alternative has never made sense to us, and all built at a strength that assumes you want to be wearing it in the evening as well as the morning.",
    ],
  },
  {
    id: "closet",
    heading: "Why a closet",
    body: [
      "The name is literal. The house began in a converted linen closet — a bench, a set of scales, ninety amber bottles on a shelf, and a door that closed. The first two fragrances were written in that room.",
      "We kept the name because it describes the size we intend to remain. A closet holds a finite number of things. When it is full, something has to leave before anything else arrives.",
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-[1280px] px-5 pb-20 pt-36 sm:px-8 sm:pb-[120px] sm:pt-48">
        <span className="t-label text-[11px] text-gold-ink">The House</span>
        <span aria-hidden className="rule-gold mt-4" />
        <h1 className="t-display mt-6 max-w-[18ch] text-[38px] leading-[1.08] sm:text-[56px]">
          A house the size of a closet
        </h1>
        <p className="t-tagline mt-6 text-[19px]">…elegance in every bottle</p>
        <p className="t-body mt-8 text-[18px] leading-[1.75] text-body-strong sm:text-[19px]">
          Six fragrances. Never more than six. Everything below explains what that
          constraint buys, and what it costs us.
        </p>
      </section>

      <div className="relative h-[45vh] min-h-[320px] w-full overflow-hidden sm:h-[62vh]">
        <Image
          src={editorial.still}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {chapters.map((chapter, i) => (
        <div
          key={chapter.id}
          className={i % 2 === 1 ? "border-y border-hairline bg-surface-soft" : ""}
        >
          <section
            id={chapter.id}
            className="mx-auto max-w-[1280px] scroll-mt-28 px-5 py-20 sm:px-8 sm:py-[120px]"
          >
            <div className="grid gap-8 lg:grid-cols-[minmax(0,22ch)_1fr] lg:gap-20">
              <Reveal>
                <span className="tabular t-label text-[11px] text-gold-ink">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span aria-hidden className="rule-gold mt-4" />
                <h2 className="t-display mt-6 text-[30px] leading-[1.14] sm:text-[38px]">
                  {chapter.heading}
                </h2>
              </Reveal>

              <Reveal delay={120}>
                {chapter.body.map((paragraph, j) => (
                  <p
                    key={j}
                    className={`t-body text-[17px] leading-[1.8] sm:text-[18px] ${
                      j === 0 ? "text-body-strong" : "mt-6 text-muted"
                    }`}
                  >
                    {paragraph}
                  </p>
                ))}
              </Reveal>
            </div>
          </section>
        </div>
      ))}

      <section className="on-black bg-canvas">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center px-5 py-24 text-center sm:px-8 sm:py-[120px]">
          <Reveal className="flex flex-col items-center">
            <span className="t-label text-[11px] text-gold">The Collection</span>
            <span aria-hidden className="rule-gold mt-4" />
          </Reveal>
          <Reveal as="h2" className="t-display mt-6 max-w-[20ch] text-[30px] leading-[1.16] sm:text-[42px]">
            Six compositions. That is the whole house.
          </Reveal>
          <Reveal delay={140}>
            <div className="mt-10 flex justify-center">
              <ButtonLink href="/collection">See all six</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

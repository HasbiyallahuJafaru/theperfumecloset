import Image from "next/image";
import Link from "next/link";
import { editorial, fragrances } from "@/lib/fragrances";
import { ButtonLink } from "@/components/Button";
import { HeroMedia } from "@/components/HeroMedia";
import { FragranceCard } from "@/components/FragranceCard";
import { Reveal } from "@/components/Reveal";

const pillars = ["Fragrances", "Beauty", "Lifestyle", "Always Elegant"];

export default function HomePage() {
  const featured = fragrances.slice(0, 3);

  return (
    <>
      {/* Band 1 — Signature Black. Footage is the only thing on it. */}
      <section className="on-black relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-canvas">
        <div className="absolute inset-0">
          <HeroMedia poster={editorial.hero} />
          {/* Legibility scrim, not decoration. Weighted to the bottom so the
              footage stays readable while the band still closes into black. */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/35 to-canvas/20"
          />
          {/* A short pool behind the centred headline only, so the type keeps
              its contrast without dimming the whole frame. */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-1/2 h-[46%] -translate-y-1/2 bg-canvas/25 blur-3xl"
          />
        </div>

        <div className="relative mx-auto flex w-full max-w-[1280px] flex-col items-center px-5 py-32 text-center sm:px-8">
          <Reveal
            as="h1"
            className="t-display max-w-[18ch] text-[30px] leading-[1.16] sm:text-[42px] lg:text-[54px]"
          >
            Every entrance leaves an impression.
            <span className="block">We make sure yours lingers.</span>
          </Reveal>
          <Reveal delay={160} className="flex flex-col items-center">
            <span aria-hidden className="rule-gold mt-9 w-16" />
            <p className="t-tagline mt-6 text-[18px] text-gold sm:text-[20px]">
              …elegance in every bottle
            </p>
          </Reveal>
        </div>
      </section>

      {/* A hairline of brand, and a hard seam from the footage into the page. */}
      <div className="border-b border-hairline bg-surface-soft">
        <ul className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-x-6 gap-y-3 px-5 py-6 sm:px-8">
          {pillars.map((pillar, i) => (
            <li key={pillar} className="flex items-center gap-3 sm:gap-6">
              {i > 0 ? (
                <span aria-hidden className="hidden h-1 w-1 rounded-full bg-gold sm:block" />
              ) : null}
              <span className="t-label text-[11px] text-muted">{pillar}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Band 2 — Closet Ivory. The collection. */}
      <section className="mx-auto max-w-[1280px] px-5 py-24 sm:px-8 sm:py-[120px]">
        <Reveal className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="t-label text-[11px] text-gold-ink">The Collection</span>
            <span aria-hidden className="rule-gold mt-4" />
            <h2 className="t-display mt-6 max-w-[14ch] text-[32px] leading-[1.12] sm:text-[46px]">
              Three to begin with
            </h2>
          </div>
          <Link
            href="/collection"
            className="t-label shrink-0 text-[11px] text-gold-ink underline underline-offset-[6px] transition-colors duration-300 hover:text-ink"
          >
            All six
          </Link>
        </Reveal>

        <div className="mt-16 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((fragrance, i) => (
            <Reveal key={fragrance.slug} delay={i * 120}>
              <FragranceCard fragrance={fragrance} priority={i === 0} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Band 3 — Soft Cream. The point of view. */}
      <section className="border-y border-hairline bg-surface-soft">
        <div className="mx-auto grid max-w-[1280px] items-center gap-14 px-5 py-24 sm:px-8 sm:py-[120px] lg:grid-cols-2 lg:gap-20">
          <Reveal className="frame-circle relative mx-auto w-full max-w-[520px] overflow-hidden bg-surface-elevated">
            <Image
              src={editorial.still}
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </Reveal>

          <div>
            <Reveal>
              <span className="t-label text-[11px] text-gold-ink">The House</span>
              <span aria-hidden className="rule-gold mt-4" />
              <h2 className="t-display mt-6 text-[32px] leading-[1.12] sm:text-[46px]">
                Worn, not displayed
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <p className="t-body mt-8 text-[17px] leading-[1.75] text-body-strong sm:text-[18px]">
                A perfume is the last thing you put on and the first thing anyone notices.
                It should behave accordingly — close to the skin, slow to leave, difficult
                to place. Nothing here was built to be admired on a shelf.
              </p>
              <p className="t-body mt-5 text-[17px] leading-[1.75] text-muted sm:text-[18px]">
                Six compositions, each written to be lived in for a season and then missed.
                They are not versions of one another and they do not layer politely. Choose
                the one that sounds like you and wear it until people expect it.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <dl className="mt-12 grid grid-cols-2 gap-y-8 border-t border-gold/40 pt-10 sm:grid-cols-3">
                {[
                  { value: "Extrait", label: "Concentration" },
                  { value: "Genderless", label: "Every composition" },
                  { value: "2019", label: "First release" },
                ].map((spec) => (
                  <div key={spec.label}>
                    <dt className="t-display text-[22px]">{spec.value}</dt>
                    <dd className="t-label mt-2.5 text-[11px] leading-relaxed text-muted">
                      {spec.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Band 4 — Signature Black. The close. */}
      <section className="on-black relative overflow-hidden bg-canvas">
        <div className="absolute inset-0">
          <Image src={editorial.cta} alt="" fill sizes="100vw" className="object-cover" />
          <div aria-hidden className="absolute inset-0 bg-canvas/60" />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-canvas to-transparent"
          />
        </div>

        <div className="relative mx-auto flex max-w-[1280px] flex-col items-center px-5 py-28 text-center sm:px-8 sm:py-[120px]">
          <Reveal className="flex flex-col items-center">
            <span className="t-label text-[11px] text-gold">Discovery</span>
            <span aria-hidden className="rule-gold mt-4" />
          </Reveal>
          <Reveal
            as="h2"
            className="t-display mt-6 max-w-[18ch] text-[30px] leading-[1.14] sm:text-[42px]"
          >
            Wear it before you commit to it
          </Reveal>
          <Reveal delay={120}>
            <p className="t-body mx-auto mt-6 max-w-[52ch] text-[17px] leading-[1.75] text-body-strong">
              The discovery set carries all six at two millilitres each. Its cost comes off
              your first full bottle.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-11 flex justify-center">
              <ButtonLink href="/collection">Order the discovery set</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

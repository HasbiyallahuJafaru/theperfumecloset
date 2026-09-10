import Image from "next/image";
import Link from "next/link";
import { editorial, fragrances } from "@/lib/fragrances";
import { ButtonLink } from "@/components/Button";
import { HeroMedia } from "@/components/HeroMedia";
import { FragranceCard } from "@/components/FragranceCard";
import { Reveal } from "@/components/Reveal";

export default function HomePage() {
  const featured = fragrances.slice(0, 3);

  return (
    <>
      <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden">
        <div className="absolute inset-0">
          <HeroMedia poster={editorial.hero} />
          {/* Legibility scrim, not decoration. */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/55 to-canvas/45"
          />
        </div>

        <div className="relative mx-auto flex w-full max-w-[1280px] flex-col items-center px-5 py-28 text-center sm:px-8">
          <Reveal as="h1" className="t-display max-w-[13ch] text-[38px] leading-[1.06] tracking-[0.11em] sm:text-[58px] sm:tracking-[0.1em] lg:text-[72px]">
            Your closet smells like heaven
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 sm:py-[120px]">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="t-display max-w-[14ch] text-[28px] leading-[1.15] tracking-[0.1em] sm:text-[40px]">
            Three to begin with
          </h2>
          <Link
            href="/collection"
            className="shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] text-muted underline underline-offset-[6px] transition-colors duration-300 hover:text-ink"
          >
            All six
          </Link>
        </Reveal>

        <div className="mt-14 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((fragrance, i) => (
            <Reveal key={fragrance.slug} delay={i * 120}>
              <FragranceCard fragrance={fragrance} priority={i === 0} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-hairline">
        <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-5 py-20 sm:px-8 sm:py-[120px] lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative aspect-[4/5] overflow-hidden bg-surface-card lg:aspect-[3/4]">
            <Image
              src={editorial.still}
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </Reveal>

          <div>
            <Reveal as="h2" className="t-display text-[28px] leading-[1.15] tracking-[0.1em] sm:text-[40px]">
              Worn, not displayed
            </Reveal>

            <Reveal delay={120}>
              <p className="t-body mt-8 text-[16px] leading-[1.75] text-body-strong sm:text-[17px]">
                A perfume is the last thing you put on and the first thing anyone notices.
                It should behave accordingly — close to the skin, slow to leave, difficult
                to place. Nothing here was built to be admired on a shelf.
              </p>
              <p className="t-body mt-5 text-[16px] leading-[1.75] text-muted sm:text-[17px]">
                Six compositions, each written to be lived in for a season and then missed.
                They are not versions of one another and they do not layer politely. Choose
                the one that sounds like you and wear it until people expect it.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <dl className="mt-12 grid grid-cols-2 gap-y-8 border-t border-hairline pt-10 sm:grid-cols-3">
                {[
                  { value: "Extrait", label: "Concentration" },
                  { value: "Genderless", label: "Every composition" },
                  { value: "2019", label: "First release" },
                ].map((spec) => (
                  <div key={spec.label}>
                    <dt className="t-display text-[19px] tracking-[0.08em]">{spec.value}</dt>
                    <dd className="mt-2 font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-muted">
                      {spec.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={editorial.cta}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-50"
          />
          <div aria-hidden className="absolute inset-0 bg-canvas/60" />
        </div>

        <div className="relative mx-auto max-w-[1280px] px-5 py-24 text-center sm:px-8 sm:py-[120px]">
          <Reveal as="h2" className="t-display mx-auto max-w-[18ch] text-[26px] leading-[1.2] tracking-[0.1em] sm:text-[36px]">
            Wear it before you commit to it
          </Reveal>
          <Reveal delay={120}>
            <p className="t-body mx-auto mt-6 max-w-[52ch] text-[16px] leading-[1.75] text-body">
              The discovery set carries all six at two millilitres each. Its cost comes off
              your first full bottle.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-10 flex justify-center">
              <ButtonLink href="/collection">Order the discovery set</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

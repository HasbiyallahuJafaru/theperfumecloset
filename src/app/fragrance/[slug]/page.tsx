import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fragrances, formatPrice, getFragrance } from "@/lib/fragrances";
import { AddToCart } from "@/components/AddToCart";
import { ProductGallery } from "@/components/ProductGallery";
import { FragranceCard } from "@/components/FragranceCard";
import { Reveal } from "@/components/Reveal";

export function generateStaticParams() {
  return fragrances.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/fragrance/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const fragrance = getFragrance(slug);
  if (!fragrance) return { title: "Not found" };

  return {
    title: fragrance.name,
    description: fragrance.tagline,
    openGraph: {
      title: `${fragrance.name} — The Perfume Closet`,
      description: fragrance.tagline,
      images: [{ url: fragrance.images[0] }],
    },
  };
}

export default async function FragrancePage({ params }: PageProps<"/fragrance/[slug]">) {
  const { slug } = await params;
  const fragrance = getFragrance(slug);
  if (!fragrance) notFound();

  const related = fragrances.filter((f) => f.slug !== fragrance.slug).slice(0, 3);

  const pyramid = [
    { label: "Top", notes: fragrance.notes.top },
    { label: "Heart", notes: fragrance.notes.heart },
    { label: "Base", notes: fragrance.notes.base },
  ];

  const details = [
    { label: "Family", value: fragrance.family },
    { label: "Profile", value: "Genderless" },
    { label: "Intensity", value: fragrance.intensity },
    { label: "Sillage", value: fragrance.sillage },
    { label: "Longevity", value: fragrance.longevity },
    { label: "Perfumer", value: fragrance.perfumer },
    { label: "Released", value: String(fragrance.year) },
  ];

  return (
    <div className="mx-auto max-w-[1280px] px-5 pb-24 pt-28 sm:px-8 sm:pb-[120px] sm:pt-36">
      <nav aria-label="Breadcrumb" className="mb-10">
        <Link
          href="/collection"
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-soft transition-colors duration-300 hover:text-ink"
        >
          The Collection
        </Link>
      </nav>

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <ProductGallery images={fragrance.images} name={fragrance.name} />

        <div className="lg:pt-4">
          <h1 className="t-display text-[32px] leading-[1.12] tracking-[0.1em] sm:text-[42px]">
            {fragrance.name}
          </h1>
          <p className="t-body mt-4 text-[17px] italic leading-relaxed text-muted">
            {fragrance.tagline}
          </p>

          <div className="mt-8 flex items-baseline gap-4 border-y border-hairline py-5">
            <span className="tabular font-mono text-[16px] tracking-[0.1em] text-ink">
              {formatPrice(fragrance.price)}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-soft">
              {fragrance.sizeMl}ml · {fragrance.concentration}
            </span>
          </div>

          <p className="t-body mt-8 text-[16px] leading-[1.75] text-body-strong">
            {fragrance.description}
          </p>

          <AddToCart slug={fragrance.slug} name={fragrance.name} />

          <div className="mt-14 border-t border-hairline pt-10">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-soft">
              Composition
            </h2>
            <dl className="mt-6 space-y-5">
              {pyramid.map((tier) => (
                <div
                  key={tier.label}
                  className="grid grid-cols-[70px_1fr] items-baseline gap-4 border-b border-hairline pb-5 last:border-b-0"
                >
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    {tier.label}
                  </dt>
                  <dd className="t-body text-[15px] leading-relaxed text-body-strong">
                    {tier.notes.join(", ")}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-12 border-t border-hairline pt-10">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-soft">
              Good to know
            </h2>
            <dl className="mt-6 grid grid-cols-1 gap-x-10 sm:grid-cols-2">
              {details.map((d) => (
                <div
                  key={d.label}
                  className="flex items-baseline justify-between gap-4 border-b border-hairline py-3.5"
                >
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    {d.label}
                  </dt>
                  <dd className="t-body text-right text-[15px] text-body-strong">{d.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <section className="mt-24 border-t border-hairline pt-16 sm:mt-[120px]">
        <h2 className="t-display text-[24px] tracking-[0.1em] sm:text-[30px]">
          Also from the house
        </h2>
        <div className="mt-12 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((f, i) => (
            <Reveal key={f.slug} delay={i * 110}>
              <FragranceCard fragrance={f} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}

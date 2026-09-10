"use client";

import { useMemo, useState } from "react";
import { families, fragrances, type Family } from "@/lib/fragrances";
import { FragranceCard } from "@/components/FragranceCard";
import { Reveal } from "@/components/Reveal";

type Filter = Family | "All";

export function CollectionGrid() {
  const [filter, setFilter] = useState<Filter>("All");

  // Only offer a family that actually has something in it.
  const available = useMemo(
    () => families.filter((f) => fragrances.some((x) => x.family === f)),
    [],
  );

  const shown = useMemo(
    () => (filter === "All" ? fragrances : fragrances.filter((f) => f.family === filter)),
    [filter],
  );

  const options: Filter[] = ["All", ...available];

  return (
    <>
      <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-y border-hairline py-5">
        {options.map((option) => {
          const active = filter === option;
          const count =
            option === "All"
              ? fragrances.length
              : fragrances.filter((f) => f.family === option).length;

          return (
            <button
              key={option}
              type="button"
              onClick={() => setFilter(option)}
              aria-pressed={active}
              className={`font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                active ? "text-ink" : "text-muted-soft hover:text-body"
              }`}
            >
              {option}
              <span className="tabular ml-2 text-[9px] text-muted-soft">
                {String(count).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>

      <p role="status" aria-live="polite" className="sr-only">
        {shown.length} {shown.length === 1 ? "fragrance" : "fragrances"} shown
      </p>

      {shown.length === 0 ? (
        <div className="py-28 text-center">
          <p className="t-display text-[18px]">Nothing in this family yet</p>
          <p className="t-body mx-auto mt-4 max-w-[44ch] text-[15px] leading-relaxed text-muted">
            The house releases one composition a year. Ask to be told when the next arrives.
          </p>
          <button
            type="button"
            onClick={() => setFilter("All")}
            className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-ink underline underline-offset-[6px] transition-opacity duration-300 hover:opacity-60"
          >
            Show all six
          </button>
        </div>
      ) : (
        <div className="mt-16 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((fragrance, i) => (
            <Reveal key={fragrance.slug} delay={Math.min(i, 3) * 100}>
              <FragranceCard fragrance={fragrance} priority={i < 3} />
            </Reveal>
          ))}
        </div>
      )}
    </>
  );
}

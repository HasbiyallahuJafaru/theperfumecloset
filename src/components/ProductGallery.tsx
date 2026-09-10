"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="frame-oval relative aspect-[4/5] overflow-hidden bg-surface-card">
        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={i === 0 ? name : `${name}, alternate view`}
            fill
            priority={i === 0}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={`object-cover transition-opacity duration-700 ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {images.length > 1 ? (
        <div className="mt-4 flex gap-4">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1} of ${images.length}`}
              aria-pressed={i === active}
              className={`frame-oval relative h-24 w-[76px] overflow-hidden bg-surface-card outline-offset-4 transition-opacity duration-300 ${
                i === active
                  ? "opacity-100 outline outline-1 outline-ink"
                  : "opacity-45 hover:opacity-80"
              }`}
            >
              <Image src={src} alt="" fill sizes="76px" className="object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

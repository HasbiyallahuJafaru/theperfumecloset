"use client";

import { useEffect, useRef } from "react";

// The poster carries the first paint and is what reduced-motion viewers keep.
export function HeroMedia({ poster }: { poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (media.matches) {
        video.pause();
        video.removeAttribute("autoplay");
      } else {
        video.play().catch(() => {
          // Autoplay can be refused (battery saver, data saver). The poster stands in.
        });
      }
    };

    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  return (
    <video
      ref={ref}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay
      preload="metadata"
      aria-hidden
      tabIndex={-1}
      className="h-full w-full scale-[1.02] object-cover"
    >
      <source src="/video/hero.mp4" type="video/mp4" />
    </video>
  );
}

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const shared =
  "inline-flex h-11 items-center justify-center gap-3 rounded-full border px-8 " +
  "font-mono text-[13px] uppercase leading-none tracking-[0.18em] " +
  "transition-[background-color,color,border-color,opacity] duration-500 " +
  "focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4";

const tones = {
  light:
    "border-ink text-ink hover:bg-ink hover:text-canvas active:bg-body-strong active:text-canvas",
  muted:
    "border-hairline-strong text-body hover:border-ink hover:text-ink active:bg-ink active:text-canvas",
} as const;

type Tone = keyof typeof tones;

export function ButtonLink({
  children,
  tone = "light",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { tone?: Tone; children: ReactNode }) {
  return (
    <Link className={`${shared} ${tones[tone]} ${className}`} {...props}>
      {children}
    </Link>
  );
}

export function Button({
  children,
  tone = "light",
  className = "",
  ...props
}: ComponentProps<"button"> & { tone?: Tone; children: ReactNode }) {
  return (
    <button
      className={`${shared} ${tones[tone]} ${className} disabled:cursor-not-allowed disabled:border-hairline disabled:text-muted-soft disabled:hover:bg-transparent disabled:hover:text-muted-soft`}
      {...props}
    >
      {children}
    </button>
  );
}

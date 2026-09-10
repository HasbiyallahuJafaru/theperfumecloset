import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

// Gold is the button colour, used the way the brand sheet asks for it: as the
// edge and as the hover fill, never as a resting slab. Labels on a gold fill
// are always Signature Black — ivory on gold does not carry enough contrast.
const shared =
  "t-label inline-flex h-12 items-center justify-center gap-3 rounded-full border px-9 " +
  "text-[12px] transition-[background-color,color,border-color,opacity] duration-500 " +
  "focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4";

const tones = {
  // The house button: a gold hairline pill that fills on hover.
  primary:
    "border-gold text-ink hover:bg-gold hover:text-signature active:bg-gold-soft active:text-signature",
  // Reserved for the single most consequential action in a view.
  solid:
    "border-signature bg-signature text-ivory hover:border-gold hover:bg-gold hover:text-signature",
  // Secondary, when two buttons sit together and one must recede.
  quiet:
    "border-hairline-strong text-body hover:border-gold hover:text-ink active:bg-gold active:text-signature",
} as const;

type Tone = keyof typeof tones;

const disabled =
  "disabled:cursor-not-allowed disabled:border-hairline disabled:bg-transparent " +
  "disabled:text-muted-soft disabled:hover:bg-transparent disabled:hover:text-muted-soft " +
  "disabled:hover:border-hairline";

export function ButtonLink({
  children,
  tone = "primary",
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
  tone = "primary",
  className = "",
  ...props
}: ComponentProps<"button"> & { tone?: Tone; children: ReactNode }) {
  return (
    <button className={`${shared} ${tones[tone]} ${disabled} ${className}`} {...props}>
      {children}
    </button>
  );
}

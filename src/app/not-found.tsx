import { ButtonLink } from "@/components/Button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70svh] max-w-[1280px] flex-col items-center justify-center px-5 py-32 text-center sm:px-8">
      <p className="tabular t-label text-[11px] text-gold-ink">404</p>
      <h1 className="t-display mt-6 max-w-[20ch] text-[32px] leading-[1.14] sm:text-[44px]">
        This bottle is not in the closet
      </h1>
      <p className="t-body mx-auto mt-6 max-w-[46ch] text-[17px] leading-[1.75] text-muted">
        The page you asked for either moved or never existed. The collection is six
        compositions deep and all of them are one click away.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <ButtonLink href="/collection">View the collection</ButtonLink>
        <ButtonLink href="/" tone="quiet">
          Return home
        </ButtonLink>
      </div>
    </div>
  );
}

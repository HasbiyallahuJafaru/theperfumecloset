"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/fragrances";
import { Button } from "@/components/Button";
import { CloseIcon, MinusIcon, PlusIcon, SpinnerIcon } from "@/components/icons";

export function CartDrawer() {
  const { isOpen, close, lines, subtotal, count, setQuantity, remove, hydrated } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);
  const [checkingOut, setCheckingOut] = useState(false);

  // Clears the pending-checkout notice so reopening never shows a stale message.
  const handleClose = useCallback(() => {
    setCheckingOut(false);
    close();
  }, [close]);

  // Close on Escape, trap focus inside the panel, and lock body scroll.
  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
        return;
      }
      if (e.key !== "Tab") return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables?.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLElement>("button")?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus();
    };
  }, [isOpen, handleClose]);

  return (
    <div
      className={`fixed inset-0 z-[60] ${isOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        tabIndex={isOpen ? 0 : -1}
        onClick={handleClose}
        aria-label="Close bag"
        className={`absolute inset-0 h-full w-full cursor-default bg-signature/50 backdrop-blur-[2px] transition-opacity duration-700 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Your bag"
        className={`absolute inset-y-0 right-0 flex w-full max-w-[440px] flex-col border-l border-hairline bg-canvas transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-hairline px-6">
          <span className="t-label text-[11px] text-muted">
            Your bag
            {hydrated && count > 0 ? (
              <span className="tabular text-ink"> · {String(count).padStart(2, "0")}</span>
            ) : null}
          </span>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close bag"
            className="-mr-2 flex h-11 w-11 items-center justify-center text-ink transition-colors duration-300 hover:text-gold-ink"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        {!hydrated ? (
          <div className="flex flex-1 items-center justify-center">
            <SpinnerIcon className="h-6 w-6 animate-spin text-muted-soft" />
          </div>
        ) : lines.length === 0 ? (
          <EmptyBag onClose={handleClose} />
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-6">
              {lines.map(({ fragrance, quantity, lineTotal }) => (
                <li
                  key={fragrance.slug}
                  className="flex gap-5 border-b border-hairline py-6 last:border-b-0"
                >
                  <Link
                    href={`/fragrance/${fragrance.slug}`}
                    onClick={handleClose}
                    className="frame-circle relative w-[84px] shrink-0 overflow-hidden bg-surface-card"
                  >
                    <Image
                      src={fragrance.images[0]}
                      alt=""
                      fill
                      sizes="84px"
                      className="object-cover"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <Link
                      href={`/fragrance/${fragrance.slug}`}
                      onClick={handleClose}
                      className="t-display text-[15px] transition-opacity duration-300 hover:opacity-70"
                    >
                      {fragrance.name}
                    </Link>
                    <span className="mt-1 t-label text-[11px] text-muted">
                      {fragrance.concentration} · {fragrance.sizeMl}ml
                    </span>

                    <div className="mt-auto flex items-end justify-between pt-4">
                      <div className="flex items-center border border-hairline-strong">
                        <QtyButton
                          label={`Decrease quantity of ${fragrance.name}`}
                          onClick={() => setQuantity(fragrance.slug, quantity - 1)}
                        >
                          <MinusIcon className="h-3.5 w-3.5" />
                        </QtyButton>
                        <span className="tabular w-8 text-center t-label text-[12px] text-ink">
                          {quantity}
                        </span>
                        <QtyButton
                          label={`Increase quantity of ${fragrance.name}`}
                          onClick={() => setQuantity(fragrance.slug, quantity + 1)}
                          disabled={quantity >= 99}
                        >
                          <PlusIcon className="h-3.5 w-3.5" />
                        </QtyButton>
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        <span className="tabular t-label text-[12px] text-ink">
                          {formatPrice(lineTotal)}
                        </span>
                        <button
                          type="button"
                          onClick={() => remove(fragrance.slug)}
                          className="t-label text-[11px] text-muted-soft underline underline-offset-4 transition-colors duration-300 hover:text-warning"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="shrink-0 border-t border-hairline px-6 py-6">
              <div className="flex items-baseline justify-between">
                <span className="t-label text-[11px] text-muted">
                  Subtotal
                </span>
                <span className="tabular t-label text-[15px] text-ink">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="t-body mt-3 text-[13px] leading-relaxed text-muted-soft">
                Shipping and duties are calculated at checkout. Orders are dispatched
                within two working days.
              </p>

              <Button
                tone="solid"
                className="mt-6 w-full"
                disabled={checkingOut}
                onClick={() => setCheckingOut(true)}
              >
                {checkingOut ? (
                  <>
                    <SpinnerIcon className="h-4 w-4 animate-spin" />
                    Connecting
                  </>
                ) : (
                  "Proceed to checkout"
                )}
              </Button>

              {checkingOut ? (
                <p
                  role="status"
                  className="t-body mt-3 text-center text-[12px] leading-relaxed text-warning"
                >
                  Checkout is not connected to a payment provider yet. Your bag is saved.
                </p>
              ) : null}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function QtyButton({
  children,
  label,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center text-body transition-colors duration-300 hover:text-gold-ink disabled:cursor-not-allowed disabled:text-hairline-strong"
    >
      {children}
    </button>
  );
}

function EmptyBag({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-10 text-center">
      <span aria-hidden className="rule-gold w-12" />
      <p className="t-display mt-8 text-[22px]">Your bag is empty</p>
      <p className="t-body mt-4 text-[14px] leading-relaxed text-muted">
        Six compositions, none of them a version of another. Start with the discovery set
        if you have not worn the house before.
      </p>
      <Link
        href="/collection"
        onClick={onClose}
        className="t-label mt-8 text-[11px] text-gold-ink underline underline-offset-[6px] transition-colors duration-300 hover:text-ink"
      >
        View the collection
      </Link>
    </div>
  );
}

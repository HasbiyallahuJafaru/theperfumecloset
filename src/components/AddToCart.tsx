"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/Button";
import { MinusIcon, PlusIcon } from "@/components/icons";

export function AddToCart({ slug, name }: { slug: string; name: string }) {
  const { add, open } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  function onAdd() {
    add(slug, quantity);
    setAdded(true);
    open();
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 2600);
  }

  return (
    <div className="mt-10">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex h-11 items-center border border-hairline">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
            className="flex h-11 w-11 items-center justify-center text-body transition-colors duration-300 hover:text-ink disabled:cursor-not-allowed disabled:text-hairline-strong"
          >
            <MinusIcon className="h-3.5 w-3.5" />
          </button>
          <span
            aria-live="polite"
            aria-label={`Quantity: ${quantity}`}
            className="tabular w-9 text-center font-mono text-[13px] text-ink"
          >
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(99, q + 1))}
            disabled={quantity >= 99}
            aria-label="Increase quantity"
            className="flex h-11 w-11 items-center justify-center text-body transition-colors duration-300 hover:text-ink disabled:cursor-not-allowed disabled:text-hairline-strong"
          >
            <PlusIcon className="h-3.5 w-3.5" />
          </button>
        </div>

        <Button onClick={onAdd} className="flex-1 min-w-[220px]">
          Add to bag
        </Button>
      </div>

      <p role="status" aria-live="polite" className="mt-4 min-h-[1.1rem] font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
        {added ? `${name} added to your bag` : ""}
      </p>
    </div>
  );
}

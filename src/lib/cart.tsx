"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { fragrances, type Fragrance } from "@/lib/fragrances";

const STORAGE_KEY = "tpc.cart.v1";

export type CartLine = { slug: string; quantity: number };

type CartState = { lines: CartLine[]; hydrated: boolean };

type CartAction =
  | { type: "hydrate"; lines: CartLine[] }
  | { type: "add"; slug: string; quantity: number }
  | { type: "setQuantity"; slug: string; quantity: number }
  | { type: "remove"; slug: string }
  | { type: "clear" };

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "hydrate":
      return { lines: action.lines, hydrated: true };

    case "add": {
      const existing = state.lines.find((l) => l.slug === action.slug);
      const lines = existing
        ? state.lines.map((l) =>
            l.slug === action.slug
              ? { ...l, quantity: Math.min(l.quantity + action.quantity, 99) }
              : l,
          )
        : [...state.lines, { slug: action.slug, quantity: action.quantity }];
      return { ...state, lines };
    }

    case "setQuantity": {
      if (action.quantity < 1) {
        return { ...state, lines: state.lines.filter((l) => l.slug !== action.slug) };
      }
      return {
        ...state,
        lines: state.lines.map((l) =>
          l.slug === action.slug
            ? { ...l, quantity: Math.min(action.quantity, 99) }
            : l,
        ),
      };
    }

    case "remove":
      return { ...state, lines: state.lines.filter((l) => l.slug !== action.slug) };

    case "clear":
      return { ...state, lines: [] };
  }
}

export type ResolvedLine = { fragrance: Fragrance; quantity: number; lineTotal: number };

type CartValue = {
  lines: ResolvedLine[];
  count: number;
  subtotal: number;
  hydrated: boolean;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (slug: string, quantity?: number) => void;
  setQuantity: (slug: string, quantity: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartValue | null>(null);

function readStorage(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.flatMap((entry): CartLine[] => {
      if (typeof entry !== "object" || entry === null) return [];
      const { slug, quantity } = entry as Record<string, unknown>;
      if (typeof slug !== "string" || typeof quantity !== "number") return [];
      if (!fragrances.some((f) => f.slug === slug)) return [];
      const q = Math.floor(quantity);
      if (!Number.isFinite(q) || q < 1) return [];
      return [{ slug, quantity: Math.min(q, 99) }];
    });
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [], hydrated: false });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch({ type: "hydrate", lines: readStorage() });
  }, []);

  useEffect(() => {
    if (!state.hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lines));
    } catch {
      // Storage can be unavailable (private mode, blocked site data). The cart
      // still works for this session; it simply will not survive a reload.
    }
  }, [state.lines, state.hydrated]);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const add = useCallback((slug: string, quantity = 1) => {
    dispatch({ type: "add", slug, quantity });
  }, []);

  const setQuantity = useCallback((slug: string, quantity: number) => {
    dispatch({ type: "setQuantity", slug, quantity });
  }, []);

  const remove = useCallback((slug: string) => {
    dispatch({ type: "remove", slug });
  }, []);

  const clear = useCallback(() => dispatch({ type: "clear" }), []);

  const value = useMemo<CartValue>(() => {
    const resolved = state.lines.flatMap((line): ResolvedLine[] => {
      const fragrance = fragrances.find((f) => f.slug === line.slug);
      if (!fragrance) return [];
      return [
        {
          fragrance,
          quantity: line.quantity,
          lineTotal: fragrance.price * line.quantity,
        },
      ];
    });

    return {
      lines: resolved,
      count: resolved.reduce((sum, l) => sum + l.quantity, 0),
      subtotal: resolved.reduce((sum, l) => sum + l.lineTotal, 0),
      hydrated: state.hydrated,
      isOpen,
      open,
      close,
      add,
      setQuantity,
      remove,
      clear,
    };
  }, [state.lines, state.hydrated, isOpen, open, close, add, setQuantity, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

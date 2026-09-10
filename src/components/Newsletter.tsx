"use client";

import { useState } from "react";
import { ArrowRightIcon, SpinnerIcon } from "@/components/icons";

type Status = "idle" | "submitting" | "done" | "error";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim();

    if (!value) {
      setStatus("error");
      setMessage("Enter an email address so we know where to write.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setStatus("error");
      setMessage("That address is missing something — check for a typo.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    // No mailing-list provider is connected. Replace with a real subscribe call.
    await new Promise((r) => setTimeout(r, 700));

    setStatus("done");
    setMessage("You are on the list. We write rarely, and never sell your address.");
    setEmail("");
  }

  return (
    <div className="max-w-sm">
      <h2 className="t-display text-[20px]">Correspondence</h2>
      <p className="t-body mt-4 text-[14px] leading-relaxed text-muted">
        A new composition arrives roughly once a year. This list hears about it before
        anyone else, and hears from us rarely otherwise.
      </p>

      <form onSubmit={onSubmit} noValidate className="mt-6">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <div className="flex items-center gap-3 border-b border-hairline-strong transition-colors duration-300 focus-within:border-ink">
          <input
            id="newsletter-email"
            type="email"
            value={email}
            autoComplete="email"
            placeholder="your@email.com"
            aria-invalid={status === "error"}
            aria-describedby="newsletter-status"
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") {
                setStatus("idle");
                setMessage("");
              }
            }}
            className="t-body h-11 min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-muted-soft"
          />
          <button
            type="submit"
            disabled={status === "submitting"}
            aria-label="Subscribe"
            className="flex h-11 w-11 shrink-0 items-center justify-center text-ink transition-opacity duration-300 hover:opacity-60 disabled:opacity-40"
          >
            {status === "submitting" ? (
              <SpinnerIcon className="h-4 w-4 animate-spin" />
            ) : (
              <ArrowRightIcon className="h-4 w-4" />
            )}
          </button>
        </div>

        <p
          id="newsletter-status"
          role="status"
          aria-live="polite"
          className={`t-body mt-3 min-h-[1.25rem] text-[13px] leading-relaxed ${
            status === "error" ? "text-warning" : "text-muted-soft"
          }`}
        >
          {message}
        </p>
      </form>
    </div>
  );
}

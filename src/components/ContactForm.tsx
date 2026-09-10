"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { SpinnerIcon } from "@/components/icons";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const subjects = ["A fragrance", "An order", "Stockists", "Something else"] as const;

export function ContactForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: subjects[0] as string,
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function set(field: keyof typeof values, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field as keyof Errors]) {
      setErrors((e) => ({ ...e, [field]: undefined }));
    }
  }

  function validate(): Errors {
    const next: Errors = {};
    if (!values.name.trim()) next.name = "We need a name to reply to.";
    if (!values.email.trim()) {
      next.email = "We need an address to reply to.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
      next.email = "That address is missing something — check for a typo.";
    }
    if (values.message.trim().length < 10) {
      next.message = "Tell us a little more — ten characters at minimum.";
    }
    return next;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = document.getElementById(`contact-${Object.keys(found)[0]}`);
      first?.focus();
      return;
    }

    setStatus("sending");
    // No mail transport is connected. Replace with a real submit call.
    await new Promise((r) => setTimeout(r, 800));
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="border border-gold/40 bg-surface-soft p-12 text-center">
        <p className="t-display text-[26px]">Thank you</p>
        <p className="t-body mx-auto mt-4 max-w-[44ch] text-[15px] leading-relaxed text-muted">
          Your note has reached us. We answer everything ourselves, usually within two
          working days.
        </p>
        <button
          type="button"
          onClick={() => {
            setValues({ name: "", email: "", subject: subjects[0], message: "" });
            setStatus("idle");
          }}
          className="t-label mt-8 text-[11px] text-gold-ink underline underline-offset-[6px] transition-colors duration-300 hover:text-ink"
        >
          Write another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-10">
      <Field
        id="contact-name"
        label="Your name"
        value={values.name}
        onChange={(v) => set("name", v)}
        error={errors.name}
        autoComplete="name"
      />

      <Field
        id="contact-email"
        label="Email"
        type="email"
        value={values.email}
        onChange={(v) => set("email", v)}
        error={errors.email}
        autoComplete="email"
      />

      <fieldset>
        <legend className="t-label text-[11px] text-muted">
          Regarding
        </legend>
        <div className="mt-4 flex flex-wrap gap-x-7 gap-y-3">
          {subjects.map((s) => (
            <label key={s} className="flex cursor-pointer items-center gap-2.5">
              <input
                type="radio"
                name="subject"
                value={s}
                checked={values.subject === s}
                onChange={() => set("subject", s)}
                className="h-3.5 w-3.5 appearance-none rounded-full border border-hairline-strong transition-colors duration-200 checked:border-gold checked:bg-gold focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2"
              />
              <span
                className={`t-label text-[11px] transition-colors duration-200 ${
                  values.subject === s ? "text-gold-ink" : "text-muted"
                }`}
              >
                {s}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label
          htmlFor="contact-message"
          className="t-label text-[11px] text-muted"
        >
          Your note
        </label>
        <textarea
          id="contact-message"
          rows={5}
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={`t-body mt-3 block w-full max-w-none resize-y border-b bg-transparent py-3 text-[17px] text-ink outline-none transition-colors duration-300 placeholder:text-muted-soft focus:border-gold ${
            errors.message ? "border-warning" : "border-hairline-strong"
          }`}
        />
        {errors.message ? (
          <p id="contact-message-error" className="t-body mt-2 text-[13px] text-warning">
            {errors.message}
          </p>
        ) : null}
      </div>

      <Button type="submit" tone="solid" disabled={status === "sending"}>
        {status === "sending" ? (
          <>
            <SpinnerIcon className="h-4 w-4 animate-spin" />
            Sending
          </>
        ) : (
          "Send your note"
        )}
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="t-label text-[11px] text-muted"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`t-body mt-3 block h-12 w-full max-w-none border-b bg-transparent text-[17px] text-ink outline-none transition-colors duration-300 placeholder:text-muted-soft focus:border-gold ${
          error ? "border-warning" : "border-hairline-strong"
        }`}
      />
      {error ? (
        <p id={`${id}-error`} className="t-body mt-2 text-[13px] text-warning">
          {error}
        </p>
      ) : null}
    </div>
  );
}

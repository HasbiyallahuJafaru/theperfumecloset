import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Write to The Perfume Closet — enquiries, orders, stockists, and care for your perfume.",
};

const stockists = [
  { city: "London", name: "Bloom & Ash", detail: "12 Lamb's Conduit Street, WC1N" },
  { city: "Paris", name: "Maison Verre", detail: "8 Rue de Poitou, 75003" },
  { city: "New York", name: "The Standing Room", detail: "44 Crosby Street, NY 10012" },
  { city: "Lagos", name: "Ilé Studio", detail: "17b Awolowo Road, Ikoyi" },
];

const notes = [
  {
    id: "shipping",
    heading: "Shipping & returns",
    body: "Orders are dispatched within two working days. Unopened bottles may be returned within thirty days; opened bottles cannot be accepted, which is why the discovery set exists.",
  },
  {
    id: "care",
    heading: "Caring for your perfume",
    body: "Keep the bottle out of direct light and away from heat — a drawer is better than a shelf, and a bathroom is the worst place in the house. Stored properly, an extrait will hold for years rather than months.",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-5 pb-24 pt-36 sm:px-8 sm:pb-[120px] sm:pt-48">
      <span className="t-label text-[11px] text-gold-ink">Client Care</span>
      <span aria-hidden className="rule-gold mt-4" />
      <h1 className="t-display mt-6 max-w-[16ch] text-[38px] leading-[1.08] sm:text-[56px]">
        Write to us
      </h1>
      <p className="t-body mt-8 text-[17px] leading-[1.75] text-muted sm:text-[18px]">
        There is no call centre. Every note is read and answered by someone at the house,
        usually within two working days.
      </p>

      <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_minmax(0,380px)] lg:gap-24">
        <ContactForm />

        <aside className="space-y-14">
          <section id="stockists" className="scroll-mt-24">
            <h2 className="t-label text-[11px] text-gold-ink">Stockists</h2>
            <span aria-hidden className="rule-gold mt-4" />
            <ul className="mt-6">
              {stockists.map((s) => (
                <li key={s.name} className="border-b border-hairline py-5 last:border-b-0">
                  <p className="t-display text-[18px]">{s.name}</p>
                  <p className="t-body mt-1.5 text-[15px] text-muted">{s.detail}</p>
                  <p className="mt-1 t-label text-[11px] text-muted-soft">
                    {s.city}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {notes.map((note) => (
            <section key={note.id} id={note.id} className="scroll-mt-24">
              <h2 className="t-label text-[11px] text-gold-ink">{note.heading}</h2>
              <span aria-hidden className="rule-gold mt-4" />
              <p className="t-body mt-5 text-[16px] leading-[1.75] text-body">{note.body}</p>
            </section>
          ))}
        </aside>
      </div>
    </div>
  );
}

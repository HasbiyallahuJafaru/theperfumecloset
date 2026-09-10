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
    <div className="mx-auto max-w-[1280px] px-5 pb-24 pt-32 sm:px-8 sm:pb-[120px] sm:pt-44">
      <h1 className="t-display max-w-[16ch] text-[32px] leading-[1.12] tracking-[0.1em] sm:text-[48px]">
        Write to us
      </h1>
      <p className="t-body mt-8 text-[16px] leading-[1.75] text-muted sm:text-[17px]">
        There is no call centre. Every note is read and answered by someone at the house,
        usually within two working days.
      </p>

      <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_minmax(0,380px)] lg:gap-24">
        <ContactForm />

        <aside className="space-y-14">
          <section id="stockists" className="scroll-mt-24">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-soft">
              Stockists
            </h2>
            <ul className="mt-6">
              {stockists.map((s) => (
                <li key={s.name} className="border-b border-hairline py-5 last:border-b-0">
                  <p className="t-display text-[15px] tracking-[0.12em]">{s.name}</p>
                  <p className="t-body mt-1.5 text-[14px] text-muted">{s.detail}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-soft">
                    {s.city}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {notes.map((note) => (
            <section key={note.id} id={note.id} className="scroll-mt-24">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-soft">
                {note.heading}
              </h2>
              <p className="t-body mt-4 text-[15px] leading-[1.75] text-body">{note.body}</p>
            </section>
          ))}
        </aside>
      </div>
    </div>
  );
}

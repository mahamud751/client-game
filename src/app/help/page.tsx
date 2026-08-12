import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { site } from "@/data/catalog";

export const metadata = {
  title: "Help Center",
};

const faqs = [
  {
    id: "shipping",
    q: "When do I get free shipping?",
    a: `Orders of $${site.freeShippingMin}+ qualify for free standard shipping within the contiguous US (demo policy).`,
  },
  {
    id: "returns",
    q: "What is the return policy?",
    a: "Hassle-free 90-day returns on most items in original condition. Contact support to start a return.",
  },
  {
    id: "mint",
    q: "What is the Mint Condition Guarantee?",
    a: "We pack collectibles carefully so they arrive display-ready. If packaging is damaged in transit, we’ll make it right.",
  },
  {
    id: "risk-free",
    q: "How do pre-orders work?",
    a: "Reserve items with no deposit. Your card is only charged when the product is in stock and ready to ship.",
  },
  {
    id: "orders",
    q: "How do I track my order?",
    a: "Sign in to My Account (demo) or use the tracking link emailed at shipment.",
  },
];

export default function HelpPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: "Help Center" }]} />
      <PageHeader
        title="Help Center — FAQ"
        description="Answers about shipping, returns, pre-orders, and guarantees."
      />

      <div className="space-y-4">
        {faqs.map((f) => (
          <section
            key={f.id}
            id={f.id}
            className="scroll-mt-28 rounded-xl border border-border bg-card p-5 shadow-sm"
          >
            <h2 className="text-lg font-bold text-ink">{f.q}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{f.a}</p>
          </section>
        ))}
      </div>

      <div className="mt-10 rounded-xl bg-ink p-6 text-white">
        <h2 className="text-lg font-bold text-brand">Still need help?</h2>
        <ul className="mt-3 space-y-1 text-sm text-white/85">
          <li>
            Email:{" "}
            <a href={`mailto:${site.email}`} className="underline">
              {site.email}
            </a>
          </li>
          <li>
            Phone:{" "}
            <a href={`tel:${site.phone.replace(/-/g, "")}`} className="underline">
              {site.phone}
            </a>
          </li>
          <li>{site.hours.weekdays}</li>
          <li>{site.hours.friday}</li>
        </ul>
      </div>
    </div>
  );
}

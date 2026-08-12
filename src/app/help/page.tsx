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
    q: "What is the Hassle-Free 90-Day Return Policy?",
    a: "Hassle-free 90-day returns on most items in original condition. Contact support to start a return.",
  },
  {
    id: "mint",
    q: "What is the Mint Condition Guarantee™?",
    a: "We pack collectibles carefully so they arrive display-ready. If packaging is damaged in transit, we’ll make it right.",
  },
  {
    id: "risk-free",
    q: "How do pre-orders and risk-free shopping work?",
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
    <div className="mx-auto max-w-4xl px-3 py-6 sm:px-5">
      <Breadcrumbs items={[{ label: "Help Center" }]} />
      <PageHeader
        title="Help Center — FAQ"
        description="Answers about shipping, returns, pre-orders, and guarantees."
      />

      <div className="space-y-3">
        {faqs.map((f) => (
          <section key={f.id} id={f.id} className="scroll-mt-28 border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-[#183a5d]">{f.q}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{f.a}</p>
          </section>
        ))}
      </div>

      <div className="mt-10 bg-[#17212b] p-6 text-white">
        <h2 className="text-lg font-bold text-[#ffe000]">Still need help?</h2>
        <ul className="mt-3 space-y-1 text-sm text-white/85">
          <li>
            Email:{" "}
            <a href={`mailto:${site.email}`} className="underline">
              {site.email}
            </a>
          </li>
          <li>Live Chat: available from the Help Center during business hours (demo)</li>
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

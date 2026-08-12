import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { testimonials } from "@/data/catalog";

export const metadata = {
  title: "Testimonials",
};

export default function TestimonialsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: "Testimonials" }]} />
      <PageHeader
        title="Customer Testimonials"
        description="What collectors say about shopping with us."
      />
      <div className="space-y-4">
        {testimonials.map((t) => (
          <blockquote
            key={t.id}
            className="rounded-xl border border-border bg-card p-6 shadow-sm"
          >
            <p className="text-lg leading-relaxed text-ink">“{t.quote}”</p>
            <footer className="mt-3 text-sm font-semibold text-muted">
              — {t.author}
            </footer>
          </blockquote>
        ))}
      </div>
    </div>
  );
}

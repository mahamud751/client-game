import Link from "next/link";
import { testimonials } from "@/data/catalog";

export function TestimonialBlock() {
  const t = testimonials[0];
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6">
      <div className="text-4xl text-brand">“</div>
      <blockquote className="text-lg font-medium leading-relaxed text-ink sm:text-xl">
        {t.quote}
      </blockquote>
      <p className="mt-3 text-sm font-semibold text-muted">— {t.author}</p>
      <Link
        href="/testimonials"
        className="mt-4 inline-block text-sm font-semibold text-accent hover:underline"
      >
        Read More Testimonials
      </Link>
    </section>
  );
}

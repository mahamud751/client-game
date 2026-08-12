import Link from "next/link";
import { testimonials } from "@/data/catalog";

export function TestimonialBlock() {
  const t = testimonials[0];
  return (
    <section className="border-y border-[#cfd3d6] bg-[#d8d8d8] px-4 py-4 text-center">
      <blockquote className="mx-auto max-w-[620px] text-xs font-medium leading-tight text-[#58616a]">
        {t.quote}
      </blockquote>
      <p className="mt-2 text-[10px] font-semibold text-muted">— {t.author}</p>
      <Link
        href="/testimonials"
        className="mt-2 inline-block text-[9px] font-bold text-accent hover:underline"
      >
        Read More Testimonials
      </Link>
    </section>
  );
}

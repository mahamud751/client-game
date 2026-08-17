import Link from "next/link";
import { testimonials } from "@/data/catalog";

export function TestimonialBlock() {
  const t = testimonials[0];
  return (
    <section className="bg-[#d9d9d9] px-4 py-[10px] text-center">
      <blockquote className="mx-auto max-w-[900px] px-[10px] text-[20px] font-normal leading-[28px] text-[#58616a]">
        {t.quote}
      </blockquote>
      <Link
        href="/testimonials"
        className="mt-3 inline-block text-[14px] text-[#58616a] underline"
      >
        Read More Testimonials
      </Link>
    </section>
  );
}

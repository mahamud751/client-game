"use client";

import { useRef } from "react";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";

export function ProductCarousel({
  title,
  products,
  viewAllHref,
}: {
  title: string;
  products: Product[];
  viewAllHref: string;
}) {
  const scroller = useRef<HTMLDivElement>(null);

  const scroll = (dir: -1 | 1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="container-ee py-6">
      <div className="mb-3 flex items-center justify-between gap-4">
        <h2 className="text-[22px] font-bold text-[#1b2937] sm:text-[26px]">
          {title}
        </h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Scroll left"
            className="hidden h-8 w-8 items-center justify-center text-[#9aa3ab] hover:text-[#075aaa] sm:flex"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M15 5 8 12l7 7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Scroll right"
            className="hidden h-8 w-8 items-center justify-center text-[#9aa3ab] hover:text-[#075aaa] sm:flex"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m9 5 7 7-7 7" />
            </svg>
          </button>
          <Link
            href={viewAllHref}
            className="text-sm font-semibold text-[#075aaa] hover:underline"
          >
            View All {title}
          </Link>
        </div>
      </div>
      <div
        ref={scroller}
        className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2"
      >
        {products.map((p) => (
          <div
            key={p.id}
            className="w-[47%] shrink-0 snap-start sm:w-[30%] md:w-[22%] lg:w-[18.5%]"
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}

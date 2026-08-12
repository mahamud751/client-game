"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { Banner } from "@/lib/types";

export function HeroCarousel({ banners }: { banners: Banner[] }) {
  const rail = useRef<HTMLDivElement>(null);
  const move = (direction: -1 | 1) => rail.current?.scrollBy({ left: direction * Math.max(300, window.innerWidth * 0.3), behavior: "smooth" });

  return (
    <section className="relative border-b border-slate-200 bg-white" aria-label="Featured promotions">
      <div ref={rail} className="no-scrollbar flex snap-x snap-mandatory gap-[3px] overflow-x-auto py-[3px]">
        {banners.map((banner, index) => (
          <Link key={banner.id} href={banner.href} className="group relative h-[300px] w-[78vw] max-w-[390px] shrink-0 snap-start overflow-hidden bg-[#111] sm:h-[350px] sm:w-[38vw] lg:h-[390px] lg:w-[29.5vw]">
            <Image src={banner.image} alt={banner.title} fill priority={index < 3} sizes="(max-width: 640px) 78vw, (max-width: 1024px) 38vw, 30vw" className="object-cover transition duration-500 group-hover:scale-[1.025]" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-5 pb-5 text-center text-white">
              <h2 className="max-w-[320px] text-[22px] font-black uppercase leading-[.95] drop-shadow-md sm:text-[26px]">{banner.title}</h2>
              <span className="mt-3 inline-flex min-w-[140px] justify-center bg-black px-6 py-2.5 text-[11px] font-black uppercase tracking-[.14em] group-hover:bg-white group-hover:text-black">{banner.cta}</span>
            </div>
          </Link>
        ))}
      </div>
      <button type="button" onClick={() => move(-1)} aria-label="Previous promotions" className="absolute left-2 top-1/2 z-10 grid h-11 w-8 -translate-y-1/2 place-items-center rounded-r-full bg-white/95 text-2xl text-[#29425b] shadow">‹</button>
      <button type="button" onClick={() => move(1)} aria-label="Next promotions" className="absolute right-2 top-1/2 z-10 grid h-11 w-8 -translate-y-1/2 place-items-center rounded-l-full bg-white/95 text-2xl text-[#29425b] shadow">›</button>
    </section>
  );
}

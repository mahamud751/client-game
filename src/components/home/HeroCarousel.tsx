"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { CarouselArrow } from "@/components/ui/CarouselArrow";
import type { Banner } from "@/lib/types";

export function HeroCarousel({ banners }: { banners: Banner[] }) {
  const rail = useRef<HTMLDivElement>(null);
  const move = (direction: -1 | 1) =>
    rail.current?.scrollBy({
      left: direction * Math.max(320, window.innerWidth * 0.4),
      behavior: "smooth",
    });

  return (
    <section className="relative bg-white" aria-label="Featured promotions">
      <div
        ref={rail}
        className="no-scrollbar flex snap-x snap-mandatory gap-[3px] overflow-x-auto"
      >
        {banners.map((banner, index) => (
          <Link
            key={banner.id}
            href={banner.href}
            className="group relative aspect-square w-[78vw] max-w-[504px] shrink-0 snap-start overflow-hidden bg-[#111] sm:w-[48vw] lg:w-[40vw]"
          >
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              priority={index < 3}
              sizes="(max-width: 640px) 78vw, (max-width: 1024px) 48vw, 40vw"
              className="object-cover transition duration-500 group-hover:scale-[1.025]"
            />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-6 pb-8 text-center text-white">
              <h2 className="max-w-[420px] text-[24px] font-black uppercase leading-[.98] drop-shadow-md sm:text-[32px]">
                {banner.title}
              </h2>
              <span className="mt-4 inline-flex min-w-[170px] justify-center bg-black px-7 py-3 text-[14px] font-bold uppercase tracking-[.1em] group-hover:bg-white group-hover:text-black">
                {banner.cta}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <CarouselArrow
        direction="prev"
        label="Previous promotions"
        onClick={() => move(-1)}
      />
      <CarouselArrow
        direction="next"
        label="Next promotions"
        onClick={() => move(1)}
      />
    </section>
  );
}

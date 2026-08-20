"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CarouselArrow } from "@/components/ui/CarouselArrow";
import type { Banner } from "@/lib/types";

export function HeroCarousel({ banners }: { banners: Banner[] }) {
  const rail = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateArrowState = () => {
    const node = rail.current;
    if (!node) return;
    const maxScroll = node.scrollWidth - node.clientWidth;
    setCanScrollPrev(node.scrollLeft > 2);
    setCanScrollNext(node.scrollLeft < maxScroll - 2);
  };

  useEffect(() => {
    const node = rail.current;
    if (!node) return;
    updateArrowState();
    node.addEventListener("scroll", updateArrowState, { passive: true });
    window.addEventListener("resize", updateArrowState);
    return () => {
      node.removeEventListener("scroll", updateArrowState);
      window.removeEventListener("resize", updateArrowState);
    };
  }, []);

  const move = (direction: -1 | 1) => {
    const node = rail.current;
    if (!node) return;
    node.scrollBy({
      left: direction * Math.max(320, window.innerWidth * 0.4),
      behavior: "smooth",
    });
  };

  return (
    <section className="hero-carousel relative overflow-hidden bg-white" aria-label="Featured promotions">
      <div
        ref={rail}
        className="no-scrollbar flex snap-x snap-mandatory gap-[3px] overflow-x-auto"
      >
        {banners.map((banner, index) => (
          <Link
            key={banner.id}
            href={banner.href}
            className="group relative aspect-square w-[78vw] max-w-[504px] shrink-0 snap-start overflow-hidden border border-[#ddd] bg-[#111] sm:w-[48vw] lg:w-[40vw]"
          >
            {/* Reference artwork already contains the campaign copy. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={banner.image}
              alt={banner.title}
              fetchPriority={index === 0 ? "high" : "auto"}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute inset-x-0 bottom-0 flex justify-center px-6 pb-6 text-center text-white">
              <span className="mt-4 inline-flex min-w-[170px] justify-center border border-white bg-black px-7 py-3 text-[14px] font-semibold uppercase transition-colors hover:bg-white hover:text-black">
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
        disabled={!canScrollPrev}
      />
      <CarouselArrow
        direction="next"
        label="Next promotions"
        onClick={() => move(1)}
        disabled={!canScrollNext}
      />
    </section>
  );
}

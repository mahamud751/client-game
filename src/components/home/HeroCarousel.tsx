"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { Banner } from "@/lib/types";

export function HeroCarousel({ banners }: { banners: Banner[] }) {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % banners.length);
  }, [banners.length]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + banners.length) % banners.length);
  }, [banners.length]);

  useEffect(() => {
    const t = setInterval(next, 5500);
    return () => clearInterval(t);
  }, [next]);

  const banner = banners[index];

  return (
    <section className="relative mx-auto max-w-7xl px-4 pt-4 sm:px-6">
      <div className="relative overflow-hidden rounded-xl bg-ink shadow-lg">
        <div className="relative aspect-[21/9] min-h-[220px] w-full sm:min-h-[280px] md:min-h-[340px]">
          {banners.map((b, i) => (
            <div
              key={b.id}
              className={`absolute inset-0 transition-opacity duration-500 ${
                i === index ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <Image
                src={b.image}
                alt={b.title}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-xl px-6 py-8 sm:px-10 md:px-14">
                  <p
                    className="mb-2 text-xs font-bold uppercase tracking-[0.2em] sm:text-sm"
                    style={{ color: b.accent }}
                  >
                    Featured
                  </p>
                  <h1 className="text-2xl font-black leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
                    {b.title}
                  </h1>
                  <p className="mt-2 text-sm text-white/85 sm:text-base md:text-lg">
                    {b.subtitle}
                  </p>
                  <Link
                    href={b.href}
                    className="mt-5 inline-flex rounded-md bg-brand px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-ink shadow hover:bg-brand-dark"
                  >
                    {b.cta}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-xl text-white hover:bg-black/70"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-xl text-white hover:bg-black/70"
        >
          ›
        </button>

        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
          {banners.map((b, i) => (
            <button
              key={b.id}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-brand" : "w-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
      <p className="sr-only">
        Slide {index + 1} of {banners.length}: {banner.title}
      </p>
    </section>
  );
}

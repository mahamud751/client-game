"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

type CarouselItem = {
  id: string;
  name: string;
  href: string;
  image: string;
};

export function ProductCarousel({
  title,
  items,
  viewAllHref,
  variant = "products",
}: {
  title: string;
  items: CarouselItem[];
  viewAllHref: string;
  variant?: "products" | "logos";
}) {
  const scroller = useRef<HTMLDivElement>(null);

  const scroll = (dir: -1 | 1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="pdp-carousel-section">
      <div className="mb-3 flex items-center justify-between gap-4">
        <h2 className="pdp-section-title">{title}</h2>
      </div>
      <div className="pdp-carousel-row">
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label={`Previous ${title}`}
          className="pdp-shelf-arrow"
        >
          ‹
        </button>
        <div ref={scroller} className="pdp-carousel-track no-scrollbar">
          {items.map((item) => (
            <div key={item.id} className={variant === "logos" ? "pdp-category-slide" : "pdp-product-slide"}>
              <Link href={item.href} className={variant === "logos" ? "pdp-logo-card" : "pdp-mini-card"}>
                <span className={variant === "logos" ? "pdp-logo-media" : "pdp-mini-media"}>
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="180px"
                    className="object-contain"
                  />
                </span>
                <span className="pdp-mini-title line-clamp-3">{item.name}</span>
              </Link>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label={`Next ${title}`}
          className="pdp-shelf-arrow"
        >
          ›
        </button>
      </div>
      <div className="pdp-shelf-dots" aria-hidden>
        <span />
        <span />
        <span />
      </div>
      <Link href={viewAllHref} className="sr-only">
        View All {title}
      </Link>
    </section>
  );
}

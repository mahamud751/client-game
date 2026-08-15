"use client";

import Link from "next/link";
import { useRef } from "react";
import { CarouselArrow } from "@/components/ui/CarouselArrow";

const brandMarks: { name: string; href: string; src: string }[] = [
  { name: "New & Trending", href: "/new", src: "/brands/new-trending.svg" },
  { name: "Exclusives", href: "/exclusives", src: "/brands/exclusives.svg" },
  { name: "Funko", href: "/search?q=Funko", src: "/brands/funko.svg" },
  { name: "Transformers", href: "/themes/transformers", src: "/brands/transformers.svg" },
  { name: "Star Wars", href: "/themes/star-wars", src: "/brands/star-wars.svg" },
  { name: "Marvel", href: "/themes/marvel", src: "/brands/marvel.svg" },
  { name: "Masters of the Universe", href: "/themes/motu", src: "/brands/motu.svg" },
  { name: "G.I. Joe", href: "/search?q=G.I.%20Joe", src: "/brands/gi-joe.svg" },
  { name: "One Piece", href: "/themes/one-piece", src: "/brands/one-piece.svg" },
  { name: "TMNT", href: "/themes/tmnt", src: "/brands/tmnt.svg" },
  { name: "DC Comics", href: "/themes/dc-comics", src: "/brands/dc.svg" },
  { name: "Hot Wheels", href: "/search?q=Hot%20Wheels", src: "/brands/hot-wheels.svg" },
  { name: "Godzilla", href: "/themes/godzilla", src: "/brands/godzilla.svg" },
  { name: "Batman", href: "/themes/batman", src: "/brands/batman.svg" },
  { name: "Dragon Ball", href: "/themes/dragon-ball", src: "/brands/dragon-ball.svg" },
  { name: "Spider-Man", href: "/themes/spider-man", src: "/brands/spider-man.svg" },
  { name: "Pokemon", href: "/search?q=Pokemon", src: "/brands/pokemon.svg" },
];

export function BrandCarousel() {
  const rail = useRef<HTMLDivElement>(null);
  const move = (direction: -1 | 1) =>
    rail.current?.scrollBy({ left: direction * 420, behavior: "smooth" });

  return (
    <section
      className="border-b border-[#e5e7eb] bg-white"
      aria-label="Featured themes and brands"
    >
      <div className="container-ee flex items-center">
        <CarouselArrow
          direction="prev"
          variant="brand"
          label="Previous brands"
          onClick={() => move(-1)}
        />

        <div
          ref={rail}
          className="no-scrollbar flex h-[76px] min-w-0 flex-1 snap-x items-center gap-5 overflow-x-auto px-1 sm:px-3"
        >
          {brandMarks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              title={item.name}
              className="relative h-16 w-16 shrink-0 snap-start overflow-hidden rounded-full border border-[#e0e4e8] bg-white transition hover:scale-105 hover:border-[#075aaa] hover:shadow-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.name}
                className="h-full w-full object-cover"
              />
            </Link>
          ))}
        </div>

        <CarouselArrow
          direction="next"
          variant="brand"
          label="Next brands"
          onClick={() => move(1)}
        />
      </div>
    </section>
  );
}

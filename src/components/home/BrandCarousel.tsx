"use client";

import Link from "next/link";
import { useRef } from "react";
import { CarouselArrow } from "@/components/ui/CarouselArrow";

const brandMarks: { name: string; href: string; src: string }[] = [
  { name: "New & Trending", href: "/new", src: "https://media.entertainmentearth.com/assets/images/c6002e5392534fef8aba6e66595e5adf.gif" },
  { name: "Exclusives", href: "/exclusives", src: "https://media.entertainmentearth.com/assets/images/62e87f2a812c450e940dfbbb8e0bcc2a.jpg" },
  { name: "Funko", href: "/company/funko", src: "https://media.entertainmentearth.com/assets/images/d6c500a3906f44bda03a8a4a42602576.jpg" },
  { name: "Transformers", href: "/themes/transformers", src: "https://media.entertainmentearth.com/assets/images/5a97110c52c34b718fc1feb0510b318e.jpg" },
  { name: "Star Wars", href: "/themes/star-wars", src: "https://media.entertainmentearth.com/assets/images/e2013b27be7f4163a411fa49d305159c.jpg" },
  { name: "Marvel", href: "/themes/marvel", src: "https://media.entertainmentearth.com/assets/images/cfdbdba594324b3b82a092fd99ae3528.jpg" },
  { name: "Masters of the Universe", href: "/themes/motu", src: "https://media.entertainmentearth.com/assets/images/46e8767273bc42aea53ee088ebd75e8c.jpg" },
  { name: "G.I. Joe", href: "/search?q=G.I.%20Joe", src: "https://media.entertainmentearth.com/assets/images/57f20ba10a1e4a88b7eaa06b49fbfb29.gif" },
  { name: "One Piece", href: "/themes/one-piece", src: "https://media.entertainmentearth.com/assets/images/3e6e9a665d0b4d3e8ae1a92094f233d4.gif" },
  { name: "TMNT", href: "/themes/tmnt", src: "https://media.entertainmentearth.com/assets/images/fdb6eaa21af24ab9aafe6c20d09b4446.jpg" },
  { name: "DC Comics", href: "/themes/dc-comics", src: "https://media.entertainmentearth.com/assets/images/d82eb0fbccc144bda1d5d58113c85764.jpg" },
  { name: "Hot Wheels", href: "/search?q=Hot%20Wheels", src: "https://media.entertainmentearth.com/assets/images/4915a84cfe1147c8addbc64bf748cb72.gif" },
  { name: "Horror", href: "/search?q=Horror", src: "https://media.entertainmentearth.com/assets/images/903bb69e85c14219af62a9d08b448078.jpg" },
  { name: "WWE", href: "/search?q=WWE", src: "https://media.entertainmentearth.com/assets/images/c0c2a6f67e1e4e7f962c78b46e51f62d.jpg" },
  { name: "Street Fighter", href: "/search?q=Street%20Fighter", src: "https://media.entertainmentearth.com/assets/images/d439af2ef2274186b337121b9535e98c.gif" },
  { name: "Superman", href: "/search?q=Superman", src: "https://media.entertainmentearth.com/assets/images/6d2140ebb1614edbbd89f32307e00f18.gif" },
];

export function BrandCarousel() {
  const rail = useRef<HTMLDivElement>(null);
  const move = (direction: -1 | 1) =>
    rail.current?.scrollBy({ left: direction * 420, behavior: "smooth" });

  return (
    <section
      className="bg-white py-[10px]"
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
          className="no-scrollbar flex h-16 min-w-0 flex-1 snap-x items-center overflow-x-auto"
        >
          {brandMarks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              title={item.name}
              className="grid h-16 w-1/4 min-w-[82px] shrink-0 snap-start place-items-center border border-transparent bg-white transition-colors hover:border-[#d54215] min-[400px]:w-1/5 min-[610px]:w-1/6 md:w-1/8 xl:w-1/10"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.name}
                width="58"
                height="58"
                className="h-[58px] w-[58px] object-contain"
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

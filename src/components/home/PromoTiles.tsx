import Link from "next/link";

const tiles = [
  ["Looking for Deals or Sales", "/deals", "https://media.entertainmentearth.com/assets/images/6d9864c6f112490a9fe4b2d334922772.jpg"],
  ["Mint Condition Guarantee", "/help#mint", "https://media.entertainmentearth.com/assets/images/d698d51d56454d949371eb0aa28dd945.jpg"],
  ["Collector Earth Exclusives", "/exclusives", "https://media.entertainmentearth.com/assets/images/87e8e53e051d4e0aa07c3c389d11249e.jpg"],
  ["Funko All-Stars", "/new", "https://media.entertainmentearth.com/assets/images/68de9a3b3d0d428e9e8ea50a7b8f6b99.jpg"],
];

export function PromoTiles() {
  return (
    <section className="home-section grid grid-cols-2 gap-[10px] py-5 sm:grid-cols-4">
      {tiles.map(([alt, href, src]) => (
        <Link key={alt} href={href} className="block overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="h-auto w-full transition-transform duration-400 hover:scale-110 hover:-rotate-[1.1deg]"
          />
        </Link>
      ))}
    </section>
  );
}

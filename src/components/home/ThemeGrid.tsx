import Image from "next/image";
import Link from "next/link";
import type { Theme } from "@/lib/types";

export function ThemeGrid({ themes }: { themes: Theme[] }) {
  return (
    <section className="home-section">
      <h2 className="section-heading">Popular Themes</h2>
      <div className="grid auto-rows-fr grid-cols-2 gap-[10px] sm:grid-cols-4 lg:grid-cols-6">
        {themes.map((theme) => (
          <Link key={theme.slug} href={`/themes/${theme.slug}`} className="product-tile-shelf group min-h-[202px] min-w-0">
            <span className="tile-media-shelf block">
              <Image
                src={theme.image}
                alt=""
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 182px"
                className="object-contain"
              />
            </span>
            <span className="tile-title-shelf mt-2 block">{theme.name}</span>
          </Link>
        ))}
        <Link
          href="/themes"
          className="view-all-tile flex min-h-[202px] flex-col items-center justify-center p-4 text-center text-[#191a1e]"
        >
          <strong className="text-[22px] font-black uppercase leading-tight">
            View All
            <br />
            Popular Themes
          </strong>
          <span className="mt-6 grid h-16 w-16 place-items-center rounded-full bg-white text-5xl font-light leading-none">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}

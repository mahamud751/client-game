import Image from "next/image";
import Link from "next/link";
import type { Theme } from "@/lib/types";

export function ThemeGrid({ themes }: { themes: Theme[] }) {
  return (
    <section className="home-section">
      <h2 className="section-heading">Popular Themes</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6">
        {themes.map((theme) => (
          <Link key={theme.slug} href={`/themes/${theme.slug}`} className="product-tile-shelf group min-h-[202px]">
            <span className="relative block min-h-0 flex-1 overflow-hidden">
              <Image src={theme.image} alt="" fill sizes="182px" className="object-contain" />
            </span>
            <span className="tile-title-shelf mt-2">{theme.name}</span>
          </Link>
        ))}
        <Link href="/themes" className="view-all-tile flex min-h-[202px] flex-col items-center justify-center text-center"><strong className="text-xl uppercase leading-tight">View All<br/>Popular Themes</strong><span className="mt-3 grid h-12 w-12 place-items-center rounded-full bg-white text-4xl">→</span></Link>
      </div>
    </section>
  );
}

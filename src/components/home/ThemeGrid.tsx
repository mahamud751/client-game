import Image from "next/image";
import Link from "next/link";
import type { Theme } from "@/lib/types";

export function ThemeGrid({ themes }: { themes: Theme[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
          Popular Themes
        </h2>
        <Link
          href="/themes"
          className="text-sm font-semibold text-accent hover:underline"
        >
          View All Popular Themes
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6">
        {themes.map((theme) => (
          <Link
            key={theme.slug}
            href={`/themes/${theme.slug}`}
            className="group flex flex-col items-center gap-2"
          >
            <div
              className="relative aspect-square w-full overflow-hidden rounded-full border-4 border-white shadow-md ring-1 ring-border transition-transform group-hover:scale-105"
              style={{ backgroundColor: theme.color }}
            >
              <Image
                src={theme.image}
                alt={theme.name}
                fill
                sizes="120px"
                className="object-cover opacity-90 transition-opacity group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
            <span className="text-center text-xs font-semibold text-ink sm:text-sm">
              {theme.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

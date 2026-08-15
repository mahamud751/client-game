import Link from "next/link";
import type { Theme } from "@/lib/types";

export function ThemeGrid({ themes }: { themes: Theme[] }) {
  return (
    <section className="home-section">
      <h2 className="section-heading">Popular Themes</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6">
        {themes.map((theme) => (
          <Link key={theme.slug} href={`/themes/${theme.slug}`} className="group flex h-[165px] flex-col justify-between border border-[#d9dde1] bg-white p-3">
            <span className="flex flex-1 items-center justify-center text-center text-xl font-black uppercase tracking-[-.07em] transition-transform group-hover:scale-105" style={{ color: theme.color }}>{theme.name}</span>
            <span className="text-[9px] font-bold text-[#083d70]">{theme.name}</span>
          </Link>
        ))}
        <Link href="/themes" className="flex h-[165px] flex-col items-center justify-center border border-[#d9dde1] bg-[#e9e9e9] text-center"><strong className="text-xl uppercase leading-tight">View All<br/>Popular Themes</strong><span className="mt-3 grid h-12 w-12 place-items-center rounded-full bg-white text-4xl">→</span></Link>
      </div>
    </section>
  );
}

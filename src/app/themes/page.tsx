import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { themes } from "@/data/catalog";

export const metadata = {
  title: "Popular Themes",
};

export default function ThemesPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-3 py-6 sm:px-5">
      <Breadcrumbs items={[{ label: "Popular Themes" }]} />
      <PageHeader
        title="Popular Themes"
        description="Shop by franchise — Star Wars, Marvel, Batman, Transformers, and more."
      />
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {themes.map((theme) => (
          <Link key={theme.slug} href={`/themes/${theme.slug}`} className="group flex flex-col items-center gap-2">
            <div
              className="relative aspect-square w-full overflow-hidden rounded-full border-4 border-white shadow-md ring-1 ring-slate-200"
              style={{ backgroundColor: theme.color }}
            >
              <Image
                src={theme.image}
                alt={theme.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 16vw"
              />
            </div>
            <h2 className="text-center text-sm font-bold text-[#243b53]">{theme.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

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
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: "Popular Themes" }]} />
      <PageHeader
        title="Popular Themes"
        description="Shop by franchise — Star Wars, Marvel, Batman, Transformers, and more."
      />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {themes.map((theme) => (
          <Link
            key={theme.slug}
            href={`/themes/${theme.slug}`}
            className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg"
          >
            <div
              className="relative aspect-[4/3]"
              style={{ backgroundColor: theme.color }}
            >
              <Image
                src={theme.image}
                alt={theme.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <h2 className="absolute bottom-3 left-3 right-3 text-lg font-bold text-white">
                {theme.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

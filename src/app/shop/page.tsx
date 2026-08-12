import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductGrid } from "@/components/product/ProductGrid";
import { categories, products } from "@/data/catalog";
import Link from "next/link";

export const metadata = {
  title: "Shop All",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ ready?: string }>;
}) {
  const params = await searchParams;
  const list =
    params.ready === "1" ? products.filter((p) => p.shipReady) : products;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: "Shop" }]} />
      <PageHeader
        title={params.ready === "1" ? "Ship Ready Favorites" : "Shop All"}
        description="Browse action figures, vinyl, statues, kits, games, exclusives, and more."
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/shop/${c.slug}`}
            className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-ink hover:border-ink hover:bg-ink hover:text-white"
          >
            {c.name}
          </Link>
        ))}
      </div>

      <p className="mb-4 text-sm text-muted">{list.length} products</p>
      <ProductGrid products={list} />
    </div>
  );
}

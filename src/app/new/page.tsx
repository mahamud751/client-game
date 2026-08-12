import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getJustAdded, getTrending, products } from "@/data/catalog";

export const metadata = {
  title: "New & Trending",
};

export default async function NewPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter } = await searchParams;
  const list =
    filter === "just-added"
      ? getJustAdded()
      : products.filter((p) => p.trending || p.newArrival || p.justAdded);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: "New & Trending" }]} />
      <PageHeader
        title={
          filter === "just-added" ? "Just Added" : "New & Trending"
        }
        description="Fresh drops, exclusives, and the collectibles everyone is talking about."
      />
      <p className="mb-4 text-sm text-muted">
        {list.length} products · {getTrending().length} trending
      </p>
      <ProductGrid products={list} />
    </div>
  );
}

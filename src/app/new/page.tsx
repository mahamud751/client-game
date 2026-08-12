import { CatalogListing } from "@/components/product/CatalogListing";
import { getJustAdded, products } from "@/data/catalog";

export const metadata = {
  title: "New & Trending",
};

export default async function NewPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter } = await searchParams;
  const justAdded = filter === "just-added";
  const list = justAdded
    ? getJustAdded()
    : products.filter((p) => p.trending || p.newArrival || p.justAdded);

  return (
    <CatalogListing
      title={justAdded ? "Just Added" : "Newly Added"}
      description="Fresh drops, exclusives, and the collectibles everyone is talking about."
      products={list}
      crumbs={[{ label: justAdded ? "Just Added" : "Newly Added" }]}
    />
  );
}

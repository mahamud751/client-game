import { CatalogListing } from "@/components/product/CatalogListing";
import { products } from "@/data/catalog";

export const metadata = {
  title: "Shop All",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ ready?: string }>;
}) {
  const params = await searchParams;
  const list = params.ready === "1" ? products.filter((p) => p.shipReady) : products;

  return (
    <CatalogListing
      title={params.ready === "1" ? "In Stock / Ship Ready" : "Shop All"}
      description="Browse action figures, vinyl, statues, kits, games, exclusives, and more."
      products={list}
      crumbs={[{ label: params.ready === "1" ? "In Stock" : "Shop" }]}
    />
  );
}

import { CatalogListing } from "@/components/product/CatalogListing";
import { searchProducts } from "@/data/catalog";

export const metadata = {
  title: "Search",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const list = searchProducts(q);

  return (
    <CatalogListing
      title={q ? `Results for “${q}”` : "Search"}
      description={q ? "Matching collectibles from the catalog." : "Enter a search term in the header to find collectibles."}
      products={list}
      crumbs={[{ label: "Search" }]}
    />
  );
}

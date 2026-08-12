import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductGrid } from "@/components/product/ProductGrid";
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
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: "Search" }]} />
      <PageHeader
        title={q ? `Results for “${q}”` : "Search"}
        description={
          q
            ? `${list.length} product${list.length === 1 ? "" : "s"} found`
            : "Enter a search term in the header."
        }
      />
      <ProductGrid products={list} />
    </div>
  );
}

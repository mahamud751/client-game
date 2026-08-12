import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getExclusives } from "@/data/catalog";

export const metadata = {
  title: "Exclusives",
};

export default function ExclusivesPage() {
  const list = getExclusives();
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: "Exclusives" }]} />
      <PageHeader
        title="Collector Earth Exclusives"
        description="Limited runs and special editions available only here."
      />
      <ProductGrid products={list} />
    </div>
  );
}

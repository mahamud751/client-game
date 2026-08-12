import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getPreOrders } from "@/data/catalog";

export const metadata = {
  title: "Pre-Orders",
};

export default function PreOrdersPage() {
  const list = getPreOrders();
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ label: "Pre-Orders" }]} />
      <PageHeader
        title="Pre-Orders"
        description="Reserve upcoming releases — no deposit required. We charge when items ship."
      />
      <ProductGrid products={list} />
    </div>
  );
}

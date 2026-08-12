import { CatalogListing } from "@/components/product/CatalogListing";
import { getPreOrders } from "@/data/catalog";

export const metadata = {
  title: "Pre-Orders",
};

export default function PreOrdersPage() {
  return (
    <CatalogListing
      title="Pre-Orders"
      description="Reserve upcoming releases — no deposit required. We charge when items ship."
      products={getPreOrders()}
      crumbs={[{ label: "Pre-Orders" }]}
    />
  );
}

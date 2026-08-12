import { CatalogListing } from "@/components/product/CatalogListing";
import { getDeals } from "@/data/catalog";

export const metadata = {
  title: "Deals & Sales",
};

export default function DealsPage() {
  return (
    <CatalogListing
      title="Deals & Sales"
      description="Marked-down collectibles and limited-time savings."
      products={getDeals()}
      crumbs={[{ label: "Deals & Sales" }]}
    />
  );
}

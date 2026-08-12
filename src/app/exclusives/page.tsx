import { CatalogListing } from "@/components/product/CatalogListing";
import { getExclusives } from "@/data/catalog";

export const metadata = {
  title: "Exclusives",
};

export default function ExclusivesPage() {
  return (
    <CatalogListing
      title="Collector Earth Exclusives"
      description="Limited runs and special editions available only here."
      products={getExclusives()}
      crumbs={[{ label: "Exclusives" }]}
    />
  );
}

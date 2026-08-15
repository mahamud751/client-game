import { notFound } from "next/navigation";
import { CatalogListing } from "@/components/product/CatalogListing";
import { categories, getCategory, getProductsByCategory } from "@/data/catalog";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategory(category);
  return { title: cat?.name ?? "Category" };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  return (
    <CatalogListing
      title={cat.name}
      heading={`${cat.name} & Collectibles`}
      description={cat.description}
      products={getProductsByCategory(category)}
      crumbs={[{ label: "Shop", href: "/shop" }, { label: cat.name }]}
    />
  );
}

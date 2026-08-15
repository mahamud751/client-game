import { notFound } from "next/navigation";
import { CatalogListing } from "@/components/product/CatalogListing";
import { categories, getCategory, getCategoryProducts } from "@/data/catalog";

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
      title={`Shop ${cat.name}`}
      heading={`${cat.name} & Collectibles`}
      tagline={cat.tagline}
      description={cat.description}
      products={getCategoryProducts(category)}
      crumbs={[{ label: "Shop", href: "/shop" }, { label: cat.name }]}
      banner={{ src: cat.banner, alt: cat.name, title: cat.name }}
    />
  );
}

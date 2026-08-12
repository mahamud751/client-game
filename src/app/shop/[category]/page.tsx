import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductGrid } from "@/components/product/ProductGrid";
import {
  categories,
  getCategory,
  getProductsByCategory,
} from "@/data/catalog";

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

  const list = getProductsByCategory(category);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[{ label: "Shop", href: "/shop" }, { label: cat.name }]}
      />
      <PageHeader title={cat.name} description={cat.description} />
      <p className="mb-4 text-sm text-muted">
        {list.length} products · ~{cat.count.toLocaleString()} in full catalog
      </p>
      <ProductGrid products={list} />
    </div>
  );
}

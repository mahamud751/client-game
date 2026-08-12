import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getProductsByTheme, getTheme, themes } from "@/data/catalog";

export function generateStaticParams() {
  return themes.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const theme = getTheme(slug);
  return { title: theme?.name ?? "Theme" };
}

export default async function ThemePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const theme = getTheme(slug);
  if (!theme) notFound();

  const list = getProductsByTheme(slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: "Themes", href: "/themes" },
          { label: theme.name },
        ]}
      />
      <PageHeader
        title={theme.name}
        description={`Collectibles and figures from the ${theme.name} universe.`}
      />
      <ProductGrid products={list} />
    </div>
  );
}

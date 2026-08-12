import { notFound } from "next/navigation";
import { CatalogListing } from "@/components/product/CatalogListing";
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

  return (
    <CatalogListing
      title={theme.name}
      description={`Collectibles and figures from the ${theme.name} universe.`}
      products={getProductsByTheme(slug)}
      crumbs={[{ label: "Themes", href: "/themes" }, { label: theme.name }]}
    />
  );
}

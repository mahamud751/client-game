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
  if (!theme) return { title: "Theme" };
  return {
    title: `Hot ${theme.name} Toys & Action Figures`,
    description: `Shop ${theme.name} action figures, vinyl figures, statues, and collectibles.`,
  };
}

export default async function ThemePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const theme = getTheme(slug);
  if (!theme) notFound();

  const products = getProductsByTheme(slug);

  return (
    <CatalogListing
      title={`Hot ${theme.name} Toys`}
      heading={`${theme.name} Action Figures & Collectibles`}
      tagline={theme.tagline}
      description={theme.description}
      products={products}
      crumbs={[{ label: theme.name }]}
      banner={{ src: theme.banner, alt: theme.name, title: theme.name }}
      themeFacets={{
        themes: theme.subthemes,
        collections: theme.collections,
        characters: theme.characters,
      }}
    />
  );
}

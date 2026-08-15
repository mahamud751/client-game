import { notFound } from "next/navigation";
import { CatalogListing } from "@/components/product/CatalogListing";
import { brands, getBrand, getProductsByBrand } from "@/data/catalog";

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) return { title: "Company" };
  return {
    title: `${brand.name} Toys & Collectibles`,
    description: brand.description,
  };
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) notFound();

  return (
    <CatalogListing
      title={`${brand.name} Toys & Collectibles`}
      heading={`${brand.name} Action Figures & Collectibles`}
      tagline={brand.tagline}
      description={brand.description}
      products={getProductsByBrand(slug)}
      crumbs={[{ label: brand.name }]}
      banner={{ src: brand.banner, alt: brand.name, title: brand.name }}
    />
  );
}

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { ProductCarousel } from "@/components/product/ProductCarousel";
import {
  getProductBySlug,
  getProductsByTheme,
  products,
  site,
} from "@/data/catalog";
import { formatPrice, statusLabel } from "@/lib/format";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return {
    title: product?.name ?? "Product",
    description: product?.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getProductsByTheme(product.theme)
    .filter((p) => p.id !== product.id)
    .slice(0, 10);

  const statusColor =
    product.status === "in-stock"
      ? "text-success"
      : product.status === "pre-order"
        ? "text-accent"
        : "text-amber-700";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: "Shop", href: "/shop" },
          {
            label: product.category.replace(/-/g, " "),
            href: `/shop/${product.category}`,
          },
          { label: product.name },
        ]}
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          {product.exclusive && (
            <span className="absolute left-4 top-4 rounded bg-ink px-2 py-1 text-xs font-bold uppercase text-brand">
              Exclusive
            </span>
          )}
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-muted">
            {product.brand}
          </p>
          <h1 className="mt-1 text-2xl font-bold leading-tight text-ink sm:text-3xl">
            {product.name}
          </h1>

          {product.rating && (
            <p className="mt-2 text-sm text-muted">
              ★ {product.rating.toFixed(1)}
              {product.reviewCount
                ? ` · ${product.reviewCount} reviews`
                : null}
            </p>
          )}

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-black text-ink">
              {formatPrice(product.price)}
            </span>
            {product.compareAt && product.compareAt > product.price && (
              <span className="text-lg text-muted line-through">
                {formatPrice(product.compareAt)}
              </span>
            )}
          </div>

          <p className={`mt-2 text-sm font-bold ${statusColor}`}>
            {statusLabel(product.status)}
            {product.releaseDate && product.status === "pre-order"
              ? ` · Est. ${product.releaseDate}`
              : null}
          </p>

          <p className="mt-1 text-xs text-muted">SKU: {product.sku}</p>

          <p className="mt-6 text-sm leading-relaxed text-ink/90">
            {product.description}
          </p>

          {product.features && product.features.length > 0 && (
            <ul className="mt-4 list-inside list-disc space-y-1 text-sm text-muted">
              {product.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <AddToCartButton product={product} className="min-w-[200px]" />
            <Link
              href="/cart"
              className="inline-flex items-center justify-center rounded-md border border-border bg-card px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink hover:bg-neutral-50"
            >
              View Cart
            </Link>
          </div>

          <div className="mt-8 space-y-2 rounded-lg border border-border bg-white p-4 text-sm">
            <p>
              <strong>Free shipping</strong> on orders ${site.freeShippingMin}+
            </p>
            <p>
              <strong>Mint Condition Guarantee</strong> — collector packaging
            </p>
            <p>
              <strong>90-day returns</strong> · hassle free
            </p>
            {product.status === "pre-order" && (
              <p>
                <strong>Risk-free pre-order</strong> — charged when item ships
              </p>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            <Link
              href={`/themes/${product.theme}`}
              className="rounded-full bg-neutral-200 px-3 py-1 font-medium capitalize hover:bg-neutral-300"
            >
              Theme: {product.theme.replace(/-/g, " ")}
            </Link>
            <Link
              href={`/shop/${product.category}`}
              className="rounded-full bg-neutral-200 px-3 py-1 font-medium capitalize hover:bg-neutral-300"
            >
              {product.category.replace(/-/g, " ")}
            </Link>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-12">
          <ProductCarousel
            title="You May Also Like"
            products={related}
            viewAllHref={`/themes/${product.theme}`}
          />
        </div>
      )}
    </div>
  );
}

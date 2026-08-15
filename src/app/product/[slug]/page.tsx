import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BuyBox } from "@/components/product/BuyBox";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductCarousel } from "@/components/product/ProductCarousel";
import {
  getProductBySlug,
  getProductsByTheme,
  getTheme,
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

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** "2026-11-20" -> "NOVEMBER 2026" */
function etaLabel(iso?: string) {
  if (!iso) return null;
  const [y, m] = iso.split("-");
  const month = MONTHS[Number(m) - 1];
  return month ? `${month} ${y}` : null;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const theme = getTheme(product.theme);
  const eta = etaLabel(product.releaseDate);

  const related = getProductsByTheme(product.theme)
    .filter((p) => p.id !== product.id)
    .slice(0, 10);
  const alsoBought = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 10);

  const statusColor =
    product.status === "in-stock"
      ? "text-[#15803d]"
      : product.status === "pre-order"
        ? "text-[#075aaa]"
        : product.status === "sold-out"
          ? "text-[#b91c1c]"
          : "text-amber-700";

  return (
    <div className="container-ee py-4">
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

      <div className="pdp-grid mt-2">
        <ProductGallery product={product} />

        <div>
          <h1 className="pdp-title">{product.name}</h1>

          <h2 className="pdp-subtitle">
            {theme && (
              <>
                <Link href={`/themes/${theme.slug}`}>{theme.name}</Link>
                {" · "}
              </>
            )}
            <Link href={`/shop/${product.category}`} className="capitalize">
              {product.category.replace(/-/g, " ")}
            </Link>
          </h2>

          <p className="mt-2 text-[13px] text-[#7b8794]">
            Item #: {product.sku}
            {product.rating ? ` · ★ ${product.rating.toFixed(1)}` : ""}
            {product.reviewCount ? ` (${product.reviewCount} reviews)` : ""}
          </p>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-[32px] font-bold leading-none text-[#34495e]">
              {formatPrice(product.price)}
            </span>
            {product.compareAt && product.compareAt > product.price && (
              <span className="text-[17px] text-[#7b8794] line-through">
                {formatPrice(product.compareAt)}
              </span>
            )}
          </div>

          <p className={`mt-2 text-[15px] font-bold ${statusColor}`}>
            {statusLabel(product.status)}
          </p>

          {eta && (
            <div className="mt-3">
              <p className="pdp-eta-label">Estimated to Arrive in</p>
              <p className="pdp-eta">{eta}</p>
            </div>
          )}

          <BuyBox product={product} />

          <div className="mt-5 border-t border-[#e8ebee] pt-4">
            <p className="text-[15px] font-bold text-[#075aaa]">
              Mint Condition Guaranteed ™
            </p>
            <p className="pdp-note mt-1">
              Experience our package inspection process. Perfect items, best
              packaging, no extra charge.
            </p>
            <p className="pdp-note mt-2">
              Free shipping on orders ${site.freeShippingMin}+ · Hassle-free
              90-day returns.
            </p>
          </div>
        </div>
      </div>

      {/* ---- Description ---- */}
      <section className="mt-10">
        <h2 className="pdp-section-title">Description</h2>
        <p className="mt-3 max-w-[900px] text-[14px] leading-[22px] text-[#34495e]">
          {product.description}
        </p>
        {product.features && product.features.length > 0 && (
          <ul className="mt-3 list-inside list-disc space-y-1 text-[14px] leading-[22px] text-[#34495e]">
            {product.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        )}
      </section>

      {/* ---- Specifications ---- */}
      <section className="mt-8">
        <h2 className="pdp-section-title">Specifications</h2>
        <div className="mt-3 max-w-[760px]">
          <div className="pdp-spec-row">
            <span className="pdp-spec-key">Item Number</span>
            <span className="pdp-spec-val">{product.sku}</span>
          </div>
          <div className="pdp-spec-row">
            <span className="pdp-spec-key">Brand</span>
            <span className="pdp-spec-val">{product.brand}</span>
          </div>
          <div className="pdp-spec-row">
            <span className="pdp-spec-key">Product Type</span>
            <span className="pdp-spec-val capitalize">
              {product.category.replace(/-/g, " ")}
            </span>
          </div>
          <div className="pdp-spec-row">
            <span className="pdp-spec-key">Theme</span>
            <span className="pdp-spec-val">{theme?.name ?? product.theme}</span>
          </div>
          <div className="pdp-spec-row">
            <span className="pdp-spec-key">Availability</span>
            <span className="pdp-spec-val">{statusLabel(product.status)}</span>
          </div>
          {eta && (
            <div className="pdp-spec-row">
              <span className="pdp-spec-key">Estimated Arrival</span>
              <span className="pdp-spec-val">{eta}</span>
            </div>
          )}
        </div>
      </section>

      {alsoBought.length > 0 && (
        <ProductCarousel
          title="Customers Who Bought This Also Bought"
          products={alsoBought}
          viewAllHref={`/shop/${product.category}`}
        />
      )}

      {related.length > 0 && (
        <ProductCarousel
          title="You May Also Like"
          products={related}
          viewAllHref={`/themes/${product.theme}`}
        />
      )}
    </div>
  );
}

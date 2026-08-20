import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BuyBox } from "@/components/product/BuyBox";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductCarousel } from "@/components/product/ProductCarousel";
import {
  brands,
  categories,
  getProductBySlug,
  getProductsByTheme,
  getTheme,
  products,
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

const featuredCategoryItems = [
  {
    id: "hasbro",
    name: "Hasbro",
    href: "/company/hasbro",
    image: "https://media.entertainmentearth.com/assets/images/405d8c156817483ebbd33e2fb9757575.jpg",
  },
  {
    id: "transformers",
    name: "Transformers",
    href: "/themes/transformers",
    image: "https://media.entertainmentearth.com/assets/images/5a97110c52c34b718fc1feb0510b318e.jpg",
  },
  {
    id: "funko",
    name: "Funko",
    href: "/company/funko",
    image: "https://media.entertainmentearth.com/assets/images/d6c500a3906f44bda03a8a4a42602576.jpg",
  },
  {
    id: "star-wars",
    name: "Star Wars",
    href: "/themes/star-wars",
    image: "https://media.entertainmentearth.com/assets/images/e2013b27be7f4163a411fa49d305159c.jpg",
  },
  {
    id: "mcfarlane-toys",
    name: "McFarlane Toys",
    href: "/company/mcfarlane-toys",
    image: "/companies/banners/mcfarlane-toys.svg",
  },
  {
    id: "batman",
    name: "Batman",
    href: "/themes/batman",
    image: "/brands/batman.svg",
  },
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
  const inspired = products
    .filter((p) => p.id !== product.id && (p.trending || p.justAdded || p.status === "pre-order"))
    .slice(0, 10);
  const toCarouselItems = (list: typeof products) =>
    list.map((p) => ({
      id: p.id,
      name: p.name,
      href: `/product/${p.slug}`,
      image: p.image,
    }));

  return (
    <div className="container-ee pdp-page">
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

      <div className="pdp-grid">
        <ProductGallery product={product} />

        <div className="pdp-info">
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

          <p className="pdp-sku">
            Item Number: {product.sku}
          </p>

          <div className="pdp-price-row">
            <div>
              <p className="pdp-price">{formatPrice(product.price)}</p>
              <p className="pdp-free-ship">Free USA Shipping</p>
            </div>
            {eta && (
              <div className="pdp-eta-block">
                <p className="pdp-eta-label">Estimated to Arrive in</p>
                <p className="pdp-eta">{eta}</p>
              </div>
            )}
          </div>

          <BuyBox product={product} />

          <div className="pdp-assurances">
            <p>✔ Estimated ship date subject to change. You will not be charged until this is ready to ship.</p>
            <p>✔ This item cannot ship to certain locations outside the United States.</p>
            <div className="pdp-mint">
              <span>MINT<br />CONDITION<br />GUARANTEED</span>
              <p>
                <strong>Mint Condition Guaranteed ™</strong>
                <br />
                Experience our package inspection process. Perfect items, best packaging, no extra charge!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ---- Description ---- */}
      <section className="pdp-copy-section">
        <h2 className="pdp-section-title">Description</h2>
        <p className="pdp-copy-lead">{product.name}:</p>
        <p className="pdp-copy">
          {product.description}
        </p>
        {product.features && product.features.length > 0 && (
          <ul className="pdp-feature-list">
            {product.features.map((f) => (
              <li key={f}>-{f}</li>
            ))}
          </ul>
        )}
        <p className="pdp-copy">
          Each {product.name} is packaged in a collector-friendly box, designed with collectors in mind.
        </p>
      </section>

      {/* ---- Specifications ---- */}
      <section className="pdp-copy-section">
        <h2 className="pdp-section-title">Specifications</h2>
        <div className="pdp-specs">
          <div className="pdp-spec-row">
            <span className="pdp-spec-key">Company:</span>
            <Link href={`/company/${brands.find((b) => b.name === product.brand)?.slug ?? ""}`} className="pdp-spec-val">{product.brand}</Link>
          </div>
          <div className="pdp-spec-row">
            <span className="pdp-spec-key">Theme:</span>
            <Link href={`/themes/${theme?.slug ?? product.theme}`} className="pdp-spec-val">{theme?.name ?? product.theme}</Link>
          </div>
          <div className="pdp-spec-row">
            <span className="pdp-spec-key">Product Type:</span>
            <Link href={`/shop/${product.category}`} className="pdp-spec-val capitalize">
              {product.category.replace(/-/g, " ")}
            </Link>
          </div>
          <div className="pdp-spec-row">
            <span className="pdp-spec-key">Collection:</span>
            <span className="pdp-spec-val">Collector Series</span>
          </div>
          <div className="pdp-spec-row">
            <span className="pdp-spec-key">Availability:</span>
            <span className="pdp-spec-val">{statusLabel(product.status)}</span>
          </div>
          {eta && (
            <div className="pdp-spec-row">
              <span className="pdp-spec-key">Estimated Arrival:</span>
              <span className="pdp-spec-val">{eta}</span>
            </div>
          )}
        </div>
        <div className="pdp-ce-mark" aria-hidden>CE</div>
      </section>

      <div className="pdp-view-links">
        <Link href={`/company/${brands.find((b) => b.name === product.brand)?.slug ?? ""}`}>See All {product.brand} Merchandise</Link>
        <Link href={`/shop/${product.category}`}>See All {theme?.name ?? "Collector"} {product.category.replace(/-/g, " ")}</Link>
        <Link href={`/themes/${product.theme}`}>See All {theme?.name ?? product.theme} Items</Link>
        <Link href="/shop">See All Collector Earth Items</Link>
      </div>

      {inspired.length > 0 && (
        <ProductCarousel
          title="Inspired By Your Browsing History"
          items={toCarouselItems(inspired)}
          viewAllHref={`/shop/${product.category}`}
        />
      )}

      {related.length > 0 && (
        <ProductCarousel
          title="You May Also Like"
          items={toCarouselItems(related)}
          viewAllHref={`/themes/${product.theme}`}
        />
      )}

      {featuredCategoryItems.length > 0 && (
        <ProductCarousel
          title="Featured Categories"
          items={featuredCategoryItems}
          viewAllHref={`/shop/${categories[0]?.slug ?? ""}`}
          variant="logos"
        />
      )}
    </div>
  );
}

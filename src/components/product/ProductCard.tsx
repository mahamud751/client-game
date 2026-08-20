import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { AddToCartButton } from "./AddToCartButton";
import { site } from "@/data/catalog";

function shortDate(iso?: string) {
  if (!iso) return null;
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleString("en-US", { month: "short", day: "numeric" });
}

export function ProductCard({
  product,
  variant = "listing",
}: {
  product: Product;
  /** "compact" is the smaller product-page carousel card (171x200). */
  variant?: "listing" | "compact";
}) {
  const flag =
    product.status === "pre-order"
      ? {
          label: "New Pre-\nOrders",
          className: "tile-flag-new",
          sublabel: shortDate(product.releaseDate),
        }
      : product.justAdded
        ? { label: "Hot Off\nThe Truck", className: "tile-flag-hot" }
        : product.newArrival
          ? { label: "Newly\nAdded", className: "tile-flag-new" }
          : product.exclusive
            ? { label: "Exclusive", className: "tile-flag-exclusive" }
            : null;

  if (variant === "compact") {
    return (
      <article className="product-tile-compact">
        <Link
          href={`/product/${product.slug}`}
          className="tile-media-compact block"
          tabIndex={-1}
          aria-hidden
        >
          <Image
            src={product.image}
            alt=""
            fill
            sizes="151px"
            className="object-contain"
          />
        </Link>
        <Link
          href={`/product/${product.slug}`}
          className="tile-title-compact mt-2 line-clamp-2 block"
        >
          {product.name}
        </Link>
      </article>
    );
  }

  return (
    <article className="product-tile">
      <div className="relative">
        {flag && (
          <span className={`tile-flag whitespace-pre-line ${flag.className}`}>
            <span className="tile-flag-main">{flag.label}</span>
            {flag.sublabel && (
              <span className="tile-flag-sub">{flag.sublabel}</span>
            )}
          </span>
        )}
        <Link
          href={`/product/${product.slug}`}
          className="tile-media block"
          tabIndex={-1}
          aria-hidden
        >
          <Image
            src={product.image}
            alt=""
            fill
            sizes="(max-width: 640px) 50vw, 240px"
            className="object-contain"
          />
        </Link>
      </div>

      <AddToCartButton
        product={product}
        variant="tile"
        className="tile-cart mt-1.5"
      />

      <Link
        href={`/product/${product.slug}`}
        className="tile-title mt-2 line-clamp-2 block"
      >
        {product.name}
      </Link>

      <p className="tile-meta mt-1">Item #: {product.sku}</p>

      <div className="mt-1">
        <div className="flex items-baseline gap-2">
          <span className="tile-price">{formatPrice(product.price)}</span>
          {product.compareAt && product.compareAt > product.price && (
            <span className="text-[13px] text-[#7b8794] line-through">
              {formatPrice(product.compareAt)}
            </span>
          )}
        </div>

        {product.price >= site.freeShippingMin && (
          <p className="tile-shipping mt-0.5">Free USA Shipping</p>
        )}
      </div>
    </article>
  );
}

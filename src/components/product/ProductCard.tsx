import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice, statusLabel } from "@/lib/format";
import { AddToCartButton } from "./AddToCartButton";
import { site } from "@/data/catalog";

const statusColor: Record<string, string> = {
  "in-stock": "text-[#15803d]",
  "pre-order": "text-[#075aaa]",
  backorder: "text-amber-700",
  "sold-out": "text-[#b91c1c]",
};

export function ProductCard({
  product,
  variant = "listing",
}: {
  product: Product;
  /** "compact" is the smaller product-page carousel card (171x200). */
  variant?: "listing" | "compact";
}) {
  const flag = product.justAdded
    ? "Hot Off\nThe Truck"
    : product.newArrival
      ? "Newly\nAdded"
      : product.exclusive
        ? "Exclusive"
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
        {flag && <span className="tile-flag whitespace-pre-line">{flag}</span>}
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

      <Link
        href={`/product/${product.slug}`}
        className="tile-title mt-2 line-clamp-2 block"
      >
        {product.name}
      </Link>

      <p className="tile-meta mt-1">Item #: {product.sku}</p>

      <p
        className={`text-[13px] font-semibold ${statusColor[product.status] ?? ""}`}
      >
        {statusLabel(product.status)}
      </p>

      <div className="mt-auto pt-1">
        <div className="flex items-baseline gap-2">
          <span className="tile-price">{formatPrice(product.price)}</span>
          {product.compareAt && product.compareAt > product.price && (
            <span className="text-[13px] text-[#7b8794] line-through">
              {formatPrice(product.compareAt)}
            </span>
          )}
        </div>

        {product.price >= site.freeShippingMin && (
          <p className="text-[12px] font-semibold text-[#15803d]">
            Free USA Shipping
          </p>
        )}

        <AddToCartButton
          product={product}
          variant="tile"
          className="tile-cart mt-1.5"
        />
      </div>
    </article>
  );
}

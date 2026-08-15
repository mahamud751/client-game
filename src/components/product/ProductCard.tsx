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

export function ProductCard({ product }: { product: Product }) {
  const flag = product.justAdded
    ? "Hot Off\nThe Truck"
    : product.newArrival
      ? "Newly\nAdded"
      : product.exclusive
        ? "Exclusive"
        : null;

  return (
    <article className="product-tile">
      <div className="relative">
        {flag && (
          <span className="tile-flag whitespace-pre-line">{flag}</span>
        )}
        <Link
          href={`/product/${product.slug}`}
          className="block p-3"
          tabIndex={-1}
          aria-hidden
        >
          <span className="relative block h-[180px] w-full">
            <Image
              src={product.image}
              alt=""
              fill
              sizes="(max-width: 640px) 50vw, 262px"
              className="object-contain"
            />
          </span>
        </Link>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 px-3 pb-3">
        <Link href={`/product/${product.slug}`} className="tile-title line-clamp-3">
          {product.name}
        </Link>

        <p className="tile-meta">Item #: {product.sku}</p>

        <p className={`text-[13px] font-semibold ${statusColor[product.status] ?? ""}`}>
          {statusLabel(product.status)}
        </p>

        <div className="mt-auto pt-1.5">
          <div className="flex items-baseline gap-2">
            <span className="tile-price">{formatPrice(product.price)}</span>
            {product.compareAt && product.compareAt > product.price && (
              <span className="text-[13px] text-[#7b8794] line-through">
                {formatPrice(product.compareAt)}
              </span>
            )}
          </div>

          {product.price >= site.freeShippingMin && (
            <p className="mt-0.5 text-[12px] font-semibold text-[#15803d]">
              Free USA Shipping
            </p>
          )}

          <AddToCartButton
            product={product}
            variant="tile"
            className="tile-cart mt-2"
          />
        </div>
      </div>
    </article>
  );
}

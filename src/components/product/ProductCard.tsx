import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice, statusLabel } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  const statusColor =
    product.status === "in-stock"
      ? "text-success"
      : product.status === "pre-order"
        ? "text-accent"
        : product.status === "sold-out"
          ? "text-danger"
          : "text-amber-700";

  return (
    <article className="product-card-shadow group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-all duration-200">
      <Link href={`/product/${product.slug}`} className="relative block">
        <div className="relative aspect-square overflow-hidden bg-neutral-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute left-2 top-2 flex flex-col gap-1">
            {product.exclusive && (
              <span className="rounded bg-ink px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand">
                Exclusive
              </span>
            )}
            {product.status === "pre-order" && (
              <span className="rounded bg-accent px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                Pre-Order
              </span>
            )}
            {product.newArrival && product.status !== "pre-order" && (
              <span className="rounded bg-brand px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink">
                New
              </span>
            )}
          </div>
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
          {product.brand}
        </p>
        <Link href={`/product/${product.slug}`}>
          <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-medium leading-snug text-ink transition-colors hover:text-accent">
            {product.name}
          </h3>
        </Link>
        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div>
            <p className="text-base font-bold text-ink">
              {formatPrice(product.price)}
            </p>
            {product.compareAt && product.compareAt > product.price && (
              <p className="text-xs text-muted line-through">
                {formatPrice(product.compareAt)}
              </p>
            )}
          </div>
          <p className={`text-[11px] font-semibold ${statusColor}`}>
            {statusLabel(product.status)}
          </p>
        </div>
      </div>
    </article>
  );
}

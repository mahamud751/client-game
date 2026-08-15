"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { site } from "@/data/catalog";
import { formatPrice } from "@/lib/format";

export function CartView() {
  const { items, subtotal, updateQty, removeItem, itemCount } = useCart();
  const freeShip = subtotal >= site.freeShippingMin;
  const remaining = Math.max(0, site.freeShippingMin - subtotal);

  return (
    <div className="container-ee py-6">
      <Breadcrumbs items={[{ label: "Cart" }]} />
      <PageHeader
        title="Your Cart"
        description={
          itemCount
            ? `${itemCount} item${itemCount === 1 ? "" : "s"} in your cart`
            : "Your cart is empty"
        }
      />

      {items.length === 0 ? (
        <div className="border border-dashed border-border bg-card p-12 text-center">
          <p className="text-lg font-medium text-ink">Nothing here yet</p>
          <p className="mt-1 text-sm text-muted">
            Browse New & Trending or Shop All to start collecting.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/new"
              className="rounded-md bg-brand px-5 py-2.5 text-sm font-bold text-ink hover:bg-brand-dark"
            >
              New & Trending
            </Link>
            <Link
              href="/shop"
              className="rounded-md border border-border bg-white px-5 py-2.5 text-sm font-bold text-ink hover:bg-neutral-50"
            >
              Shop All
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex gap-4 border border-slate-200 bg-card p-4 shadow-sm"
              >
                <Link
                  href={`/product/${product.slug}`}
                  className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-neutral-100"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/product/${product.slug}`}
                    className="line-clamp-2 font-semibold text-ink hover:text-accent"
                  >
                    {product.name}
                  </Link>
                  <p className="mt-0.5 text-xs text-muted">{product.brand}</p>
                  <p className="mt-1 font-bold text-ink">
                    {formatPrice(product.price)}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <label className="flex items-center gap-2 text-sm">
                      Qty
                      <select
                        value={quantity}
                        onChange={(e) =>
                          updateQty(product.id, Number(e.target.value))
                        }
                        className="rounded border border-border bg-white px-2 py-1"
                      >
                        {Array.from({ length: 10 }, (_, i) => i + 1).map(
                          (n) => (
                            <option key={n} value={n}>
                              {n}
                            </option>
                          ),
                        )}
                      </select>
                    </label>
                    <button
                      type="button"
                      onClick={() => removeItem(product.id)}
                      className="text-sm font-medium text-danger hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <p className="shrink-0 font-bold text-ink">
                  {formatPrice(product.price * quantity)}
                </p>
              </div>
            ))}
          </div>

          <aside className="h-fit border border-slate-200 bg-card p-6 shadow-sm">
            <h2 className="text-lg font-bold text-ink">Order Summary</h2>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Subtotal</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Shipping</span>
                <span className="font-semibold">
                  {freeShip ? "FREE" : "Calculated at checkout"}
                </span>
              </div>
              {!freeShip && (
                <p className="rounded-md bg-brand/20 px-3 py-2 text-xs font-medium text-ink">
                  Add {formatPrice(remaining)} more for free shipping
                </p>
              )}
              <div className="flex justify-between border-t border-border pt-3 text-base">
                <span className="font-bold">Estimated Total</span>
                <span className="font-black">{formatPrice(subtotal)}</span>
              </div>
            </div>
            <button
              type="button"
              className="mt-6 w-full rounded-sm bg-[#ffe000] py-3 text-sm font-black uppercase tracking-wide text-[#17212b] hover:bg-[#edc900]"
            >
              Checkout (Demo)
            </button>
            <Link
              href="/shop"
              className="mt-3 block text-center text-sm font-semibold text-accent hover:underline"
            >
              Continue Shopping
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}

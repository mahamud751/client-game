"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { products as allProducts, site } from "@/data/catalog";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

function etaLabel(iso?: string) {
  if (!iso) return null;
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleString("en-US", { month: "long", year: "numeric" });
}

function CartProductShelf({
  title,
  products,
}: {
  title: string;
  products: Product[];
}) {
  if (!products.length) return null;

  return (
    <section className="cart-shelf">
      <h2 className="cart-shelf-title">{title}</h2>
      <div className="cart-shelf-row">
        <button
          type="button"
          className="cart-shelf-arrow"
          disabled
          aria-label={`Previous ${title}`}
        >
          ‹
        </button>
        <div className="cart-shelf-grid">
          {products.slice(0, 6).map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="cart-shelf-card"
            >
              <span className="cart-shelf-media">
                <Image
                  src={product.image}
                  alt=""
                  fill
                  sizes="160px"
                  className="object-contain"
                />
              </span>
              <span className="cart-shelf-name line-clamp-3">
                {product.name}
              </span>
            </Link>
          ))}
        </div>
        <button
          type="button"
          className="cart-shelf-arrow"
          disabled
          aria-label={`Next ${title}`}
        >
          ›
        </button>
      </div>
      <div className="cart-shelf-dots" aria-hidden>
        <span />
        <span />
        <span />
      </div>
    </section>
  );
}

export function CartView() {
  const { items, subtotal, updateQty, removeItem, itemCount } = useCart();
  const freeShip = subtotal >= site.freeShippingMin;
  const remaining = Math.max(0, site.freeShippingMin - subtotal);
  const shipping = items.length && !freeShip ? 19.95 : 0;
  const total = subtotal + shipping;
  const inCartIds = new Set(items.map(({ product }) => product.id));
  const seed = items[0]?.product;
  const inspired = allProducts.filter(
    (product) =>
      !inCartIds.has(product.id) &&
      (product.theme === seed?.theme || product.trending || product.justAdded),
  );
  const recent = allProducts.filter((product) => !inCartIds.has(product.id)).slice(0, 6);

  return (
    <div className="container-ee py-5">
      <Breadcrumbs items={[{ label: "Cart" }]} />
      <h1 className="cart-page-title">
        Your Shopping Cart
        {itemCount > 0 && ` (${itemCount} Item${itemCount === 1 ? "" : "s"})`}
      </h1>

      {items.length === 0 ? (
        <div className="cart-empty">
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
        <>
          <div className="cart-layout">
            <div>
              <div className="cart-free-ship">
                Free Super Saver Shipping on all orders ${site.freeShippingMin}+.
                {!freeShip && (
                  <span> Add {formatPrice(remaining)} more to qualify.</span>
                )}
              </div>

              <div className="cart-table">
                <div className="cart-table-head">
                  <span>Item</span>
                  <span>Quantity</span>
                  <span>Price</span>
                  <span>Subtotal</span>
                </div>

                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="cart-row">
                    <div className="cart-item-cell">
                      <Link
                        href={`/product/${product.slug}`}
                        className="cart-item-media"
                      >
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain"
                          sizes="110px"
                        />
                      </Link>
                      <div className="min-w-0">
                        <Link
                          href={`/product/${product.slug}`}
                          className="cart-item-title"
                        >
                          {product.name}
                        </Link>
                        <p className="cart-item-meta">Item #: {product.sku}</p>
                        <p
                          className={
                            product.status === "in-stock"
                              ? "cart-stock"
                              : "cart-preorder"
                          }
                        >
                          {product.status === "in-stock"
                            ? "In Stock"
                            : etaLabel(product.releaseDate)
                              ? `Estimated to Arrive in ${etaLabel(product.releaseDate)}`
                              : "Pre-Order"}
                        </p>
                      </div>
                    </div>

                    <div className="cart-qty-cell">
                      <select
                        value={quantity}
                        onChange={(e) =>
                          updateQty(product.id, Number(e.target.value))
                        }
                        className="cart-qty-select"
                        aria-label={`Quantity for ${product.name}`}
                      >
                        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => removeItem(product.id)}
                        className="cart-link"
                      >
                        Delete
                      </button>
                    </div>

                    <p className="cart-money">{formatPrice(product.price)}</p>
                    <p className="cart-money">
                      {formatPrice(product.price * quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="cart-actions">
                <Link href="/shop" className="cart-btn cart-btn-keep">
                  Keep Shopping
                </Link>
                <Link href="/checkout" className="cart-btn cart-btn-checkout">
                  Checkout ({itemCount})
                </Link>
              </div>
            </div>

            <aside className="cart-summary">
              <div className="cart-summary-box">
                <div className="cart-summary-row">
                  <span>Items</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="cart-summary-row">
                  <span>
                    Shipping & Processing
                    <br />
                    <small>({freeShip ? "Super Saver" : "Standard"})</small>
                  </span>
                  <span>{freeShip ? "FREE" : formatPrice(shipping)}</span>
                </div>
                <div className="cart-summary-total">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <div className="cart-offer-box">
                <input placeholder="Offer Code (Optional)" />
                <button type="button">Apply</button>
              </div>
            </aside>
          </div>

          <CartProductShelf
            title="Inspired By Your Browsing History"
            products={inspired}
          />
          <CartProductShelf title="Recently Viewed Items" products={recent} />
        </>
      )}
    </div>
  );
}

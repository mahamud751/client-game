"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { products as allProducts } from "@/data/catalog";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

const PER_PAGE = 3;

export function AddedToCartModal({
  product,
  qty,
  itemCount,
  onClose,
}: {
  product: Product;
  qty: number;
  itemCount: number;
  onClose: () => void;
}) {
  const [page, setPage] = useState(0);
  const panel = useRef<HTMLDivElement>(null);

  // Related: same theme first, then same category, never the item just added.
  const related = useMemo(() => {
    const pool = allProducts.filter((p) => p.id !== product.id);
    const sameTheme = pool.filter((p) => p.theme === product.theme);
    const sameCat = pool.filter(
      (p) => p.category === product.category && p.theme !== product.theme,
    );
    return [...sameTheme, ...sameCat].slice(0, 12);
  }, [product]);

  const pageCount = Math.max(1, Math.ceil(related.length / PER_PAGE));
  const shown = related.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  // Close on Escape, and focus the panel when it opens.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    panel.current?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Lock background scroll while open.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div
      className="atc-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panel}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="atc-title"
        className="atc-dialog outline-none"
      >
        <div className="atc-header">
          <h2 id="atc-title" className="atc-title">
            Added To Cart
          </h2>
          <button
            type="button"
            className="atc-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="atc-body">
          <div className="flex gap-4">
            <Link
              href={`/product/${product.slug}`}
              onClick={onClose}
              className="relative h-[110px] w-[110px] shrink-0 border border-[#e5e5e5] bg-white"
            >
              <Image
                src={product.image}
                alt=""
                fill
                sizes="110px"
                className="object-contain p-1"
              />
            </Link>

            <div className="min-w-0 flex-1">
              <p className="atc-added">
                {qty} added to cart.
              </p>
              <Link
                href={`/product/${product.slug}`}
                onClick={onClose}
                className="atc-prod-title"
              >
                {product.name}
              </Link>
              <p className="atc-price">Price: {formatPrice(product.price)}</p>
              {product.status === "pre-order" && (
                <p className="mt-1.5 text-[13px] leading-[18px] text-[#5e656e]">
                  Estimated ship date subject to change. You will not be charged
                  until this is ready to ship.
                </p>
              )}
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Link href="/cart" onClick={onClose} className="atc-btn atc-btn-cart">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 2-1.6L20.5 8H6" />
                <circle cx="10" cy="20" r="1" />
                <circle cx="18" cy="20" r="1" />
              </svg>
              View Cart
            </Link>
            <Link
              href="/cart?checkout=1"
              onClick={onClose}
              className="atc-btn atc-btn-checkout"
            >
              Checkout ({itemCount})
            </Link>
          </div>

          {related.length > 0 && (
            <div className="mt-6">
              <h3 className="atc-related-title">Explore Related Products</h3>

              <div className="mt-3 flex items-center gap-1">
                <button
                  type="button"
                  className="atc-rel-arrow"
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                  aria-label="Previous related products"
                >
                  ‹
                </button>

                <div className="grid min-w-0 flex-1 grid-cols-3 gap-3">
                  {shown.map((p) => (
                    <Link
                      key={p.id}
                      href={`/product/${p.slug}`}
                      onClick={onClose}
                      className="atc-rel-card"
                    >
                      <span className="atc-rel-media">
                        <Image
                          src={p.image}
                          alt=""
                          fill
                          sizes="150px"
                          className="object-contain"
                        />
                      </span>
                      <span className="atc-rel-title mt-2 line-clamp-3 block">
                        {p.name}
                      </span>
                    </Link>
                  ))}
                </div>

                <button
                  type="button"
                  className="atc-rel-arrow"
                  onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
                  disabled={page >= pageCount - 1}
                  aria-label="Next related products"
                >
                  ›
                </button>
              </div>

              {pageCount > 1 && (
                <div className="mt-3 flex items-center justify-center gap-2">
                  {Array.from({ length: pageCount }, (_, i) => (
                    <button
                      key={i}
                      type="button"
                      className="atc-dot"
                      aria-current={i === page}
                      aria-label={`Related products page ${i + 1}`}
                      onClick={() => setPage(i)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="mt-5 flex justify-center border-t border-[#e5e5e5] pt-4">
            <button
              type="button"
              onClick={onClose}
              className="atc-btn atc-btn-keep"
            >
              Keep Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

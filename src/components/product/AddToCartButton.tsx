"use client";

import type { Product } from "@/lib/types";
import { useCart } from "@/components/cart/CartProvider";

export function AddToCartButton({
  product,
  className = "",
  variant = "default",
}: {
  product: Product;
  className?: string;
  /** "tile" renders the compact listing-card button (styling comes from .tile-cart). */
  variant?: "default" | "tile";
}) {
  const { addItem } = useCart();
  const disabled = product.status === "sold-out";

  // Confirmation is handled globally by the "Added To Cart" modal.
  const onClick = () => {
    if (disabled) return;
    addItem(product);
  };

  const label = disabled
    ? "Sold Out"
    : product.status === "pre-order"
      ? "Pre-Order: Add to Cart"
      : "Add to Cart";

  if (variant === "tile") {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={`${className} disabled:cursor-not-allowed disabled:opacity-50`}
      >
        {!disabled && (
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="currentColor"
            aria-hidden
          >
            <path d="M7 18a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 18Zm10 0a2 2 0 1 0 .001 4.001A2 2 0 0 0 17 18ZM3 3h2.1l2.2 10.3A2 2 0 0 0 9.25 15H17a2 2 0 0 0 1.9-1.37L21 7H7.12l-.4-2H3V3Z" />
          </svg>
        )}
        <span>{label}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {label}
    </button>
  );
}

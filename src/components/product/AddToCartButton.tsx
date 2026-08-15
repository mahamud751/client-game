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

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={
        variant === "tile"
          ? `${className} disabled:cursor-not-allowed disabled:opacity-50`
          : `inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50 ${className}`
      }
    >
      {disabled
        ? "Sold Out"
        : product.status === "pre-order"
          ? "Pre-Order: Add to Cart"
          : "Add to Cart"}
    </button>
  );
}

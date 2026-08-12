"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { useCart } from "@/components/cart/CartProvider";

export function AddToCartButton({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const disabled = product.status === "sold-out";

  const onClick = () => {
    if (disabled) return;
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-bold uppercase tracking-wide transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
        added
          ? "bg-success text-white"
          : "bg-brand text-ink hover:bg-brand-dark"
      } ${className}`}
    >
      {disabled
        ? "Sold Out"
        : added
          ? "Added to Cart ✓"
          : product.status === "pre-order"
            ? "Pre-Order Now"
            : "Add to Cart"}
    </button>
  );
}

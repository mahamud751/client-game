"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { useCart } from "@/components/cart/CartProvider";

export function BuyBox({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const disabled = product.status === "sold-out";

  // Confirmation is handled globally by the "Added To Cart" modal.
  const onAdd = () => {
    if (disabled) return;
    addItem(product, qty);
  };

  return (
    <div className="mt-5">
      <label className="mb-4 flex items-center gap-3 text-[14px] font-bold uppercase text-[#003366]">
        Quantity
        <select
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
          className="listing-select"
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </label>

      <button type="button" onClick={onAdd} disabled={disabled} className="pdp-buy-btn">
        {!disabled && <span aria-hidden>🛒</span>}
        {disabled
          ? "Sold Out"
          : product.status === "pre-order"
            ? "Pre-Order: Add to Cart"
            : "Add to Cart"}
      </button>

      <div className="mt-3 grid justify-items-center gap-3">
        <button type="button" className="pdp-link">
          ♡ Add to Wish List
        </button>
        <button type="button" className="pdp-link">
          ♧ Alert when in Stock
        </button>
      </div>

      {product.status === "pre-order" && (
        <p className="pdp-note mt-3">
          ✔ Estimated ship date subject to change. You will not be charged until
          this is ready to ship.
        </p>
      )}
    </div>
  );
}

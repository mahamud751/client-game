"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { useCart } from "@/components/cart/CartProvider";

export function BuyBox({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const disabled = product.status === "sold-out";

  const onAdd = () => {
    if (disabled) return;
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="mt-6 rounded-sm border border-slate-200 bg-white p-4">
      <div className="flex flex-wrap items-end gap-3">
        <label className="text-sm font-bold text-[#183a5d]">
          Qty
          <select
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            className="mt-1 block rounded border border-slate-300 bg-white px-3 py-2"
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={onAdd}
          disabled={disabled}
          className={`min-w-[220px] flex-1 rounded-sm px-6 py-3 text-sm font-black uppercase tracking-wide disabled:cursor-not-allowed disabled:opacity-50 ${
            added ? "bg-[#15803d] text-white" : "bg-[#ffe000] text-[#17212b] hover:bg-[#edc900]"
          }`}
        >
          {disabled
            ? "Sold Out"
            : added
              ? "Added to Cart ✓"
              : product.status === "pre-order"
                ? "Pre-Order Now"
                : "Add to Cart"}
        </button>
      </div>
      {product.status === "pre-order" && (
        <p className="mt-3 text-xs font-semibold text-[#075aaa]">
          Risk-free pre-order — we charge your card only when the item ships.
        </p>
      )}
    </div>
  );
}

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem, Product } from "@/lib/types";
import { AddedToCartModal } from "./AddedToCartModal";

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (product: Product, qty?: number) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "collector-earth-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  /** Most recent add — drives the "Added To Cart" confirmation modal. */
  const [lastAdded, setLastAdded] = useState<{
    product: Product;
    qty: number;
  } | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) setItems(JSON.parse(raw) as CartItem[]);
      } catch {
        /* ignore malformed stored cart data */
      }
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback((product: Product, qty = 1) => {
    setLastAdded({ product, qty });
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + qty }
            : i,
        );
      }
      return [...prev, { product, quantity: qty }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const updateQty = useCallback((productId: string, qty: number) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.product.id === productId ? { ...i, quantity: qty } : i,
        )
        .filter((i) => i.quantity > 0),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(() => {
    const itemCount = items.reduce((n, i) => n + i.quantity, 0);
    const subtotal = items.reduce(
      (n, i) => n + i.product.price * i.quantity,
      0,
    );
    return { items, itemCount, subtotal, addItem, removeItem, updateQty, clear };
  }, [items, addItem, removeItem, updateQty, clear]);

  return (
    <CartContext.Provider value={value}>
      {children}
      {lastAdded && (
        <AddedToCartModal
          product={lastAdded.product}
          qty={lastAdded.qty}
          itemCount={value.itemCount}
          onClose={() => setLastAdded(null)}
        />
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

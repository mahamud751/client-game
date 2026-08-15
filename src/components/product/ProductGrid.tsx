import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="border border-dashed border-[#c9d0d7] bg-white p-12 text-center">
        <p className="text-[16px] font-semibold text-ink">No products found</p>
        <p className="mt-1 text-[14px] text-muted">
          Try clearing a filter or choosing another category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-[15px] md:grid-cols-3 md:gap-[31px]">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

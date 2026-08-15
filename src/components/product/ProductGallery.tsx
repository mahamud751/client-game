"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/lib/types";

export function ProductGallery({ product }: { product: Product }) {
  const shots =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative mx-auto aspect-square w-full max-w-[500px] border border-[#ddd] bg-white">
        <Image
          src={shots[active] ?? product.image}
          alt={product.name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 500px"
          className="object-contain p-4"
        />
        {product.exclusive && (
          <span className="absolute left-3 top-3 bg-[#17212b] px-2 py-1 text-[11px] font-bold uppercase text-[#ffe000]">
            Exclusive
          </span>
        )}
      </div>

      {shots.length > 1 && (
        <div className="mx-auto mt-3 flex max-w-[500px] flex-wrap gap-2">
          {shots.map((src, i) => (
            <button
              key={src + i}
              type="button"
              className="pdp-thumb"
              aria-current={i === active}
              aria-label={`View image ${i + 1}`}
              onClick={() => setActive(i)}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="64px"
                className="object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

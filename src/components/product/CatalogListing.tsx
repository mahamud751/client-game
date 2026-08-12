"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { categories } from "@/data/catalog";
import type { Product } from "@/lib/types";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductGrid } from "./ProductGrid";

type SortKey = "featured" | "price-asc" | "price-desc" | "newest" | "name";

export function CatalogListing({
  title,
  description,
  products,
  crumbs,
}: {
  title: string;
  description?: string;
  products: Product[];
  crumbs: { label: string; href?: string }[];
}) {
  const [sort, setSort] = useState<SortKey>("featured");
  const [status, setStatus] = useState<string>("all");
  const [price, setPrice] = useState<string>("all");
  const [exclusive, setExclusive] = useState(false);

  const list = useMemo(() => {
    let next = [...products];
    if (status !== "all") next = next.filter((p) => p.status === status);
    if (exclusive) next = next.filter((p) => p.exclusive);
    if (price === "under-25") next = next.filter((p) => p.price < 25);
    if (price === "25-50") next = next.filter((p) => p.price >= 25 && p.price < 50);
    if (price === "50-100") next = next.filter((p) => p.price >= 50 && p.price < 100);
    if (price === "100-plus") next = next.filter((p) => p.price >= 100);

    next.sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "newest") return Number(!!b.newArrival || !!b.justAdded) - Number(!!a.newArrival || !!a.justAdded);
      return Number(!!b.trending) - Number(!!a.trending);
    });
    return next;
  }, [products, sort, status, price, exclusive]);

  return (
    <div className="mx-auto max-w-[1440px] px-3 py-6 sm:px-5">
      <Breadcrumbs items={crumbs} />
      <PageHeader title={title} description={description} />

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="h-fit rounded-sm border border-slate-200 bg-white p-4">
          <h2 className="border-b-2 border-[#075aaa] pb-2 text-sm font-black uppercase tracking-wide text-[#183a5d]">
            Filter Products
          </h2>

          <fieldset className="mt-4">
            <legend className="text-xs font-black uppercase tracking-wide text-muted">Category</legend>
            <ul className="mt-2 space-y-1">
              <li>
                <Link href="/shop" className="text-sm text-[#075aaa] hover:underline">
                  All products
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/shop/${c.slug}`} className="text-sm text-[#334155] hover:text-[#075aaa] hover:underline">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </fieldset>

          <fieldset className="mt-5">
            <legend className="text-xs font-black uppercase tracking-wide text-muted">Availability</legend>
            <div className="mt-2 grid gap-1 text-sm">
              {[
                ["all", "Any status"],
                ["in-stock", "In Stock"],
                ["pre-order", "Pre-Order"],
                ["backorder", "Backorder"],
              ].map(([value, label]) => (
                <label key={value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="status"
                    checked={status === value}
                    onChange={() => setStatus(value)}
                  />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-5">
            <legend className="text-xs font-black uppercase tracking-wide text-muted">Price</legend>
            <div className="mt-2 grid gap-1 text-sm">
              {[
                ["all", "Any price"],
                ["under-25", "Under $25"],
                ["25-50", "$25 to $50"],
                ["50-100", "$50 to $100"],
                ["100-plus", "$100+"],
              ].map(([value, label]) => (
                <label key={value} className="flex items-center gap-2">
                  <input type="radio" name="price" checked={price === value} onChange={() => setPrice(value)} />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="mt-5 flex items-center gap-2 text-sm font-semibold">
            <input type="checkbox" checked={exclusive} onChange={(e) => setExclusive(e.target.checked)} />
            Exclusives only
          </label>
        </aside>

        <div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <p className="text-sm text-muted">
              {list.length} product{list.length === 1 ? "" : "s"}
            </p>
            <label className="flex items-center gap-2 text-sm">
              Sort by
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="rounded border border-slate-300 bg-white px-2 py-1.5 text-sm"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name A–Z</option>
              </select>
            </label>
          </div>
          <ProductGrid products={list} />
        </div>
      </div>
    </div>
  );
}

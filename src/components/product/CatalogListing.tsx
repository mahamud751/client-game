"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { brands, categories } from "@/data/catalog";
import type { Product, ThemeFacet } from "@/lib/types";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ProductGrid } from "./ProductGrid";

type SortKey =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "newest"
  | "just-added"
  | "name"
  | "name-desc";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Bestsellers" },
  { value: "price-asc", label: "$-$$$" },
  { value: "price-desc", label: "$$$-$" },
  { value: "newest", label: "Newly Added" },
  { value: "just-added", label: "Hot Off The Truck" },
  { value: "name", label: "A-Z" },
  { value: "name-desc", label: "Z-A" },
];

const PRICE_BUCKETS: { id: string; label: string; test: (p: number) => boolean }[] =
  [
    { id: "under-25", label: "Under $25", test: (p) => p < 25 },
    { id: "26-75", label: "$26-$75", test: (p) => p >= 25 && p < 76 },
    { id: "76-150", label: "$76-$150", test: (p) => p >= 76 && p < 151 },
    { id: "151-250", label: "$151-$250", test: (p) => p >= 151 && p < 251 },
    { id: "251-plus", label: "$251+", test: (p) => p >= 251 },
  ];

const PER_PAGE = 24;
const EMPTY_FACETS: ThemeFacet[] = [];

/** Collapsible facet panel with a coloured accent rail. */
function FacetPanel({
  title,
  accent,
  children,
  defaultOpen = true,
}: {
  title: string;
  accent: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="facet-panel" style={{ ["--facet-accent" as string]: accent }}>
      <button
        type="button"
        className="facet-heading"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="inline-flex items-center gap-1.5">
          <span className="facet-caret">{open ? "▼" : "►"}</span>
          {title}
        </span>
      </button>
      {open && <div className="facet-body">{children}</div>}
    </section>
  );
}

function CheckRow({
  label,
  count,
  checked,
  onChange,
}: {
  label: string;
  count: number;
  checked: boolean;
  onChange: () => void;
}) {
  if (count === 0) return null;
  return (
    <label className="facet-row">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span>{label}</span>
      <span className="facet-count">{count}</span>
    </label>
  );
}

function hitsFacet(product: Product, selected: string[], facets: ThemeFacet[]) {
  if (!selected.length) return true;
  const hay = product.name.toLowerCase();
  return facets
    .filter((f) => selected.includes(f.id))
    .some((f) => f.keywords.some((k) => hay.includes(k.toLowerCase())));
}

function etaLabel(iso: string) {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString("en-US", { month: "short", year: "numeric" });
}

function ReadMore({
  tagline,
  description,
}: {
  tagline?: string;
  description?: string;
}) {
  const [open, setOpen] = useState(false);
  if (!tagline && !description) return null;
  return (
    <div className="mt-1.5 max-w-[900px] text-[14px] leading-[21px] text-[#34495e]">
      {tagline && <p>{tagline}</p>}
      {open && description && <p className="mt-2">{description}</p>}
      {description && (
        <button
          type="button"
          className="read-more-btn"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
}

export function CatalogListing({
  title,
  heading,
  description,
  tagline,
  products,
  crumbs,
  banner,
  themeFacets,
}: {
  title: string;
  /** Results-column heading; defaults to the page title. */
  heading?: string;
  description?: string;
  tagline?: string;
  products: Product[];
  crumbs: { label: string; href?: string }[];
  /** Optional wide theme banner shown above the breadcrumb. */
  banner?: { src: string; alt: string; title?: string };
  themeFacets?: {
    themes?: ThemeFacet[];
    collections?: ThemeFacet[];
    characters?: ThemeFacet[];
  };
}) {
  const [sort, setSort] = useState<SortKey>("featured");
  const [show, setShow] = useState<"all" | "in-stock" | "pre-order">("all");
  const [types, setTypes] = useState<string[]>([]);
  const [companies, setCompanies] = useState<string[]>([]);
  const [buckets, setBuckets] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [exclusive, setExclusive] = useState(false);
  const [subthemes, setSubthemes] = useState<string[]>([]);
  const [collections, setCollections] = useState<string[]>([]);
  const [characters, setCharacters] = useState<string[]>([]);
  const [etas, setEtas] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const subthemeFacets = themeFacets?.themes ?? EMPTY_FACETS;
  const collectionFacets = themeFacets?.collections ?? EMPTY_FACETS;
  const characterFacets = themeFacets?.characters ?? EMPTY_FACETS;

  const toggle =
    (setter: React.Dispatch<React.SetStateAction<string[]>>) =>
    (value: string) => {
      setter((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
      );
      setPage(1);
    };

  const count = (fn: (p: Product) => boolean) => products.filter(fn).length;

  const list = useMemo(() => {
    let next = products.filter((p) => {
      if (show === "in-stock" && p.status !== "in-stock") return false;
      if (show === "pre-order" && p.status !== "pre-order") return false;
      if (exclusive && !p.exclusive) return false;
      if (types.length && !types.includes(p.category)) return false;
      if (companies.length && !companies.includes(p.brand)) return false;
      if (recent.length) {
        const hit =
          (recent.includes("new") && p.newArrival) ||
          (recent.includes("just") && p.justAdded);
        if (!hit) return false;
      }
      if (buckets.length) {
        const hit = PRICE_BUCKETS.filter((b) => buckets.includes(b.id)).some((b) =>
          b.test(p.price),
        );
        if (!hit) return false;
      }
      if (!hitsFacet(p, subthemes, subthemeFacets)) return false;
      if (!hitsFacet(p, collections, collectionFacets)) return false;
      if (!hitsFacet(p, characters, characterFacets)) return false;
      if (etas.length) {
        if (!p.releaseDate || !etas.includes(etaLabel(p.releaseDate))) return false;
      }
      return true;
    });

    next = [...next].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "name-desc") return b.name.localeCompare(a.name);
      if (sort === "newest") return Number(!!b.newArrival) - Number(!!a.newArrival);
      if (sort === "just-added") return Number(!!b.justAdded) - Number(!!a.justAdded);
      return Number(!!b.trending) - Number(!!a.trending);
    });
    return next;
  }, [
    products,
    sort,
    show,
    types,
    companies,
    buckets,
    recent,
    exclusive,
    subthemes,
    collections,
    characters,
    etas,
    subthemeFacets,
    collectionFacets,
    characterFacets,
  ]);

  const pageCount = Math.max(1, Math.ceil(list.length / PER_PAGE));
  const current = Math.min(page, pageCount);
  const start = (current - 1) * PER_PAGE;
  const pageItems = list.slice(start, start + PER_PAGE);

  const activeTypes = categories.filter((c) =>
    products.some((p) => p.category === c.slug),
  );
  const activeBrands = brands.filter((b) => products.some((p) => p.brand === b.name));

  const etaOptions = useMemo(() => {
    const map = new Map<string, number>();
    products.forEach((p) => {
      if (!p.releaseDate) return;
      const label = etaLabel(p.releaseDate);
      map.set(label, (map.get(label) ?? 0) + 1);
    });
    return [...map.entries()].map(([label, n]) => ({ id: label, label, count: n }));
  }, [products]);

  return (
    <>
      {banner && (
        <div className="theme-banner">
          <Image
            src={banner.src}
            alt={banner.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_40%]"
          />
          {banner.title && (
            <div className="theme-banner-scrim">
              <span className="theme-banner-title">{banner.title}</span>
            </div>
          )}
        </div>
      )}

      <div className={`container-ee pb-4 ${banner ? "pt-1.5" : "pt-4"}`}>
        <Breadcrumbs items={crumbs} />

      <h1 className="listing-title">{title}</h1>
      {tagline || banner ? (
        <ReadMore tagline={tagline} description={description} />
      ) : (
        description && (
          <p className="mt-1.5 max-w-[900px] text-[14px] leading-[21px] text-[#34495e]">
            {description}
          </p>
        )
      )}

      <div className="listing-shell mt-5">
        {/* ---------------- Facet sidebar ---------------- */}
        <aside className="listing-facets" aria-label="Filter products">
          <FacetPanel title="Newly Added" accent="#003366">
            <CheckRow
              label="New Arrivals"
              count={count((p) => !!p.newArrival)}
              checked={recent.includes("new")}
              onChange={() => toggle(setRecent)("new")}
            />
            <CheckRow
              label="Just Added"
              count={count((p) => !!p.justAdded)}
              checked={recent.includes("just")}
              onChange={() => toggle(setRecent)("just")}
            />
          </FacetPanel>

          <FacetPanel title="Hot Off The Truck" accent="#d501c0">
            <CheckRow
              label="Ship Ready"
              count={count((p) => !!p.shipReady)}
              checked={show === "in-stock"}
              onChange={() => {
                setShow((v) => (v === "in-stock" ? "all" : "in-stock"));
                setPage(1);
              }}
            />
            <CheckRow
              label="Exclusives"
              count={count((p) => !!p.exclusive)}
              checked={exclusive}
              onChange={() => {
                setExclusive((v) => !v);
                setPage(1);
              }}
            />
          </FacetPanel>

          {subthemeFacets.length > 0 && (
            <FacetPanel title="Theme" accent="#2980b9">
              {subthemeFacets.map((f) => (
                <CheckRow
                  key={f.id}
                  label={f.label}
                  count={count((p) => hitsFacet(p, [f.id], subthemeFacets))}
                  checked={subthemes.includes(f.id)}
                  onChange={() => toggle(setSubthemes)(f.id)}
                />
              ))}
            </FacetPanel>
          )}

          <FacetPanel title="Product Type" accent="#e67e22">
            {activeTypes.map((c) => (
              <CheckRow
                key={c.slug}
                label={c.name}
                count={count((p) => p.category === c.slug)}
                checked={types.includes(c.slug)}
                onChange={() => toggle(setTypes)(c.slug)}
              />
            ))}
          </FacetPanel>

          <FacetPanel title="Company" accent="#16a085">
            {activeBrands.map((b) => (
              <CheckRow
                key={b.name}
                label={b.name}
                count={count((p) => p.brand === b.name)}
                checked={companies.includes(b.name)}
                onChange={() => toggle(setCompanies)(b.name)}
              />
            ))}
          </FacetPanel>

          {etaOptions.length > 0 && (
            <FacetPanel title="ETA" accent="#c0392b">
              {etaOptions.map((opt) => (
                <CheckRow
                  key={opt.id}
                  label={opt.label}
                  count={opt.count}
                  checked={etas.includes(opt.id)}
                  onChange={() => toggle(setEtas)(opt.id)}
                />
              ))}
            </FacetPanel>
          )}

          <FacetPanel title="Price" accent="#8e44ad">
            {PRICE_BUCKETS.map((b) => (
              <CheckRow
                key={b.id}
                label={b.label}
                count={count((p) => b.test(p.price))}
                checked={buckets.includes(b.id)}
                onChange={() => toggle(setBuckets)(b.id)}
              />
            ))}
          </FacetPanel>

          {collectionFacets.length > 0 && (
            <FacetPanel title="Collection" accent="#27ae60">
              {collectionFacets.map((f) => (
                <CheckRow
                  key={f.id}
                  label={f.label}
                  count={count((p) => hitsFacet(p, [f.id], collectionFacets))}
                  checked={collections.includes(f.id)}
                  onChange={() => toggle(setCollections)(f.id)}
                />
              ))}
            </FacetPanel>
          )}

          {characterFacets.length > 0 && (
            <FacetPanel title="Character" accent="#d35400">
              {characterFacets.map((f) => (
                <CheckRow
                  key={f.id}
                  label={f.label}
                  count={count((p) => hitsFacet(p, [f.id], characterFacets))}
                  checked={characters.includes(f.id)}
                  onChange={() => toggle(setCharacters)(f.id)}
                />
              ))}
            </FacetPanel>
          )}
        </aside>

        {/* ---------------- Results ---------------- */}
        <div>
          <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
            <h2 className="listing-title">{heading ?? title}</h2>
            <button
              type="button"
              className="listing-save-search"
            >
              Save Search
            </button>
          </div>

          <div className="listing-toolbar">
            <p className="flex items-center gap-1.5">
              <span className="font-semibold">Show:</span>
              {(
                [
                  ["all", "All"],
                  ["in-stock", "In-Stock"],
                  ["pre-order", "Pre-Order"],
                ] as const
              ).map(([value, label], i) => (
                <span key={value} className="flex items-center gap-1.5">
                  {i > 0 && <span className="text-[#c4c9ce]">|</span>}
                  <button
                    type="button"
                    className="toolbar-link"
                    aria-current={show === value}
                    onClick={() => {
                      setShow(value);
                      setPage(1);
                    }}
                  >
                    {label}
                  </button>
                </span>
              ))}
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="page-btn"
                  onClick={() => setPage(1)}
                  disabled={current === 1}
                  aria-label="First page"
                >
                  «
                </button>
                <button
                  type="button"
                  className="page-btn"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={current === 1}
                  aria-label="Previous page"
                >
                  ‹
                </button>
                <span className="px-1">
                  Page <b>{current}</b> of {pageCount}
                </span>
                <button
                  type="button"
                  className="page-btn"
                  onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                  disabled={current === pageCount}
                  aria-label="Next page"
                >
                  ›
                </button>
                <button
                  type="button"
                  className="page-btn"
                  onClick={() => setPage(pageCount)}
                  disabled={current === pageCount}
                  aria-label="Last page"
                >
                  »
                </button>
              </div>

              <label className="flex items-center gap-2">
                <span className="sr-only">Sort by</span>
                <select
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value as SortKey);
                    setPage(1);
                  }}
                  className="listing-select"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <p className="listing-count my-3">
            {list.length === 0
              ? "No matching items"
              : `Showing ${start + 1} - ${Math.min(start + PER_PAGE, list.length)} of ${list.length} items:`}
          </p>

          <ProductGrid products={pageItems} />

          {pageCount > 1 && (
            <div className="mt-5 flex items-center justify-center gap-1">
              <button
                type="button"
                className="page-btn"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={current === 1}
              >
                ‹
              </button>
              <span className="px-2 text-[14px]">
                Page <b>{current}</b> of {pageCount}
              </span>
              <button
                type="button"
                className="page-btn"
                onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                disabled={current === pageCount}
              >
                ›
              </button>
            </div>
          )}
        </div>
        </div>
      </div>
    </>
  );
}

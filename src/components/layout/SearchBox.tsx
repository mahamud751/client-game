"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { searchProducts } from "@/data/catalog";
import { formatPrice } from "@/lib/format";

export function SearchBox({
  compact = false,
  onSubmitExtra,
}: {
  compact?: boolean;
  onSubmitExtra?: () => void;
}) {
  const router = useRouter();
  const wrap = useRef<HTMLDivElement>(null);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const results = useMemo(() => {
    const term = q.trim();
    if (term.length < 2) return [];
    return searchProducts(term).slice(0, 6);
  }, [q]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const goSearch = (term = q) => {
    const value = term.trim();
    router.push(value ? `/search?q=${encodeURIComponent(value)}` : "/shop");
    setOpen(false);
    onSubmitExtra?.();
  };

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    if (open && results[active]) {
      router.push(`/product/${results[active].slug}`);
      setOpen(false);
      onSubmitExtra?.();
      return;
    }
    goSearch();
  };

  return (
    <div ref={wrap} className={`relative ${compact ? "w-full" : "min-w-0 flex-1"}`}>
      <form onSubmit={onSearch} className="flex">
        <label htmlFor={compact ? "site-search-m" : "site-search"} className="sr-only">
          Search products
        </label>
        <input
          id={compact ? "site-search-m" : "site-search"}
          type="search"
          value={q}
          autoComplete="off"
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
            setActive(0);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (!open || results.length === 0) return;
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((i) => (i + 1) % results.length);
            }
            if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((i) => (i - 1 + results.length) % results.length);
            }
            if (e.key === "Escape") setOpen(false);
          }}
          placeholder="Search"
          className={`w-full border border-r-0 border-[#c4c4c4] bg-white px-3 text-[14px] outline-none transition focus:border-[#075aaa] ${
            compact ? "h-9 rounded-l" : "h-8 rounded-l"
          }`}
        />
        <button
          type="submit"
          className={`grid shrink-0 place-items-center rounded-r bg-[#d54215] text-white hover:bg-[#a33010] ${
            compact ? "h-9 w-11" : "h-8 w-11"
          }`}
          aria-label="Search"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="11" cy="11" r="6.5" />
            <path d="m16 16 4 4" />
          </svg>
        </button>
      </form>

      {open && q.trim().length >= 2 && (
        <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 overflow-hidden rounded-md border border-slate-200 bg-white shadow-xl">
          {results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-muted">No matches for “{q.trim()}”</p>
          ) : (
            <ul>
              {results.map((p, i) => (
                <li key={p.id}>
                  <Link
                    href={`/product/${p.slug}`}
                    onClick={() => {
                      setOpen(false);
                      onSubmitExtra?.();
                    }}
                    className={`flex items-center gap-3 px-3 py-2.5 ${i === active ? "bg-[#edf5fb]" : "hover:bg-slate-50"}`}
                  >
                    <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded border border-slate-200 bg-slate-50">
                      <Image src={p.image} alt="" fill className="object-cover" sizes="48px" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-[#1d354c]">{p.name}</span>
                      <span className="text-xs text-muted">
                        {p.brand} · {formatPrice(p.price)}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <button
            type="button"
            onClick={() => goSearch()}
            className="w-full border-t border-slate-100 px-4 py-2.5 text-left text-xs font-black uppercase tracking-wide text-[#075aaa] hover:bg-slate-50"
          >
            View all results for “{q.trim()}”
          </button>
        </div>
      )}
    </div>
  );
}

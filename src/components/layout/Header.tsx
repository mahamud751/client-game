"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { navLinks, site } from "@/data/catalog";
import { useCart } from "@/components/cart/CartProvider";

export function Header() {
  const { itemCount } = useCart();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    const term = q.trim();
    router.push(term ? `/search?q=${encodeURIComponent(term)}` : "/shop");
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink text-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md border border-white/20 lg:hidden"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="text-xl">{menuOpen ? "✕" : "☰"}</span>
        </button>

        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-lg font-black text-ink">
            CE
          </span>
          <div className="leading-tight">
            <span className="block text-base font-black tracking-tight sm:text-lg">
              {site.name}
            </span>
            <span className="hidden text-[10px] uppercase tracking-wider text-white/60 sm:block">
              Toys · Figures · Collectibles
            </span>
          </div>
        </Link>

        <form
          onSubmit={onSearch}
          className="mx-auto hidden min-w-0 flex-1 max-w-xl md:flex"
        >
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search figures, brands, themes…"
            className="w-full rounded-l-md border-0 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand"
          />
          <button
            type="submit"
            className="rounded-r-md bg-brand px-4 text-sm font-bold text-ink hover:bg-brand-dark"
          >
            Search
          </button>
        </form>

        <nav className="ml-auto flex items-center gap-1 sm:gap-2">
          <Link
            href="/account"
            className="rounded-md px-2 py-2 text-xs font-semibold hover:bg-white/10 sm:px-3 sm:text-sm"
          >
            Account
          </Link>
          <Link
            href="/help"
            className="hidden rounded-md px-3 py-2 text-sm font-semibold hover:bg-white/10 sm:inline"
          >
            Help
          </Link>
          <Link
            href="/cart"
            className="relative flex items-center gap-1.5 rounded-md bg-brand px-3 py-2 text-sm font-bold text-ink hover:bg-brand-dark"
          >
            <span aria-hidden>🛒</span>
            <span className="hidden sm:inline">Cart</span>
            {itemCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </Link>
        </nav>
      </div>

      {/* Mobile search */}
      <form
        onSubmit={onSearch}
        className="flex gap-0 border-t border-white/10 px-4 py-2 md:hidden"
      >
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search…"
          className="w-full rounded-l-md bg-white px-3 py-2 text-sm text-ink"
        />
        <button
          type="submit"
          className="rounded-r-md bg-brand px-3 text-sm font-bold text-ink"
        >
          Go
        </button>
      </form>

      {/* Category nav */}
      <nav className="hidden border-t border-white/10 bg-ink lg:block">
        <ul className="mx-auto flex max-w-7xl items-center gap-0 overflow-x-auto px-4 sm:px-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block whitespace-nowrap px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-white/85 transition-colors hover:bg-white/10 hover:text-brand"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <nav className="border-t border-white/10 bg-ink lg:hidden">
          <ul className="max-h-[70vh] overflow-y-auto px-2 py-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-md px-3 py-3 text-sm font-semibold hover:bg-white/10"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/shop"
                onClick={() => setMenuOpen(false)}
                className="block rounded-md px-3 py-3 text-sm font-semibold text-brand"
              >
                Shop All
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

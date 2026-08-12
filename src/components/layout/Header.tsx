"use client";

import Link from "next/link";
import { useState } from "react";
import { brands, categories, themes } from "@/data/catalog";
import { useCart } from "@/components/cart/CartProvider";
import { SearchBox } from "./SearchBox";

const Icon = ({
  name,
}: {
  name: "menu" | "user" | "help" | "cart" | "close";
}) => {
  const paths = {
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    user: (
      <>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20c.6-4 3-6 7-6s6.4 2 7 6" />
      </>
    ),
    help: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.8 9a2.3 2.3 0 0 1 4.5.7c0 1.8-2.3 2-2.3 3.8M12 17h.01" />
      </>
    ),
    cart: (
      <>
        <path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 2-1.6L20.5 8H6" />
        <circle cx="10" cy="20" r="1" />
        <circle cx="18" cy="20" r="1" />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {paths[name]}
    </svg>
  );
};

const mainNav = [
  { href: "/new", label: "Newly Added" },
  { href: "/shop?ready=1", label: "In Stock" },
  { href: "/pre-orders", label: "Pre-Orders" },
  { href: "/exclusives", label: "Exclusives" },
  { href: "/themes", label: "Popular Themes" },
  { href: "/deals", label: "Deals & Sales", accent: true },
];

export function Header() {
  const { itemCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white text-ink shadow-[0_2px_10px_rgba(15,30,50,.16)]">
      <a href="#maincontent" className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:bg-[#075aaa] focus:px-3 focus:py-2 focus:text-white">
        Skip to content
      </a>

      <div className="mx-auto flex max-w-[920px] items-center gap-3 px-3 py-2 sm:px-4 lg:gap-5">
        <button
          type="button"
          className="grid h-10 w-10 place-items-center text-[#173b61] lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <Icon name={menuOpen ? "close" : "menu"} />
        </button>

        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="Collector Earth home">
          <span className="logo-orbit">
            <span>CE</span>
          </span>
          <div className="hidden leading-[.82] sm:block">
            <span className="block text-[17px] font-black uppercase tracking-[-.07em] text-[#075aaa]">
              Collector
            </span>
            <span className="block text-[14px] font-black uppercase tracking-[-.035em] text-[#1b2937]">
              Earth
            </span>
          </div>
        </Link>

        <div className="hidden flex-1 md:block">
          <SearchBox />
        </div>

        <nav className="ml-auto flex items-center gap-1">
          <Link href="/account" className="header-action">
            <Icon name="user" />
            <span>Sign In</span>
          </Link>
          <Link href="/help" className="header-action hidden sm:flex">
            <Icon name="help" />
            <span>Help</span>
          </Link>
          <Link href="/cart" className="header-action relative">
            <Icon name="cart" />
            <span>Cart</span>
            {itemCount > 0 && (
              <b className="absolute right-0 top-0 grid h-5 min-w-5 place-items-center rounded-full bg-[#d8292f] px-1 text-[10px] text-white">
                {itemCount}
              </b>
            )}
          </Link>
        </nav>
      </div>

      <div className="px-3 pb-2.5 md:hidden">
        <SearchBox compact onSubmitExtra={() => setMenuOpen(false)} />
      </div>

      <nav className="relative hidden bg-[#17212b] lg:block" onMouseLeave={() => setShopOpen(false)}>
        <ul className="mx-auto flex max-w-[920px] items-stretch px-3">
          <li>
            <button
              onMouseEnter={() => setShopOpen(true)}
              onFocus={() => setShopOpen(true)}
              onClick={() => setShopOpen((v) => !v)}
              className="nav-link flex items-center gap-2 bg-[#075aaa]"
              aria-expanded={shopOpen}
            >
              Shop <span className="text-[10px]">▼</span>
            </button>
          </li>
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link className={`nav-link ${item.accent ? "nav-deal" : ""}`} href={item.href}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        {shopOpen && (
          <div
            className="absolute left-0 right-0 top-full border-b-4 border-[#075aaa] bg-white shadow-xl"
            onMouseEnter={() => setShopOpen(true)}
          >
            <div className="mx-auto grid max-w-[1440px] grid-cols-4 gap-8 px-8 py-7">
              <div>
                <h3 className="mega-title">Shop by product</h3>
                <div className="grid grid-cols-1">
                  {categories.map((c) => (
                    <Link key={c.slug} href={`/shop/${c.slug}`} className="mega-link" onClick={() => setShopOpen(false)}>
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="mega-title">Shop by fandom</h3>
                <div className="grid grid-cols-1">
                  {themes.slice(0, 8).map((t) => (
                    <Link key={t.slug} href={`/themes/${t.slug}`} className="mega-link" onClick={() => setShopOpen(false)}>
                      {t.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="mega-title">Shop by brand</h3>
                <div className="grid grid-cols-1">
                  {brands.slice(0, 8).map((b) => (
                    <Link
                      key={b.name}
                      href={`/search?q=${encodeURIComponent(b.name)}`}
                      className="mega-link"
                      onClick={() => setShopOpen(false)}
                    >
                      {b.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="rounded-md bg-[#edf5fb] p-5">
                <p className="text-xs font-black uppercase tracking-[.16em] text-[#075aaa]">Collector favorites</p>
                <h3 className="mt-2 text-xl font-black text-[#183a5d]">Fresh arrivals every week</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Discover exclusives, pre-orders and display-ready collectibles from the brands you love.
                </p>
                <Link
                  href="/new"
                  onClick={() => setShopOpen(false)}
                  className="mt-4 inline-flex rounded bg-[#075aaa] px-5 py-2.5 text-xs font-black uppercase text-white"
                >
                  Explore new arrivals
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {menuOpen && (
        <nav className="max-h-[70vh] overflow-y-auto border-t bg-[#17212b] p-3 text-white lg:hidden">
          <p className="px-3 pb-2 text-[11px] font-black uppercase tracking-[.16em] text-white/50">Shop</p>
          <div className="grid grid-cols-2 gap-1">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/shop/${c.slug}`}
                onClick={() => setMenuOpen(false)}
                className="rounded px-3 py-2.5 text-sm font-semibold hover:bg-white/10"
              >
                {c.name}
              </Link>
            ))}
          </div>
          <div className="mt-3 grid border-t border-white/15 pt-3">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`px-3 py-2.5 font-bold ${item.accent ? "nav-deal" : "text-white"}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { brands, categories, featuredNav, themes } from "@/data/catalog";
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
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {paths[name]}
    </svg>
  );
};

/** Flat links in the black menu bar. */
const flatNav = [
  { href: "/new", label: "Newly Added", accent: true },
  { href: "/pre-orders", label: "Hot Off The Truck" },
  { href: "/deals", label: "Deals & Sales" },
  { href: "/shop?ready=1", label: "In Stock Now", accent: true },
];

type MenuKey = "theme" | "type" | "company" | "featured";

type MegaItem = {
  href: string;
  label: string;
  image?: string;
  count?: number;
};

export function Header() {
  const { itemCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);

  const dropdowns: {
    key: MenuKey;
    label: string;
    items: MegaItem[];
  }[] = [
    {
      key: "theme",
      label: "Theme",
      items: themes.map((t) => ({
        href: `/themes/${t.slug}`,
        label: t.name,
        image: t.image,
        count: t.count,
      })),
    },
    {
      key: "type",
      label: "Product Type",
      items: categories.map((c) => ({
        href: `/shop/${c.slug}`,
        label: c.name,
        image: c.image,
        count: c.count,
      })),
    },
    {
      key: "company",
      label: "Company",
      items: brands.map((b) => ({
        href: `/company/${b.slug}`,
        label: b.name,
        image: b.image,
        count: b.count,
      })),
    },
    {
      key: "featured",
      label: "Featured",
      items: featuredNav,
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white text-ink shadow-[0_2px_10px_rgba(15,30,50,.16)]">
      <a
        href="#maincontent"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:bg-[#075aaa] focus:px-3 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      {/* ---- White utility row: logo · search · account actions ---- */}
      <div className="container-ee flex h-[90px] items-center gap-4">
        <button
          type="button"
          className="grid h-10 w-10 shrink-0 place-items-center text-[#173b61] lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            {menuOpen ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>

        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5"
          aria-label="Collector Earth home"
        >
          <span className="grid h-[38px] w-[38px] place-items-center rounded-full border-[3px] border-[#111] bg-[#111] text-[13px] font-black italic text-white">
            CE
          </span>
          <span className="hidden text-[19px] font-bold uppercase tracking-[-.01em] text-[#111] sm:block">
            Collector Earth
          </span>
        </Link>

        <div className="hidden max-w-[618px] flex-1 md:flex">
          <SearchBox />
        </div>

        <nav className="ml-auto flex shrink-0 items-center">
          <Link href="/account" className="header-action">
            <Icon name="user" />
            <span>Sign In</span>
          </Link>
          <Link href="/help" className="header-action hidden sm:flex">
            <Icon name="help" />
            <span>Help</span>
          </Link>
          <Link href="/cart" className="header-action">
            <Icon name="cart" />
            <span>Cart ({itemCount})</span>
          </Link>
        </nav>
      </div>

      {/* ---- Mobile search ---- */}
      <div className="container-ee pb-2.5 md:hidden">
        <SearchBox compact onSubmitExtra={() => setMenuOpen(false)} />
      </div>

      {/* ---- Black main menu bar ---- */}
      <nav
        className="menu-bar relative hidden lg:block"
        onMouseLeave={() => setOpenMenu(null)}
      >
        <ul className="container-ee flex items-stretch">
          <li>
            <Link className="nav-link" href="/shop">
              Drop Zone!
            </Link>
          </li>
          {flatNav.slice(0, 2).map((item) => (
            <li key={item.href}>
              <Link
                className={`nav-link ${item.accent ? "nav-deal" : ""}`}
                href={item.href}
              >
                {item.label}
              </Link>
            </li>
          ))}

          {dropdowns.slice(0, 3).map((menu) => (
            <li key={menu.key}>
              <button
                type="button"
                onMouseEnter={() => setOpenMenu(menu.key)}
                onFocus={() => setOpenMenu(menu.key)}
                onClick={() =>
                  setOpenMenu((v) => (v === menu.key ? null : menu.key))
                }
                className={`nav-link ${openMenu === menu.key ? "bg-[#075aaa]" : ""}`}
                aria-expanded={openMenu === menu.key}
              >
                {menu.label} <span className="text-[9px]">▼</span>
              </button>
            </li>
          ))}

          {flatNav.slice(2).map((item) => (
            <li key={item.href}>
              <Link
                className={`nav-link ${item.accent ? "nav-deal" : ""}`}
                href={item.href}
              >
                {item.label}
              </Link>
            </li>
          ))}

          <li className="relative">
            <button
              type="button"
              onMouseEnter={() => setOpenMenu("featured")}
              onFocus={() => setOpenMenu("featured")}
              onClick={() =>
                setOpenMenu((v) => (v === "featured" ? null : "featured"))
              }
              className={`nav-link ${openMenu === "featured" ? "bg-[#075aaa]" : ""}`}
              aria-expanded={openMenu === "featured"}
            >
              Featured <span className="text-[9px]">▼</span>
            </button>
            {openMenu === "featured" && (
              <div className="featured-dropdown">
                {featuredNav.map((item) => (
                  <Link
                    key={item.href + item.label}
                    href={item.href}
                    onClick={() => setOpenMenu(null)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </li>
        </ul>

        {openMenu && openMenu !== "featured" && (
          <div
            className="mega-panel"
            onMouseEnter={() => setOpenMenu(openMenu)}
          >
            <div className="container-ee py-5">
              {(() => {
                const menu = dropdowns.find((d) => d.key === openMenu);
                if (!menu) return null;
                return (
                  <>
                    <h3 className="mega-title">{menu.label}</h3>
                    <div className="mega-grid">
                      {menu.items.map((item) => (
                        <Link
                          key={item.href + item.label}
                          href={item.href}
                          className="mega-item"
                          onClick={() => setOpenMenu(null)}
                        >
                          <span className="mega-thumb">
                            <Image
                              src={item.image ?? ""}
                              alt=""
                              fill
                              sizes="56px"
                              className="object-cover"
                            />
                          </span>
                          <span className="mega-copy">
                            <span className="mega-name">{item.label}</span>
                            {item.count != null && (
                              <span className="mega-count">
                                {item.count.toLocaleString()}
                              </span>
                            )}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        )}
      </nav>

      {/* ---- Mobile drawer ---- */}
      {menuOpen && (
        <nav className="max-h-[70vh] overflow-y-auto border-t bg-[#000] p-3 text-white lg:hidden">
          <p className="px-3 pb-2 text-[12px] font-bold uppercase tracking-[.16em] text-white/50">
            Shop
          </p>
          <div className="grid grid-cols-2 gap-1">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/shop/${c.slug}`}
                onClick={() => setMenuOpen(false)}
                className="rounded px-3 py-2.5 text-[14px] font-semibold hover:bg-white/10"
              >
                {c.name}
              </Link>
            ))}
          </div>
          <div className="mt-3 grid border-t border-white/15 pt-3">
            {flatNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`px-3 py-2.5 text-[14px] font-semibold uppercase ${
                  item.accent ? "nav-deal" : "text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/themes"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2.5 text-[14px] font-semibold uppercase text-white"
            >
              Popular Themes
            </Link>
            <Link
              href="/exclusives"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2.5 text-[14px] font-semibold uppercase text-white"
            >
              Exclusives
            </Link>
            <Link
              href="/testimonials"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2.5 text-[14px] font-semibold uppercase text-white"
            >
              Testimonials
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

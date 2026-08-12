# Collector Earth — Collectibles E‑Commerce (Next.js 16.3)

Demo storefront for a client project. Layout and page structure are **inspired by** leading collectibles retailers (promo bar, mega nav, hero carousel, New & Trending / Just Added / Ship Ready sections, popular themes, trust guarantees, cart).

**Not a copy of Entertainment Earth.** Branding, product catalog, and images are original sample/demo content (Unsplash). No affiliation.

## Stack

- **Next.js 16.3** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, carousels, themes, why shop, trust |
| `/shop` | All products |
| `/shop/[category]` | Category listing |
| `/product/[slug]` | Product detail + add to cart |
| `/cart` | Cart (localStorage) |
| `/new` | New & Trending |
| `/exclusives` | Exclusives |
| `/pre-orders` | Pre-orders |
| `/themes` · `/themes/[slug]` | Franchise themes |
| `/search?q=` | Search |
| `/account` | Account (demo) |
| `/help` | FAQ |
| `/testimonials` | Testimonials |

## Customize

- Catalog & site config: `src/data/catalog.ts`
- Cart: `src/components/cart/CartProvider.tsx`
- Theme colors: `src/app/globals.css`

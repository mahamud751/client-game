import { BrandCarousel } from "@/components/home/BrandCarousel";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { TestimonialBlock } from "@/components/home/TestimonialBlock";
import { HomeProductShelf } from "@/components/home/HomeProductShelf";
import { PromoTiles } from "@/components/home/PromoTiles";
import { ThemeGrid } from "@/components/home/ThemeGrid";
import { WhyShop } from "@/components/home/WhyShop";
import {
  banners,
  getJustAdded,
  getShipReady,
  getTrending,
  themes,
} from "@/data/catalog";

export default function HomePage() {
  return (
    <>
      <BrandCarousel />
      <HeroCarousel banners={banners} />
      <HomeProductShelf
        title="New & Trending"
        products={getTrending()}
        href="/new"
      />
      <HomeProductShelf
        title="Just Added"
        products={getJustAdded()}
        href="/new?filter=just-added"
      />
      <HomeProductShelf
        title="Ship Ready Favorites"
        products={getShipReady()}
        href="/shop?ready=1"
      />
      <ThemeGrid themes={themes} />
      <WhyShop />
      <PromoTiles />
      <TestimonialBlock />
    </>
  );
}

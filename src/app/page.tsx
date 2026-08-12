import { HeroCarousel } from "@/components/home/HeroCarousel";
import { TestimonialBlock } from "@/components/home/TestimonialBlock";
import { ThemeGrid } from "@/components/home/ThemeGrid";
import { TrustStrip } from "@/components/home/TrustStrip";
import { WhyShop } from "@/components/home/WhyShop";
import { ProductCarousel } from "@/components/product/ProductCarousel";
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
      <HeroCarousel banners={banners} />
      <ProductCarousel
        title="New & Trending"
        products={getTrending()}
        viewAllHref="/new"
      />
      <ProductCarousel
        title="Just Added"
        products={getJustAdded()}
        viewAllHref="/new?filter=just-added"
      />
      <ProductCarousel
        title="Ship Ready Favorites"
        products={getShipReady()}
        viewAllHref="/shop?ready=1"
      />
      <ThemeGrid themes={themes} />
      <WhyShop />
      <TestimonialBlock />
      <TrustStrip />
    </>
  );
}

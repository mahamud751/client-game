"use client";

import { usePathname } from "next/navigation";
import { BrandCarousel } from "@/components/home/BrandCarousel";
import { Header } from "@/components/layout/Header";
import { PromoBar } from "@/components/layout/PromoBar";

export function ConditionalSiteChrome() {
  const pathname = usePathname();
  const isGuestCheckout = pathname.startsWith("/checkout/guest");
  const isDistribution = pathname.startsWith("/ee-distribution");

  if (isGuestCheckout || isDistribution) return null;

  return (
    <>
      <PromoBar />
      <Header />
      {pathname !== "/cart" && !pathname.startsWith("/checkout") && (
        <BrandCarousel />
      )}
    </>
  );
}

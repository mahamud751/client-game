import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import { CartProvider } from "@/components/cart/CartProvider";
import { BrandCarousel } from "@/components/home/BrandCarousel";
import { BackToTop } from "@/components/layout/BackToTop";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PromoBar } from "@/components/layout/PromoBar";
import { site } from "@/data/catalog";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "900"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name}: ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Shop action figures, vinyl, statues, model kits, exclusives, and pre-orders. Mint condition guarantee and hassle-free returns.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sourceSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <CartProvider>
          <PromoBar />
          <Header />
          <BrandCarousel />
          <main id="maincontent" className="flex-1">
            {children}
          </main>
          <Footer />
          <BackToTop />
        </CartProvider>
      </body>
    </html>
  );
}

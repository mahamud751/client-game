import type { Metadata } from "next";
import { CartProvider } from "@/components/cart/CartProvider";
import { BackToTop } from "@/components/layout/BackToTop";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PromoBar } from "@/components/layout/PromoBar";
import { site } from "@/data/catalog";
import "./globals.css";

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
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <CartProvider>
          <PromoBar />
          <Header />
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

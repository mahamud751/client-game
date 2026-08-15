import { site } from "@/data/catalog";

export function PromoBar() {
  return (
    <div className="pencil-bar">Free Shipping on ${site.freeShippingMin}+</div>
  );
}

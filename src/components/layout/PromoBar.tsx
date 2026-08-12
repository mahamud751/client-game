import Link from "next/link";
import { site } from "@/data/catalog";

export function PromoBar() {
  return (
    <div className="bg-brand text-center text-sm font-semibold text-ink">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4 py-2">
        <span>Free Shipping on ${site.freeShippingMin}+</span>
        <span className="hidden text-ink/40 sm:inline">|</span>
        <Link href="/pre-orders" className="underline-offset-2 hover:underline">
          Pre-Order · No Deposit Required
        </Link>
        <span className="hidden text-ink/40 md:inline">|</span>
        <Link
          href="/help#mint"
          className="hidden underline-offset-2 hover:underline md:inline"
        >
          Mint Condition Guarantee
        </Link>
      </div>
    </div>
  );
}

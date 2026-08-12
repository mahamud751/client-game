import Link from "next/link";
import { categories, site } from "@/data/catalog";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-sm font-black text-ink">
              CE
            </span>
            <span className="text-lg font-black">{site.name}</span>
          </div>
          <p className="mt-3 text-sm text-white/70">{site.tagline}</p>
          <p className="mt-4 text-sm text-white/60">
            Demo storefront for client preview. Layout inspired by leading
            collectibles retailers — original brand & sample catalog.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-brand">
            Shop
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            {categories.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/shop/${c.slug}`}
                  className="hover:text-brand hover:underline"
                >
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/themes" className="hover:text-brand hover:underline">
                Popular Themes
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-brand">
            Help Center
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li>
              <Link href="/help" className="hover:text-brand hover:underline">
                FAQ
              </Link>
            </li>
            <li>
              <Link
                href="/help#shipping"
                className="hover:text-brand hover:underline"
              >
                Shipping
              </Link>
            </li>
            <li>
              <Link
                href="/help#returns"
                className="hover:text-brand hover:underline"
              >
                Returns
              </Link>
            </li>
            <li>
              <Link
                href="/help#mint"
                className="hover:text-brand hover:underline"
              >
                Mint Condition Guarantee
              </Link>
            </li>
            <li>
              <Link
                href="/testimonials"
                className="hover:text-brand hover:underline"
              >
                Testimonials
              </Link>
            </li>
            <li>
              <Link href="/account" className="hover:text-brand hover:underline">
                My Account
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-brand">
            Contact
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="hover:text-brand hover:underline"
              >
                Email Us
              </a>
            </li>
            <li>
              <a
                href={`tel:${site.phone.replace(/-/g, "")}`}
                className="hover:text-brand hover:underline"
              >
                {site.phone}
              </a>
            </li>
            <li className="text-white/60">{site.hours.weekdays}</li>
            <li className="text-white/60">{site.hours.friday}</li>
          </ul>

          <div className="mt-6">
            <label
              htmlFor="footer-email"
              className="text-sm font-bold text-brand"
            >
              Join — Sign-Up for Free Messages
            </label>
            <div className="mt-2 flex">
              <input
                id="footer-email"
                type="email"
                name="email"
                placeholder="Email address"
                className="w-full rounded-l-md border-0 px-3 py-2 text-sm text-ink"
              />
              <button
                type="button"
                className="rounded-r-md bg-brand px-4 text-sm font-bold text-ink hover:bg-brand-dark"
              >
                Join
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} {site.name}. Demo e-commerce storefront.
        Not affiliated with Entertainment Earth or any licensed brand.
      </div>
    </footer>
  );
}

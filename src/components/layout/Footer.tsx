import Link from "next/link";
import { categories, site } from "@/data/catalog";

const socials = [
  { name: "Facebook", d: "M13.5 21v-7.5h2.5l.4-2.9h-2.9V8.7c0-.84.23-1.41 1.44-1.41h1.54V4.7A20 20 0 0 0 14.24 4c-2.22 0-3.74 1.36-3.74 3.85v2.15H8v2.9h2.5V21z" },
  { name: "Twitter", d: "M21 6.1c-.66.3-1.37.5-2.12.59a3.7 3.7 0 0 0 1.62-2.04c-.71.42-1.5.73-2.34.9a3.69 3.69 0 0 0-6.29 3.36A10.47 10.47 0 0 1 4.27 5.05a3.69 3.69 0 0 0 1.14 4.92c-.6-.02-1.17-.19-1.67-.46v.05a3.69 3.69 0 0 0 2.96 3.62c-.55.15-1.13.17-1.67.07a3.7 3.7 0 0 0 3.45 2.56A7.4 7.4 0 0 1 3 17.34a10.44 10.44 0 0 0 5.66 1.66c6.79 0 10.5-5.62 10.5-10.5v-.48c.72-.52 1.35-1.17 1.84-1.92z" },
  { name: "Instagram", d: "M12 7.6a4.4 4.4 0 1 0 0 8.8 4.4 4.4 0 0 0 0-8.8zm0 7.26a2.86 2.86 0 1 1 0-5.72 2.86 2.86 0 0 1 0 5.72zM17.6 7.4a1.03 1.03 0 1 1-2.05 0 1.03 1.03 0 0 1 2.05 0zM16.25 3.5h-8.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25zm2.7 12.75a2.7 2.7 0 0 1-2.7 2.7h-8.5a2.7 2.7 0 0 1-2.7-2.7v-8.5a2.7 2.7 0 0 1 2.7-2.7h8.5a2.7 2.7 0 0 1 2.7 2.7z" },
  { name: "YouTube", d: "M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.28 5 12 5 12 5s-6.28 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.72 19 12 19 12 19s6.28 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3z" },
  { name: "TikTok", d: "M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1 0-5.18c.27 0 .53.04.77.12v-3.2a5.86 5.86 0 0 0-.77-.05 5.72 5.72 0 1 0 5.72 5.72V9.01a7.35 7.35 0 0 0 4.29 1.38V7.3a4.28 4.28 0 0 1-3.27-1.48z" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto">
      {/* ---- Band 1: link columns + newsletter ---- */}
      <div className="bg-[#edeff1] py-8">
        <div className="container-ee grid gap-7 sm:grid-cols-2 lg:grid-cols-6">
          <div>
            <h3 className="footer-heading">Got a Question?</h3>
            <ul>
              <li>
                <Link href="/help" className="footer-link">
                  Help Center - FAQ
                </Link>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="footer-link">
                  Email Us
                </a>
              </li>
              <li>
                <Link href="/help" className="footer-link">
                  Live Chat
                </Link>
              </li>
              <li>
                <a
                  href={`tel:${site.phone.replace(/-/g, "")}`}
                  className="footer-link"
                >
                  {site.phone}
                </a>
              </li>
            </ul>
            <p className="mt-2 text-[13px] leading-[21px] text-[#5e656e]">
              {site.hours.weekdays}
              <br />
              {site.hours.friday}
            </p>
          </div>

          <div>
            <h3 className="footer-heading">Browse and Explore</h3>
            <ul>
              <li>
                <Link href="/shop" className="footer-link">
                  Shop All
                </Link>
              </li>
              <li>
                <Link href="/new" className="footer-link">
                  Newly Added
                </Link>
              </li>
              <li>
                <Link href="/pre-orders" className="footer-link">
                  Pre-Orders
                </Link>
              </li>
              <li>
                <Link href="/exclusives" className="footer-link">
                  Exclusives
                </Link>
              </li>
              <li>
                <Link href="/themes" className="footer-link">
                  Popular Themes
                </Link>
              </li>
              <li>
                <Link href="/deals" className="footer-link">
                  Deals &amp; Sales
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer-heading">Your Account</h3>
            <ul>
              <li>
                <Link href="/account" className="footer-link">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/help#returns" className="footer-link">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/account" className="footer-link">
                  Alerts and Subscriptions
                </Link>
              </li>
              <li>
                <Link href="/account" className="footer-link">
                  Wish Lists
                </Link>
              </li>
              <li>
                <Link href="/account" className="footer-link">
                  Addresses
                </Link>
              </li>
              <li>
                <Link href="/account" className="footer-link">
                  Payments
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer-heading">Volume Pricing</h3>
            <ul>
              <li>
                <Link href="/help" className="footer-link">
                  Wholesale Ordering
                </Link>
              </li>
              <li>
                <Link href="/help" className="footer-link">
                  Case Discounts
                </Link>
              </li>
              {categories.slice(0, 4).map((c) => (
                <li key={c.slug}>
                  <Link href={`/shop/${c.slug}`} className="footer-link">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="footer-heading">Behind the Scenes</h3>
            <ul>
              <li>
                <Link href="/help" className="footer-link">
                  About {site.name}
                </Link>
              </li>
              <li>
                <Link href="/help" className="footer-link">
                  How to Buy from Us
                </Link>
              </li>
              <li>
                <Link href="/help" className="footer-link">
                  How to Sell to Us
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="footer-link">
                  Press Center
                </Link>
              </li>
              <li>
                <Link href="/help" className="footer-link">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer-heading">
              Get Exclusive News, Offers and Insider Deals!
            </h3>
            <label
              htmlFor="footer-email"
              className="mt-2 block text-[13px] font-semibold text-[#5e656e]"
            >
              Email
            </label>
            <div className="mt-1.5 flex">
              <input
                id="footer-email"
                type="email"
                name="email"
                placeholder="Email address"
                className="h-8 w-full rounded-l border border-[#c4c4c4] bg-white px-2.5 text-[14px] text-ink outline-none focus:border-[#075aaa]"
              />
              <button
                type="button"
                className="h-8 shrink-0 rounded-r bg-[#075aaa] px-4 text-[14px] font-semibold text-white hover:bg-[#064c91]"
              >
                Join
              </button>
            </div>

            <label
              htmlFor="footer-sms"
              className="mt-4 block text-[13px] font-semibold text-[#5e656e]"
            >
              Sign-Up for Text Messages
            </label>
            <div className="mt-1.5 flex">
              <input
                id="footer-sms"
                type="tel"
                name="sms"
                placeholder="Mobile number"
                className="h-8 w-full rounded-l border border-[#c4c4c4] bg-white px-2.5 text-[14px] text-ink outline-none focus:border-[#075aaa]"
              />
              <button
                type="button"
                className="h-8 shrink-0 rounded-r bg-[#075aaa] px-4 text-[14px] font-semibold text-white hover:bg-[#064c91]"
              >
                Join
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ---- Band 2: white trust strip ---- */}
      <div className="bg-white">
        <div className="container-ee grid gap-6 py-6 sm:grid-cols-3">
          <Link href="/help#mint" className="text-center">
            <p className="text-[15px] font-bold text-[#075aaa]">
              Mint Condition Guarantee™
            </p>
            <p className="mt-1 text-[13px] leading-[19px] text-[#5e656e]">
              Receive a perfect item with the best packaging possible — at no
              extra charge.
            </p>
          </Link>
          <Link href="/help#returns" className="text-center">
            <p className="text-[15px] font-bold text-[#075aaa]">
              Hassle-Free 90-Day Returns
            </p>
            <p className="mt-1 text-[13px] leading-[19px] text-[#5e656e]">
              Shop with us and enjoy easy returns if you are not completely
              thrilled.
            </p>
          </Link>
          <Link href="/help#risk-free" className="text-center">
            <p className="text-[15px] font-bold text-[#075aaa]">
              Shop Risk Free
            </p>
            <p className="mt-1 text-[13px] leading-[19px] text-[#5e656e]">
              We will not charge your credit card until items come in stock.
            </p>
          </Link>
        </div>
      </div>

      {/* ---- Band 3: social, legal, copyright ---- */}
      <div className="bg-[#e3e3e3] py-6">
        <div className="container-ee text-center">
          <div className="flex items-center justify-center gap-5">
            {socials.map((s) => (
              <a
                key={s.name}
                href="#"
                aria-label={s.name}
                className="text-[#54697e] hover:text-[#075aaa]"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
                  <path d={s.d} />
                </svg>
              </a>
            ))}
          </div>

          <p className="mt-5 text-[13px] leading-[21px] text-[#5e656e]">
            Product specifications, prices, ship dates, and availability are
            subject to change without notice.
          </p>
          <p className="mt-2 text-[13px] leading-[21px] text-[#5e656e]">
            Copyright {year} {site.name}. All Rights Reserved.
          </p>
          <p className="text-[13px] leading-[21px] text-[#5e656e]">
            This is a demonstration storefront. Products and offers are sample
            data.
          </p>

          <p className="mt-3 text-[13px] leading-[21px]">
            <Link href="/help" className="footer-link">
              Privacy
            </Link>
            <span className="px-2 text-[#9aa3ab]">|</span>
            <Link href="/help" className="footer-link">
              Accessibility Statement
            </Link>
            <span className="px-2 text-[#9aa3ab]">|</span>
            <Link href="/help" className="footer-link">
              Terms of Use
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

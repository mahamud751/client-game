import Link from "next/link";
import { categories, site } from "@/data/catalog";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[#cbd2d8] bg-[#edf0f2] text-[#52687d]">
      <div className="mx-auto grid max-w-[920px] gap-7 px-4 py-5 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="border-b border-[#cbd2d8] pb-1 text-xs font-bold">
            Help Center — FAQ
          </h3>
          <ul className="mt-2 space-y-1 text-[10px]">
            <li>
              <Link href="/help" className="hover:text-brand hover:underline">
                Help Center — FAQ
              </Link>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-brand hover:underline">
                Email Us
              </a>
            </li>
            <li>
              <Link href="/help" className="hover:text-brand hover:underline">
                Live Chat
              </Link>
            </li>
            <li>
              <a href={`tel:${site.phone.replace(/-/g, "")}`} className="hover:text-brand hover:underline">
                {site.phone}
              </a>
            </li>
            <li className="text-[#748494]">{site.hours.weekdays}</li>
            <li className="text-[#748494]">{site.hours.friday}</li>
          </ul>
        </div>

        <div>
          <h3 className="border-b border-[#cbd2d8] pb-1 text-xs font-bold">
            Shop
          </h3>
          <ul className="mt-2 space-y-1 text-[10px]">
            {categories.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <Link href={`/shop/${c.slug}`} className="hover:text-brand hover:underline">
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/themes" className="hover:text-brand hover:underline">
                Popular Themes
              </Link>
            </li>
            <li>
              <Link href="/deals" className="hover:text-brand hover:underline">
                Deals & Sales
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="border-b border-[#cbd2d8] pb-1 text-xs font-bold">
            Customer Care
          </h3>
          <ul className="mt-2 space-y-1 text-[10px]">
            <li>
              <Link href="/help#shipping" className="hover:text-brand hover:underline">
                Shipping
              </Link>
            </li>
            <li>
              <Link href="/help#returns" className="hover:text-brand hover:underline">
                Hassle-Free 90-Day Returns
              </Link>
            </li>
            <li>
              <Link href="/help#mint" className="hover:text-brand hover:underline">
                Mint Condition Guarantee™
              </Link>
            </li>
            <li>
              <Link href="/help#risk-free" className="hover:text-brand hover:underline">
                Shop Risk Free
              </Link>
            </li>
            <li>
              <Link href="/testimonials" className="hover:text-brand hover:underline">
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
          <h3 className="border-b border-[#cbd2d8] pb-1 text-xs font-bold">
            Join
          </h3>
          <label htmlFor="footer-email" className="mt-2 block text-[10px] font-bold">
            Sign-Up for Free Messages
          </label>
          <div className="mt-2 flex">
            <input
              id="footer-email"
              type="email"
              name="email"
              placeholder="Email address"
              className="w-full rounded-l border border-slate-300 px-2 py-1.5 text-[10px] text-ink"
            />
            <button type="button" className="rounded-r bg-[#075aaa] px-3 text-[10px] font-bold text-white">
              Join
            </button>
          </div>
          <label htmlFor="footer-sms" className="mt-3 block text-[10px] font-bold">
            Sign-Up for Text Messages
          </label>
          <div className="mt-2 flex">
            <input
              id="footer-sms"
              type="tel"
              name="sms"
              placeholder="Mobile number"
              className="w-full rounded-l border border-slate-300 px-2 py-1.5 text-[10px] text-ink"
            />
            <button type="button" className="rounded-r bg-[#075aaa] px-3 text-[10px] font-bold text-white">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-[#cbd2d8] bg-white">
        <div className="mx-auto grid max-w-[920px] gap-px sm:grid-cols-3">
          <Link href="/help#mint" className="px-5 py-5 text-center hover:bg-white/5">
            <p className="text-xs font-black text-[#075aaa]">Mint Condition Guarantee™</p>
            <p className="mt-1 text-[9px] text-[#6c7985]">
              Receive a perfect item with the best packaging possible — at no extra charge.
            </p>
          </Link>
          <Link href="/help#returns" className="px-5 py-5 text-center hover:bg-white/5">
            <p className="text-xs font-black text-[#075aaa]">Hassle-Free 90-Day Returns</p>
            <p className="mt-1 text-[9px] text-[#6c7985]">Shop with us and enjoy easy returns if you are not thrilled.</p>
          </Link>
          <Link href="/help#risk-free" className="px-5 py-5 text-center hover:bg-white/5">
            <p className="text-xs font-black text-[#075aaa]">Shop Risk Free</p>
            <p className="mt-1 text-[9px] text-[#6c7985]">We will not charge your card until items come in stock.</p>
          </Link>
        </div>
      </div>

      <div className="border-t border-[#cbd2d8] py-3 text-center text-[9px] text-[#748494]">
        © {new Date().getFullYear()} {site.name}. All rights reserved. Product details and availability are subject to
        change.
      </div>
    </footer>
  );
}

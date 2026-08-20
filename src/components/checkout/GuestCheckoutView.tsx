"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CheckoutSignInModal } from "@/components/checkout/CheckoutSignInModal";
import { useCart } from "@/components/cart/CartProvider";
import { site } from "@/data/catalog";
import { formatPrice } from "@/lib/format";

const states = [
  "AL - Alabama",
  "AK - Alaska",
  "AZ - Arizona",
  "CA - California",
  "FL - Florida",
  "NY - New York",
  "TX - Texas",
  "WA - Washington",
];

const countries = ["United States", "Canada", "United Kingdom", "Australia"];

function StepHeader({
  number,
  title,
  active,
  unlocked,
}: {
  number: number;
  title: string;
  active: boolean;
  unlocked: boolean;
}) {
  return (
    <div className={`guest-step-head ${active ? "active" : ""} ${unlocked ? "" : "locked"}`}>
      <span>{number}</span>
      <h2>{title}</h2>
    </div>
  );
}

export function GuestCheckoutView() {
  const { items, subtotal, itemCount, updateQty, removeItem } = useCart();
  const [step, setStep] = useState(1);
  const [giftOpen, setGiftOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const shipping = subtotal >= site.freeShippingMin ? 0 : 19.95;
  const total = subtotal + shipping;

  return (
    <>
      <header className="guest-checkout-header">
        <div className="container-ee">
          <Link href="/" className="guest-checkout-logo">
            <span>CE</span>
            <strong>Collector Earth</strong>
          </Link>
          <div className="guest-checkout-contact">
            <a href={`tel:${site.phone.replace(/[^0-9]/g, "")}`}>☎ {site.phone}</a>
            <a href={`mailto:${site.email}`}>✉ Email Us</a>
          </div>
        </div>
      </header>

      <div className="container-ee guest-checkout-page">
        <div className="guest-checkout-titlebar">
          <h1>Guest Checkout</h1>
          <span>Already have an account?</span>
          <button type="button" className="guest-signin-btn" onClick={() => setAuthOpen(true)}>
            Sign In
          </button>
          <span>or</span>
          <Link href="/checkout">Create an Account</Link>
        </div>

        <div className="guest-checkout-layout">
          <main>
            <button
              type="button"
              className="guest-gift-link"
              onClick={() => setGiftOpen(true)}
            >
              🎁 Add Gift Message (Optional)
            </button>

            <section className="guest-steps">
              <div className="guest-step active">
                <StepHeader number={1} title="Shipping Address" active unlocked />
                <div className="guest-step-body">
                  <p>Enter a Shipping Address</p>
                  <div className="guest-form-grid">
                    <input placeholder="Your Email - (confirmation will be sent here)" />
                    <input placeholder="City" />
                    <input placeholder="Recipient First Name" />
                    <select defaultValue="AL - Alabama">
                      {states.map((stateName) => (
                        <option key={stateName}>{stateName}</option>
                      ))}
                    </select>
                    <input placeholder="Recipient Last Name" />
                    <input placeholder="Zip / Postal Code" />
                    <input placeholder="Company (Optional)" />
                    <select defaultValue="United States">
                      {countries.map((country) => (
                        <option key={country}>{country}</option>
                      ))}
                    </select>
                    <input placeholder="Street and number, P.O.box, c/o." />
                    <div className="guest-phone-row">
                      <input placeholder="Phone" />
                      <input placeholder="Ext (Optional)" />
                    </div>
                    <input placeholder="Apartment, suite, unit, etc. (Optional)" />
                    <div className="guest-phone-row">
                      <input placeholder="Phone #2 (Optional)" />
                      <input placeholder="Ext (Optional)" />
                    </div>
                  </div>
                  <label className="guest-checkbox">
                    <input type="checkbox" /> Subscribe - Newsletters, Personalized Offers and More!
                  </label>
                  <button type="button" className="guest-orange-btn" onClick={() => setStep(2)}>
                    Continue
                  </button>
                </div>
              </div>

              <div className={`guest-step ${step >= 2 ? "active" : ""}`}>
                <StepHeader number={2} title="Shipping & Processing" active={step >= 2} unlocked={step >= 2} />
                {step >= 2 && (
                  <div className="guest-step-body">
                    <p>Select a Shipping Method</p>
                    <label className="guest-shipping-option">
                      <input type="radio" name="shipping-method" defaultChecked />
                      <span>
                        <strong>Super Saver Shipping</strong>
                        <small>Shipping & Processing — delivery timing shown at order review.</small>
                      </span>
                      <b>{shipping ? formatPrice(shipping) : "FREE"}</b>
                    </label>
                    <button type="button" className="guest-orange-btn guest-step-continue" onClick={() => setStep(3)}>
                      Continue
                    </button>
                  </div>
                )}
              </div>

              <div className={`guest-step ${step >= 3 ? "active" : ""}`}>
                <StepHeader number={3} title="Payment & Billing" active={step >= 3} unlocked={step >= 3} />
                {step >= 3 && (
                  <div className="guest-step-body">
                    <div className="guest-offer-row">
                      <input placeholder="Offer Code (Optional)" />
                      <button type="button">Apply</button>
                    </div>
                    <div className="guest-payment-tabs">
                      <button type="button" className="active">Credit Card</button>
                      <button type="button" disabled>PayPal In-stock items only.</button>
                    </div>
                    <h3>Credit/Debit Card</h3>
                    <div className="guest-card-icons" aria-hidden>
                      <span>Visa</span><span>MC</span><span>AmEx</span><span>Discover</span><span>JCB</span>
                    </div>
                    <div className="guest-payment-form">
                      <input placeholder="Credit or Debit Card Number (No Spaces)" />
                      <input placeholder="Name on Card" />
                      <div className="guest-exp-row">
                        <span>Expires:</span>
                        <select defaultValue="">
                          <option value="">MM</option>
                          {Array.from({ length: 12 }, (_, index) => `${index + 1}`.padStart(2, "0")).map((month) => (
                            <option key={month}>{month}</option>
                          ))}
                        </select>
                        <select defaultValue="">
                          <option value="">YYYY</option>
                          {Array.from({ length: 20 }, (_, index) => 2026 + index).map((year) => (
                            <option key={year}>{year}</option>
                          ))}
                        </select>
                        <input placeholder="CVV" maxLength={4} />
                      </div>
                    </div>
                    <button type="button" className="guest-orange-btn guest-step-continue">Continue</button>
                  </div>
                )}
              </div>
            </section>

            <section className="guest-cart-table">
              <div className="guest-cart-head">
                <span>Item</span><span>Quantity</span><span>Price</span><span>Subtotal</span>
              </div>
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="guest-cart-row">
                  <Link href={`/product/${product.slug}`} className="guest-cart-image">
                    <Image src={product.image} alt="" fill sizes="110px" className="object-contain" />
                  </Link>
                  <div>
                    <Link href={`/product/${product.slug}`} className="guest-cart-title">{product.name}</Link>
                    <p>Item #: {product.sku}</p>
                    <strong>{product.status === "in-stock" ? "In Stock" : "Estimated to Arrive in September 2026"}</strong>
                  </div>
                  <div className="guest-cart-qty">
                    <select value={quantity} onChange={(event) => updateQty(product.id, Number(event.target.value))}>
                      {Array.from({ length: 10 }, (_, index) => index + 1).map((value) => (
                        <option key={value} value={value}>{value}</option>
                      ))}
                    </select>
                    <button type="button" onClick={() => removeItem(product.id)}>Delete</button>
                  </div>
                  <span>{formatPrice(product.price)}</span>
                  <span>{formatPrice(product.price * quantity)}</span>
                </div>
              ))}
              {!itemCount && <p className="guest-cart-empty">Your cart is empty.</p>}
            </section>
          </main>

          <aside className="guest-summary">
            <div><span>Items</span><span>{formatPrice(subtotal)}</span></div>
            <div><span>Shipping & Processing<br /><small>(Super Saver)</small></span><span>{shipping ? formatPrice(shipping) : "FREE"}</span></div>
            <strong><span>Total</span><span>{formatPrice(total)}</span></strong>
          </aside>
        </div>
      </div>

      {giftOpen && (
        <div className="gift-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="gift-title">
          <div className="gift-modal">
            <div className="gift-modal-head">
              <h2 id="gift-title">Write A Gift Message (Optional)</h2>
              <button type="button" onClick={() => setGiftOpen(false)} aria-label="Close">×</button>
            </div>
            <div className="gift-modal-body">
              <p>Limit 6 lines or 210 characters of text. Be sure to include &quot;To&quot; and &quot;From.&quot; Gift packing slip will not display prices.</p>
              <textarea maxLength={210} rows={6} />
            </div>
            <div className="gift-modal-actions">
              <button type="button" className="gift-cancel" onClick={() => setGiftOpen(false)}>Cancel</button>
              <button type="button" className="guest-orange-btn" onClick={() => setGiftOpen(false)}>Save & Continue</button>
            </div>
          </div>
        </div>
      )}
      <CheckoutSignInModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}

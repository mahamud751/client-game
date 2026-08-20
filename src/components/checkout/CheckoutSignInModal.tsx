"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Tab = "signin" | "register";

export function CheckoutSignInModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<Tab>("signin");

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="checkout-auth-backdrop" role="dialog" aria-modal="true">
      <div className="checkout-auth-modal">
        <div className="checkout-auth-tabs">
          <button
            type="button"
            className={tab === "signin" ? "active" : ""}
            onClick={() => setTab("signin")}
          >
            Sign In
          </button>
          <button
            type="button"
            className={tab === "register" ? "active" : ""}
            onClick={() => setTab("register")}
          >
            New Customer?
          </button>
          <Link href="/ee-distribution">EE Distribution</Link>
          <button type="button" className="checkout-auth-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        {tab === "signin" ? (
          <section className="checkout-auth-panel">
            <h2>Sign In</h2>
            <form className="checkout-auth-form">
              <input type="email" placeholder="Email" aria-label="Email" />
              <input type="password" placeholder="Password" aria-label="Password" />
              <div className="checkout-auth-row">
                <label>
                  <input type="checkbox" /> Remember me?
                </label>
                <Link href="/help">Forgot Password?</Link>
              </div>
              <button type="button" className="checkout-auth-primary">
                Sign In
              </button>
            </form>
            <SocialButtons />
            <div className="checkout-auth-new">
              <span>New to Collector Earth?</span>
              <button type="button" onClick={() => setTab("register")}>
                Create An Account
              </button>
            </div>
          </section>
        ) : (
          <section className="checkout-auth-panel">
            <h2>Register</h2>
            <form className="checkout-auth-form">
              <input type="text" placeholder="First Name" aria-label="First Name" />
              <input type="text" placeholder="Last Name" aria-label="Last Name" />
              <input type="email" placeholder="Email" aria-label="Email" />
              <input type="password" placeholder="Password" aria-label="Password" />
              <input type="password" placeholder="Confirm Password" aria-label="Confirm Password" />
              <label className="checkout-auth-subscribe">
                <input type="checkbox" /> Subscribe - Newsletters, Personalized Offers and More!
              </label>
              <button type="button" className="checkout-auth-primary">
                Register
              </button>
            </form>
            <SocialButtons />
            <p className="checkout-auth-switch">
              Already have an account?{" "}
              <button type="button" onClick={() => setTab("signin")}>
                Sign In
              </button>
            </p>
          </section>
        )}
      </div>
    </div>
  );
}

function SocialButtons() {
  return (
    <div className="checkout-auth-social">
      <span>Or</span>
      <button type="button" className="checkout-social-btn">
        <span>G</span>
        Continue with Google
      </button>
      <button type="button" className="checkout-social-btn checkout-social-facebook">
        <span>f</span>
        Continue with Facebook
      </button>
    </div>
  );
}

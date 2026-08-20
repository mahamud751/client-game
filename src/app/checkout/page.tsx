import Link from "next/link";

export const metadata = {
  title: "Checkout",
};

export default function CheckoutPage() {
  return (
    <div className="checkout-entry container-ee">
      <section className="checkout-column">
        <div className="checkout-guest-card">
          <h1>Guest Checkout</h1>
          <p>You&apos;ll have the option to create an account after checkout.</p>
          <Link href="/checkout/guest" className="checkout-primary-btn">
            Continue as Guest
          </Link>
        </div>

        <div className="checkout-signin">
          <h2>Sign In</h2>
          <form className="checkout-form">
            <input type="email" placeholder="Email" aria-label="Email" />
            <input type="password" placeholder="Password" aria-label="Password" />
            <div className="checkout-form-row">
              <label>
                <input type="checkbox" /> Remember me?
              </label>
              <Link href="/help">Forgot Password?</Link>
            </div>
            <button type="button" className="checkout-primary-btn">
              Sign In
            </button>
          </form>
        </div>

        <div className="checkout-social">
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
      </section>

      <section className="checkout-column checkout-new-shopper">
        <h2>Welcome New Shopper!</h2>
        <form className="checkout-form">
          <input type="text" placeholder="First Name" aria-label="First Name" />
          <input type="text" placeholder="Last Name" aria-label="Last Name" />
          <input type="email" placeholder="Email" aria-label="Email" />
          <input type="password" placeholder="Password" aria-label="Password" />
          <input
            type="password"
            placeholder="Confirm Password"
            aria-label="Confirm Password"
          />
          <label className="checkout-subscribe">
            <input type="checkbox" /> Subscribe - Newsletters, Personalized Offers
            and More!
          </label>
          <Link href="/checkout/guest" className="checkout-primary-btn">
            Continue to Checkout
          </Link>
        </form>
      </section>
    </div>
  );
}

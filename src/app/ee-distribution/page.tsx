import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "EE Distribution",
};

const perks = [
  {
    title: "Decades of Experience",
    text: "As one of the largest and longest-running specialty toy distributors, we are trusted by top brands to deliver the best.",
  },
  {
    title: "Pop Culture Pros",
    text: "We stay ahead of trends to bring you products customers crave, with dedicated sales support and retail insight.",
  },
  {
    title: "Exclusive Products & Partnerships",
    text: "Gain access to hundreds of brands, thousands of themes, product categories, and exclusive products curated for demand.",
  },
];

const whyChoose = [
  "Thousands of products and brands from hundreds of manufacturers.",
  "Sales representatives with expert knowledge.",
  "A low $250 minimum first order requirement.",
  "No minimum for subsequent orders.",
  "Volume discounts.",
  "Personalized onboarding to kick off your business.",
  "24/7 access to our password-protected digital catalog.",
  "Ship directly to Amazon FBA and Walmart WFS warehouses.",
  "Industry expertise since 1996.",
];

const distributionBrands = [
  { name: "Funko", src: "/companies/banners/funko.svg" },
  { name: "Hasbro", src: "/companies/banners/hasbro.svg" },
  { name: "Mattel", src: "/companies/banners/mattel.svg" },
  { name: "Bandai", src: "/companies/banners/bandai.svg" },
  { name: "NECA", src: "/companies/banners/neca.svg" },
  { name: "Star Wars", src: "/brands/star-wars.svg" },
  { name: "Marvel", src: "/brands/marvel.svg" },
  { name: "DC", src: "/brands/dc.svg" },
  { name: "Transformers", src: "/brands/transformers.svg" },
  { name: "TMNT", src: "/brands/tmnt.svg" },
  { name: "Pokemon", src: "/brands/pokemon.svg" },
  { name: "One Piece", src: "/brands/one-piece.svg" },
  { name: "Godzilla", src: "/brands/godzilla.svg" },
  { name: "G.I. Joe", src: "/brands/gi-joe.svg" },
  { name: "Batman", src: "/brands/batman.svg" },
  { name: "Hot Wheels", src: "/brands/hot-wheels.svg" },
];

export default function EeDistributionPage() {
  return (
    <div className="eed-page">
      <header className="eed-header">
        <div className="eed-container">
          <Link href="/" className="eed-logo">
            <span>CE</span>
            <strong>EE Distribution</strong>
          </Link>
          <Link href="/checkout/guest" className="eed-signin">
            ♟ Sign In
          </Link>
        </div>
      </header>

      <section className="eed-hero">
        <div className="eed-hero-collage" aria-hidden>
          <Image src="/heroes/07-neon.jpg" alt="" width={280} height={380} />
          <Image src="/heroes/01-throne.jpg" alt="" width={360} height={380} />
          <Image src="/heroes/08-tactical.jpg" alt="" width={360} height={380} />
          <Image src="/products/transformer.jpg" alt="" width={330} height={380} />
          <Image src="/products/vinyl.jpg" alt="" width={250} height={380} />
        </div>
        <h1>Your #1 Source for Wholesale Action Figures, Collectible Toys, Pop Culture Gifts, Games, & More!</h1>
      </section>

      <main className="eed-container">
        <section className="eed-auth-grid">
          <div>
            <h2>Sign In</h2>
            <form className="eed-form">
              <input placeholder="Account Number or Email" />
              <input type="password" placeholder="Password" />
              <div className="eed-form-row">
                <label>
                  <input type="checkbox" /> Remember me?
                </label>
                <Link href="/help">Forgot Password?</Link>
              </div>
              <button type="button">Sign In</button>
            </form>
            <div className="eed-contact-card">
              <h3>Contact Hours</h3>
              <p>
                Monday through Thursday,
                <br />
                8:00 a.m. - 4:30 p.m. Pacific Time
                <br />
                Friday, 8:00 a.m. - 12:30 p.m. Pacific Time
                <br />
                EE Distribution: 1-818-255-0095
                <br />
                Fax: 1-818-255-0091
                <br />
                E-mail: <a href="mailto:sales@eedistribution.com">sales@eedistribution.com</a>
              </p>
            </div>
          </div>

          <div>
            <h2>Register</h2>
            <form className="eed-form">
              <input placeholder="First Name" />
              <input placeholder="Last Name" />
              <input type="email" placeholder="Email" />
              <input type="email" placeholder="Confirm Email" />
              <input placeholder="Company" />
              <select defaultValue="United States">
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
              </select>
              <div className="eed-phone-row">
                <input placeholder="Phone Number" />
                <input placeholder="Ext (Optional)" />
              </div>
              <select defaultValue="">
                <option value="">How did you find us?</option>
                <option>Search Engine</option>
                <option>Trade Show</option>
                <option>Referral</option>
              </select>
              <div className="eed-policy">
                <strong>Privacy Policy</strong>
                <p>
                  EE Distribution is a division of Collector Earth LLC. Information you submit is subject to Collector Earth&apos;s privacy policy.
                </p>
              </div>
              <label className="eed-agree">
                <input type="checkbox" /> Yes, I have read and agree to the Collector Earth privacy policy.
              </label>
              <button type="button">Sign Up</button>
            </form>
          </div>
        </section>

        <section className="eed-apart">
          <h2>What Sets Us Apart</h2>
          <div className="eed-perks">
            {perks.map((perk, index) => (
              <article key={perk.title}>
                <span>{index + 1}</span>
                <div>
                  <h3>{perk.title}</h3>
                  <p>{perk.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="eed-logos">
          <h2>Load Your Store<br />With The Hottest Action Figures, Toys, Gifts, & Collectibles!</h2>
          <div>
            {[...distributionBrands, ...distributionBrands, ...distributionBrands].map((brand, index) => (
              <span key={`${brand.name}-${index}`}>
                <Image src={brand.src} alt={brand.name} fill sizes="110px" className="object-contain" />
              </span>
            ))}
          </div>
        </section>

        <section className="eed-content-grid">
          <article>
            <h2>Interested in opening a wholesale account?</h2>
            <p>
              EE Distribution welcomes you to a brand-new world of unique and hard-to-find products for your business. You&apos;ll have an easy one-stop shopping experience with action figures, toys, gifts, and collectibles from hundreds of manufacturer lines.
            </p>
            <h3>Why choose us?</h3>
            <ul>
              {whyChoose.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h3>Sound interesting? Questions?</h3>
            <p>
              We personalize our service to you. Email <a href="mailto:sales@eedistribution.com">sales@eedistribution.com</a> or call 1-818-255-0095 to speak with a highly trained representative.
            </p>
            <h3>We have what your clients want!</h3>
            <p>
              Seekers of wholesale toy collectibles should browse the site and note the thousands of items currently available for resale, with a huge selection that changes and grows every day.
            </p>
          </article>
          <article>
            <h2>Link to thousands of highly sought-after products!</h2>
            <p>
              If you&apos;re looking for brand-name toys at discount prices, look no further. We carry a wide range of products from popular brands like Big Bang Pow!, Hasbro, Mattel, Bandai, Mezco Toyz, DC Collectibles, Banpresto, NECA, and more.
            </p>
            <p>
              Your customers may be shopping for birthdays, anniversaries, graduations, holidays, or just because. Our vast array of wholesale gift items is sure to fit the bill.
            </p>
            <h3>We want you to succeed!</h3>
            <p>
              EE Distribution helps businesses grow through increased sales and margins, high-volume packaging and freight rates, and small-package or freight services. Our tools make ordering efficient and future-ready.
            </p>
            <h3>Contact Hours</h3>
            <p>
              Monday through Thursday, 8:00 a.m. - 4:30 p.m. Pacific Time
              <br />
              Friday, 8:00 a.m. - 12:30 p.m. Pacific Time
            </p>
            <h2 className="eed-call">Have a Question? Give Us a Call.<br />1-818-255-0095</h2>
          </article>
        </section>
      </main>

      <footer className="eed-footer">
        <p>
          Need Help? E-mail an EE Distribution Representative at sales@eedistribution.com, or call 1-818-255-0095.
          <br />
          Copyright 1996-2026 Collector Earth. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}

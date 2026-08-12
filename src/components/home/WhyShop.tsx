const points = [
  {
    title: "Unmatched Selection",
    body: "Explore a massive catalog of toys, action figures, and collectibles from movies, TV, comics, and games — classics to today’s hottest drops.",
  },
  {
    title: "Exclusive Products",
    body: "Stand out with items you won’t find anywhere else. Special editions and limited releases available only at Collector Earth.",
  },
  {
    title: "Easy Pre-Orders",
    body: "Secure must-haves before release. No deposit required — pay only when your items are ready to ship.",
  },
  {
    title: "Fast & Reliable Delivery",
    body: "We prioritize speed and care so your collectibles arrive quickly and securely.",
  },
  {
    title: "Mint Condition Guarantee",
    body: "Every item ships collector-worthy. Our Mint Condition Guarantee keeps your collection display-ready.",
  },
  {
    title: "Hassle-Free 90-Day Returns",
    body: "Not thrilled? Our easy 90-day return policy has you covered.",
  },
  {
    title: "Built for Fans, by Fans",
    body: "Exclusive releases, previews of the latest collectibles, and a collecting experience made by people who love this stuff too.",
  },
];

export function WhyShop() {
  return (
    <section className="home-section bg-white py-5">
      <div>
        <div className="section-heading"><span>Why Shop with Collector Earth?</span></div>
        <p className="mb-3 text-xs text-[#435568]">
          More than a store — your destination for pop culture. Discover what makes us the best place for fans and
          collectors alike.
        </p>
        <div className="columns-1 gap-10 sm:columns-2">
          {points.map((p) => (
              <div key={p.title} className="mb-3 break-inside-avoid">
              <h3 className="text-xs font-black text-[#31465c]">{p.title}</h3>
              <p className="mt-1 text-[10px] leading-relaxed text-[#536578]">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

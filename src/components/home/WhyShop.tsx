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
];

export function WhyShop() {
  return (
    <section className="border-y border-border bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-bold text-ink sm:text-3xl">
          Why Shop with Collector Earth?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted">
          More than a store — your destination for pop culture. Here&apos;s what
          makes us the best place for fans and collectors.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {points.map((p) => (
            <div
              key={p.title}
              className="rounded-xl border border-border bg-background p-5 shadow-sm"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand text-lg font-black text-ink">
                ★
              </div>
              <h3 className="text-lg font-bold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

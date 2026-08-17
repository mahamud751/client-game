const points = [
  {
    title: "Unmatched Selection",
    body: "Explore our massive collection of toys, action figures, and collectibles from your favorite movies, TV shows, comics, and games. From timeless classics to today’s hottest releases, we have something for every fan and collector. Dive into a world where every item celebrates the icons you love!",
  },
  {
    title: "Exclusive Products",
    body: "Stand out with products you won’t find anywhere else. Our exclusive items are designed to give you that one-of-a-kind feeling, whether you’re adding to your collection or looking for the perfect gift. Get access to special editions and limited releases available only at Collector Earth.",
  },
  {
    title: "Pre-Order Now, Pay Later",
    body: "Secure the must-have items before they’re even released with our easy pre-order option. No deposit is required! Pay only when your items are ready to ship — because we know the best things are worth the wait.",
  },
  {
    title: "Fast & Reliable Delivery",
    body: "We know you’re excited to receive your items, so we prioritize fast and reliable shipping. Your order is handled with care and speed, ensuring it arrives quickly and securely every time.",
  },
  {
    title: "Mint Condition Guarantee",
    body: "Every item we ship is guaranteed to be in collector-worthy condition. Our Mint Condition Guarantee gives you confidence that every piece will be as perfect as it should be, ready to take its place in your collection.",
  },
  {
    title: "Hassle-Free 90-Day Returns",
    body: "Your satisfaction is our top priority. If you’re not completely thrilled with your purchase, our easy 90-day return policy has you covered. Shop with the peace of mind that your happiness is guaranteed.",
  },
  {
    title: "Built for Fans, by Fans",
    body: "We’re as passionate about pop culture as you are. That’s why we bring you exclusive releases, previews of the latest collectibles, and events that celebrate our shared love of fandom.",
  },
];

export function WhyShop() {
  return (
    <section className="home-section bg-white py-5">
      <div>
        <h2 className="section-heading">Why Shop with Collector Earth?</h2>
        <p className="mb-5 text-[24px] leading-[1.25] text-[#435568]">
          At Collector Earth, we&apos;re more than just a store – we&apos;re your ultimate destination for everything pop culture! Discover what makes us the best place for fans and collectors alike:
        </p>
        <div className="columns-1 gap-10 sm:columns-2">
          {points.map((p) => (
              <div key={p.title} className="mb-3 break-inside-avoid">
              <h3 className="text-[18px] font-bold text-[#31465c]">{p.title}</h3>
              <p className="mt-1 text-[14px] leading-[20px] text-[#536578]">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

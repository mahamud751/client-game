import Link from "next/link";

const items = [
  {
    title: "Mint Condition Guarantee™",
    body: "Receive a perfect item with the best packaging possible — at no extra charge.",
    href: "/help#mint",
  },
  {
    title: "Hassle-Free 90-Day Returns",
    body: "Shop with peace of mind. Easy returns if you’re not completely thrilled.",
    href: "/help#returns",
  },
  {
    title: "Shop Risk Free",
    body: "We will not charge your card until items come in stock.",
    href: "/help#risk-free",
  },
];

export function TrustStrip() {
  return (
    <section className="bg-ink py-8 text-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:grid-cols-3 sm:px-6">
        {items.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="rounded-lg border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
          >
            <h3 className="font-bold text-brand">{item.title}</h3>
            <p className="mt-2 text-sm text-white/80">{item.body}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

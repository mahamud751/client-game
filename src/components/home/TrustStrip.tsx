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
    <section className="border-y border-slate-300 bg-[#eef1f4] py-7 text-[#243b53]">
      <div className="mx-auto grid max-w-[1440px] gap-px overflow-hidden border border-slate-300 bg-slate-300 px-0 sm:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="bg-white p-5 text-center transition-colors hover:bg-slate-50"
          >
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#075aaa] text-xl font-black text-[#075aaa]">✓</div>
            <h3 className="font-extrabold text-[#075aaa]">{item.title}</h3>
            <p className="mt-2 text-sm text-muted">{item.body}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

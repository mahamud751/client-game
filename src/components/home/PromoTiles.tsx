import Link from "next/link";

const tiles = [
  ["LOOKING FOR", "DEALS?", "Sale", "/deals", "#f04a19"],
  ["MINT CONDITION", "GUARANTEE", "Collector Care", "/help#mint", "#16814b"],
  ["EXCLUSIVE", "DROPS", "Shop Now", "/exclusives", "#8c2995"],
  ["FAN FAVORITE", "ALL-STARS", "Shop Now", "/new", "#0875c1"],
];

export function PromoTiles() {
  return <section className="home-section grid gap-3 py-5 sm:grid-cols-2 lg:grid-cols-4">{tiles.map(([top, main, tag, href, color]) => <Link key={main} href={href} className="flex h-[105px] flex-col items-center justify-center border-2 border-white text-center text-white shadow ring-1 ring-slate-300" style={{ background: `linear-gradient(135deg, #151515, ${color})` }}><span className="text-xs font-bold">{top}</span><strong className="text-2xl font-black italic leading-none">{main}</strong><span className="mt-2 bg-black px-3 py-1 text-[8px] font-black uppercase">{tag}</span></Link>)}</section>;
}

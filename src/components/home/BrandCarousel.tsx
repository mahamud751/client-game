import Link from "next/link";

const brandMarks = [
  ["New & Trending", "NEW", "& TRENDING", "#72ad36"], ["Exclusives", "EXCLUSIVE", "COLLECTIBLES", "#272727"],
  ["Funko", "funko", "", "#171717"], ["Transformers", "AUTOBOT", "TRANSFORMERS", "#cf2636"],
  ["Star Wars", "STAR WARS", "", "#202020"], ["Marvel", "MARVEL", "", "#e62429"],
  ["Masters of the Universe", "MOTU", "MASTERS", "#66459a"], ["G.I. Joe", "G.I.JOE", "", "#37567b"],
  ["One Piece", "ONE PIECE", "", "#e9a722"], ["TMNT", "TURTLES", "", "#449334"],
  ["DC Comics", "DC", "COMICS", "#168ac5"], ["Hot Wheels", "HOT WHEELS", "", "#ef3439"],
];

export function BrandCarousel() {
  return (
    <section className="border-b border-slate-200 bg-white" aria-label="Featured themes and brands">
      <div className="relative mx-auto max-w-[920px] px-8">
        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-3xl font-light text-slate-300">‹</span>
        <div className="no-scrollbar flex h-[68px] snap-x items-center gap-7 overflow-x-auto">
          {brandMarks.map(([name, mark, sub, color]) => (
            <Link key={name} href={`/search?q=${encodeURIComponent(name)}`} className="flex w-[62px] shrink-0 snap-start flex-col items-center text-center leading-none transition hover:scale-105" title={name}>
              <span className={`font-black ${mark === "funko" ? "text-[21px] italic lowercase" : mark.length > 8 ? "text-[10px]" : "text-[16px]"}`} style={{ color }}>{mark}</span>
              {sub && <span className="mt-0.5 text-[7px] font-black" style={{ color }}>{sub}</span>}
            </Link>
          ))}
        </div>
        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-3xl font-light text-slate-300">›</span>
      </div>
    </section>
  );
}

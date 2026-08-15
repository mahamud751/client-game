import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";

export function HomeProductShelf({
  title,
  products,
  href,
}: {
  title: string;
  products: Product[];
  href: string;
}) {
  const list = products.slice(0, 11);
  return (
    <section className="home-section">
      <h2 className="section-heading">{title}</h2>
      <div className="grid auto-rows-fr grid-cols-2 sm:grid-cols-4 lg:grid-cols-6">
        {list.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="group flex h-[290px] min-w-0 flex-col border border-[#d9dde1] bg-white p-2.5"
          >
            <div className="relative h-[195px] w-full shrink-0 overflow-hidden bg-white">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 195px"
                className="object-contain p-2 transition-transform duration-300 group-hover:scale-[1.04]"
              />
            </div>
            <div className="flex min-h-0 flex-1 items-start border-t border-slate-100 pt-2.5">
              <p className="line-clamp-3 text-[13px] font-normal leading-[1.35] text-[#34495e] group-hover:text-[#075aaa] group-hover:underline">
                {product.name}
              </p>
            </div>
          </Link>
        ))}

        <Link
          href={href}
          className="flex h-[290px] flex-col items-center justify-center border border-[#d9dde1] bg-[#e9e9e9] p-4 text-center text-[#171717] hover:bg-[#dedede]"
        >
          <span className="text-[22px] font-black uppercase leading-tight">
            View All
            <br />
            {title}
          </span>
          <span className="mt-6 grid h-16 w-16 place-items-center rounded-full bg-white text-5xl font-light leading-none">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}

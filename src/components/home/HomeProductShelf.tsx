import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
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
      <div className="grid auto-rows-fr grid-cols-2 gap-[10px] sm:grid-cols-4 lg:grid-cols-6">
        {list.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="product-tile-shelf group min-w-0"
          >
            <span className="tile-media-shelf block">
              <Image
                src={product.image}
                alt=""
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 182px"
                className="object-contain transition-transform duration-300 group-hover:scale-[1.04]"
              />
            </span>
            <span className="tile-title-shelf mt-2 line-clamp-3 block">
              {product.name}
            </span>
            <span className="mt-auto pt-1 text-[17px] font-bold text-[#34495e]">
              {formatPrice(product.price)}
            </span>
          </Link>
        ))}

        <Link
          href={href}
          className="flex h-[312px] flex-col items-center justify-center border border-[#d9dde1] bg-[#e9e9e9] p-4 text-center text-[#171717] hover:bg-[#dedede]"
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

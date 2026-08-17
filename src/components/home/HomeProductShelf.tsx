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
                className="object-contain"
              />
            </span>
            <span className="tile-title-shelf mt-2 line-clamp-3 block">
              {product.name}
            </span>
          </Link>
        ))}

        <Link
          href={href}
          className="view-all-tile flex flex-col items-center justify-center p-4 text-center text-[#191a1e]"
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

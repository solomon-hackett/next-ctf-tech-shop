"use client";
import type { DisplayProduct } from "@/app/lib/definitions";
import Image from "next/image";
import Link from "next/link";

export default function Grid({ products }: { products: DisplayProduct[] }) {
  return (
    <section className="animate-fade-in mx-auto w-full max-w-6xl px-4 py-8">
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((product) => (
          <article
            key={product.id}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-200 hover:shadow-xl"
          >
            {/* Image */}
            <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Info */}
            <div className="flex flex-col gap-1 p-4 pt-3">
              <span className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase">
                {product.category}
              </span>
              <h3 className="line-clamp-2 text-sm leading-snug font-semibold text-gray-900">
                {product.name}
              </h3>
              <h4 className="text-xs leading-snug font-semibold text-gray-900">
                {product.price}
              </h4>

              <div className="mt-3 flex items-center justify-between">
                <Link
                  href={`/shop/${product.id}`}
                  className="group/link flex items-center gap-1 text-xs font-medium text-gray-500 transition-colors hover:text-gray-900"
                >
                  View details
                </Link>
                <button
                  onClick={async (e) => {
                    e.stopPropagation();
                    await fetch("/api/cart", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        itemId: product.id,
                        quantity: 1,
                      }),
                    });
                  }}
                  className="rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-gray-700"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

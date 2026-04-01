"use client";

import type { DisplayProduct } from "@/app/lib/definitions";
import Image from "next/image";
import Link from "next/link";

export default function Grid({ products }: { products: DisplayProduct[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5">
      {products.map((product) => (
        <div key={product.id} className="relative">
          <Image
            src={product.image}
            alt={`Image of ${product.name}`}
            fill
            className="object-contain"
          />
          <h2>{product.name}</h2>
          <h3>{product.price}</h3>
          <Link href={`/shop/${product.id}`}>View Product</Link>
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
      ))}
    </div>
  );
}

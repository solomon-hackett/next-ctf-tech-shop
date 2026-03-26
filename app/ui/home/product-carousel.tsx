"use client";

import type { Product } from "@/app/lib/definitions";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function ProductCarousel({ content }: { content: Product[] }) {
  const [sizes, setSizes] = useState<{
    [key: string]: { w: number; h: number };
  }>({});

  useEffect(() => {
    content.forEach((product) => {
      const img = new window.Image(); // <-- make sure TS sees this as DOM Image
      img.src = product.image;
      img.onload = () => {
        setSizes((prev) => ({
          ...prev,
          [product.id]: { w: img.width, h: img.height },
        }));
      };
    });
  }, [content]);

  return (
    <div className="flex flex-row">
      {content.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <h4>{product.category}</h4>
          {sizes[product.id] && (
            <Image
              src={product.image}
              alt={`Image of ${product.name}`}
              width={sizes[product.id].w}
              height={sizes[product.id].h}
              className="w-10 h-10"
            />
          )}
          <Link href={`/shop/${product.id}`}>View Product</Link>
          <Link href={`/purchase/${product.id}`}>Buy now</Link>
        </div>
      ))}
    </div>
  );
}

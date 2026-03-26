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
      const img = new window.Image();
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
    <div className="mx-auto flex w-full max-w-5xl flex-row items-center justify-center">
      {content.map((product) => (
        <div key={product.id} className="">
          <h3 className="">{product.name}</h3>
          <h4 className="">{product.category}</h4>
          {sizes[product.id] && (
            <Image
              src={product.image}
              alt={`Image of ${product.name}`}
              width={sizes[product.id].w}
              height={sizes[product.id].h}
              className="h-10 w-10"
            />
          )}
          <Link href={`/shop/${product.id}`} className="">
            View Product
          </Link>
          <Link href={`/purchase/${product.id}`} className="">
            Buy now
          </Link>
        </div>
      ))}
    </div>
  );
}

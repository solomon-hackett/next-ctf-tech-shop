import { fetchFilteredProducts } from "@/app/lib/data";
import type { DisplayProduct } from "@/app/lib/definitions";
import Image from "next/image";
import Link from "next/link";

export default async function ProductGrid({
  query,
  sort,
  currentPage,
}: {
  query: string;
  sort: string;
  currentPage: number;
}) {
  const products: DisplayProduct[] = await fetchFilteredProducts(
    query,
    sort,
    currentPage,
  );

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
          <Link href={`/shop/purchase/${product.id}`}>Add to Cart</Link>
        </div>
      ))}
    </div>
  );
}

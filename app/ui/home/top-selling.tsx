// app/ui/home/daily-products.tsx
import { fetchMostPurchased } from "@/app/lib/data";
import ProductCarousel from "./product-carousel";
import type { Product } from "@/app/lib/definitions";

export default async function TopSelling() {
  const products: Product[] = await fetchMostPurchased();
  return <ProductCarousel content={products} title="Top Selling" />;
}

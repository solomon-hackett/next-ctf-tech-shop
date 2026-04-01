// app/ui/home/daily-products.tsx
import { fetchDailyProducts } from "@/app/lib/data";
import ProductCarousel from "./product-carousel";
import type { DisplayProduct } from "@/app/lib/definitions";

export default async function DailyProducts() {
  const products: DisplayProduct[] = await fetchDailyProducts();

  return <ProductCarousel content={products} title="Daily Products" />;
}

import type { Metadata } from "next";
import { bitcount } from "@/app/ui/fonts";
import { fetchDailyProducts, fetchMostPurchased } from "@/app/lib/data";
import Link from "next/link";
import type { Product } from "@/app/lib/definitions";
import ProductCarousel from "@/app/ui/home/product-carousel";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Tech Haven - your one stop destination for tech.",
};

export default async function Page() {
  const dailyProducts: Product[] = await fetchDailyProducts();
  const mostPurchased: Product[] = await fetchMostPurchased();

  return (
    <main>
      <h1 className={`text-center text-9xl ${bitcount.className}`}>
        Welcome to Tech Haven
      </h1>
      <h2 className="text-center text-6xl">Daily Products</h2>
      <ProductCarousel content={dailyProducts} />
      <h2 className="text-center text-6xl">Top Selling</h2>
      <ProductCarousel content={mostPurchased} />
    </main>
  );
}

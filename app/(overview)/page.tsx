import type { Metadata } from "next";
import { bitcount } from "@/app/ui/fonts";
import { Suspense } from "react";
import { CarouselSkeleton } from "@/app/ui/skeletons";
import DailyProducts from "@/app/ui/home/daily-products";
import TopSelling from "@/app/ui/home/top-selling";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Tech Haven - your one stop destination for tech.",
};

export default async function Page() {
  return (
    <main>
      <h1 className={`text-center text-9xl ${bitcount.className}`}>
        Welcome to Tech Haven
      </h1>
      <Suspense fallback={<CarouselSkeleton />}>
        <DailyProducts />
      </Suspense>
      <Suspense fallback={<CarouselSkeleton />}>
        <TopSelling />
      </Suspense>
    </main>
  );
}

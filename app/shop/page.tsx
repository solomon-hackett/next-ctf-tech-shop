import type { Metadata } from "next";
import ProductGrid from "@/app/ui/shop/product-grid";
import { bitcount } from "@/app/ui/fonts";
import Search from "@/app/ui/search";
import { Suspense } from "react";
import { ProductGridSkeleton } from "../ui/skeletons";

export const metadata: Metadata = {
  title: "Shop",
  description: "Tech Haven Storefront.",
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    sort?: string;
    category?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const sort = searchParams?.sort || "";
  const category = searchParams?.category || "";
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <main>
      <h1 className={`mt-30 text-center text-9xl ${bitcount.className}`}>
        Store
      </h1>
      <Search placeholder="Search products" />
      <Suspense
        key={query + currentPage + sort}
        fallback={<ProductGridSkeleton />}
      >
        <ProductGrid
          query={query}
          sort={sort}
          category={category}
          currentPage={currentPage}
        />
      </Suspense>
    </main>
  );
}

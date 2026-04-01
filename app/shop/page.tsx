import type { Metadata } from "next";
import ProductGrid from "@/app/ui/shop/product-grid";
import { bitcount } from "@/app/ui/fonts";
import Search from "@/app/ui/shop/search";
import { Suspense } from "react";
import { ProductGridSkeleton } from "@/app/ui/skeletons";
import { fetchProductsPages } from "@/app/lib/data";
import Pagination from "@/app/ui/shop/pagination";

export const metadata: Metadata = {
  title: "Store",
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
  const totalPages = await fetchProductsPages(query, sort, category);
  return (
    <main>
      <h1 className={`mt-30 text-center text-9xl ${bitcount.className}`}>
        Store
      </h1>
      <Search placeholder="Search products" />
      <Pagination totalPages={totalPages} />
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
      <Pagination totalPages={totalPages} />
    </main>
  );
}

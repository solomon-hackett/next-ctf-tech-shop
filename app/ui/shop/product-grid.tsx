import { DisplayProduct } from "@/app/lib/definitions";
import { fetchFilteredProducts } from "@/app/lib/data";
import Grid from "./grid-internals";

export default async function ProductGrid({
  query,
  sort,
  category,
  currentPage,
}: {
  query: string;
  sort: string;
  category: string;
  currentPage: number;
}) {
  const products: DisplayProduct[] = await fetchFilteredProducts(
    query,
    sort,
    category,
    currentPage,
  );
  return <Grid products={products} />;
}

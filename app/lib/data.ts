import executeQuery from "@/app/lib/db";
import type { Product } from "@/app/lib/definitions";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function fetchProducts() {
  const products: Product[] = await executeQuery({
    query: `SELECT * FROM products;`,
  });
  return products;
}
export async function fetchDailyProducts() {
  const products: Product[] = await executeQuery({
    query: `SELECT * FROM products ORDER BY RAND() LIMIT 10;`,
  });
  return products;
}
export async function fetchMostPurchased() {
  const products: Product[] = await executeQuery({
    query: `SELECT * FROM products ORDER BY purchase_count LIMIT 10;`,
  });
  return products;
}

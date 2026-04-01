import { exec } from "child_process";
import executeQuery from "./db";
import type { Product } from "./definitions";
import { formatCurrency } from "./utils";
import { format } from "path";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const ITEMS_PER_PAGE = 15;
const ALLOWED_SORTS: Record<string, { column: string; direction: string }> = {
  "name-asc": { column: "name", direction: "ASC" },
  "name-desc": { column: "name", direction: "DESC" },
  "price-asc": { column: "price", direction: "ASC" },
  "price-desc": { column: "price", direction: "DESC" },
};
const ALLOWED_CATEGORIES = new Set([
  "laptop",
  "smartphone",
  "headphones",
  "monitor",
  "mouse",
  "keyboard",
  "wearable",
  "smart home",
  "camera",
  "storage",
  "accessories",
  "console",
]);

export async function fetchFilteredProducts(
  query: string,
  sort: string,
  category: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const likeQuery = `%${query}%`;
  const { column, direction } =
    ALLOWED_SORTS[sort] ?? ALLOWED_SORTS["name-asc"];
  const safeCategory = ALLOWED_CATEGORIES.has(category) ? category : null;
  const categoryClause = safeCategory ? "AND category = ?" : "";
  const categoryValues = safeCategory ? [safeCategory] : [];
  try {
    const data = await executeQuery<Product[]>({
      query: `
        SELECT
          *
        FROM products
        WHERE
          (name LIKE ? OR
          category LIKE ? OR
          price LIKE ?)
          ${categoryClause}
        ORDER BY ${column} ${direction}
        LIMIT ? OFFSET ?
      `,
      values: [
        likeQuery,
        likeQuery,
        likeQuery,
        ...categoryValues,
        ITEMS_PER_PAGE,
        offset,
      ],
    });
    const products = data.map((product) => ({
      ...product,
      price: formatCurrency(product.price),
    }));
    return products;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch products.");
  }
}
export async function fetchProductsPages(
  query: string,
  sort: string,
  category: string,
) {
  const likeQuery = `%${query}%`;
  const safeCategory = ALLOWED_CATEGORIES.has(category) ? category : null;
  const categoryClause = safeCategory ? "AND category = ?" : "";
  const categoryValues = safeCategory ? [safeCategory] : [];

  try {
    const data = await executeQuery<{ count: number }[]>({
      query: `
    SELECT COUNT(*) as count
    FROM products
    WHERE
      (name LIKE ? OR
       category LIKE ? OR
       price LIKE ?)
      ${categoryClause}
  `,
      values: [likeQuery, likeQuery, likeQuery, ...categoryValues],
    });
    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of products.");
  }
}

export async function fetchDailyProducts() {
  const data: Product[] = await executeQuery({
    query: `SELECT * FROM products ORDER BY RAND() LIMIT 10;`,
  });
  const products = data.map((product) => ({
    ...product,
    price: formatCurrency(product.price),
  }));
  return products;
}
export async function fetchMostPurchased() {
  const data: Product[] = await executeQuery({
    query: `SELECT * FROM products ORDER BY purchase_count LIMIT 10;`,
  });
  const products = data.map((product) => ({
    ...product,
    price: formatCurrency(product.price),
  }));
  return products;
}

export async function fetchCartProducts() {}

export async function fetchProductById(id: string | undefined | null) {
  if (!id) return null; // exit early if id is missing

  const data: Product[] = await executeQuery({
    query: `SELECT * FROM products WHERE id = ?`,
    values: [id], // now guaranteed to be defined
  });

  const product = data.map((product) => ({
    ...product,
    price: formatCurrency(product.price),
  }));

  return product[0] ?? null;
}
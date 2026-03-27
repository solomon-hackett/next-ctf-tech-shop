import type { Metadata } from "next";
import ProductGrid from "@/app/ui/shop/product-grid";

export const metadata: Metadata = {
  title: "Shop",
  description: "Tech Haven Storefront.",
};

export default function Page() {
    return <main>
      <ProductGrid/>
    </main>
}

import { fetchProductById } from "@/app/lib/data";
import { bitcount } from "@/app/ui/fonts";
import ProductInfo from "@/app/ui/shop/product-info";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!id) notFound();

  const product = await fetchProductById(id);
  if (!product) notFound();

  return {
    title: `${product.name}`,
    description: `${product.description}`,
  };
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const product = await fetchProductById(id);
  if (!product) {
    notFound();
  }
  return (
    <main>
      <Link href="/shop">Back</Link>
      <h1 className={`mt-30 text-center text-7xl ${bitcount.className}`}>
        {product.name}
      </h1>
      <ProductInfo product={product} />
    </main>
  );
}

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
      <Link href="/shop" className="absolute top-20 left-5 flex flex-row gap-1 items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        Back
      </Link>
      <h1 className={`mt-30 text-center text-7xl ${bitcount.className}`}>
        {product.name}
      </h1>
      <ProductInfo product={product} />
    </main>
  );
}

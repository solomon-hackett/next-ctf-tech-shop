import { DisplayProduct } from "@/app/lib/definitions";
import Image from "next/image";

export default function ProductInfo({ product }: { product: DisplayProduct }) {
  return (
    <div className="w-screen flex items-center justify-center">
      <Image src={product.image} alt={`Image of ${product.image}`} width="100" height="100"/>
      <h2>{product.category}</h2>
      <p>{product.description}</p>
    </div>
  );
}

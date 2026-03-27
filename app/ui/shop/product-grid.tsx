import { fetchProducts } from "@/app/lib/data";
import type { Product } from "@/app/lib/definitions";
import Image from "next/image";
import Link from "next/link";

export default async function ProductGrid(){
    const products: Product[] = await fetchProducts()

    return(
        <div>
            {products.map((product)=>
            <div key={product.id}>
                <Image src={product.image} alt={`Image of ${product.name}`} fill className="object-contain"/>
                <h2>{product.name}</h2>
                <Link href={`/shop/${product.id}`}></Link>
                <Link href={`/shop/purchase/${product.id}`}></Link>
            </div>
            )}
        </div>
    )
}
import Link from "next/link";
import React from "react";
import { Product } from "@/lib/api/products";
import Image from "next/image";


export default function ProductCard({ product }: { product: Product }) {
  return (
 <div className="p-4 shadow-xl bg-[#fff] rounded-lg flex flex-col justify-around">
      <div className="">
        <Image
          src={product.image}
          alt={product.title}
          width={300}
          height={300}
          objectFit="contain"
          className="w-full h-auto max-h-[400px] object-contain"
        />
      </div>

      <div className="p-4 self-end justify-end">
        <h3 className="text-lg font-semibold line-clamp-2">{product.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>
        <div className="mt-2 text-blue-600 font-bold">$ {product.price}</div>
        <Link
          href={`/product/${product.id}`}
          className="mt-4 inline-block text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}

'use client';

import { useSearchParams } from "next/navigation";
import { Product } from "@/lib/api/products";
import ProductCard from "./ProductCard";

export default function FilteredProductList({ allProducts }: { allProducts: Product[] }) {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  const filteredProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(query)
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

import ProductCard from "@/components/ProductCard";
import { fetchAllProducts, Product } from "@/lib/api/products";

export default async function page() {
   let allProducts: Product[] = [];
  try {
    allProducts = await fetchAllProducts();
  } catch (error) {
    console.error("Error fetching products:", error);
  }
  return (

    <main className="p-6">
      <div className="flex justify-between items-center flex-col sm:flex-row mb-6">
        <h1 className="text-3xl font-bold">All Products</h1>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {allProducts.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>

  )
}

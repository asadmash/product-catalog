import { fetchAllProducts, Product } from "@/lib/api/products";
import SearchBar from "@/components/SearchBar";
import FilteredProductList from "@/components/FilteredProductList";
import { Suspense } from "react";

export default async function Page() {
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
        <Suspense fallback={<div>Loading</div>}>
          <SearchBar />
        </Suspense>
      </div>

      <Suspense fallback={<div>Loading</div>}>
        <FilteredProductList allProducts={allProducts} />
      </Suspense>
    </main>
  );
}

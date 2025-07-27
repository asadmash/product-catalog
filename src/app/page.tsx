import ProductCard from "@/components/ProductCard";
import { fetchAllProducts, Product } from "@/lib/api/products";
import SearchBar from "@/components/SearchBar";

type Props = {
  searchParams?: { q?: string };
};


export default async function page({ searchParams }: Props) {
   let allProducts: Product[] = [];
  try {
    allProducts = await fetchAllProducts();
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  const query = searchParams?.q?.toLowerCase() || "";

  const filtered = allProducts.filter((product) =>
    product.title.toLowerCase().includes(query)
  );

  return (

    <main className="p-6">
      <div className="flex justify-between items-center flex-col sm:flex-row mb-6">
        <h1 className="text-3xl font-bold">All Products</h1>
<SearchBar />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>

  )
}

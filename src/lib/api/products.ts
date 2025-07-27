// Define the shape of product
export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
};

export async function fetchProductById(id: string | number) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) {
    throw new Error("Product not found");
  }

  return res.json();
}

export async function fetchAllProducts() {
  const res = await fetch("https://fakestoreapi.com/products");

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

"use client";

import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

import { Product, fetchProductById } from "@/lib/api/products";

export default function ProductPage() {
  const { id } = useParams();
    const { dispatch } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const data = await fetchProductById(String(id));
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p>Loading product...</p>;
  if (!product) return <p>Product not found.</p>;

// handle add to cart function
 const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.image,
      },
    });
  };


  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:pt-20 grid md:grid-cols-2 gap-10">
      <div className="relative w-full h-[300px] md:h-[400px] bg-white rounded-2xl">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain rounded-xl shadow"
        />
      </div>

      <div className="flex flex-col justify-center gap-6">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-xl font-semibold text-green-600">${product.price}</p>
      </div>

        <div className="flex gap-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
    </div>
  );
}

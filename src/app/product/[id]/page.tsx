"use client";

import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

import { Product, fetchProductById } from "@/lib/api/products";

export default function ProductPage() {
  const { id } = useParams();

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
    </div>
  );
}

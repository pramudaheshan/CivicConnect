import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

import type { Product } from "../types";

function getRandomProducts(products: Product[], count: number): Product[] {
  // Shuffle array and take the first 'count' items
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default function FeaturedProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [featured, setFeatured] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/product")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load products");
        return res.json();
      })
      .then((data: Product[]) => {
        setProducts(data);
        setFeatured(getRandomProducts(data, 4));
      })
      .catch(() => setProducts([]));
  }, []);

  return (
    <section className="mt-28">
      <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-14 tracking-tight">
        Featured Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

import React from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export default function HomePage() {
  return (
    <>
      <Hero />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="mt-24">
          <div className="bg-blue-700 rounded-lg p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg max-w-2xl mx-auto">
              We believe in the power of commerce to promote peace, justice, and strong institutions. 
              Every purchase supports initiatives that build a more equitable world.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
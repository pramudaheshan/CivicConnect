import React from 'react';
import { Search } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative bg-blue-700 text-white">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1507878866276-a947ef722fee?auto=format&fit=crop&q=80&w=1920"
          alt="Justice background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Commerce for a Better World
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl">
            Supporting peace, justice, and strong institutions through mindful commerce
          </p>
          <div className="mt-10 max-w-xl mx-auto">
          </div>
        </div>
      </div>
    </div>
  );
}
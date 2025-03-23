import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} added to cart!`, {
      duration: 2000,
      style: {
        background: '#4B5563',
        color: '#fff',
      },
    });
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <div className="flex items-center mt-1">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
        </div>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-blue-700">${product.price}</span>
          <button 
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
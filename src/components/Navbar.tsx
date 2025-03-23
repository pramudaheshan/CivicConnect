import React from 'react';
import { ShoppingCart, Search, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { state } = useCart();
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-semibold text-blue-700">CivicConnect</Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-blue-700">Home</Link>
            <Link to="/shop" className="text-gray-600 hover:text-blue-700">Shop</Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-700">About</Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-700">Contact</Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-5 w-5 text-gray-400" />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {itemCount}
              </span>
            </Link>
            <button className="md:hidden">
              <Menu className="h-6 w-6 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
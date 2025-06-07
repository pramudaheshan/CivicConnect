import React from "react";
import { ShoppingCart, Search, Menu, User, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { FaCity } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useWishlistStore } from "../store/useWishlistStore";
import { useAuthStore } from "../store/useAuthStore";

export default function Navbar() {
  const { state } = useCart();
  const wishlistItems = useWishlistStore((state) => state.items);
  const authState = useAuthStore();
  const isAuthenticated = authState.isAuthenticated;
  const user = authState.user;
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Brand/Logo */}
          <div className="flex items-center space-x-2">
            <FaCity className="text-3xl text-blue-500 drop-shadow-lg animate-bounce" />
            <Link
              to="/"
              className="text-3xl font-extrabold bg-gradient-to-r from-blue-700 via-cyan-400 to-blue-700 bg-clip-text text-transparent transition-transform duration-200 hover:scale-105 hover:shadow-lg"
            >
              CivicConnect
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { to: "/", label: "Home" },
              { to: "/shop", label: "Shop" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="relative text-lg px-2 py-1 text-gray-600 font-semibold transition-colors duration-200 hover:text-blue-700 after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-blue-700 after:to-cyan-400 after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Action/Utility Icons */}
          <div className="flex items-center space-x-4">
            {/* Wishlist */}
            <Link to="/wishlist" className="relative group">
              <span className="p-2 rounded-full hover:bg-pink-50 focus:ring-2 focus:ring-pink-200 transition inline-flex">
                <Heart className="h-5 w-5 text-gray-400 group-hover:text-pink-500 transition" />
              </span>
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-tr from-pink-500 to-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow-md border border-white">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative group">
              <span className="p-2 rounded-full hover:bg-blue-50 focus:ring-2 focus:ring-blue-200 transition inline-flex">
                <ShoppingCart className="h-5 w-5 text-gray-400 group-hover:text-blue-700 transition" />
              </span>
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-tr from-blue-600 to-cyan-400 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow-md border border-white">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Profile/Login */}
            {isAuthenticated ? (
              <Link to="/profile" className="flex items-center space-x-2 group">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-blue-200"
                  />
                ) : (
                  <img
                    src={
                      (user && user.avatar) ||
                      "https://ui-avatars.com/api/?name=" +
                        encodeURIComponent(
                          user && user.name ? user.name : "User"
                        )
                    }
                    alt={user && user.name ? user.name : "User"}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
              </Link>
            ) : (
              <Link
                to="/login"
                className="px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-semibold shadow hover:from-blue-700 hover:to-cyan-500 transition"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu */}
            <button className="md:hidden p-2 rounded-full hover:bg-gray-100 focus:ring-2 focus:ring-blue-200 transition">
              <Menu className="h-6 w-6 text-gray-400 hover:text-blue-700 transition" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

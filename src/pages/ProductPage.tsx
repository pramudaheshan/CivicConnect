import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  ShoppingCart,
  ArrowLeft,
  Plus,
  Minus,
  Heart,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlistStore } from "../store/useWishlistStore";

type Product = {
  _id: number;
  id: number;
  name: string;
  image: string;
  category: string;
  price: number;
  rating: number;
  description: string;
};

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const {
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
    isInWishlist,
  } = useWishlistStore();

  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch single product
  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(`http://localhost:5000/api/product/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        // Ensure id is a number
        setProduct({ ...data, id: Number(data.id) });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Error loading product");
        setLoading(false);
      });
  }, [id]);

  // Fetch all products for related items
  useEffect(() => {
    fetch("/api/product")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) =>
        setAllProducts(
          data.map((p: any) => ({
            ...p,
            id: Number(p.id),
          }))
        )
      )
      .catch(() => {});
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Loading...</h2>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            {error || "The product you're looking for doesn't exist."}
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setQuantity(1);
  };

  const handleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  // Show up to 3 related products in the same category (excluding the current one)
  const relatedProducts =
    product && allProducts.length
      ? allProducts
          .filter(
            (p) =>
              p.category === product.category &&
              String(p.id) !== String(product.id)
          )
          .slice(0, 3)
      : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={() => navigate("/shop")}
        className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Back to Shop
      </button>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div className="relative h-[500px] rounded-xl overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <button
              onClick={handleWishlist}
              className={`p-2 rounded-full ${
                isInWishlist(product.id)
                  ? "bg-red-100 text-red-600"
                  : "bg-gray-100 text-gray-600 hover:text-red-600"
              }`}
            >
              <Heart
                className={`h-6 w-6 ${
                  isInWishlist(product.id) ? "fill-current" : ""
                }`}
              />
            </button>
          </div>

          <div className="flex items-center mb-4">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="ml-1 text-lg text-gray-600">
                {product.rating}
              </span>
            </div>
            <span className="mx-2 text-gray-300">|</span>
            <span className="text-gray-600">{product.category}</span>
          </div>

          <p className="text-3xl font-bold text-blue-700 mb-6">
            ${product.price.toFixed(2)}
          </p>

          <p className="text-gray-600 mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center mb-8">
            <span className="text-gray-700 mr-4">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="p-2 hover:bg-gray-100 disabled:opacity-50"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-4 py-2 border-x border-gray-300">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="p-2 hover:bg-gray-100"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Add to Cart
          </button>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Related Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                onClick={() => navigate(`/product/${relatedProduct.id}`)}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105"
              >
                <div className="relative h-48">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {relatedProduct.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-700 font-bold">
                      ${relatedProduct.price.toFixed(2)}
                    </span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">
                        {relatedProduct.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

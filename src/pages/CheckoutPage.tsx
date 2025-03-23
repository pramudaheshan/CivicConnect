import React, { useState } from "react";
import { CreditCard, Truck, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  const { state } = useCart();
  const { items } = state;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    paymentMethod: "credit-card",
  });

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Order placed successfully!");
    navigate("/order-confirmation");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6 space-y-6"
      >
        {/* Shipping Details */}
        <h2 className="text-lg font-semibold text-gray-900">
          Shipping Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={formData.postalCode}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
        </div>

        {/* Payment Method */}
        <h2 className="text-lg font-semibold text-gray-900">Payment Method</h2>
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md p-2 w-full"
          required
        >
          <option value="credit-card">Credit Card</option>
          <option value="paypal">Stripe</option>
        </select>

        {/* Order Summary */}
        <div className="bg-gray-100 rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax (8%)</span>
            <span className="text-gray-900">${tax.toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-300 pt-4 flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Checkout Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center"
        >
          <CreditCard className="h-5 w-5 mr-2" />
          Place Order
        </button>

        <Link
          to="/cart"
          className="block text-center text-blue-600 hover:text-blue-700 mt-4 flex items-center"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Cart
        </Link>
      </form>
    </div>
  );
}

import React, { useState } from "react";
import { CreditCard, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// Stripe publishable key
const stripePromise = loadStripe(
  "pk_test_51RTEgRRps55OWY2hYbByg6IXRDjRxWTySwH5KkwXqROVmXQIIVSqbTYUNEhjWBrche9Ro1z2jbM0ff4dqceuFzAm00pp7qc5Hb"
);

// Simple Modal Popup for confirmations/errors
function Modal({
  isOpen,
  onClose,
  title,
  message,
  isSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  isSuccess: boolean;
}) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div
        className={`rounded-lg shadow-lg p-6 max-w-sm w-full ${
          isSuccess ? "bg-blue-50" : "bg-red-50"
        }`}
      >
        <h3
          className={`text-2xl font-bold mb-2 ${
            isSuccess ? "text-blue-700" : "text-red-700"
          }`}
        >
          {title}
        </h3>
        <p className={`mb-4 ${isSuccess ? "text-blue-900" : "text-red-900"}`}>
          {message}
        </p>
        <button
          className={`w-full py-2 rounded ${
            isSuccess
              ? "bg-blue-700 hover:bg-blue-800"
              : "bg-red-700 hover:bg-red-800"
          } text-white font-semibold`}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

function CheckoutForm({
  total,
  subtotal,
  shipping,
  tax,
  onOrderSuccess,
}: {
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
  onOrderSuccess: () => void;
}) {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [loading, setLoading] = useState(false);

  // Modal state
  const [modal, setModal] = useState<{
    open: boolean;
    title: string;
    message: string;
    isSuccess: boolean;
  }>({ open: false, title: "", message: "", isSuccess: false });

  // Used to reset CardElement after fail attempt
  const [cardKey, setCardKey] = useState(0);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    // Get auth token (adjust if you store it differently)
    const token = localStorage.getItem("token");

    // Call backend to create payment intent WITH authorization header
    const res = await fetch(
      "http://localhost:5000/api/payment/create-payment-intent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add Authorization header if token exists
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          amount: Math.round(total * 100),
        }),
      }
    );
    const data = await res.json();
    const clientSecret = data.clientSecret;

    if (!clientSecret) {
      setModal({
        open: true,
        title: "Payment Error",
        message: "Failed to initiate payment. Please try again.",
        isSuccess: false,
      });
      setLoading(false);
      return;
    }

    // Confirm card payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
        billing_details: {
          name: formData.fullName,
          email: formData.email,
          address: {
            line1: formData.address,
            city: formData.city,
            postal_code: formData.postalCode,
            country: formData.country,
          },
        },
      },
    });

    setLoading(false);

    if (result.error) {
      setModal({
        open: true,
        title: "Payment Failed",
        message:
          result.error.message ||
          "Payment could not be completed. Please check your details and try again.",
        isSuccess: false,
      });
      // Reset CardElement so the user can re-enter card info
      setCardKey((k) => k + 1);
    } else if (
      result.paymentIntent &&
      result.paymentIntent.status === "succeeded"
    ) {
      setModal({
        open: true,
        title: "Payment Successful!",
        message: "Your order has been placed successfully.",
        isSuccess: true,
      });
    }
  };

  // Modal close handler
  const handleModalClose = () => {
    setModal({ ...modal, open: false });
    //if payment success clearCart(); and onOrderSuccess();
    if (modal.isSuccess) {
      clearCart();
      onOrderSuccess();
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6 space-y-6"
        autoComplete="on"
      >
        {/* Hidden input for browser autofill of card details */}
        <input
          type="text"
          autoComplete="cc-number"
          style={{ display: "none" }}
        />

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
            autoComplete="name"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
            autoComplete="email"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
            autoComplete="street-address"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
            autoComplete="address-level2"
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={formData.postalCode}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
            autoComplete="postal-code"
          />
          <input
            type="text"
            name="country"
            placeholder="Country (2-letter code, e.g. US)"
            value={formData.country}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
            autoComplete="country"
          />
        </div>

        {/* Stripe Card Element */}
        <h2 className="text-lg font-semibold text-gray-900">Payment Details</h2>
        <div className="border border-gray-300 rounded-md p-2 w-full">
          {/* The key prop will reset the CardElement on fail */}
          <CardElement key={cardKey} options={{ hidePostalCode: true }} />
        </div>

        {/* Order Summary */}
        <div className="bg-gray-100 rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span className="text-gray-900">${shipping.toFixed(2)}</span>
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

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center"
          disabled={loading}
        >
          <CreditCard className="h-5 w-5 mr-2" />
          {loading ? "Processing..." : "Place Order"}
        </button>
        <Link
          to="/cart"
          className="block text-center text-blue-600 hover:text-blue-700 mt-4 flex items-center"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Cart
        </Link>
      </form>
      {/* Modal for confirmation/fail */}
      <Modal
        isOpen={modal.open}
        onClose={handleModalClose}
        title={modal.title}
        message={modal.message}
        isSuccess={modal.isSuccess}
      />
    </>
  );
}

export default function CheckoutPage() {
  const { state } = useCart();
  const { items } = state;
  const navigate = useNavigate();

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  if (subtotal === 0) {
    navigate("/cart");
    return null;
  }

  const shipping = items.length > 0 ? 5.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  // Handler for after successful order (already empties cart in CheckoutForm)
  const handleOrderSuccess = () => {};

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm
          total={total}
          subtotal={subtotal}
          shipping={shipping}
          tax={tax}
          onOrderSuccess={handleOrderSuccess}
        />
      </Elements>
    </div>
  );
}

import React from "react";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import { FaGlobeAmericas, FaHandsHelping, FaRegCompass, FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import FeaturedProductsSection from "../components/FeaturedProducts";
import FeaturedProducts from "../components/FeaturedProducts";

export default function HomePage() {
  return (
    <>
      <Hero />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* How it Works Section */}
        <section className="mt-10">
          <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-14 tracking-tight">
            How CivicConnect Works
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 flex-1 text-center border border-blue-100 hover:shadow-2xl transition-shadow duration-300">
              <FaRegCompass className="mx-auto text-blue-700 text-5xl mb-4 drop-shadow" />
              <h3 className="font-semibold text-2xl mb-2 text-blue-700">
                Discover
              </h3>
              <p className="text-gray-600">
                Find unique, community-driven products and initiatives that
                align with your civic values.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 flex-1 text-center border border-blue-100 hover:shadow-2xl transition-shadow duration-300">
              <FaHandsHelping className="mx-auto text-blue-700 text-5xl mb-4 drop-shadow" />
              <h3 className="font-semibold text-2xl mb-2 text-blue-700">
                Support
              </h3>
              <p className="text-gray-600">
                Engage and contribute directly to causes and projects that make
                a social impact.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 flex-1 text-center border border-blue-100 hover:shadow-2xl transition-shadow duration-300">
              <FaGlobeAmericas className="mx-auto text-blue-700 text-5xl mb-4 drop-shadow" />
              <h3 className="font-semibold text-2xl mb-2 text-blue-700">
                Impact
              </h3>
              <p className="text-gray-600">
                See your contributions drive real change in your community and
                around the world.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <FeaturedProducts />

        {/* Sign In Section */}
        <section className="mt-32 flex justify-center">
          <div className="bg-gradient-to-r from-blue-700 via-cyan-400 to-blue-700 p-12 rounded-3xl shadow-2xl text-center w-full border-4 border-white/20">
            <FaSignInAlt className="mx-auto text-6xl text-white mb-6 drop-shadow-lg animate-pulse" />
            <h2 className="text-3xl font-extrabold text-white mb-3 tracking-tight">
              Ready to Join Us?
            </h2>
            <p className="text-lg text-cyan-100 mb-8 max-w-lg mx-auto">
              Sign in to unlock all features, manage your account, and connect
              with our community.
            </p>
            <Link
              to="/login"
              className="inline-block bg-white text-blue-700 font-bold px-12 py-4 rounded-full shadow-lg hover:bg-blue-50 hover:scale-105 focus:ring-2 focus:ring-cyan-300 transition-all text-xl"
            >
              Sign In
            </Link>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mt-32">
          <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12 tracking-tight">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white rounded-3xl shadow-xl p-10 flex flex-col items-center border border-blue-100 hover:shadow-2xl transition-shadow duration-300">
              <p className="text-lg italic text-gray-700 mb-6 text-center">
                “CivicConnect made it so easy to find ethical products. I love
                knowing my purchases make a difference!”
              </p>
              <div className="flex items-center gap-4">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Jane"
                  className="h-12 w-12 rounded-full border-2 border-blue-600"
                />
                <div>
                  <div className="font-bold text-gray-900">Jane D.</div>
                  <div className="text-sm text-gray-500">Verified Buyer</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-3xl shadow-xl p-10 flex flex-col items-center border border-blue-100 hover:shadow-2xl transition-shadow duration-300">
              <p className="text-lg italic text-gray-700 mb-6 text-center">
                “I feel part of a community that truly cares. The process was
                smooth and the mission is inspiring.”
              </p>
              <div className="flex items-center gap-4">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Mark"
                  className="h-12 w-12 rounded-full border-2 border-blue-600"
                />
                <div>
                  <div className="font-bold text-gray-900">Mark R.</div>
                  <div className="text-sm text-gray-500">Community Member</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-3xl shadow-xl p-10 flex flex-col items-center border border-blue-100 hover:shadow-2xl transition-shadow duration-300">
              <p className="text-lg italic text-gray-700 mb-6 text-center">
                “Amazing site with a purpose! I recommend CivicConnect to all my
                friends.”
              </p>
              <div className="flex items-center gap-4">
                <img
                  src="https://randomuser.me/api/portraits/women/68.jpg"
                  alt="Sara"
                  className="h-12 w-12 rounded-full border-2 border-blue-600"
                />
                <div>
                  <div className="font-bold text-gray-900">Sara T.</div>
                  <div className="text-sm text-gray-500">Happy Customer</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mt-32">
          <div className="bg-gradient-to-r from-blue-700 via-cyan-500 to-blue-700 rounded-3xl p-14 text-white text-center shadow-2xl border-4 border-white/20">
            <h2 className="text-4xl font-extrabold mb-6 tracking-tight">
              Our Mission
            </h2>
            <p className="text-lg max-w-2xl mx-auto font-medium">
              We believe in the power of commerce to promote peace, justice, and
              strong institutions. Every purchase supports initiatives that
              build a more equitable world.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

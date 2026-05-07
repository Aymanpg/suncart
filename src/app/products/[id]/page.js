// src/app/products/[id]/page.js
'use client';
import { use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import products from '@/data/products.json';

export default function ProductDetailsPage({ params }) {
  const { id } = use(params);
  const router = useRouter();

  // TODO: replace this with real auth check later
  const isLoggedIn = false;

  const product = products.find((p) => p.id === parseInt(id));

  // Product not found
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fffdf7]">
        <p className="text-6xl mb-4">😕</p>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Product Not Found</h2>
        <p className="text-gray-400 mb-6">The product you're looking for doesn't exist.</p>
        <Link
          href="/products"
          className="bg-orange-500 text-white px-6 py-2.5 rounded-full hover:bg-orange-600 transition"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  // Not logged in — show lock screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fffdf7] px-4">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center border border-orange-100">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Login Required
          </h2>
          <p className="text-gray-500 mb-8">
            You need to be logged in to view product details.
          </p>
          <Link
            href="/login"
            className="block w-full bg-orange-500 text-white font-semibold py-3 rounded-full hover:bg-orange-600 transition mb-3"
          >
            Login to Continue
          </Link>
          <Link
            href="/register"
            className="block w-full border border-orange-400 text-orange-500 font-semibold py-3 rounded-full hover:bg-orange-50 transition"
          >
            Create an Account
          </Link>
          <Link
            href="/products"
            className="inline-block mt-5 text-sm text-gray-400 hover:text-orange-500 transition"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // Logged in — show product details
  return (
    <div className="bg-[#fffdf7] min-h-screen">

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-5 text-sm text-gray-400">
        <Link href="/" className="hover:text-orange-500 transition">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-orange-500 transition">Products</Link>
        <span className="mx-2">/</span>
        <span className="text-orange-500">{product.name}</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-white rounded-3xl shadow-md overflow-hidden border border-orange-50">
          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* Image */}
            <div className="h-80 md:h-full overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="p-8 md:p-12 flex flex-col justify-center">

              {/* Category + Brand */}
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-orange-100 text-orange-500 text-xs font-semibold px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <span className="text-gray-400 text-sm">{product.brand}</span>
              </div>

              {/* Name */}
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-5">
                <span className="text-yellow-400 text-xl">
                  {'★'.repeat(Math.floor(product.rating))}
                  {'☆'.repeat(5 - Math.floor(product.rating))}
                </span>
                <span className="text-gray-500 text-sm font-medium">
                  {product.rating} / 5.0
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-500 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Stock */}
              <div className="flex items-center gap-2 mb-6">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    product.stock > 20 ? 'bg-green-400' : 'bg-orange-400'
                  }`}
                />
                <span className="text-sm text-gray-500">
                  {product.stock > 20
                    ? `In Stock (${product.stock} available)`
                    : `Low Stock — only ${product.stock} left!`}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-end gap-3 mb-8">
                <p className="text-5xl font-extrabold text-orange-500">
                  ${product.price}
                </p>
                <p className="text-gray-400 line-through text-lg mb-1">
                  ${Math.round(product.price * 1.2)}
                </p>
                <span className="bg-green-100 text-green-600 text-xs font-bold px-2 py-1 rounded-full mb-1">
                  20% OFF
                </span>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 bg-orange-500 text-white font-semibold py-3 rounded-full hover:bg-orange-600 transition shadow-md shadow-orange-200">
                  🛒 Add to Cart
                </button>
                <button className="flex-1 border border-orange-400 text-orange-500 font-semibold py-3 rounded-full hover:bg-orange-50 transition">
                  ❤️ Wishlist
                </button>
              </div>

              {/* Back */}
              <Link
                href="/products"
                className="mt-6 text-sm text-gray-400 hover:text-orange-500 transition inline-block"
              >
                ← Back to Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
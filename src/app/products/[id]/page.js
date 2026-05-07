// src/app/products/[id]/page.js
'use client';
import { use } from 'react';
import Link from 'next/link';
import { useSession } from '@/lib/auth-client';
import products from '@/data/products.json';

export default function ProductDetailsPage({ params }) {
  const { id } = use(params);
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const product = products.find((p) => p.id === parseInt(id));

  // Loading state
  if (isPending) {
    return (
      <div className="min-h-screen bg-[#fffdf7] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-orange-300 border-t-orange-500 rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

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
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fffdf7] px-4">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center border border-orange-100">

          {/* Product Peek */}
          <div className="relative mb-6">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-44 object-cover rounded-2xl blur-sm brightness-75"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl">🔒</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Login to View Details
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            You need to be logged in to view full product details for
            <span className="text-orange-500 font-semibold"> {product.name}</span>.
          </p>

          <Link
            href={`/login?redirect=/products/${product.id}`}
            className="block w-full bg-orange-500 text-white font-semibold py-3 rounded-full hover:bg-orange-600 transition mb-3 shadow-md shadow-orange-200"
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

  // Logged in — show full product details
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

              {/* User greeting */}
              <div className="bg-orange-50 rounded-2xl px-4 py-3 mb-6 flex items-center gap-3">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-orange-200"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                <p className="text-sm text-gray-600">
                  Shopping as <span className="font-semibold text-orange-500">{user.name}</span>
                </p>
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

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            More from {product.category} 🛍️
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products
              .filter((p) => p.category === product.category && p.id !== product.id)
              .slice(0, 3)
              .map((related) => (
                <div
                  key={related.id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-md transition border border-orange-50 overflow-hidden group"
                >
                  <div className="h-44 overflow-hidden">
                    <img
                      src={related.image}
                      alt={related.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 mb-1">{related.name}</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-orange-500 font-bold">${related.price}</p>
                      <Link
                        href={`/products/${related.id}`}
                        className="text-xs bg-orange-500 text-white px-3 py-1.5 rounded-full hover:bg-orange-600 transition"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

      </div>
    </div>
  );
}
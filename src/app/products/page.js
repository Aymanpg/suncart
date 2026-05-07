// src/app/products/page.js
'use client';
import { useState } from 'react';
import Link from 'next/link';
import products from '@/data/products.json';

const categories = ['All', ...new Set(products.map((p) => p.category))];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');

  const filtered = products
    .filter((p) =>
      activeCategory === 'All' ? true : p.category === activeCategory
    )
    .filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="bg-[#fffdf7] min-h-screen">

      {/* ── PAGE HEADER ── */}
      <section className="bg-linear-to-r from-orange-500 to-yellow-400 py-14 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3">All Products 🛍️</h1>
        <p className="text-white/90 text-lg max-w-xl mx-auto">
          Browse our full collection of summer essentials
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* ── FILTERS ROW ── */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10">

          {/* Search */}
          <div className="relative w-full md:w-80">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-orange-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2.5 rounded-full border border-orange-200 bg-white text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* ── CATEGORY TABS ── */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-200'
                  : 'bg-white border border-orange-200 text-gray-600 hover:border-orange-400 hover:text-orange-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── RESULTS COUNT ── */}
        <p className="text-sm text-gray-400 mb-6">
          Showing <span className="text-orange-500 font-semibold">{filtered.length}</span> products
        </p>

        {/* ── PRODUCT GRID ── */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm mt-1">Try a different search or category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-orange-50"
              >
                {/* Image */}
                <div className="overflow-hidden h-56 relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-white text-orange-500 text-xs font-semibold px-3 py-1 rounded-full shadow">
                    {product.category}
                  </span>
                  {product.stock < 15 && (
                    <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                      Low Stock
                    </span>
                  )}
                </div>

                {/* Body */}
                <div className="p-5">
                  <p className="text-xs text-gray-400 mb-1">{product.brand}</p>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{product.name}</h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    <span className="text-yellow-400 text-sm">
                      {'★'.repeat(Math.floor(product.rating))}
                      {'☆'.repeat(5 - Math.floor(product.rating))}
                    </span>
                    <span className="text-gray-400 text-xs">({product.rating})</span>
                  </div>

                  {/* Price + Button */}
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold text-orange-500">${product.price}</p>
                    <Link
                      href={`/products/${product.id}`}
                      className="bg-orange-500 text-white text-sm px-4 py-2 rounded-full hover:bg-orange-600 transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
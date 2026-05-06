// src/app/page.js
'use client';
import Link from 'next/link';
import { ShoppingCart, Sun, Star } from 'lucide-react';

const featuredProducts = [
  {
    id: 1,
    name: "Summer Sunglasses",
    price: 1299,
    image: "https://picsum.photos/id/1015/400/300",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Beach Straw Hat",
    price: 899,
    image: "https://picsum.photos/id/201/400/300",
    rating: 4.6,
  },
  {
    id: 3,
    name: "Lightweight Shirt",
    price: 1599,
    image: "https://picsum.photos/id/1060/400/300",
    rating: 4.9,
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="hero bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 text-white min-h-[80vh] flex items-center">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              Summer Vibes <br /> Only 🌞
            </h1>
            <p className="text-2xl mb-10">
              Discover the best summer essentials at unbeatable prices
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/products" className="btn btn-lg btn-primary text-lg">
                Shop Now
              </Link>
              <Link href="#featured" className="btn btn-lg btn-outline text-lg">
                Explore Collection
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div id="featured" className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-4xl font-bold">Popular This Summer 🔥</h2>
          <Link href="/products" className="text-primary hover:underline flex items-center gap-2">
            View All Products →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all">
              <figure>
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="h-64 w-full object-cover" 
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{product.name}</h3>
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    {Array(5).fill().map((_, i) => (
                      <Star key={i} size={18} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                    ))}
                  </div>
                  <span className="text-sm">({product.rating})</span>
                </div>
                <p className="text-2xl font-bold text-primary mt-2">
                  ৳{product.price}
                </p>
                <div className="card-actions justify-end mt-4">
                  <Link href={`/products/${product.id}`} className="btn btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-base-200 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Why Shop With SunCart?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">☀️</div>
              <h3 className="text-xl font-semibold mb-2">Summer Specialists</h3>
              <p className="text-base-content/70">Curated collection of premium summer products</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-base-content/70">Quick shipping all over Bangladesh</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Secure Shopping</h3>
              <p className="text-base-content/70">Safe payment &amp; protected account</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
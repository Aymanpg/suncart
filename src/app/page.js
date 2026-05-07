// src/app/page.js
'use client';
import Link from 'next/link';
import products from '@/data/products.json';

const featured = products.slice(0, 3);

const brands = [
  { name: 'SunShade', icon: '🕶️' },
  { name: 'BeachWave', icon: '🏖️' },
  { name: 'GlowSkin', icon: '✨' },
  { name: 'AquaFit', icon: '💧' },
];

const tips = [
  {
    icon: '🧴',
    title: 'Apply Sunscreen Daily',
    desc: 'Use SPF 50+ sunscreen every morning, even on cloudy days.',
  },
  {
    icon: '💧',
    title: 'Stay Hydrated',
    desc: 'Drink at least 8 glasses of water daily to keep your skin glowing.',
  },
  {
    icon: '🧢',
    title: 'Wear a Hat',
    desc: 'Protect your face and neck from direct sunlight with a wide-brim hat.',
  },
  {
    icon: '🥤',
    title: 'Eat Fresh Fruits',
    desc: 'Summer fruits like watermelon keep you cool and full of vitamins.',
  },
];

export default function Home() {
  return (
    <div className="bg-[#fffdf7]">

      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-400 via-yellow-400 to-orange-300 min-h-[90vh] flex items-center">
        {/* Decorative circles */}
        <div className="absolute top-[-80px] right-[-80px] w-96 h-96 bg-yellow-300 opacity-30 rounded-full blur-3xl" />
        <div className="absolute bottom-[-60px] left-[-60px] w-72 h-72 bg-orange-500 opacity-20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">

          {/* Text */}
          <div className="flex-1 text-white">
            <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
              🔥 Summer Sale — Up to 50% OFF
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
              Beat the Heat <br />
              <span className="text-white drop-shadow-md">in Style ☀️</span>
            </h1>
            <p className="text-white/90 text-lg mb-8 max-w-md leading-relaxed">
              Discover our handpicked collection of summer essentials — from beach accessories to skincare and more.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="bg-white text-orange-500 font-semibold px-7 py-3 rounded-full hover:bg-orange-50 transition shadow-lg"
              >
                Shop Now →
              </Link>
              <Link
                href="#featured"
                className="border border-white text-white font-semibold px-7 py-3 rounded-full hover:bg-white/10 transition"
              >
                Explore Collection
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-12">
              <div>
                <p className="text-3xl font-bold">500+</p>
                <p className="text-white/80 text-sm">Products</p>
              </div>
              <div className="w-px bg-white/30" />
              <div>
                <p className="text-3xl font-bold">12k+</p>
                <p className="text-white/80 text-sm">Happy Customers</p>
              </div>
              <div className="w-px bg-white/30" />
              <div>
                <p className="text-3xl font-bold">4.9★</p>
                <p className="text-white/80 text-sm">Avg Rating</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl" />
              <img
                src="https://picsum.photos/id/96/500/500"
                alt="Summer"
                className="relative w-full h-full object-cover rounded-full border-4 border-white/40 shadow-2xl"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ── POPULAR PRODUCTS ── */}
      <section id="featured" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">Trending Now</span>
          <h2 className="text-4xl font-bold text-gray-800 mt-2">Popular This Summer 🔥</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Our most loved summer picks — chosen by thousands of happy customers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-orange-50"
            >
              <div className="overflow-hidden h-56">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <span className="text-xs text-orange-400 font-medium uppercase tracking-wide">
                  {product.category}
                </span>
                <h3 className="text-lg font-bold text-gray-800 mt-1 mb-1">{product.name}</h3>
                <div className="flex items-center gap-1 mb-3">
                  <span className="text-yellow-400 text-sm">{'★'.repeat(Math.floor(product.rating))}</span>
                  <span className="text-gray-400 text-xs">({product.rating})</span>
                </div>
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

        <div className="text-center mt-10">
          <Link
            href="/products"
            className="border border-orange-400 text-orange-500 font-semibold px-8 py-3 rounded-full hover:bg-orange-50 transition"
          >
            View All Products →
          </Link>
        </div>
      </section>

      {/* ── TOP BRANDS ── */}
      <section className="bg-orange-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">Trusted By Many</span>
            <h2 className="text-3xl font-bold text-gray-800 mt-2">Top Brands 🏆</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {brands.map((brand) => (
              <div
                key={brand.name}
                className="bg-white rounded-2xl p-6 flex flex-col items-center gap-3 shadow-sm hover:shadow-md transition border border-orange-100"
              >
                <span className="text-4xl">{brand.icon}</span>
                <p className="font-semibold text-gray-700">{brand.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUMMER CARE TIPS ── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">Stay Safe</span>
          <h2 className="text-3xl font-bold text-gray-800 mt-2">Summer Care Tips 🌿</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Simple tips to stay fresh, protected, and healthy all summer long.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {tips.map((tip) => (
            <div
              key={tip.title}
              className="bg-white border border-orange-100 rounded-2xl p-6 hover:shadow-md transition"
            >
              <span className="text-4xl">{tip.icon}</span>
              <h3 className="font-bold text-gray-800 mt-4 mb-2">{tip.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{tip.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="bg-gradient-to-r from-orange-500 to-yellow-400 py-16 text-center text-white">
        <h2 className="text-4xl font-extrabold mb-4">Ready for Summer? 🌞</h2>
        <p className="text-white/90 mb-8 text-lg max-w-xl mx-auto">
          Join thousands of happy shoppers and get your summer essentials delivered fast.
        </p>
        <Link
          href="/register"
          className="bg-white text-orange-500 font-bold px-8 py-3 rounded-full hover:bg-orange-50 transition shadow-lg text-lg"
        >
          Get Started — It's Free
        </Link>
      </section>

    </div>
  );
}
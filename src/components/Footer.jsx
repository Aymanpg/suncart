// src/components/Footer.jsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-orange-950 text-gray-300 pt-12 pb-6 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

        {/* Brand */}
        <div>
          <h3 className="text-white text-xl font-bold mb-3">
            ☀️ <span className="text-orange-400">Sun</span>
            <span className="text-yellow-400">Cart</span>
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Your go-to destination for summer essentials. From beach gear to skincare — we've got your summer covered.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-orange-400 transition-colors">Home</Link></li>
            <li><Link href="/products" className="hover:text-orange-400 transition-colors">All Products</Link></li>
            <li><Link href="/my-profile" className="hover:text-orange-400 transition-colors">My Profile</Link></li>
            <li><Link href="/login" className="hover:text-orange-400 transition-colors">Login</Link></li>
            <li><Link href="/register" className="hover:text-orange-400 transition-colors">Register</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>📧 support@suncart.shop</li>
            <li>📞 +880 1700-000000</li>
            <li>📍 Chittagong, Bangladesh</li>
          </ul>
          <div className="flex gap-4 mt-5">
            <a href="#" className="hover:text-orange-400 transition-colors text-sm">Facebook</a>
            <a href="#" className="hover:text-orange-400 transition-colors text-sm">Instagram</a>
            <a href="#" className="hover:text-orange-400 transition-colors text-sm">Twitter</a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-orange-900 pt-5 max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-gray-500">
        <p>© 2026 SunCart. All rights reserved.</p>
        <div className="flex gap-5">
          <a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-orange-400 transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
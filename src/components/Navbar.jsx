// src/components/Navbar.jsx
'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useSession, signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const user = session?.user;

  const handleLogout = async () => {
    await signOut();
    toast.success('Logged out successfully!');
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-orange-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">☀️</span>
          <span className="text-xl font-bold tracking-tight">
            <span className="text-orange-500">Sun</span>
            <span className="text-yellow-500">Cart</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-orange-500 transition-colors duration-200">Home</Link>
          <Link href="/products" className="hover:text-orange-500 transition-colors duration-200">Products</Link>
          {user && (
            <Link href="/my-profile" className="hover:text-orange-500 transition-colors duration-200">My Profile</Link>
          )}
        </nav>

        {/* Auth Area */}
        <div className="hidden md:flex items-center gap-3">
          {isPending ? (
            <div className="w-8 h-8 rounded-full bg-orange-100 animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-3">
              <Link href="/my-profile" className="flex items-center gap-2 group">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-9 h-9 rounded-full object-cover border-2 border-orange-300"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-sm font-medium text-gray-700 group-hover:text-orange-500 transition">
                  {user.name?.split(' ')[0]}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-white bg-orange-500 px-5 py-2 rounded-full hover:bg-orange-600 transition shadow-md shadow-orange-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-orange-500 border border-orange-400 px-5 py-2 rounded-full hover:bg-orange-50 transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-sm font-medium text-white bg-orange-500 px-5 py-2 rounded-full hover:bg-orange-600 transition shadow-md shadow-orange-200"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-orange-100 px-6 py-5 flex flex-col gap-4 text-sm font-medium text-gray-700">
          <Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-orange-500">Home</Link>
          <Link href="/products" onClick={() => setMenuOpen(false)} className="hover:text-orange-500">Products</Link>
          {user && (
            <Link href="/my-profile" onClick={() => setMenuOpen(false)} className="hover:text-orange-500">My Profile</Link>
          )}
          <hr className="border-orange-100" />
          {user ? (
            <button
              onClick={() => { handleLogout(); setMenuOpen(false); }}
              className="text-white bg-orange-500 px-4 py-2 rounded-full text-center"
            >
              Logout
            </button>
          ) : (
            <>
              <Link href="/login" onClick={() => setMenuOpen(false)} className="text-orange-500 font-semibold">Login</Link>
              <Link href="/register" onClick={() => setMenuOpen(false)} className="text-white bg-orange-500 px-4 py-2 rounded-full text-center">Register</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
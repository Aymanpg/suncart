// src/app/my-profile/page.js
'use client';
import { useSession, signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function MyProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const user = session?.user;

  useEffect(() => {
    if (!isPending && !user) {
      router.push('/login');
    }
  }, [isPending, user, router]);

  const handleLogout = async () => {
    await signOut();
    toast.success('Logged out successfully!');
    router.push('/');
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#fffdf7] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-orange-300 border-t-orange-500 rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#fffdf7] py-16 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-800">My Profile</h1>
          <p className="text-gray-400 text-sm mt-1">Manage your account details</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-md border border-orange-100 overflow-hidden">

          {/* Banner */}
          <div className="bg-gradient-to-r from-orange-400 to-yellow-400 h-28" />

          {/* Avatar + Info */}
          <div className="px-8 pb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-12 mb-6">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-orange-500 border-4 border-white shadow-md flex items-center justify-center text-white text-3xl font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="text-center sm:text-left mb-1">
                <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
                <p className="text-gray-400 text-sm">SunCart Member</p>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4">

              <div className="bg-orange-50 rounded-2xl px-5 py-4 flex items-center gap-4">
                <span className="text-2xl">👤</span>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Full Name</p>
                  <p className="text-gray-800 font-semibold mt-0.5">{user.name}</p>
                </div>
              </div>

              <div className="bg-orange-50 rounded-2xl px-5 py-4 flex items-center gap-4">
                <span className="text-2xl">📧</span>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Email Address</p>
                  <p className="text-gray-800 font-semibold mt-0.5">{user.email}</p>
                </div>
              </div>

              <div className="bg-orange-50 rounded-2xl px-5 py-4 flex items-center gap-4">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Account Status</p>
                  <p className="text-green-500 font-semibold mt-0.5">Active</p>
                </div>
              </div>

            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link
                href="/my-profile/update"
                className="flex-1 bg-orange-500 text-white font-semibold py-3 rounded-full hover:bg-orange-600 transition text-center shadow-md shadow-orange-200"
              >
                ✏️ Update Profile
              </Link>
              <button
                onClick={handleLogout}
                className="flex-1 border border-orange-400 text-orange-500 font-semibold py-3 rounded-full hover:bg-orange-50 transition"
              >
                🚪 Logout
              </button>
            </div>

          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <Link
            href="/products"
            className="bg-white border border-orange-100 rounded-2xl p-5 text-center hover:shadow-md transition"
          >
            <span className="text-3xl">🛍️</span>
            <p className="text-sm font-semibold text-gray-700 mt-2">Browse Products</p>
          </Link>
          <Link
            href="/"
            className="bg-white border border-orange-100 rounded-2xl p-5 text-center hover:shadow-md transition"
          >
            <span className="text-3xl">🏠</span>
            <p className="text-sm font-semibold text-gray-700 mt-2">Go Home</p>
          </Link>
        </div>

      </div>
    </div>
  );
}
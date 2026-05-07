// src/app/login/page.js
'use client';
import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from '@/lib/auth-client';
import toast from 'react-hot-toast';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await signIn.email({
        email: form.email,
        password: form.password,
      });

      if (res?.error) {
        setError('Invalid email or password. Please try again.');
        toast.error('Login failed!');
      } else {
        toast.success('Welcome back!');
        router.push(redirect);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await signIn.social({
        provider: 'google',
        callbackURL: redirect,
      });
    } catch (err) {
      toast.error('Google login failed!');
    }
  };

  return (
    <div className="min-h-screen bg-[#fffdf7] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl border border-orange-100 p-8 md:p-10">

          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-4">
              <span className="text-3xl font-extrabold">
                <span className="text-orange-500">Sun</span>
                <span className="text-yellow-500">Cart</span>
              </span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">Welcome Back 👋</h1>
            <p className="text-gray-400 text-sm mt-1">
              Login to your account to continue
            </p>
            {/* Show redirect notice */}
            {redirect !== '/' && (
              <div className="mt-3 bg-orange-50 border border-orange-200 text-orange-500 text-xs rounded-xl px-4 py-2">
                🔒 Login to view the product you selected
              </div>
            )}
          </div>

          {/* Google Button */}
          <button
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-full py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 transition mb-6"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-4 h-4"
            />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">or login with email</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-500 text-sm rounded-2xl px-4 py-3 mb-5">
              ⚠️ {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-xl text-black border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 rounded-xl text-black border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 text-white font-semibold py-3 rounded-full hover:bg-orange-600 transition shadow-md shadow-orange-200 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Logging in...' : 'Login →'}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-400 mt-6">
            Don't have an account?{' '}
            <Link
              href="/register"
              className="text-orange-500 font-semibold hover:underline"
            >
              Register here
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#fffdf7] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange-300 border-t-orange-500 rounded-full animate-spin" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
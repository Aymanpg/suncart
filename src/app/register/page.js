// src/app/register/page.js
'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signUp, signIn } from '@/lib/auth-client';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',  // ← added
    image: '',
  });
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setError('Image must be smaller than 2MB.');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setForm((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      setLoading(false);
      return;
    }

    // ← added: check passwords match
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const res = await signUp.email({
        name: form.name,
        email: form.email,
        password: form.password,
        image: form.image || undefined,
      });

      if (res?.error) {
        setError(res.error.message || 'Registration failed. Try again.');
        toast.error('Registration failed!');
      } else {
        toast.success('Account created successfully!');
        router.push('/login');
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
      await signIn.social({ provider: 'google', callbackURL: '/' });
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
            <h1 className="text-2xl font-bold text-gray-800">Create Account ✨</h1>
            <p className="text-gray-400 text-sm mt-1">
              Join SunCart and start your summer shopping
            </p>
          </div>

          {/* Google Button */}
          <button
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-full py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 transition mb-6"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">or register with email</span>
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

            {/* Avatar Upload */}
            <div className="flex flex-col items-center mb-2">
              <div className="relative">
                {preview ? (
                  <img src={preview} alt="Preview" className="w-20 h-20 rounded-full object-cover border-4 border-orange-200 shadow-md" />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-orange-100 border-4 border-orange-200 shadow-md flex items-center justify-center text-3xl">
                    👤
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="absolute bottom-0 right-0 bg-orange-500 text-white w-7 h-7 rounded-full flex items-center justify-center shadow-md hover:bg-orange-600 transition text-sm"
                >
                  📷
                </button>
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              <button type="button" onClick={() => fileInputRef.current.click()} className="mt-2 text-xs text-orange-500 font-medium hover:underline">
                {preview ? 'Change Photo' : 'Upload Profile Photo'}
              </button>
              <p className="text-xs text-gray-400 mt-0.5">Optional — Max 2MB</p>
            </div>

            {/* Name */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">Full Name</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition" />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">Email Address</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition" />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">Password</label>
              <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Min. 6 characters" required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition" />
              {form.password && (
                <div className="mt-2">
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-300 ${
                      form.password.length < 6 ? 'w-1/4 bg-red-400' : form.password.length < 10 ? 'w-2/4 bg-yellow-400' : 'w-full bg-green-400'
                    }`} />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {form.password.length < 6 ? 'Too short' : form.password.length < 10 ? 'Good' : 'Strong password ✓'}
                  </p>
                </div>
              )}
            </div>

            {/* ← Confirm Password — new block */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition"
              />
              {form.confirmPassword && (
                <p className={`text-xs mt-1 ${form.password === form.confirmPassword ? 'text-green-500' : 'text-red-400'}`}>
                  {form.password === form.confirmPassword ? 'Passwords match ✓' : 'Passwords do not match'}
                </p>
              )}
            </div>

            {/* Submit */}
            <button type="submit" disabled={loading}
              className="w-full bg-orange-500 text-white font-semibold py-3 rounded-full hover:bg-orange-600 transition shadow-md shadow-orange-200 disabled:opacity-60 disabled:cursor-not-allowed mt-2">
              {loading ? 'Creating Account...' : 'Create Account →'}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-400 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-orange-500 font-semibold hover:underline">Login here</Link>
          </p>

        </div>
      </div>
    </div>
  );
}
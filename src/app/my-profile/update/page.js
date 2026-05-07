// src/app/my-profile/update/page.js
'use client';
import { useState, useEffect, useRef } from 'react';
import { useSession, authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function UpdateProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const user = session?.user;
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({ name: '', image: '' });
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Prefill form with current user data
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        image: user.image || '',
      });
      setPreview(user.image || '');
    }
  }, [user]);

  // Redirect if not logged in
  useEffect(() => {
    if (!isPending && !user) {
      router.push('/login');
    }
  }, [isPending, user, router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  // Convert image file to base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Max 2MB check
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

    if (!form.name.trim()) {
      setError('Name cannot be empty.');
      setLoading(false);
      return;
    }

    try {
      const res = await authClient.updateUser({
        name: form.name,
        image: form.image || undefined,
      });

      if (res?.error) {
        setError(res.error.message || 'Update failed. Try again.');
        toast.error('Update failed!');
      } else {
        toast.success('Profile updated successfully! 🎉');
        router.push('/my-profile');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

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

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#fffdf7] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl border border-orange-100 p-8 md:p-10">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
              ✏️
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Update Profile</h1>
            <p className="text-gray-400 text-sm mt-1">
              Change your name or profile photo
            </p>
          </div>

          {/* Avatar Upload */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover border-4 border-orange-200 shadow-md"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-orange-500 border-4 border-orange-200 shadow-md flex items-center justify-center text-white text-3xl font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              )}

              {/* Camera Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="absolute bottom-0 right-0 bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:bg-orange-600 transition"
              >
                📷
              </button>
            </div>

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="mt-3 text-sm text-orange-500 font-medium hover:underline"
            >
              Choose Photo from Device
            </button>
            <p className="text-xs text-gray-400 mt-1">Max size: 2MB</p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-500 text-sm rounded-2xl px-4 py-3 mb-5">
              ⚠️ {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 text-white font-semibold py-3 rounded-full hover:bg-orange-600 transition shadow-md shadow-orange-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving Changes...' : 'Save Changes →'}
            </button>

          </form>

          {/* Back */}
          <div className="text-center mt-5">
            <Link
              href="/my-profile"
              className="text-sm text-gray-400 hover:text-orange-500 transition"
            >
              ← Back to Profile
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
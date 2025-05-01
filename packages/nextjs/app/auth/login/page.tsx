"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log("Login form submitted:", formData);
  };

  return (
    <div className="w-full max-w-md p-8 space-y-8 rounded-lg shadow-xl bg-[#10131c] border border-[#23272F] mt-16">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
        <p className="mt-2 text-gray-400">Sign in to your StoneProof account</p>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="input input-bordered w-full mt-1 bg-[#1a1f2e] border-[#23272F] text-white"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="input input-bordered w-full mt-1 bg-[#1a1f2e] border-[#23272F] text-white"
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
        </div>

        <div>
          <button type="submit" className="btn btn-primary w-full bg-blue-600 hover:bg-blue-700 text-white">
            Sign In
          </button>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-400">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              className="text-blue-400 hover:text-blue-300"
              onClick={() => router.push("/auth/signup")}
            >
              Sign up
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}

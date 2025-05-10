"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import StoneProof from "../../../components/landing/Header/StoneProof";
import { toast } from "../../lib/toast";
import { FiArrowLeft, FiEye, FiEyeOff, FiInfo } from "react-icons/fi";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const loadingToast = toast.loading("Logging in...");
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      toast.dismiss(loadingToast);
      if (response.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", formData.email);
        localStorage.setItem("password", formData.password);
        toast.success("Login successful! Redirecting...");
        setTimeout(() => {
          router.push("/welcome");
        }, 2000);
      } else {
        toast.error(data.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      toast.error("An error occurred during login.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#060910] flex flex-col md:flex-row items-stretch px-2 sm:px-4 md:px-8 lg:px-12 xl:px-20 py-0 gap-0">
      {/* Left Section: Logo, tagline, and laptop image */}
      <div className="flex flex-col flex-1 justify-center items-center h-auto md:h-screen select-none bg-transparent order-1 md:order-none pt-8 md:pt-0 pb-8 md:pb-0">
        {/* Back Button */}
        <button
          className="absolute top-2 left-2 md:top-4 md:left-4 flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-lg bg-[#181c27] border border-[#23272F] hover:bg-[#23272F] transition-colors z-20"
          onClick={() => router.push("/")}
          aria-label="Back to website"
        >
          <FiArrowLeft className="text-white text-xl md:text-2xl" />
        </button>
        {/* Logo and StoneProof */}
        <div className="flex flex-col items-start w-full max-w-xl px-4 sm:px-6 md:px-8 pt-4 md:pt-8">
          <StoneProof size="xl" />
        </div>
        {/* Tagline and badge */}
        <div className="flex flex-col items-start w-full max-w-xl px-4 sm:px-6 md:px-8 mt-6 md:mt-8">
          <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 sm:px-4 py-1 rounded mb-4 md:mb-6 tracking-wide">
            30% OF THE INDUSTRY
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-2 leading-tight">
            Trust, Transparency &<br />
            Traceability in Mining
          </h1>
          <span className="text-gray-400 text-base sm:text-lg md:text-xl mb-4">Welcome back!</span>
        </div>
        {/* Large Laptop Image */}
        <div className="flex flex-col items-center w-full max-w-3xl px-2 sm:px-6 mt-4">
          <img
            src="/auth/auth.svg"
            alt="Dashboard"
            className="w-[95vw] sm:w-full h-auto object-contain pointer-events-none select-none max-h-[220px] sm:max-h-[320px] md:max-h-[420px] lg:max-h-[500px] max-w-3xl"
          />
        </div>
      </div>

      {/* Right Section: Login Form */}
      <div
        className="flex flex-col flex-1 items-center justify-center min-h-screen overflow-y-auto scrollbar-none order-2 md:order-none"
        style={{ scrollbarWidth: "none" }}
      >
        {/* Title and Subtitle outside the card */}
        <div className="w-full max-w-xl mx-auto pt-8 md:pt-12 pb-2 md:pb-4 px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-2">
            Welcome Back! Login
          </h2>
          <p className="text-gray-400 text-center text-base sm:text-lg">Login into your account to access the system</p>
        </div>
        {/* Card */}
        <div className="w-full max-w-xl flex flex-col px-0 sm:px-6">
          {/* Card Body */}
          <div className=" rounded-xl px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-10 flex flex-col border border-[#23272F]">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="w-full">
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Password"
                    required
                    className="w-full py-3 px-4 bg-[#14171F] focus:bg-[#14171F] border border-[#2A2F3D] rounded-md text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    aria-label="Show info"
                  >
                    <FiInfo className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Valid email address used in registration</p>
              </div>

              <div className="w-full">
                <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Type Password here"
                    required
                    className="w-full py-3 px-4 bg-[#14171F] focus:bg-[#14171F] border border-[#2A2F3D] rounded-md text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 focus:outline-none"
                    onClick={() => setShowPassword(v => !v)}
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Passwords need to match</p>
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                  Remember me on this device
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
              >
                Login
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-400">
                  Don&apos;t have account?{" "}
                  <button
                    type="button"
                    className="text-blue-400 hover:text-blue-300 font-medium"
                    onClick={() => router.push("/auth/signup")}
                  >
                    Sign up
                  </button>
                </p>
              </div>

              {/* Divider */}
              <div className="flex items-center my-4">
                <div className="flex-grow h-px bg-[#23272F]" />
                <span className="mx-4 text-gray-500 text-sm">Or, sign up with your email</span>
                <div className="flex-grow h-px bg-[#23272F]" />
              </div>

              {/* Social Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-md border border-[#23272F] bg-[#2B2D2F] text-white font-semibold hover:bg-[#23272F] transition-colors"
                  onClick={() => (window.location.href = "https://stoneproofbackend.onrender.com/auth/google")}
                >
                  <img src="/auth/google.svg" alt="Google" className="w-6 h-6 pointer-events-none select-none" /> Sign
                  in with Google
                </button>
                <button
                  type="button"
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-md border border-[#23272F] bg-[#202634] text-white font-semibold hover:bg-[#23272F] transition-colors"
                >
                  <img src="/wallet.svg" alt="Wallet" className="w-10 h-10 pointer-events-none select-none" /> Sign in
                  with Wallet
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

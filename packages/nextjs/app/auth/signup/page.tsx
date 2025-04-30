"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StoneProof from "../../../components/landing/Header/StoneProof";
import { FiArrowLeft, FiInfo } from "react-icons/fi";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement signup logic
    console.log("Signup form submitted:", formData);
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
          <span className="text-gray-400 text-base sm:text-lg md:text-xl mb-4">Let&apos;s get you started!</span>
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

      {/* Right Section: Signup Form */}
      <div
        className="flex flex-col flex-1 items-center justify-center min-h-screen overflow-y-auto scrollbar-none order-2 md:order-none"
        style={{ scrollbarWidth: "none" }}
      >
        {/* Title and Subtitle outside the card */}
        <div className="w-full max-w-xl mx-auto pt-8 md:pt-12 pb-2 md:pb-4 px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-2">Create Account</h2>
          <p className="text-gray-400 text-center text-base sm:text-lg">
            Create you first account here to enter our system
          </p>
        </div>
        {/* Card */}
        <div className="w-full max-w-xl flex flex-col px-0 sm:px-6">
          {/* Card Header */}
          <div className="bg-[#181c27] rounded-t-xl px-0 pt-0 pb-4">
            {/* Progress Bar */}
            <div className="relative w-full h-2">
              <div className="absolute left-0 top-0 h-2 w-full bg-[#23272F] rounded-t-xl" />
              <div className="absolute left-0 top-0 h-2 bg-blue-600 rounded-tl-xl" style={{ width: "33%" }} />
            </div>
            {/* Steps */}
            <div className="flex w-full justify-between items-center px-2 sm:px-4 md:px-8 pt-3">
              {/* Step 1 */}
              <div className="flex flex-col items-center flex-1">
                <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full border-2 border-blue-600 bg-blue-600 text-white text-sm sm:text-base font-bold">
                  1
                </div>
              </div>
              {/* Dotted line */}
              <div className="flex-1 flex items-center justify-center">
                <div
                  className="w-full border-t-2 border-dotted border-blue-500"
                  style={{ borderStyle: "dotted" }}
                ></div>
              </div>
              {/* Step 2 */}
              <div className="flex flex-col items-center flex-1">
                <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full border-2 border-[#23272F] bg-[#23272F] text-gray-400 text-sm sm:text-base font-bold">
                  2
                </div>
              </div>
              {/* Dotted line */}
              <div className="flex-1 flex items-center justify-center">
                <div
                  className="w-full border-t-2 border-dotted border-[#23272F]"
                  style={{ borderStyle: "dotted" }}
                ></div>
              </div>
              {/* Step 3 */}
              <div className="flex flex-col items-center flex-1">
                <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full border-2 border-[#23272F] bg-[#23272F] text-gray-400 text-sm sm:text-base font-bold">
                  3
                </div>
              </div>
            </div>
          </div>
          {/* Card Body */}
          <div className="bg-[#060910] rounded-b-xl px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-10 flex flex-col border-t-0 border border-[#23272F]">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-1/2">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-1">
                    First Name
                  </label>
                  <div className="relative">
                    <input
                      id="firstName"
                      name="firstName"
                      placeholder="John"
                      type="text"
                      required
                      className="input input-bordered w-full bg-[#232B3E] focus:bg-[#232B3E] border-[#23272F] text-white pr-10 rounded-md focus:ring-2 focus:ring-blue-600"
                      value={formData.firstName}
                      onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-white">
                      <FiInfo size={16} />
                    </span>
                  </div>
                </div>
                <div className="w-full sm:w-1/2">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-1">
                    Last Name
                  </label>
                  <div className="relative">
                    <input
                      id="lastName"
                      name="lastName"
                      placeholder="Doe"
                      type="text"
                      required
                      className="input input-bordered w-full bg-[#232B3E] focus:bg-[#232B3E] border-[#23272F] text-white pr-10 rounded-md focus:ring-2 focus:ring-blue-600"
                      value={formData.lastName}
                      onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-white">
                      <FiInfo size={16} />
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email*
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    required
                    className="input input-bordered w-full bg-[#232B3E] focus:bg-[#232B3E] border-[#23272F] text-white pr-10 rounded-md focus:ring-2 focus:ring-blue-600"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-white">
                    <FiInfo size={16} />
                  </span>
                </div>
                <span className="text-xs text-gray-500 ml-1">Input your email address</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-1/2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                    Password*
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Password"
                      required
                      className="input input-bordered w-full bg-[#232B3E] focus:bg-[#232B3E] border-[#23272F] text-white pr-10 rounded-md focus:ring-2 focus:ring-blue-600"
                      value={formData.password}
                      onChange={e => setFormData({ ...formData, password: e.target.value })}
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-white">
                      <FiInfo size={16} />
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 ml-1">Please enter your password</span>
                </div>
                <div className="w-full sm:w-1/2">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                    Confirm Password*
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm Password"
                      required
                      className="input input-bordered w-full bg-[#232B3E] focus:bg-[#232B3E] border-[#23272F] text-white pr-10 rounded-md focus:ring-2 focus:ring-blue-600"
                      value={formData.confirmPassword}
                      onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-white">
                      <FiInfo size={16} />
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 ml-1">Passwords need to match</span>
                </div>
              </div>
              <div className="flex items-center mb-2">
                <input
                  id="acceptTerms"
                  name="acceptTerms"
                  type="checkbox"
                  required
                  checked={formData.acceptTerms}
                  onChange={e => setFormData({ ...formData, acceptTerms: e.target.checked })}
                  className="w-5 h-5 border border-[#23272F] rounded-sm focus:bg-[#181c27] checked:bg-[#181c27] accent-blue-600 focus:ring-2 focus:ring-blue-600 mr-2"
                />
                <label htmlFor="acceptTerms" className="text-sm text-white select-none">
                  I accept the <span className="underline cursor-pointer">Terms and Privacy Policy</span>
                </label>
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-md bg-[#0A77FF] hover:bg-[#0A77FF]/80 text-white font-semibold text-lg transition-colors mb-2 shadow-none border-none"
              >
                Continue
              </button>
              <div className="text-center mb-2">
                <span className="text-gray-400 text-sm">Already have an account? </span>
                <button
                  type="button"
                  className="text-[#0A77FF] hover:text-[#0A77FF]/80 text-sm font-semibold ml-1"
                  onClick={() => router.push("/auth/login")}
                >
                  Log in
                </button>
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
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-md border border-[#23272F] bg-[#232B3E] text-white font-semibold hover:bg-[#23272F] transition-colors"
                >
                  <img src="/auth/google.svg" alt="Google" className="w-6 h-6 pointer-events-none select-none" /> Sign up with Google
                </button>
                <button
                  type="button"
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-md border border-[#23272F] bg-[#232B3E] text-white font-semibold hover:bg-[#23272F] transition-colors"
                >
                  <img src="/auth/metamask.svg" alt="Metamask" className="w-6 h-6 pointer-events-none select-none" /> Connect Metamask
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

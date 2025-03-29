import React, { useState } from "react";

const Subscribe = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your subscription logic here
    console.log("Subscribing email:", email);
  };

  return (
    <div className="w-full text-white py-8 sm:py-12 md:py-16 font-montserrat">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-center bg-gradient-to-r from-white via-white/100 to-white/40 inline-block text-transparent bg-clip-text">
            Receive transmissions
          </h2>
          <p className="text-sm sm:text-base text-center mb-6 sm:mb-8 text-white/70">
            Unsubscribe at any time.{" "}
            <a href="/" className="hover:opacity-80 transition-opacity">
              Privacy policy
            </a>{" "}
            ↗
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your email"
              className="w-full h-12 sm:h-14 px-4 bg-[#1B2333] text-white rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              required
            />
            <button
              type="submit"
              className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 bg-gradient-to-r from-white via-white/100 to-white/40 text-gray-800 font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;

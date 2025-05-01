import React from "react";

const CallToAction = () => {
  return (
    <div className="relative w-full bg-gradient-to-b from-[#10131A] to-[#0A0F1B] flex flex-col items-center justify-center py-20 px-4 overflow-hidden">
      <div className="max-w-4xl w-full flex flex-col items-center justify-center mx-auto">
        <h1 className="text-white text-3xl md:text-5xl font-bold text-center mb-8 leading-tight">
          Welcome to your new digital Mineral Supply Chain that
          <br className="hidden md:block" /> will change your world.
        </h1>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button className="bg-[#258AFF] hover:bg-[#1a6ed8] text-white font-semibold rounded-lg px-8 py-3 text-lg shadow transition-colors duration-200">
            Start now
          </button>
          <a
            href="#"
            className="flex items-center gap-2 text-[#258AFF] hover:text-blue-400 font-semibold text-lg transition-colors duration-200"
          >
            Learn more
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
        {/* Device mockup image (user to provide actual image) */}
        <div className="w-full flex justify-center">
          <img
            src="/landing/mockup.svg" // User to provide
            alt="Dashboard mockup"
            className="w-full max-w-5xl  object-contain"
            style={{ marginTop: "-30px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default CallToAction;

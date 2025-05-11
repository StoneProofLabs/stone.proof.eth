import React from "react";

const RefineryActivityCard = () => (
  <div className="rounded-2xl p-6 border border-[#1E2328] flex flex-col gap-6 w-full">
    <div className="flex justify-between items-center">
      <div className="font-semibold text-lg">Last activities</div>
      <button>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="1" fill="white" />
          <circle cx="6" cy="12" r="1" fill="white" />
          <circle cx="18" cy="12" r="1" fill="white" />
        </svg>
      </button>
    </div>
    <div className="flex flex-col gap-4">
      {[1, 2, 3].map((_, index) => (
        <div key={index} className="flex items-center justify-between border-b border-[#1E2328] pb-4">
          <div className="flex items-center gap-3">
            <img src="/dashboard/gold.jpeg" alt="Gold" className="w-10 h-10 rounded-full" />
            <span className="font-medium">Gold</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">16 hrs ago</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      ))}
    </div>
    <button className="w-full mt-2 bg-[#0A77FF] text-white py-3 rounded-lg font-medium">View full history</button>
  </div>
);

export default RefineryActivityCard;

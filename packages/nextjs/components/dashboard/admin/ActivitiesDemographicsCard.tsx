import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaExternalLinkAlt } from "react-icons/fa";

const markers: { name: string; coordinates: [number, number]; color: string }[] = [
  { name: "Rwanda", coordinates: [30.0619, -1.9403], color: "#22c55e" },
  { name: "Uganda", coordinates: [32.2903, 1.3733], color: "#fbbf24" },
  { name: "Australia", coordinates: [133.7751, -25.2744], color: "#3b82f6" },
];

export default function ActivitiesDemographicsCard() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="bg-transparent border border-[#323539] rounded-2xl p-4 flex flex-col h-full min-w-[220px] w-full max-w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-white text-lg md:text-xl font-semibold">Activities Demographics</span>
        <button className="text-gray-400 hover:text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="2" />
            <circle cx="19" cy="12" r="2" />
            <circle cx="5" cy="12" r="2" />
          </svg>
        </button>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 flex-1 w-full">
        <div
          className="relative w-full max-w-[500px] mx-auto"
          style={{ minHeight: 300, height: "50vw", maxHeight: 400 }}
        >
          <div className="relative w-full h-full select-none pointer-events-none">
            <Image
              src="/dashboard/icon_set/map.svg"
              alt="World Map"
              fill
              className="object-contain"
              style={{
                filter: "brightness(0.8)",
                userSelect: "none",
                WebkitUserSelect: "none",
                MozUserSelect: "none",
                msUserSelect: "none",
                pointerEvents: "none",
              }}
              draggable={false}
              onDragStart={e => e.preventDefault()}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 min-w-[120px] w-full md:w-auto justify-center md:justify-start">
          {markers.map(item => (
            <div key={item.name} className="flex items-center gap-3 text-sm md:text-base">
              <span className="w-4 h-4 rounded-full inline-block" style={{ background: item.color }} />
              <span className="text-white font-medium">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <a href="#" className="text-blue-500 hover:underline flex items-center gap-1 text-base font-medium">
          Open <FaExternalLinkAlt className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

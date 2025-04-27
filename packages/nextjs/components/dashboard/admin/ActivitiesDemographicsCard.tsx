import React, { useEffect, useState } from "react";
import type { Feature } from "geojson";
import { FaExternalLinkAlt } from "react-icons/fa";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { ResponsiveContainer } from "recharts";

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

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
          className="relative flex items-center justify-center w-full max-w-[340px] mx-auto"
          style={{ minWidth: 0, minHeight: 180, height: "40vw", maxHeight: 260 }}
        >
          <ResponsiveContainer width="100%" height="100%" aspect={1}>
            <ComposableMap
              projectionConfig={{ scale: 80 }}
              width={340}
              height={180}
              style={{ width: "100%", height: "100%" }}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }: { geographies: Feature[] }) =>
                  geographies.map(geo => (
                    <Geography
                      key={(geo as Feature & { rsmKey: string }).rsmKey}
                      geography={geo}
                      fill="#23272b"
                      stroke="#323539"
                      style={{ outline: "none" }}
                    />
                  ))
                }
              </Geographies>
              {markers.map((marker, idx) => (
                <Marker key={idx} coordinates={marker.coordinates}>
                  <circle r={6} fill={marker.color} stroke="#fff" strokeWidth={2} />
                  <text textAnchor="middle" y={-12} style={{ fontFamily: "inherit", fontSize: 10, fill: "#fff" }}>
                    {marker.name}
                  </text>
                </Marker>
              ))}
            </ComposableMap>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-row flex-wrap md:flex-col gap-2 min-w-[120px] w-full md:w-auto justify-center md:justify-start">
          {markers.map(item => (
            <div key={item.name} className="flex items-center gap-2 text-xs md:text-base w-1/2 md:w-auto">
              <span className="w-3 h-3 rounded-full inline-block" style={{ background: item.color }} />
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

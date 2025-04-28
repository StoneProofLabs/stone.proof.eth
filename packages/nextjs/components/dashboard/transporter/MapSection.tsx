import { useEffect, useState } from "react";
import Image from "next/image";
import { MoreVertical, Search } from "lucide-react";

// Note: In a real implementation, you would need to:
// 1. Install and import a maps library like react-leaflet or react-google-maps
// 2. Set up proper API keys
// This is a visual mockup that demonstrates the UI functionality

export default function LocationMap() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsMapLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Toggle location tracking
  const toggleLocation = () => {
    setLocationEnabled(!locationEnabled);
  };

  return (
    <div className=" text-white min-h-screen">
      {/* Header */}
      <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-0">Find a location</h1>
        <div className="flex w-full sm:w-auto justify-between gap-2">
          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search here..."
              className="w-full py-2 pl-10 pr-4 bg-gray-800 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm whitespace-nowrap">Enable location</span>
            <button
              onClick={toggleLocation}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${locationEnabled ? "bg-blue-600" : "bg-gray-700"}`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${locationEnabled ? "translate-x-6" : "translate-x-1"}`}
              />
            </button>

            <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div>
        <Image src={"/map.svg"} height={400} width={800} alt="Maps svg" />
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { MoreVertical, Search } from "lucide-react";

declare global {
  interface Window {
    google: typeof google;
  }
}

export default function LocationMap() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [userPosition, setUserPosition] = useState<google.maps.LatLngLiteral | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  // Handle geolocation
  useEffect(() => {
    if (!locationEnabled) return;

    const successCallback = (position: GeolocationPosition) => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      setUserPosition(pos);
    };

    const errorCallback = (error: GeolocationPositionError) => {
      console.error("Error getting location:", error);
      setUserPosition(null);
    };

    const watchId = navigator.geolocation.watchPosition(successCallback, errorCallback, {
      enableHighAccuracy: true,
    });

    return () => navigator.geolocation.clearWatch(watchId);
  }, [locationEnabled]);

  const toggleLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setLocationEnabled(!locationEnabled);
  };

  return (
    <div className="text-white min-h-screen flex flex-col">
      {/* Header */}
      <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-900 z-10">
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
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                locationEnabled ? "bg-blue-600" : "bg-gray-700"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  locationEnabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>

            <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Google Map */}
      <div className="flex-1 relative">
        {apiKey ? (
          <APIProvider apiKey={apiKey}>
            <Map
              defaultCenter={userPosition || { lat: 0, lng: 0 }}
              center={userPosition || undefined}
              defaultZoom={userPosition ? 14 : 2}
              zoom={userPosition ? 14 : undefined}
              gestureHandling={"greedy"}
              disableDefaultUI={true}
              style={{ width: "100%", height: "calc(100vh - 100px)" }}
            >
              {userPosition && <Marker position={userPosition} />}
            </Map>
          </APIProvider>
        ) : (
          <div className="text-red-500 p-4">Google Maps API key is required</div>
        )}
      </div>
    </div>
  );
}

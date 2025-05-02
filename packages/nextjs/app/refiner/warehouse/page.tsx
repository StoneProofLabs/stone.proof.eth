"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, ChevronDown, Droplet, MapPin, Minus, Plus, Thermometer } from "lucide-react";
import { Mineral } from "~~/components/dashboard/refiner/mineralListTable/types";

type UpdateMineralFormProps = {
  mineral?: Mineral;
  onSubmit?: (updatedMineral: Partial<Mineral>) => Promise<void>;
};

export default function Page() {
  const router = useRouter();
  const [portalOpen, setPortalOpen] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState({
    temperature: "In Celsius",
    storage: "Select Type",
    humidity: "Select Type",
  });
  const [formData, setFormData] = useState<Partial<Mineral>>({
    name: "",
    code: "",
    type: "",
    origin: "",
    weight: 0,
    weightUnit: "KG",
    purity: 0,
    storageConditions: "No Conditions specified",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;

    if (type === "number") {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleQuantityChange = (change: number) => {
    setFormData(prev => ({
      ...prev,
      weight: Math.max(0, (prev.weight || 0) + change),
    }));
  };

  const handlePurityChange = (change: number) => {
    setFormData(prev => ({
      ...prev,
      purity: Math.max(0, Math.min(100, (prev.purity || 0) + change)),
    }));
  };

  return (
    <div className="min-h-screen text-white p-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-center">Minerals in Warehouse</h1>
        <p className="text-[#979AA0]">
          Efficient storage and management of refined minerals is key to ensuring quality, compliance, and seamless
          distribution. This portal provides real-time tracking of inventory levels, storage conditions, and order
          fulfillment
        </p>

        <form className="border border-[#323539] rounded-xl p-6">
          <div className="mb-6">
            <label className="block mb-2">Warehouse name</label>
            <div className="relative">
              <input
                type="text"
                className="w-full bg-[#252525] border border-[#323539] rounded-md py-2 px-3 pr-10 text-white"
                placeholder="Valid warehouse name"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block mb-2">Type</label>
            <input
              type="text"
              placeholder="Top mineral"
              className="w-full bg-[#252525] border border-[#323539] rounded-md py-2 px-3 text-white"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2">Location</label>
            <input
              type="text"
              placeholder="Enter origin here"
              className="w-full bg-[#252525] border border-[#323539] rounded-md py-2 px-3 text-white"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2">Quantity</label>
            <div className="flex items-center">
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full bg-[#252525] border border-[#323539] rounded-md py-2 px-3 text-white"
              />
              <span className="mx-2">KG</span>
              <button
                type="button"
                onClick={() => handleQuantityChange(-1)}
                className="bg-[#252525] border border-[#323539] rounded-md p-2 ml-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => handleQuantityChange(1)}
                className="bg-[#252525] border border-[#323539] rounded-md p-2 ml-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>

          <div className="mb-6 relative">
            <label className="block mb-2">Storage Conditions</label>
            <div
              className="flex items-center justify-between bg-[#1A1B1E] border border-[#323539] rounded-md py-2 px-3 cursor-pointer"
              onClick={() => setPortalOpen(!portalOpen)}
            >
              <span>{formData.storageConditions}</span>
              <button type="button" className="text-white">
                <svg
                  className={`w-5 h-5 transform transition-transform ${portalOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            {portalOpen && (
              <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
                <div className="bg-[#0D0D0D] border border-gray-700 rounded-xl p-8 w-[400px] relative">
                  <h2 className="text-white text-lg mb-6 font-semibold">Specify Storage Conditions</h2>

                  {/* Temperature */}
                  <div className="mb-4">
                    <label className="block text-white text-sm mb-2">Temperature (°C):</label>
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="Enter temperature"
                        value={
                          selectedCondition.temperature === "In Celsius"
                            ? ""
                            : selectedCondition.temperature.replace("°C", "")
                        }
                        onChange={e =>
                          setSelectedCondition(prev => ({
                            ...prev,
                            temperature: e.target.value ? `${e.target.value}°C` : "In Celsius",
                          }))
                        }
                        className="w-full bg-[#252525] border border-[#323539] text-white rounded px-4 py-2 focus:outline-none"
                      />
                      <Thermometer
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={16}
                      />
                    </div>
                  </div>

                  {/* Storage Type */}
                  <div className="mb-4">
                    <label className="block text-white text-sm mb-2">Storage Type:</label>
                    <select
                      value={selectedCondition.storage}
                      onChange={e => setSelectedCondition(prev => ({ ...prev, storage: e.target.value }))}
                      className="w-full bg-[#252525] border border-[#323539] text-white rounded px-4 py-2 focus:outline-none"
                    >
                      <option value="Select Type">Select Storage Type</option>
                      <option value="Cool & Dry Place">Cool & Dry Place</option>
                      <option value="Room Temperature">Room Temperature</option>
                      <option value="Refrigerated">Refrigerated</option>
                      <option value="Freezer">Freezer</option>
                      <option value="Climate Controlled">Climate Controlled</option>
                    </select>
                  </div>

                  {/* Humidity Range */}
                  <div className="mb-6">
                    <label className="block text-white text-sm mb-2">Humidity Range (%):</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={selectedCondition.humidity.split("-")[0].replace("%", "")}
                        onChange={e => {
                          const current = selectedCondition.humidity.split("-");
                          setSelectedCondition(prev => ({
                            ...prev,
                            humidity: `${e.target.value}-${current[1] || "50"}%`,
                          }));
                        }}
                        className="flex-1 bg-[#252525] border border-[#323539] text-white rounded px-4 py-2 focus:outline-none"
                        min="0"
                        max="100"
                      />
                      <span className="text-gray-400">to</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={selectedCondition.humidity.split("-")[1]?.replace("%", "") || ""}
                        onChange={e => {
                          const current = selectedCondition.humidity.split("-");
                          setSelectedCondition(prev => ({
                            ...prev,
                            humidity: `${current[0] || "30"}-${e.target.value}%`,
                          }));
                        }}
                        className="flex-1 bg-[#252525] border border-[#323539] text-white rounded px-4 py-2 focus:outline-none"
                        min="0"
                        max="100"
                      />
                      <Droplet className="text-gray-400" size={16} />
                    </div>
                  </div>

                  {/* Confirm */}
                  <button
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        storageConditions: `${selectedCondition.temperature}, ${selectedCondition.storage}, ${selectedCondition.humidity}`,
                      }));
                      setPortalOpen(false);
                    }}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-md"
                  >
                    Confirm
                  </button>

                  {/* Close */}
                  <button
                    onClick={() => setPortalOpen(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md font-medium transition-colors"
            >
              {loading ? "Registering" : "Register"}
            </button>
            <p className="text-center text-sm text-gray-400 mt-2">Your transaction is safe and secure</p>
          </div>
        </form>
      </div>
    </div>
  );
}

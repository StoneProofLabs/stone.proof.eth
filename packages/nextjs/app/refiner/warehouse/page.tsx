"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mineral } from "~~/components/dashboard/refiner/mineralListTable/types";

type UpdateMineralFormProps = {
  mineral?: Mineral;
  onSubmit?: (updatedMineral: Partial<Mineral>) => Promise<void>;
};

export default function Page() {
  const router = useRouter();
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

          <div className="mb-6">
            <label className="block mb-2">Storage Conditions</label>
            <div className="flex items-center justify-between bg-[#1A1B1E] border border-[#323539] rounded-md py-2 px-3">
              <span>{formData.storageConditions}</span>
              <button type="button" className="text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
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

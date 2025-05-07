"use client";

import { useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, Copy, Lock, Minus, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Define the form schema using Zod
const transferMineralSchema = z.object({
  mineralId: z.string().min(1, "Mineral ID is required"),
  mineralName: z.string().min(1, "Mineral name is required"),
  type: z.string().min(1, "Type is required"),
  origin: z.string().min(1, "Origin is required"),
  quantity: z.number().min(0, "Quantity must be at least 0"),
  purity: z.number().min(0, "Purity must be at least 0").max(100, "Purity cannot exceed 100%"),
  storageConditions: z.string(),
  destination: z.string().min(1, "Destination is required"),
  transferDate: z.string().min(1, "Transfer date is required"),
});

type TransferMineralFormData = z.infer<typeof transferMineralSchema>;

export default function TransferMineralPage() {
  const [isConditionsOpen, setIsConditionsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TransferMineralFormData>({
    resolver: zodResolver(transferMineralSchema),
    defaultValues: {
      quantity: 0,
      purity: 0,
      storageConditions: "No Conditions specified",
    },
  });

  const quantity = watch("quantity");
  const purity = watch("purity");

  const conditionOptions = [
    "No Conditions specified",
    "Keep dry",
    "Low humidity",
    "Room temperature",
    "Cold storage",
    "Controlled atmosphere",
    "Dust-free environment",
    "Keep sealed",
  ];

  const onSubmit = async (data: TransferMineralFormData) => {
    try {
      console.log("Form submitted:", data);
      // Add your transfer logic here
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="min-h-screen text-white p-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-center">Transfer Mineral</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="border border-[#323539] rounded-xl p-6">
          {/* Mineral ID Field */}
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Mineral-ID</label>
            <div className="relative">
              <div className="flex items-center bg-[#2B2D2F] rounded-md p-2 pl-8">
                <Lock size={16} className="text-gray-400 absolute left-2" />
                <input
                  type="text"
                  {...register("mineralId")}
                  className="bg-transparent text-gray-400 flex-grow outline-none"
                />
                <button
                  type="button"
                  onClick={() => navigator.clipboard.writeText(watch("mineralId"))}
                  className="text-white hover:text-blue-400"
                >
                  <Copy size={16} />
                </button>
              </div>
              {errors.mineralId && <p className="text-red-500 text-sm mt-1">{errors.mineralId.message}</p>}
            </div>
          </div>

          {/* Mineral Name Field */}
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Mineral Name</label>
            <div className="relative">
              <div className="flex items-center bg-[#2B2D2F] rounded-md p-2 pl-8">
                <Lock size={16} className="text-gray-400 absolute left-2" />
                <input
                  type="text"
                  {...register("mineralName")}
                  className="bg-transparent text-gray-400 flex-grow outline-none"
                />
              </div>
              {errors.mineralName && <p className="text-red-500 text-sm mt-1">{errors.mineralName.message}</p>}
            </div>
          </div>

          {/* Type Field */}
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Type</label>
            <div className="relative">
              <div className="flex items-center bg-[#2B2D2F] rounded-md p-2 pl-8">
                <Lock size={16} className="text-gray-400 absolute left-2" />
                <input
                  type="text"
                  {...register("type")}
                  className="bg-transparent text-gray-400 flex-grow outline-none"
                />
              </div>
              {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>}
            </div>
          </div>

          {/* Origin Field */}
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Origin</label>
            <div className="relative">
              <div className="flex items-center bg-[#2B2D2F] rounded-md p-2 pl-8">
                <Lock size={16} className="text-gray-400 absolute left-2" />
                <input
                  type="text"
                  {...register("origin")}
                  className="bg-transparent text-gray-400 flex-grow outline-none"
                />
              </div>
              {errors.origin && <p className="text-red-500 text-sm mt-1">{errors.origin.message}</p>}
            </div>
          </div>

          {/* Quantity Field */}
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Quantity</label>
            <div className="flex items-center">
              <div className="flex-grow bg-[#2B2D2F] rounded-md p-2">
                <span className="text-gray-400">{quantity} KG</span>
              </div>
              <button
                type="button"
                onClick={() => setValue("quantity", Math.max(0, quantity - 1))}
                className="bg-[#2B2D2F] text-white p-2 ml-2 rounded-md hover:bg-gray-700"
              >
                <Minus size={16} />
              </button>
              <button
                type="button"
                onClick={() => setValue("quantity", quantity + 1)}
                className="bg-[#2B2D2F] text-white p-2 ml-2 rounded-md hover:bg-gray-700"
              >
                <Plus size={16} />
              </button>
            </div>
            {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>}
          </div>

          {/* Purity Percentage Field */}
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Purity Percentage</label>
            <div className="relative">
              <div className="relative bg-[#2B2D2F] rounded-md p-4 mb-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={purity}
                  onChange={e => setValue("purity", parseInt(e.target.value))}
                  className="w-full h-2 bg-transparent appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 ${purity}%, #374151 ${purity}%)`,
                  }}
                />
              </div>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => setValue("purity", Math.max(0, purity - 1))}
                  className="bg-gray-800 text-white p-2 rounded-md hover:bg-gray-700"
                >
                  <Minus size={16} />
                </button>
                <span className="flex-grow text-center text-white">{purity}%</span>
                <button
                  type="button"
                  onClick={() => setValue("purity", Math.min(100, purity + 1))}
                  className="bg-gray-800 text-white p-2 rounded-md hover:bg-gray-700"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            {errors.purity && <p className="text-red-500 text-sm mt-1">{errors.purity.message}</p>}
          </div>

          {/* Storage Conditions Field */}
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Storage Conditions</label>
            <div className="relative">
              <button
                type="button"
                className="flex items-center justify-between w-full bg-[#2B2D2F] rounded-md p-2 text-gray-400"
                onClick={() => setIsConditionsOpen(!isConditionsOpen)}
              >
                <span>{watch("storageConditions")}</span>
                <Lock size={16} className="mr-2" />
                <ChevronDown size={16} />
              </button>

              {isConditionsOpen && (
                <div className="absolute z-10 w-full mt-1 bg-[#2B2D2F] rounded-md shadow-lg max-h-48 overflow-auto">
                  {conditionOptions.map(option => (
                    <button
                      key={option}
                      type="button"
                      className="block w-full text-left px-4 py-2 text-gray-400 hover:bg-gray-700"
                      onClick={() => {
                        setValue("storageConditions", option);
                        setIsConditionsOpen(false);
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {errors.storageConditions && (
              <p className="text-red-500 text-sm mt-1">{errors.storageConditions.message}</p>
            )}
          </div>

          {/* Destination Field */}
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Destination</label>
            <input
              type="text"
              {...register("destination")}
              className="w-full bg-[#2B2D2F] rounded-md p-2 text-gray-400 outline-none"
              placeholder="Enter destination address"
            />
            {errors.destination && <p className="text-red-500 text-sm mt-1">{errors.destination.message}</p>}
          </div>

          {/* Transfer Date Field */}
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Transfer Date</label>
            <input
              type="date"
              {...register("transferDate")}
              className="w-full bg-[#2B2D2F] rounded-md p-2 text-gray-400 outline-none"
            />
            {errors.transferDate && <p className="text-red-500 text-sm mt-1">{errors.transferDate.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-md transition-colors"
          >
            Transfer Mineral
          </button>
        </form>
      </div>
    </div>
  );
}

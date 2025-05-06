"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Check, ChevronDown, Droplet, MapPin, Minus, Plus, Thermometer } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// zod schema validation
const mineralSchema = z.object({
  mineralName: z.string().min(1, "Mineral name is required"),
  mineralType: z.string().min(1, "Mineral type is required"),
  origin: z.string().min(1, "Origin is required"),
  quantity: z.number().min(0.1, "Quantity must be at least 0.1 KG"),
  purity: z.number().min(80.1, "Purity must be greater than 80%").max(100, "Purity cannot exceed 100%"),
  storageType: z.string().min(1, "Storage type is required"),
  temperature: z.string().min(1, "Temperature is required"),
  humidity: z.string().min(1, "Humidity is required"),
});

type MineralFormData = z.infer<typeof mineralSchema>;

export default function Page() {
  const [portalOpen, setPortalOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useForm<MineralFormData>({
    resolver: zodResolver(mineralSchema),
    defaultValues: {
      mineralName: "",
      mineralType: "",
      origin: "",
      quantity: 0,
      purity: 0,
      storageType: "Select Type",
      temperature: "In Celsius",
      humidity: "Select Type",
    },
    mode: "onChange",
  });

  const formValues = watch();

  // handle submit
  const onSubmit = async (data: MineralFormData) => {
    console.log("Form data:", data);
    setIsRegistering(true);

    try {
      /**
       * submission urayikora uko ubishaka
       */
      const storageConditions = `${data.storageType} | ${data.temperature} | ${data.humidity}`;
      console.log("Storage conditions:", storageConditions);

      alert(`Mineral registered successfully!`);
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Failed to register mineral. Please try again.");
    } finally {
      setIsRegistering(false);
    }
  };

  const handleQuantityChange = (value: number) => {
    const newValue = Math.max(0, value);
    setValue("quantity", newValue, { shouldValidate: true });
  };

  const handlePurityChange = (value: number) => {
    const newValue = Math.max(0, Math.min(100, value));
    setValue("purity", newValue, { shouldValidate: true });
  };

  // Main form for users with miner role
  return (
    <div className="text-white min-h-screen flex flex-col items-center p-6">
      {/* Form Header */}
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-3">Register Mineral</h1>
        <p className="text-gray-400 text-center mb-8">Register new minerals in the system. All fields are required.</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Form Section */}
            <div className="border border-[#323539] rounded-lg p-6 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mineral Fields */}
                <div>
                  <label className="block text-sm font-medium mb-2">Mineral Name</label>
                  <input
                    {...register("mineralName")}
                    type="text"
                    placeholder="Valid Mineral name"
                    className="w-full bg-[#252525] border border-[#323539] text-white rounded px-4 py-3 focus:outline-none"
                  />
                  {errors.mineralName && <p className="text-red-500 text-xs mt-1">{errors.mineralName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <input
                    {...register("mineralType")}
                    type="text"
                    placeholder="Mineral type here"
                    className="w-full bg-[#252525] border border-[#323539] text-white rounded px-4 py-3 focus:outline-none"
                  />
                  {errors.mineralType && <p className="text-red-500 text-xs mt-1">{errors.mineralType.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Origin</label>
                  <div className="relative">
                    <input
                      {...register("origin")}
                      type="text"
                      placeholder="Enter Origin here"
                      className="w-full bg-[#252525] border border-[#323539] text-white rounded px-4 py-3 focus:outline-none"
                    />
                    <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  </div>
                  {errors.origin && <p className="text-red-500 text-xs mt-1">{errors.origin.message}</p>}
                </div>

                {/* Quantity and Purity */}
                <div>
                  <label className="block text-sm font-medium mb-2">Quantity (KG)</label>
                  <div className="bg-[#252525] flex items-center justify-between rounded-md px-4 py-3 w-full border border-[#323539]">
                    <input
                      {...register("quantity", { valueAsNumber: true })}
                      type="number"
                      className="bg-[#252525] focus:outline-none text-white text-[14px] w-full"
                      min="0"
                      step="0.1"
                    />
                    <div className="flex items-center ml-4 pl-4 border-l border-[#323539] gap-2">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(formValues.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center bg-[#3A3B3D] hover:bg-gray-600 rounded-full"
                      >
                        <Minus size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(formValues.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-[#3A3B3D] hover:bg-gray-600 rounded-full"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity.message}</p>}
                </div>

                <div className="w-full">
                  <label className="block text-sm font-medium mb-2 text-white">
                    Purity Percentage{" "}
                    {formValues.purity <= 80 && <span className="text-red-500 ml-2">(Must be &gt; 80%)</span>}
                  </label>
                  <div className="flex items-center bg-[#1E1E1E] rounded-xl overflow-hidden border border-[#323539]">
                    <div className="flex-1 px-4 py-3">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        {...register("purity", { valueAsNumber: true })}
                        className="w-full h-2 rounded-full appearance-none bg-[#e5e5ee]"
                        style={{
                          background: `linear-gradient(to right, #007BFF 0%, #007BFF ${formValues.purity}%, #e5e5ee ${formValues.purity}%, #e5e5ee 100%)`,
                        }}
                      />
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-[#2B2D2F] min-w-[130px] justify-end">
                      <button
                        type="button"
                        onClick={() => handlePurityChange(formValues.purity - 1)}
                        className="w-7 h-7 flex items-center justify-center bg-[#2f3135] hover:bg-gray-600 rounded-full text-white"
                      >
                        <Minus size={14} />
                      </button>
                      <span
                        className={`text-sm w-10 text-center ${
                          formValues.purity <= 80 ? "text-red-500" : "text-white"
                        }`}
                      >
                        {formValues.purity}%
                      </span>
                      <button
                        type="button"
                        onClick={() => handlePurityChange(formValues.purity + 1)}
                        className="w-7 h-7 flex items-center justify-center bg-[#2f3135] hover:bg-gray-600 rounded-full text-white"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  {errors.purity && <p className="text-red-500 text-xs mt-1">{errors.purity.message}</p>}
                </div>

                {/* Storage Conditions */}
                <div className="w-full relative">
                  <label className="block text-sm font-medium mb-2 text-white">Storage Conditions</label>
                  <div className="flex items-center bg-[#1E1E1E] border border-[#323539] rounded-xl overflow-hidden">
                    <div className="flex-1 px-4 py-3 text-white text-sm bg-[#252525]">
                      {formValues.storageType !== "Select Type"
                        ? `${formValues.storageType} | ${formValues.temperature} | ${formValues.humidity}`
                        : "No Conditions specified"}
                    </div>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setPortalOpen(true)}
                        className="bg-[#2B2D2F] hover:bg-gray-600 px-4 py-3 flex items-center gap-1 text-white text-sm h-full"
                      >
                        Select <ChevronDown size={18} />
                      </button>
                    </div>
                  </div>
                  {(errors.storageType || errors.temperature || errors.humidity) && (
                    <p className="text-red-500 text-xs mt-1">Storage conditions are required</p>
                  )}
                </div>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={!isValid || isRegistering}
                className={`w-full ${
                  isValid ? "bg-accentBlue hover:bg-blue-600" : "bg-gray-600 cursor-not-allowed"
                } text-white font-medium py-3 rounded mt-8 duration-500 flex items-center justify-center`}
              >
                {isRegistering ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Register Mineral"
                )}
              </button>
              <p className="text-gray-400 text-sm text-center mt-4">
                {isValid
                  ? "All required fields are complete. You can register the mineral."
                  : "Please fill all required fields to register."}
              </p>
            </div>

            {/* Right Info Panel */}
            <div className="lg:w-72">
              <div className="rounded-lg p-6">
                <h2 className="text-lg font-medium mb-4">Check-points</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <div className={`rounded-full p-1 ${formValues.mineralName ? "bg-green-500" : "bg-gray-500"}`}>
                      {formValues.mineralName ? <Check size={12} /> : <Minus size={12} />}
                    </div>
                    <span className="text-sm">Valid mineral name</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`rounded-full p-1 ${formValues.mineralType ? "bg-green-500" : "bg-gray-500"}`}>
                      {formValues.mineralType ? <Check size={12} /> : <Minus size={12} />}
                    </div>
                    <span className="text-sm">Mineral type specified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`rounded-full p-1 ${formValues.origin ? "bg-green-500" : "bg-gray-500"}`}>
                      {formValues.origin ? <Check size={12} /> : <Minus size={12} />}
                    </div>
                    <span className="text-sm">Origin provided</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`rounded-full p-1 ${formValues.quantity > 0 ? "bg-green-500" : "bg-gray-500"}`}>
                      {formValues.quantity > 0 ? <Check size={12} /> : <Minus size={12} />}
                    </div>
                    <span className="text-sm">Valid quantity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`rounded-full p-1 ${formValues.purity > 80 ? "bg-green-500" : "bg-gray-500"}`}>
                      {formValues.purity > 80 ? <Check size={12} /> : <Minus size={12} />}
                    </div>
                    <span className="text-sm">Purity &gt; 80%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`rounded-full p-1 ${
                        formValues.storageType !== "Select Type" && formValues.humidity !== "Select Type"
                          ? "bg-green-500"
                          : "bg-gray-500"
                      }`}
                    >
                      {formValues.storageType !== "Select Type" && formValues.humidity !== "Select Type" ? (
                        <Check size={12} />
                      ) : (
                        <Minus size={12} />
                      )}
                    </div>
                    <span className="text-sm">Storage conditions set</span>
                  </div>
                </div>
                <h3 className="font-medium mb-2">Tips:</h3>
                <div className="flex gap-2 text-sm">
                  <AlertCircle className="min-w-5 h-5 text-white mt-0.5" />
                  <p className="text-gray-400">
                    Ensure the details entered are accurate. Modifications won&apos;t be allowed post registration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Storage Conditions Modal */}
      {portalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="bg-[#0D0D0D] border border-gray-700 rounded-xl p-8 w-[400px] relative">
            <h2 className="text-white text-lg mb-6 font-semibold">Specify Storage Conditions</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Storage Type</label>
                <select
                  value={formValues.storageType}
                  onChange={e => {
                    setValue("storageType", e.target.value, { shouldValidate: true });
                    trigger("storageType");
                  }}
                  className="w-full bg-[#252525] border border-[#323539] text-white rounded px-4 py-3 focus:outline-none"
                >
                  <option value="Select Type">Select Type</option>
                  <option value="Dry Storage">Dry Storage</option>
                  <option value="Climate Controlled">Climate Controlled</option>
                  <option value="Refrigerated">Refrigerated</option>
                  <option value="Airtight Container">Airtight Container</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Temperature</label>
                <div className="relative">
                  <select
                    value={formValues.temperature}
                    onChange={e => {
                      setValue("temperature", e.target.value, { shouldValidate: true });
                      trigger("temperature");
                    }}
                    className="w-full bg-[#252525] border border-[#323539] text-white rounded px-4 py-3 focus:outline-none"
                  >
                    <option value="In Celsius">In Celsius</option>
                    <option value="Below 0°C">Below 0°C</option>
                    <option value="0°C to 10°C">0°C to 10°C</option>
                    <option value="10°C to 25°C">10°C to 25°C</option>
                    <option value="Above 25°C">Above 25°C</option>
                  </select>
                  <Thermometer
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Humidity</label>
                <div className="relative">
                  <select
                    value={formValues.humidity}
                    onChange={e => {
                      setValue("humidity", e.target.value, { shouldValidate: true });
                      trigger("humidity");
                    }}
                    className="w-full bg-[#252525] border border-[#323539] text-white rounded px-4 py-3 focus:outline-none"
                  >
                    <option value="Select Type">Select Type</option>
                    <option value="Low (<30%)">Low (&lt;30%)</option>
                    <option value="Moderate (30-60%)">Moderate (30-60%)</option>
                    <option value="High (>60%)">High (&gt;60%)</option>
                  </select>
                  <Droplet className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6 space-x-3">
              <button
                type="button"
                onClick={() => setPortalOpen(false)}
                className="px-4 py-2 border border-gray-600 rounded-lg text-white hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (formValues.storageType !== "Select Type" && formValues.humidity !== "Select Type") {
                    setPortalOpen(false);
                  } else {
                    alert("Please select both Storage Type and Humidity");
                  }
                }}
                className="px-4 py-2 bg-accentBlue rounded-lg text-white hover:bg-blue-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

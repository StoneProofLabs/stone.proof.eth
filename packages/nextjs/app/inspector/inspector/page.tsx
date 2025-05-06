"use client";

import React, { FormEvent, useState } from "react";
import Image from "next/image";
import { ChevronDown, Minus, Plus } from "lucide-react";

// Define proper types for form fields
interface FormData {
  warehouseName: string;
  mineralStatus: string;
  mineralType: string;
  inspectionReport: string;
  quantity: number;
  conditions: string[];
}

export default function InspectMinerals() {
  // Dropdown states
  const [mineralNameDropdownOpen, setMineralNameDropdownOpen] = useState(false);
  const [mineralStatusDropdownOpen, setMineralStatusDropdownOpen] = useState(false);
  const [conditionsDropdownOpen, setConditionsDropdownOpen] = useState(false);

  // Form state as a single object for easier backend integration
  const [formData, setFormData] = useState<FormData>({
    warehouseName: "Valid Mineral name",
    mineralStatus: "Valid Mineral name",
    mineralType: "Top Mineral",
    inspectionReport: "",
    quantity: 0,
    conditions: [],
  });

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");

  // Handle form field changes
  const handleFieldChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle quantity changes with validation
  const handleQuantityChange = (value: number) => {
    const newValue = Math.max(0, value);
    handleFieldChange("quantity", newValue);
  };

  // Handle condition toggle
  const handleConditionToggle = (condition: string) => {
    setFormData(prev => {
      const exists = prev.conditions.includes(condition);
      return {
        ...prev,
        conditions: exists ? prev.conditions.filter(c => c !== condition) : [...prev.conditions, condition],
      };
    });
    setConditionsDropdownOpen(false);
  };

  // Handle form submission
  const handleSubmit = async (action: "report" | "dispute") => {
    setIsSubmitting(true);
    setSubmissionMessage("");

    try {
      // Simulate API call - replace with your actual API integration
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Show success message based on action
      setSubmissionMessage(action === "report" ? "Report submitted successfully!" : "Dispute raised successfully!");

      // Reset form or redirect as needed
      // For demo purposes, we're just showing a message
    } catch (error) {
      setSubmissionMessage("There was an error submitting the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mock data for multiple mineral items
  const mineralItems = Array(6)
    .fill(null)
    .map((_, index) => (
      <div key={index} className="bg-zinc-900 rounded-lg p-4 border border-zinc-800">
        <div className="flex items-center gap-2 mb-4">
          <div className="text-xl">
            <Image width={30} height={30} alt="" src={"/dashboard/cobalt.png"} />
          </div>
          <h3 className="font-bold">Cobalt</h3>
          <span className="text-sm text-gray-400">[ 23/05/2025 - 23/05/2025 ]</span>
        </div>

        <div className="mb-4">
          <div className="text-sm mb-1">Purity Level:</div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-[#0A77FF] w-1/3"></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="text-sm">
            <span className="text-gray-400">Quantity:</span>
            <div className="bg-zinc-800 rounded p-2 mt-1">0 KG</div>
          </div>
          <div className="text-sm">
            <span className="text-gray-400">Price:</span>
            <div className="bg-zinc-800 rounded p-2 mt-1">0 KG</div>
          </div>
        </div>

        <button className="w-full bg-[#0A77FF] hover:bg-blue-600 text-white rounded py-2 text-sm font-medium">
          View Mineral
        </button>
      </div>
    ));

  // Available conditions data
  const availableConditions = ["Temperature Controlled", "Humidity Controlled", "High Security"];

  return (
    <div className="min-h-screen text-white p-4 sm:p-6 md:p-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Side - Pending Minerals - Now scrollable */}
        <div className="w-full md:w-1/3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium">Pending In Warehouse</h2>
            <button className="flex items-center gap-2 bg-zinc-800 rounded-full px-4 py-2">
              <span className="hidden sm:inline">Filter</span>
              <span className="bg-[#0A77FF] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                2
              </span>
            </button>
          </div>

          {/* Scrollable container for mineral items */}
          <div className="space-y-4 pr-1 max-h-[calc(100vh-150px)] overflow-y-auto">{mineralItems}</div>
        </div>

        {/* Right Side - Warehouse Form */}
        <div className="w-full md:w-2/3 bg-zinc-900 rounded-lg p-6">
          <form className="space-y-4" onSubmit={e => e.preventDefault()}>
            {/* Warehouse Name and Mineral Status in a row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Warehouse Name */}
              <div>
                <label htmlFor="warehouseName" className="block text-sm font-medium mb-2">
                  Warehouse Name
                </label>
                <div className="relative">
                  <button
                    type="button"
                    id="warehouseName"
                    onClick={() => setMineralNameDropdownOpen(!mineralNameDropdownOpen)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-3 text-left flex items-center justify-between"
                  >
                    <span>{formData.warehouseName}</span>
                    <ChevronDown size={18} />
                  </button>
                  {mineralNameDropdownOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-zinc-800 border border-zinc-700 rounded-md shadow-lg">
                      {["Valid Mineral name", "Another Mineral", "Third Option"].map(name => (
                        <button
                          type="button"
                          key={name}
                          className="block w-full text-left px-4 py-2 hover:bg-zinc-700"
                          onClick={() => {
                            handleFieldChange("warehouseName", name);
                            setMineralNameDropdownOpen(false);
                          }}
                        >
                          {name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Mineral Status */}
              <div>
                <label htmlFor="mineralStatus" className="block text-sm font-medium mb-2">
                  Mineral Status
                </label>
                <div className="relative">
                  <button
                    type="button"
                    id="mineralStatus"
                    onClick={() => setMineralStatusDropdownOpen(!mineralStatusDropdownOpen)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-3 text-left flex items-center justify-between"
                  >
                    <span>{formData.mineralStatus}</span>
                    <ChevronDown size={18} />
                  </button>
                  {mineralStatusDropdownOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-zinc-800 border border-zinc-700 rounded-md shadow-lg">
                      {["Valid Mineral name", "Verified", "Pending"].map(status => (
                        <button
                          type="button"
                          key={status}
                          className="block w-full text-left px-4 py-2 hover:bg-zinc-700"
                          onClick={() => {
                            handleFieldChange("mineralStatus", status);
                            setMineralStatusDropdownOpen(false);
                          }}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Type */}
            <div>
              <label htmlFor="mineralType" className="block text-sm font-medium mb-2">
                Type
              </label>
              <button
                type="button"
                id="mineralType"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-3 text-left text-gray-400"
              >
                {formData.mineralType}
              </button>
            </div>

            {/* Inspection Report */}
            <div>
              <label htmlFor="inspectionReport" className="block text-sm font-medium mb-2">
                Inspection Report
              </label>
              <textarea
                id="inspectionReport"
                placeholder="Enter Inspection Report"
                value={formData.inspectionReport}
                onChange={e => handleFieldChange("inspectionReport", e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-3 text-white h-24 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Quantity */}
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium mb-2">
                Quantity
              </label>
              <div className="flex items-center bg-zinc-800 border border-zinc-700 rounded-md">
                <input
                  type="text"
                  id="quantity"
                  value={`${formData.quantity} KG`}
                  readOnly
                  className="flex-grow bg-transparent border-none px-4 py-3 focus:outline-none"
                />
                <div className="flex items-center px-3">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(formData.quantity - 1)}
                    className="w-6 h-6 flex items-center justify-center rounded-full border border-zinc-600 mr-2"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={12} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(formData.quantity + 1)}
                    className="w-6 h-6 flex items-center justify-center rounded-full border border-zinc-600"
                    aria-label="Increase quantity"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            </div>

            {/* Available Storing Conditions */}
            <div>
              <label htmlFor="conditions" className="block text-sm font-medium mb-2">
                Available Storing Conditions
              </label>
              <div className="relative">
                <div className="flex justify-between items-center">
                  <div className="bg-zinc-800 border border-zinc-700 rounded-md px-4 py-3 w-full text-left">
                    {formData.conditions.length > 0 ? formData.conditions.join(", ") : "No Conditions specified"}
                  </div>
                  <button
                    type="button"
                    id="conditions"
                    onClick={() => setConditionsDropdownOpen(!conditionsDropdownOpen)}
                    className="bg-zinc-800 border border-zinc-700 rounded-md p-3 ml-2 flex items-center"
                  >
                    View <ChevronDown size={16} className="ml-1" />
                  </button>
                </div>
                {conditionsDropdownOpen && (
                  <div className="absolute right-0 z-10 mt-1 w-60 bg-zinc-800 border border-zinc-700 rounded-md shadow-lg">
                    {availableConditions.map(condition => (
                      <div
                        key={condition}
                        className="flex items-center px-4 py-2 hover:bg-zinc-700 cursor-pointer"
                        onClick={() => handleConditionToggle(condition)}
                      >
                        <input
                          type="checkbox"
                          checked={formData.conditions.includes(condition)}
                          readOnly
                          className="mr-2"
                        />
                        <span>{condition}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

           
          

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleSubmit("dispute")}
                className="bg-red-500 hover:bg-red-600 disabled:bg-red-800 disabled:opacity-70 text-white font-medium py-3 rounded-lg flex justify-center items-center"
              >
                {isSubmitting ? "Processing..." : "Raise Dispute"}
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleSubmit("report")}
                className="bg-[#0A77FF] hover:bg-blue-600 disabled:bg-blue-800 disabled:opacity-70 text-white font-medium py-3 rounded-lg flex justify-center items-center"
              >
                {isSubmitting ? "Processing..." : "Send Report"}
              </button>
            </div>

            {/* Security Message */}
            <div className="text-center text-sm text-gray-400 pt-2">Your Transaction is secure and safe</div>
          </form>
        </div>
      </div>
    </div>
  );
}

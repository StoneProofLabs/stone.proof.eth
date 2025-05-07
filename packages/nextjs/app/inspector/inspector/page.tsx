"use client";

import React, { useState } from "react";
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
  // Form state for mineralId and report
  const [form, setForm] = useState({ mineralId: "", report: "" });
  const [errors, setErrors] = useState<{ mineralId?: string; report?: string }>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const validate = () => {
    const newErrors: { mineralId?: string; report?: string } = {};
    if (!form.mineralId.trim()) newErrors.mineralId = "Mineral ID is required.";
    if (!form.report.trim()) newErrors.report = "Report is required.";
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (submitAttempted) setErrors(validate());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    // Prepare data for backend submission
    const submissionData = {
      mineralId: form.mineralId.trim(),
      report: form.report.trim(),
    };
    // In a real app, you would send this to your backend
    console.log("Submitting inspection:", submissionData);
    alert("Inspection report submitted successfully!");
    setForm({ mineralId: "", report: "" });
    setSubmitAttempted(false);
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
    <div className="min-h-screen flex items-center justify-center bg-[#18181b] p-4">
      <div className="w-full max-w-lg bg-[#232326] rounded-2xl shadow-lg p-6 sm:p-10 border border-[#232326]">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-white mb-2">Inspect Mineral</h1>
        <p className="text-sm text-gray-400 text-center mb-6">
          Fill out the form below to submit your inspection report for a mineral.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Mineral ID */}
          <div>
            <label htmlFor="mineralId" className="block text-base text-white mb-2">
              Mineral ID <span className="text-red-500">*</span>
            </label>
            <input
              id="mineralId"
              name="mineralId"
              type="text"
              value={form.mineralId}
              onChange={handleChange}
              placeholder="Enter Mineral ID"
              className={`w-full bg-[#252525] border ${errors.mineralId ? "border-red-500" : "border-[#323539]"} text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0A77FF] transition min-h-[48px]`}
              autoComplete="off"
            />
            {errors.mineralId && <div className="text-red-500 text-xs mt-1">{errors.mineralId}</div>}
          </div>
          {/* Report */}
          <div>
            <label htmlFor="report" className="block text-base text-white mb-2">
              Report <span className="text-red-500">*</span>
            </label>
            <textarea
              id="report"
              name="report"
              value={form.report}
              onChange={handleChange}
              placeholder="Enter Inspection Report"
              className={`w-full bg-[#252525] border ${errors.report ? "border-red-500" : "border-[#323539]"} text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0A77FF] transition min-h-[100px] resize-none`}
            />
            {errors.report && <div className="text-red-500 text-xs mt-1">{errors.report}</div>}
          </div>
          {/* Action Button */}
          <button
            type="submit"
            className={`w-full bg-[#0A77FF] hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors ${!form.mineralId.trim() || !form.report.trim() ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={!form.mineralId.trim() || !form.report.trim()}
          >
            Send Inspection Report
          </button>
        </form>
        <p className="text-gray-500 text-center mt-6">Your Transaction is secure and safe</p>
      </div>
    </div>
  );
}

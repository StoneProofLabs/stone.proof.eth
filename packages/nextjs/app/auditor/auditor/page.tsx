"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Copy, Lock, Minus, Plus } from "lucide-react";

// Mock data - in a real app, this would come from an API
const mockMinerals = [
  {
    id: "ffff-eeee-dddd-3333",
    name: "Cobalt",
    dateRange: "23/05/2025 - 23/05/2025",
    purityLevel: 30,
    quantity: 25,
    price: "1250 USD",
    warehouseId: "Quartz",
    state: ["Raw", "Refined"],
    type: "Top Mineral",
  },
  {
    id: "aaaa-bbbb-cccc-4444",
    name: "Iron",
    dateRange: "15/04/2025 - 20/04/2025",
    purityLevel: 45,
    quantity: 50,
    price: "980 USD",
    warehouseId: "Onyx",
    state: ["Raw"],
    type: "Common Mineral",
  },
  {
    id: "1111-2222-3333-4444",
    name: "Titanium",
    dateRange: "01/06/2025 - 15/06/2025",
    purityLevel: 75,
    quantity: 15,
    price: "3200 USD",
    warehouseId: "Quartz",
    state: ["Refined"],
    type: "Premium Mineral",
  },
  {
    id: "5555-6666-7777-8888",
    name: "Copper",
    dateRange: "10/05/2025 - 20/05/2025",
    purityLevel: 60,
    quantity: 35,
    price: "1450 USD",
    warehouseId: "Sapphire",
    state: ["Raw", "Refined"],
    type: "Common Mineral",
  },
];

export default function AuditMinerals() {
  // Form state for mineralId and report
  const [form, setForm] = useState({ mineralId: "", report: "" });
  const [errors, setErrors] = useState<{ mineralId?: string; report?: string }>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const validate = () => {
    const newErrors: { mineralId?: string; report?: string } = {};
    if (!form.mineralId.trim()) newErrors.mineralId = "Mineral ID is required.";
    if (!form.report.trim()) newErrors.report = "Audit report is required.";
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
    console.log("Submitting audit:", submissionData);
    alert("Audit report submitted successfully!");
    setForm({ mineralId: "", report: "" });
    setSubmitAttempted(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#18181b] p-4">
      <div className="w-full max-w-lg bg-[#232326] rounded-2xl shadow-lg p-6 sm:p-10 border border-[#232326]">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-white mb-2">Audit Mineral</h1>
        <p className="text-sm text-gray-400 text-center mb-6">
          Fill out the form below to submit your audit report for a mineral.
        </p>
        {/* Status Badges */}
        <div className="flex justify-center gap-4 mb-6">
          <span className="inline-block bg-red-500 text-white text-xs sm:text-sm px-3 py-1 rounded-full font-semibold shadow">
            Raw
          </span>
          <span className="inline-block bg-orange-500 text-white text-xs sm:text-sm px-3 py-1 rounded-full font-semibold shadow">
            Refined
          </span>
        </div>
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
          {/* Audit Report */}
          <div>
            <label htmlFor="report" className="block text-base text-white mb-2">
              Audit Report <span className="text-red-500">*</span>
            </label>
            <textarea
              id="report"
              name="report"
              value={form.report}
              onChange={handleChange}
              placeholder="Enter Audit Report"
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
            Send Audit Report
          </button>
        </form>
        <p className="text-gray-500 text-center mt-6">Your Transaction is secure and safe</p>
      </div>
    </div>
  );
}

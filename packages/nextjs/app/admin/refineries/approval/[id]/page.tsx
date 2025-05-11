"use client";

import React from "react";
import { useParams } from "next/navigation";
import { FaRegCopy } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { refineryList } from "~~/data/data";

export default function ApprovalRefineryPage() {
  const { id } = useParams();
  const refinery = refineryList.find(r => r.id === id);

  if (!refinery) {
    return <div className="text-white p-10 text-center text-2xl">Refinery not found</div>;
  }

  return (
    <div className="min-h-screen text-white p-4 md:p-10 flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0">
        <div className="w-full flex flex-row items-center justify-between">
          <h1 className="text-xl sm:text-3xl md:text-5xl font-semibold leading-tight">
            REFINERY _ID: <span className="text-white">{refinery.code}</span>
          </h1>
          <span className="inline-block bg-[#0A77FF] text-white text-xs px-6 py-1 rounded-full">
            Waiting for approval
          </span>
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-6">
        <div className="rounded-2xl p-4 md:p-8 border border-[#323539] flex flex-col md:flex-row gap-8 w-full overflow-x-auto">
          {/* Left: General Info */}
          <div className="flex-1 flex flex-col gap-6 min-w-[220px] min-w-0">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={refinery.avatar}
                alt={refinery.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
              />
              <span className="font-bold text-lg md:text-xl">{refinery.name}</span>
              <span className="text-white text-xs md:text-sm ml-2">[ 23/05/2025 - Present ]</span>
            </div>
            <div>
              <label className="text-xs text-white">Company Name</label>
              <input
                className="border border-[#323539] rounded-lg px-3 py-2 text-white w-full bg-transparent"
                value={refinery.name}
                readOnly
              />
            </div>
            <div>
              <label className="text-xs text-white">Contact Person Name</label>
              <input
                className="border border-[#323539] rounded-lg px-3 py-2 text-white w-full bg-transparent"
                value="23"
                readOnly
              />
            </div>
            <div>
              <label className="text-xs text-white">Refinery Address</label>
              <input
                className="border border-[#323539] rounded-lg px-3 py-2 text-white w-full bg-transparent"
                value="23"
                readOnly
              />
            </div>
          </div>
          {/* Right: Details */}
          <div className="flex-1 flex flex-col gap-6 min-w-[220px] min-w-0">
            <div>
              <label className="text-xs text-white">REFINERY_ID</label>
              <div className="flex items-center gap-2">
                <input
                  className="border border-[#323539] rounded-lg px-3 py-2 text-white flex-1 bg-transparent"
                  value={refinery.code}
                  readOnly
                />
                <button
                  className="p-2 hover:bg-gray-700 rounded-full"
                  onClick={() => navigator.clipboard.writeText(refinery.code)}
                >
                  <FaRegCopy size={16} className="text-white" />
                </button>
              </div>
            </div>
            <div>
              <label className="text-xs text-white">Number Of Workers</label>
              <input
                className="border border-[#323539] rounded-lg px-3 py-2 text-white w-full bg-transparent"
                value="23"
                readOnly
              />
            </div>
            <div>
              <label className="text-xs text-white">Type of Minerals Processed</label>
              <input
                className="border border-[#323539] rounded-lg px-3 py-2 text-white w-full bg-transparent"
                value={refinery.mineralsRefined}
                readOnly
              />
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2 w-full">
              <img src="/dashboard/icon_set/pdf.svg" alt="PDF" className="w-16 h-16" />
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-lg text-white font-medium leading-tight break-words">
                  {refinery.document.name}
                </span>
                <span className="text-lg text-white leading-tight">34.6kb</span>
              </div>
              <a
                href={refinery.document.url}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto bg-[#0A77FF] text-white px-4 py-2 rounded-full hover:bg-[#0A77FF] transition-colors"
              >
                Download
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <button className="flex-1 bg-[#EF4444] hover:bg-red-700 text-white font-semibold py-3 rounded-lg text-lg">
          Reject Request
        </button>
        <button className="flex-1 bg-[#0A77FF] hover:bg-blue-700 text-white font-semibold py-3 rounded-lg text-lg flex items-center justify-center gap-2">
          <FaCheck size={18} className="text-white" />
          Approve
        </button>
      </div>
      <p className="text-md text-white mt-2">
        If a request is rejected the refinery gets an email notification and won&apos;t be able to access our system!
      </p>
    </div>
  );
}

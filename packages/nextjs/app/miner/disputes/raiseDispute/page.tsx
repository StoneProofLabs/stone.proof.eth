"use client";

import { useState } from "react";
import Image from "next/image";
import { Copy } from "lucide-react";

export default function RaiseDisputePage() {
  const [selectedMineralId, setSelectedMineralId] = useState(0);

  return (
    <div className="min-h-screen text-white p-4 sm:p-6 md:p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">Raise Dispute</h1>
        <p className="text-sm text-gray-400 max-w-xl mx-auto mt-2">
          Raise a dispute regarding the current status of the mineral if you disagree with the updates recorded on the
          blockchain
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Side - Minerals List */}
        <div className="w-full md:w-1/3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium">Pending In Warehouse</h2>
            <button className="flex items-center gap-2 bg-zinc-800 rounded-full px-4 py-2">
              <span className="hidden sm:inline">Filter</span>
              <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                2
              </span>
            </button>
          </div>

          <div className="space-y-4">
            {/* Mineral Item 1 */}
            <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-800">
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
                  <div className="h-full bg-blue-500 w-1/3"></div>
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

              <div className="grid grid-cols-2 gap-2">
                <button className="bg-red-500 hover:bg-red-600 text-white rounded py-2 text-sm font-medium">
                  Raise Dispute
                </button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white rounded py-2 text-sm font-medium">
                  Accept
                </button>
              </div>
            </div>

            {/* Mineral Item 2 */}
            <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-800">
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
                  <div className="h-full bg-blue-500 w-1/3"></div>
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

              <div className="grid grid-cols-2 gap-2">
                <button className="bg-red-500 hover:bg-red-600 text-white rounded py-2 text-sm font-medium">
                  Raise Dispute
                </button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white rounded py-2 text-sm font-medium">
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Dispute Form */}
        <div className="w-full md:w-2/3 bg-zinc-900 rounded-lg p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Mineral Name</label>
              <div className="relative">
                <input
                  type="text"
                  value="0xffed-ecd3-34fc-2920"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-3 text-white"
                  readOnly
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
                  <Copy size={18} />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Defendant ID</label>
              <div className="relative">
                <input
                  type="text"
                  value="0xffed-ecd3-34fc-2920"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-3 text-white"
                  readOnly
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
                  <Copy size={18} />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Complainant ID (Your ID)</label>
              <div className="relative">
                <input
                  type="text"
                  value="0xffed-ecd3-34fc-2920"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-3 text-white"
                  readOnly
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
                  <Copy size={18} />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Issue Description</label>
              <textarea
                placeholder="This is a description of the disputes raised"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-3 text-white min-h-32"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded">Cancel</button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded">Updtaed</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


import { useState } from "react";
import { ChevronDown, Copy, Shield } from "lucide-react";

// Main application component
export default function MineralsRequestingStorage() {
  const [quantity, setQuantity] = useState(0);

  return (
    <div className=" text-white p-6 min-h-screen">
      <Header />
      <div className="flex flex-col lg:flex-row gap-6 mt-4">
        <div className="w-full lg:w-1/3 overflow-y-auto max-h-screen pr-2">
          <TransfersList />
        </div>
        <div className="w-full lg:w-2/3">
          <DetailPanel quantity={quantity} setQuantity={setQuantity} />
        </div>
      </div>
    </div>
  );
}

// Header component with title and description
function Header() {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold mb-2 flex items-center justify-center">
        Requested Mineral Transfers for Storage
        <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm ml-2">
          8
        </span>
      </h1>
      <p className="text-gray-400 max-w-4xl mx-auto">
        Efficient storage and management of refined minerals is key to ensuring quality, compliance, and seamless
        distribution. This portal provides real-time tracking of inventory levels, storage conditions, and order
        fulfillment.
      </p>
      <div className="flex justify-between items-center mt-4">
        <h2 className="text-xl font-bold">Requested Transfers</h2>
        <div className="flex items-center">
          <button className="bg-gray-800 text-white px-4 py-2 rounded-md flex items-center">
            <span>Filter</span>
            <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ml-2">
              2
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

// TransferCard component for each mineral transfer request
function TransferCard({ mineral = "Cobalt", dates = "23/05/2025 - 23/05/2025", purity = 60 }) {
  return (
    <div className="bg-[#252525] border border-[#323539] rounded-lg p-4 mb-4">
      <div className="flex items-center mb-4">
        <div className="bg-white p-2 rounded-md mr-3">
          <Shield className="text-gray-800 w-6 h-6" />
        </div>
        <div>
          <span className="font-bold text-lg">{mineral}</span>
          <span className="text-gray-400 ml-2">[ {dates} ]</span>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex justify-between mb-1">
          <span>Purity Level:</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
          <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${purity}%` }}></div>
        </div>
      </div>

      <div className="flex justify-between mb-3">
        <span>Quantity:</span>
        <span className="text-gray-400">0 KG</span>
      </div>

      <div className="flex justify-between mb-4">
        <span>Price:</span>
        <span className="text-gray-400">0 KG</span>
      </div>

      <div className="flex space-x-2">
        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-1/2">Reject</button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-1/2">Approve</button>
      </div>
    </div>
  );
}

// List of transfer requests
function TransfersList() {
  return (
    <div className="space-y-4">
      <TransferCard purity={40} />
      <TransferCard purity={70} />
      <TransferCard mineral="Lithium" purity={55} />
    </div>
  );
}

// Right side detail panel
// @ts-ignore
function DetailPanel({ quantity, setQuantity }) {
  return (
    <div className="bg-[#252525] border border-[#323539] rounded-lg p-6">
      <div className="space-y-6">
        <IdField label="Mineral-ID" value="#ffff-eeee-dddd-3333" />
        <IdField label="Requester ID" value="#ffff-eeee-dddd-3333" />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400 mb-2">Type</label>
            <div className="bg-gray-900 p-3 rounded-md">Top Mineral</div>
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Current State</label>
            <div className="flex">
              <div className="bg-red-500 text-white px-3 py-1 rounded-l-md">Raw</div>
              <div className="bg-orange-500 text-white px-3 py-1 rounded-r-md">Refined</div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-gray-400 mb-2">Quantity</label>
          <div className="relative">
            <input type="text" value={`${quantity} KG`} readOnly className="bg-gray-900 p-3 rounded-md w-full" />
            <div className="absolute right-0 top-0 h-full flex">
              <button
                onClick={() => setQuantity(Math.max(0, quantity - 1))}
                className="px-4 py-3 text-white font-bold text-xl"
              >
                -
              </button>
              <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 text-white font-bold text-xl">
                +
              </button>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-gray-400 mb-2">Requested Storage Conditions</label>
          <div className="bg-gray-900 p-3 rounded-md flex justify-between items-center">
            <span>Ventilation,</span>
            <button className="flex items-center gap-1">
              <span>View</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex space-x-4 mt-6">
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded w-1/2">Reject</button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded w-1/2">
            Approve
          </button>
        </div>

        <p className="text-gray-400 text-sm text-center">
          You will have to specify the rejection reason if you reject storage
        </p>
      </div>
    </div>
  );
}

// Reusable component for ID fields with copy functionality
// @ts-ignore
function IdField({ label, value }) {
  return (
    <div>
      <label className="block text-gray-400 mb-2">{label}</label>
      <div className="bg-gray-900 p-3 rounded-md flex justify-between items-center">
        <div className="flex items-center">
          <Shield className="w-4 h-4 mr-2" />
          <span>{value}</span>
        </div>
        <button className="text-gray-400 hover:text-white">
          <Copy className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

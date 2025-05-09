"use client";

import { useState } from "react";
import Image from "next/image";
import { Clock, Copy, FileText, Minus, Plus } from "lucide-react";

export default function DisputeDetailsPage() {
  const [voteCount, setVoteCount] = useState(0);
  const raisedDispute = true;

  const handleVoteChange = (value: number) => {
    const newValue = Math.max(0, value);
    setVoteCount(newValue);
  };

  return (
    <div className="min-h-screen text-white p-4 sm:p-6 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dispute _ID: #0xffed-ecd3-387f-778c</h1>
        {raisedDispute ? (
          <div className="bg-blue-500 text-white px-4 py-1 rounded-full">You raised the dispute</div>
        ) : (
          <div className="bg-red-500 text-white px-4 py-1 rounded-full">You are a Defendant</div>
        )}
      </div>

      <p className="text-gray-400 text-center mb-8">
        Reach out to us with any question or inquiry you have and we&apos;ll do our best to get back to you as soon as
        possible.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Dispute Panel */}
        <div className="lg:col-span-3 bg-zinc-900 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-xl">
              <Image width={30} height={30} alt="" src={"/dashboard/cobalt.png"} />
            </div>
            <h2 className="font-bold text-xl">Cobalt</h2>
            <span className="text-gray-400">[ 23/05/2025 - 23/05/2025 ]</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Side - Mineral Details */}
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-400 mb-1">Purity Level:</div>
                <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-1/3"></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-gray-400">Quantity :</div>
                <div className="font-medium text-white bg-zinc-800 rounded px-4 py-2">50 Tons</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-gray-400">Mineral ID</div>
                <div className="flex items-center gap-2 bg-zinc-800 rounded px-4 py-2">
                  <span className="font-mono text-white">#0xffed-ecd3-3...</span>
                  <button className="text-gray-400 hover:text-white">
                    <Copy size={16} />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-gray-400">Post count</div>
                <div className="bg-zinc-800 rounded px-4 py-2">
                  <span className="text-2xl font-bold text-white">400</span>
                  <span className="text-sm text-gray-400 ml-2">Total Votes</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-gray-400">Time left:</div>
                <div className="flex items-center gap-2 bg-zinc-800 rounded px-4 py-2">
                  <span className="text-2xl font-bold text-white font-mono">2:34:00</span>
                  <Clock size={18} className="text-white" />
                </div>
              </div>
            </div>

            {/* Right Side - Dispute Text */}
            <div>
              <h3 className="text-lg font-medium mb-4">Dispute Details</h3>
              <div className="bg-zinc-800 rounded p-4 text-sm">
                <p className="mb-4">
                  Company XYZ failed to deliver 500 metric tons of refined cobalt as per the contract dated March 10,
                  2025. Despite follow-ups, no shipment or valid justification has been provided, causing financial loss
                  and production delays.
                </p>
                <p className="font-medium mb-2">Supporting evidence:</p>
                <ol className="list-decimal list-inside space-y-1 text-gray-300">
                  <li>Contract agreement (PDF)</li>
                  <li>Email correspondence</li>
                  <li>Warehouse inventory report</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Documents Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="flex items-center gap-3 bg-zinc-800 rounded p-3">
              <FileText size={20} className="text-gray-400" />
              <div className="flex-1">
                <div className="text-sm font-medium">Document.pdf</div>
                <div className="text-xs text-gray-400">34.6kb</div>
              </div>
              <button className="bg-blue-500 text-white text-xs px-3 py-1 rounded">Download</button>
            </div>

            <div className="flex items-center gap-3 bg-zinc-800 rounded p-3">
              <FileText size={20} className="text-gray-400" />
              <div className="flex-1">
                <div className="text-sm font-medium">Document.pdf</div>
                <div className="text-xs text-gray-400">34.6kb</div>
              </div>
              <button className="bg-blue-500 text-white text-xs px-3 py-1 rounded">Download</button>
            </div>
          </div>

          <p className="text-sm text-gray-400 text-center mt-6">Your vote will be available for all parties</p>
        </div>

        {raisedDispute ? (
          <div className="bg-zinc-900 rounded-lg p-4 text-white">
            <h2 className="text-xl font-medium mb-4">Live Votes</h2>

            <div className="bg-zinc-800 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-center mb-4">
                <span className="text-red-500 text-2xl font-bold">34</span>
                <span className="text-gray-400 mx-2">out of</span>
                <span className="text-green-500 text-2xl font-bold">300</span>
              </div>

              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-md mb-4">
                Pending
              </button>

              <p className="text-center text-gray-400 mb-2">You Raised it 3 hrs Ago against refiner with ID:</p>

              <div className="flex items-center justify-center bg-zinc-800 rounded-md border border-zinc-700 px-4 py-3 mb-4">
                <span className="font-mono text-gray-300 text-sm">#0xffed-ecd3-3345-2f2c</span>
                <button className="text-gray-400 hover:text-white ml-2">
                  <Copy size={16} />
                </button>
              </div>

              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-md">
                Withdraw Dispute
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-lg">
            <h3 className="text-lg font-medium mb-4">Live Votes</h3>

            <div className="mb-6">
              <div className="flex items-center justify-between rounded px-4 py-3 mb-4">
                <div className="text-sm">Your choice</div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleVoteChange(voteCount - 1)}
                    className="w-8 h-8 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 rounded text-white"
                  >
                    <Minus size={16} />
                  </button>
                  <button
                    onClick={() => handleVoteChange(voteCount + 1)}
                    className="w-8 h-8 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 rounded text-white"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <button className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded">
                  Reject
                </button>
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded">
                  Approve
                </button>
              </div>

              <div className="text-center text-gray-400 mb-2">Raised 3 hrs Ago by Refiner with ID:</div>

              <div className="flex items-center justify-center gap-2 bg-zinc-900 rounded px-4 py-3">
                <span className="font-mono text-white">#0xffed-ecd3-3345-2f2c</span>
                <button className="text-gray-400 hover:text-white">
                  <Copy size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client"

import { useState } from "react"
import Image from "next/image"
import { Clock, Copy, FileText, Minus, Plus } from "lucide-react"

export default function DisputeResolutionsPortal() {
  const [voteCount, setVoteCount] = useState(0)

  const handleVoteChange = (value: number) => {
    const newValue = Math.max(0, value)
    setVoteCount(newValue)
  }

  return (
    <div className="min-h-screen text-white p-4 sm:p-6 md:p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Dispute Resolutions Portal</h1>
        <p className="text-sm text-gray-400 max-w-xl mx-auto mt-2">
          Reach out to us with any question or inquiry you have and we'll do our best to get back to you as soon as
          possible.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Dispute Details */}
      <div className=" border-2 border-[#323539] rounded-lg p-2 lg:col-span-2">
      <div className="lg:col-span-2 bg-[#1c1c1e] rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-xl">
              <Image width={30} height={30} alt="" src="/dashboard/cobalt.png" />
            </div>
            <div className="font-medium text-lg">Cobalt</div>
            <div className="text-sm text-gray-400">[ 23/05/2025 - 23/05/2025 ]</div>
          </div>

          <div className="mb-4">
            <div className="text-sm mb-1">Purity Level:</div>
            <div className="h-2 bg-white rounded-full overflow-hidden">
              <div className="h-full bg-[#0A77FF] w-[30%]"></div>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between border-2 border-[#323539] rounded-lg px-4 py-3">
              <div className="text-gray-400">Quantity :</div>
              <div className="font-medium text-white">50 Tons</div>
            </div>

            <div className="flex items-center justify-between border-2 border-[#323539] rounded-lg px-4  py-3">
              <div className="text-gray-400">Mineral ID</div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-white">#0xffed-ecd3-3...</span>
                <button className="text-gray-400 hover:text-white">
                  <Copy size={16} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between border-2 border-[#323539] rounded-lg px-4 py-3">
              <div className="text-gray-400">Post count</div>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-white">400</span>
                <span className="text-sm text-gray-400">Total Votes</span>
              </div>
            </div>

            <div className="flex items-center justify-between border-2 border-[#323539] rounded-lg px-4 py-3">
              <div className="text-gray-400">Time left:</div>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-white font-mono">2:34:00</span>
                <Clock size={20} className="text-white" />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Dispute Details</h3>
            <div className="bg-[#252525] rounded-md p-4 text-sm">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3 bg-[#252525] rounded-md p-3">
              <FileText size={20} className="text-gray-400" />
              <div className="flex-1">
                <div className="text-sm font-medium">Document.pdf</div>
                <div className="text-xs text-gray-400">3.4 MB</div>
              </div>
              <button className="bg-[#0A77FF] text-white text-xs px-3 py-1 rounded">Download</button>
            </div>

            <div className="flex items-center gap-3 bg-[#252525] rounded-md p-3">
              <FileText size={20} className="text-gray-400" />
              <div className="flex-1">
                <div className="text-sm font-medium">Document.pdf</div>
                <div className="text-xs text-gray-400">2.4 MB</div>
              </div>
              <button className="bg-[#0A77FF] text-white text-xs px-3 py-1 rounded">Download</button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="w-full bg-[#E33B32] hover:bg-red-600 text-white font-medium py-3 rounded">Close</button>
            <button className="w-full bg-[#0A77FF] hover:bg-blue-700 text-white font-medium py-3 rounded">
              Skip Dispute
            </button>
          </div>

          <p className="text-sm text-gray-400 text-center mt-4">Your vote will be available for all parties</p>
        </div>
      </div>

        {/* Right Panel - Voting */}
        <div className="rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Take a vote</h3>

          <div className="mb-6">
            <div className="bg-[#252525] flex items-center justify-between rounded-md px-4 py-3 w-full border border-[#323539] mb-4">
              <div className="text-sm">Your choice</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleVoteChange(voteCount - 1)}
                  className="w-8 h-8 flex items-center justify-center bg-[#3A3B3D] hover:bg-gray-600 rounded-full"
                >
                  <Minus size={16} />
                </button>
                <button
                  onClick={() => handleVoteChange(voteCount + 1)}
                  className="w-8 h-8 flex items-center justify-center bg-[#3A3B3D] hover:bg-gray-600 rounded-full"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="w-full bg-[#E33B32] hover:bg-red-600 text-white font-medium py-3 rounded">
                Reject
              </button>
              <button className="w-full bg-[#0A77FF] hover:bg-blue-700 text-white font-medium py-3 rounded">
                Approve
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Defendant ID</h4>
              <div className="flex items-center gap-2 bg-[#252525] border border-[#323539] rounded-md px-4 py-3">
                <span className="font-mono text-sm flex-1">0xffed-ecd3-34fc-2920</span>
                <button className="text-gray-400 hover:text-white">
                  <Copy size={16} />
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Complainant ID</h4>
              <div className="flex items-center gap-2 bg-[#252525] border border-[#323539] rounded-md px-4 py-3">
                <span className="font-mono text-sm flex-1">0xffed-ecd3-34fc-2920</span>
                <button className="text-gray-400 hover:text-white">
                  <Copy size={16} />
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Enter Resolution Details (Optional)</h4>
              <textarea
                placeholder="This is a description of the disputes raised"
                className="w-full bg-[#252525] border border-[#323539] text-white rounded-md px-4 py-3 focus:outline-none min-h-[100px] text-sm"
              />
            </div>

            <button className="w-full bg-[#0A77FF] hover:bg-blue-700 text-white font-medium py-3 rounded">
              Submit Vote
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

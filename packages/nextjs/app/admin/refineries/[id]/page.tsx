"use client";

import { useParams, useRouter } from "next/navigation";
import { refineryList } from "~~/data/data";

export default function RefineryDetailsPage() {
  const router = useRouter();
  const { id } = useParams();
  const refinery = refineryList.find(r => r.id === id);

  if (!refinery) {
    return <div className="text-white p-10 text-center text-2xl">Refinery not found</div>;
  }

  // Mocked values for demo (replace with real data as needed)
  const refiningProgress = 12;
  const quantity = "50 Tons";
  const totalPendings = "2,345";
  const disputes = 400;
  const topDelay = "12 Days";
  const numberOfWorkers = 23;
  const refineryAddress = "23";
  const refineryOwnerNames = "23";

  return (
    <div className="min-h-screen text-white p-4 md:p-10 flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0">
        <div className="w-full flex flex-row items-center justify-between">
          <h1 className="text-xl sm:text-3xl md:text-5xl font-semibold leading-tight">
            REFINERY _ID: <span className="text-white">#0xffed-ecd3-387f-778c</span>
          </h1>
          <span className="inline-block bg-blue-500 text-white text-xs px-6 py-1 rounded-full">Active</span>
        </div>
      </div>

      {/* Responsive two-column layout */}
      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Main Card - left, 3/4 width on desktop */}
        <div className="md:col-span-3 rounded-2xl p-4 border border-[#1E2328]">
          <div className="flex flex-col gap-6">
            {/* Header: Avatar/name left, date right */}
            <div className="flex items-center justify-between w-full mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={refinery.avatar}
                  alt={refinery.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                />
                <span className="font-bold text-xl">{refinery.name}</span>
              </div>
              <span className="text-gray-400 text-base">23/05/2025 - Present</span>
            </div>

            {/* Two columns: left stats, right refinery info */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left column: Progress and stats */}
              <div className="flex-1 flex flex-col gap-5">
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium w-32">
                    Refining
                    <br />
                    Progress
                  </span>
                  <span className="text-gray-400">:</span>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="w-full h-3 bg-white rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${refiningProgress}%` }}></div>
                    </div>
                    <span className="bg-[#FF3B30] text-white text-xs px-2 py-1 rounded font-bold ml-2">
                      {refiningProgress}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium w-32">Quantity</span>
                  <span className="text-gray-400">:</span>
                  <div className="flex-1">
                    <div className="bg-[#0B0E13] border border-[#1E2328] rounded px-4 py-3 font-bold text-white w-full">
                      {quantity}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium w-32">Total Pendings</span>
                  <span className="text-gray-400">:</span>
                  <div className="flex-1">
                    <div className="bg-[#0B0E13] border border-[#1E2328] rounded px-4 py-3 font-bold text-white w-full">
                      {totalPendings}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium w-32">Disputes against:</span>
                  <span className="text-gray-400">:</span>
                  <div className="flex-1">
                    <div className="bg-[#0B0E13] border border-[#1E2328] rounded px-4 py-3 font-bold text-white w-full flex items-center">
                      <span className="text-2xl">{disputes}</span>
                      <span className="text-xs text-gray-400 ml-2">Total Votes</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium w-32">Top Delay:</span>
                  <span className="text-gray-400">:</span>
                  <div className="flex-1">
                    <div className="bg-[#0B0E13] border border-[#1E2328] rounded px-4 py-3 font-bold text-white w-full">
                      {topDelay}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column: Refinery info */}
              <div className="flex-1 flex flex-col gap-5">
                <div>
                  <span className="block text-white font-bold mb-2">REFINERY_ID</span>
                  <div className="bg-[#0B0E13] border border-[#1E2328] rounded px-4 py-3 flex items-center justify-between">
                    <span className="font-mono text-white text-base">0xffed-ecd3-34fc-2920</span>
                    <button className="text-gray-400 hover:text-white ml-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect
                          x="9"
                          y="9"
                          width="13"
                          height="13"
                          rx="2"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div>
                  <span className="block text-white font-bold mb-2">Number Of Workers</span>
                  <div className="bg-[#0B0E13] border border-[#1E2328] rounded px-4 py-3 text-white">
                    {numberOfWorkers}
                  </div>
                </div>
                <div>
                  <span className="block text-white font-bold mb-2">Refinery Address</span>
                  <div className="bg-[#0B0E13] border border-[#1E2328] rounded px-4 py-3 text-white">
                    {refineryAddress}
                  </div>
                </div>
                <div>
                  <span className="block text-white font-bold mb-2">Refinery Owner Names</span>
                  <div className="bg-[#0B0E13] border border-[#1E2328] rounded px-4 py-3 text-white">
                    {refineryOwnerNames}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Side Card - right, 1/4 width on desktop */}
        <div className="bg-[#0F1218] rounded-2xl p-6 border border-[#1E2328] flex flex-col gap-6 w-full">
          <div className="flex justify-between items-center">
            <div className="font-semibold text-lg">Last activities</div>
            <button>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="1" fill="white" />
                <circle cx="6" cy="12" r="1" fill="white" />
                <circle cx="18" cy="12" r="1" fill="white" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center justify-between border-b border-[#1E2328] pb-4">
                <div className="flex items-center gap-3">
                  <img src="/dashboard/gold.png" alt="Gold" className="w-10 h-10 rounded-full" />
                  <span className="font-medium">Gold</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">16 hrs ago</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9 18L15 12L9 6"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-2 bg-blue-500 text-white py-3 rounded-lg font-medium">View full history</button>

          <div className="mt-4">
            <div className="font-semibold text-lg mb-4">Progress</div>
            <div className="relative w-full h-48 bg-transparent rounded-lg">
              {/* Progress chart with grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between">
                <div className="text-xs text-gray-400">100%</div>
                <div className="text-xs text-gray-400">75%</div>
                <div className="text-xs text-gray-400">25%</div>
                <div className="text-xs text-gray-400">0%</div>
              </div>

              {/* Chart grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                <div className="border-t border-dashed border-gray-700 w-full h-0"></div>
                <div className="border-t border-dashed border-gray-700 w-full h-0"></div>
                <div className="border-t border-dashed border-gray-700 w-full h-0"></div>
                <div className="border-t border-dashed border-gray-700 w-full h-0"></div>
              </div>

              {/* Chart line */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path
                  d="M0,80 C10,60 20,30 30,20 C40,10 50,40 60,30 C70,20 80,50 90,70 C95,80 100,90 100,90"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="3"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Action buttons: below the main card, same width as main card */}
        <div className="md:col-span-3 flex flex-row gap-4 mt-4">
          <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors">
            Suspend Refinery
          </button>
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
            View Next <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </div>

      <p className="text-gray-400 text-sm mt-2">
        If a Refinery is suspended it won&apos;t be able to access the system!
      </p>
    </div>
  );
}

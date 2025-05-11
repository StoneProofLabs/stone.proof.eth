"use client";

import { useState } from "react";
import Image from "next/image";
import { AlertCircle, Check, ChevronDown, Copy, Loader2, Minus } from "lucide-react";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

const UNREFINED_MINERALS = [
  {
    id: "GOLD-RAW-0x8e07d295",
    name: "Raw Gold Ore",
    type: "Gold",
    purity: 85.2,
    weight: "50 kg",
    origin: "South Africa",
    image: "/minerals/raw-gold.png",
    description: "High-grade gold ore requiring refinement",
  },
  {
    id: "SILVER-RAW-0xa3f5e1d2",
    name: "Silver Concentrate",
    type: "Silver",
    purity: 78.5,
    weight: "100 kg",
    origin: "Mexico",
    image: "/minerals/silver-concentrate.png",
    description: "Silver concentrate ready for smelting",
  },
  {
    id: "COPPER-RAW-0xb2c4e3f1",
    name: "Copper Ore",
    type: "Copper",
    purity: 30.8,
    weight: "500 kg",
    origin: "Chile",
    image: "/minerals/copper-ore.png",
    description: "Copper ore requiring beneficiation",
  },
  {
    id: "PLATINUM-RAW-0xe1f2a3b4",
    name: "Platinum Ore",
    type: "Platinum",
    purity: 15.7,
    weight: "75 kg",
    origin: "Russia",
    image: "/minerals/platinum-ore.png",
    description: "Platinum group metals ore",
  },
  {
    id: "TIN-0xe1f2a3b4",
    name: "Tin Ore",
    type: "Tin",
    purity: 15.7,
    weight: "75 kg",
    origin: "Rwanda",
    image: "/minerals/platinum-ore.png",
    description: "Platinum group metals ore",
  },
];

export default function RefinerMineralPage() {
  const [mineralId, setMineralId] = useState("");
  const [report, setReport] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputMethod, setInputMethod] = useState<"select" | "manual">("select");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedMineral, setSelectedMineral] = useState<any>(null);

  const { writeContractAsync } = useScaffoldWriteContract("RolesManager");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mineralId) {
      notification.error("Please select or enter mineral ID");
      return;
    }
    if (!report) {
      notification.error("Please enter refinement report");
      return;
    }

    setIsSubmitting(true);
    try {
      await writeContractAsync({
        functionName: "refineMineral",
        args: [mineralId, report],
      });

      notification.success("Refinement submitted successfully!");
      setMineralId("");
      setReport("");
      setSelectedMineral(null);
    } catch (error: any) {
      console.error("Transaction error:", error);

      if (error.message.includes("User rejected the request")) {
        notification.error("Transaction rejected by user");
      } else if (error.message.includes("RolesManager__InvalidMineralIdOrNotFound")) {
        notification.error("Invalid mineral ID or mineral not found");
      } else if (error.message.includes("RolesManager__MineralAlreadyRefined")) {
        notification.error("This mineral has already been refined");
      } else if (error.message.includes("caller is missing role")) {
        notification.error("No refiner privileges");
      } else {
        notification.error("Transaction failed. See console for details.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSelectMineral = (mineral: any) => {
    setSelectedMineral(mineral);
    setMineralId(mineral.id);
  };

  return (
    <div className="min-h-screen text-white p-4 sm:p-6 md:p-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Refine Minerals
          </h1>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto mt-3">
            Process raw minerals and submit refinement reports for certification.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side - Minerals List */}
          <div className="w-full lg:w-2/5">
            <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-semibold">Unrefined Minerals</h2>
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 rounded-lg px-4 py-2 text-sm transition-colors"
                  >
                    {inputMethod === "select" ? "Select Mineral" : "Enter ID Manually"}
                    <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg z-10 border border-gray-600">
                      <button
                        onClick={() => {
                          setInputMethod("select");
                          setIsDropdownOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          inputMethod === "select" ? "bg-purple-600 text-white" : "text-gray-200 hover:bg-gray-600"
                        }`}
                      >
                        Select Mineral
                      </button>
                      <button
                        onClick={() => {
                          setInputMethod("manual");
                          setIsDropdownOpen(false);
                          setSelectedMineral(null);
                          setMineralId("");
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          inputMethod === "manual" ? "bg-purple-600 text-white" : "text-gray-200 hover:bg-gray-600"
                        }`}
                      >
                        Enter ID Manually
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {inputMethod === "select" ? (
                <div className="space-y-4">
                  {UNREFINED_MINERALS.map(mineral => (
                    <div
                      key={mineral.id}
                      onClick={() => handleSelectMineral(mineral)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedMineral?.id === mineral.id
                          ? "border-purple-500 bg-purple-900/20"
                          : "border-gray-700 hover:border-gray-600 bg-gray-700/50 hover:bg-gray-700/70"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <Image width={64} height={64} alt={mineral.name} src={mineral.image} className="rounded-md" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-lg">{mineral.name}</h3>
                            <span className="text-xs text-gray-400">{mineral.weight}</span>
                          </div>
                          <div className="mt-1 text-sm text-gray-300">
                            {mineral.type} • {mineral.origin}
                          </div>
                          <div className="mt-2">
                            <div className="text-xs mb-1 flex justify-between">
                              <span>Purity: {mineral.purity}%</span>
                              <span className="text-purple-400">
                                {selectedMineral?.id === mineral.id ? "Selected" : ""}
                              </span>
                            </div>
                            <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${
                                  mineral.purity > 80
                                    ? "bg-yellow-500"
                                    : mineral.purity > 50
                                      ? "bg-orange-500"
                                      : "bg-red-500"
                                }`}
                                style={{ width: `${mineral.purity}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="mt-2 text-xs text-gray-400 break-all">ID: {mineral.id}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-700">
                    <label className="block text-sm font-medium mb-2">Enter Mineral ID</label>
                    <input
                      type="text"
                      value={mineralId}
                      onChange={e => setMineralId(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                      placeholder="e.g. GOLD-RAW-0x8e07d295"
                    />
                  </div>
                  <div className="bg-purple-900/10 border border-purple-800/50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 mt-0.5 text-purple-400 flex-shrink-0" />
                      <div className="text-sm text-purple-200">
                        <p className="font-medium">Need help finding the Mineral ID?</p>
                        <p className="mt-1 opacity-80">
                          Check the mineral's details page or transaction history for its unique identifier. Raw mineral
                          IDs are typically prefixed with "RAW-".
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Refinement Form */}
          <div className="w-full lg:w-3/5">
            <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
              <h2 className="text-xl font-semibold mb-6">Refinement Report</h2>

              {inputMethod === "select" && selectedMineral && (
                <div className="mb-5 p-3 bg-gray-700/30 rounded-lg border border-gray-600">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-400">Selected Mineral:</span>
                    <span className="font-medium">{selectedMineral.name}</span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(selectedMineral.id);
                        notification.success("Mineral ID copied to clipboard");
                      }}
                      className="ml-auto text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mt-2 text-xs text-gray-400 break-all">ID: {selectedMineral.id}</div>
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2">Refinement Process Details *</label>
                  <textarea
                    value={report}
                    onChange={e => setReport(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all min-h-32"
                    placeholder="Describe the refinement process in detail..."
                  />
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-gray-700 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedMineral(null);
                    setMineralId("");
                    setReport("");
                  }}
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 border border-gray-600 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !mineralId || !report}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-32"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    "Submit Refinement"
                  )}
                </button>
              </div>
            </form>

            {/* Validation Summary */}
            <div className="mt-6 bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg">
              <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wider mb-4">
                Submission Requirements
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div
                    className={`h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      mineralId ? "bg-green-500/20 text-green-400" : "bg-gray-700 text-gray-500"
                    }`}
                  >
                    {mineralId ? <Check className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {inputMethod === "select" ? "Mineral selected" : "Valid Mineral ID"}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {inputMethod === "select"
                        ? "Choose from list or enter manually"
                        : "Must be a valid unrefined mineral identifier"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className={`h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      report ? "bg-green-500/20 text-green-400" : "bg-gray-700 text-gray-500"
                    }`}
                  >
                    {report ? <Check className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium">Refinement details provided</p>
                    <p className="text-xs text-gray-400 mt-0.5">Detailed description of the refinement process</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Refinement Guidelines */}
            <div className="mt-6 bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-lg">
              <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wider mb-4">Refinement Guidelines</h3>
              <ul className="text-sm text-gray-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>Include all processing steps and chemicals used</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>Note any quality control measures taken</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>Specify final purity levels achieved</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>Report any byproducts or waste materials</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

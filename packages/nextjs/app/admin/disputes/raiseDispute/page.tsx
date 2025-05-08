"use client";

import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { Copy } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const disputeSchema = z.object({
  mineralId: z.string().min(1, "Mineral ID is required"),
  defendant: z.string().min(1, "Defendant address is required"),
  details: z.string().min(1, "Details are required"),
  evidence: z.string().min(1, "Evidence is required"),
});

export default function RaiseDisputePage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(disputeSchema),
    defaultValues: {
      mineralId: "",
      defendant: "",
      details: "",
      evidence: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <div className="min-h-screen text-white p-4 sm:p-6 md:p-8">
      <div className="text-center mb-6 md:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Raise Dispute</h1>
        <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto mt-2">
          Raise a dispute regarding the current status of the mineral if you disagree with the updates recorded on the
          blockchain
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
        {/* Left Side - Minerals List */}
        <div className="w-full lg:w-1/3">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <h2 className="text-lg md:text-xl font-medium">Pending In Warehouse</h2>
            <button className="flex items-center gap-1 sm:gap-2 bg-zinc-800 rounded-full px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-base">
              <span className="hidden sm:inline">Filter</span>
              <span className="bg-blue-500 text-white rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-xs">
                2
              </span>
            </button>
          </div>

          <div className="space-y-3 md:space-y-4">
            {/* Mineral Item 1 */}
            <div className="bg-zinc-900 rounded-lg p-3 md:p-4 border border-zinc-800">
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <div className="text-xl">
                  <Image width={24} height={24} alt="" src={"/dashboard/cobalt.png"} />
                </div>
                <h3 className="font-bold text-sm md:text-base">Cobalt</h3>
                <span className="text-xs md:text-sm text-gray-400">[ 23/05/2025 ]</span>
              </div>

              <div className="mb-3 md:mb-4">
                <div className="text-xs md:text-sm mb-1">Purity Level:</div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-1/3"></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3 md:mb-4">
                <div className="text-xs md:text-sm">
                  <span className="text-gray-400">Quantity:</span>
                  <div className="bg-zinc-800 rounded p-1 md:p-2 mt-1 text-xs md:text-sm">0 KG</div>
                </div>
                <div className="text-xs md:text-sm">
                  <span className="text-gray-400">Price:</span>
                  <div className="bg-zinc-800 rounded p-1 md:p-2 mt-1 text-xs md:text-sm">0 KG</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button className="bg-red-500 hover:bg-red-600 text-white rounded py-1 md:py-2 text-xs md:text-sm font-medium">
                  Raise Dispute
                </button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white rounded py-1 md:py-2 text-xs md:text-sm font-medium">
                  Accept
                </button>
              </div>
            </div>

            {/* Mineral Item 2 */}
            <div className="bg-zinc-900 rounded-lg p-3 md:p-4 border border-zinc-800">
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <div className="text-xl">
                  <Image width={24} height={24} alt="" src={"/dashboard/cobalt.png"} />
                </div>
                <h3 className="font-bold text-sm md:text-base">Cobalt</h3>
                <span className="text-xs md:text-sm text-gray-400">[ 23/05/2025 ]</span>
              </div>

              <div className="mb-3 md:mb-4">
                <div className="text-xs md:text-sm mb-1">Purity Level:</div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-1/3"></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3 md:mb-4">
                <div className="text-xs md:text-sm">
                  <span className="text-gray-400">Quantity:</span>
                  <div className="bg-zinc-800 rounded p-1 md:p-2 mt-1 text-xs md:text-sm">0 KG</div>
                </div>
                <div className="text-xs md:text-sm">
                  <span className="text-gray-400">Price:</span>
                  <div className="bg-zinc-800 rounded p-1 md:p-2 mt-1 text-xs md:text-sm">0 KG</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button className="bg-red-500 hover:bg-red-600 text-white rounded py-1 md:py-2 text-xs md:text-sm font-medium">
                  Raise Dispute
                </button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white rounded py-1 md:py-2 text-xs md:text-sm font-medium">
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Dispute Form */}
        <div className="w-full lg:w-2/3">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6 bg-zinc-900 rounded-lg p-4 md:p-6">
            <div>
              <label className="block mb-1 md:mb-2 text-sm md:text-base">Mineral ID</label>
              <input
                {...register("mineralId")}
                className="w-full p-2 md:p-3 rounded bg-zinc-800 border border-gray-600 text-sm md:text-base"
              />
              {errors.mineralId && <p className="text-red-400 text-xs md:text-sm mt-1">{errors.mineralId.message}</p>}
            </div>

            <div>
              <label className="block mb-1 md:mb-2 text-sm md:text-base">Defendant Address</label>
              <div className="relative">
                <input
                  {...register("defendant")}
                  className="w-full p-2 md:p-3 rounded bg-zinc-800 border border-gray-600 pr-8 md:pr-10 text-sm md:text-base"
                />
                <button
                  type="button"
                  className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <Copy size={16} className="md:w-5 md:h-5" />
                </button>
              </div>
              {errors.defendant && <p className="text-red-400 text-xs md:text-sm mt-1">{errors.defendant.message}</p>}
            </div>

            <div>
              <label className="block mb-1 md:mb-2 text-sm md:text-base">Issue Details</label>
              <textarea
                {...register("details")}
                className="w-full p-2 md:p-3 rounded bg-zinc-800 border border-gray-600 min-h-24 md:min-h-32 text-sm md:text-base"
              />
              {errors.details && <p className="text-red-400 text-xs md:text-sm mt-1">{errors.details.message}</p>}
            </div>

            <div>
              <label className="block mb-1 md:mb-2 text-sm md:text-base">Evidence</label>
              <textarea
                {...register("evidence")}
                className="w-full p-2 md:p-3 rounded bg-zinc-800 border border-gray-600 min-h-24 md:min-h-32 text-sm md:text-base"
              />
              {errors.evidence && <p className="text-red-400 text-xs md:text-sm mt-1">{errors.evidence.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4 pt-3 md:pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="w-full p-2 md:p-3 bg-red-600 rounded hover:bg-red-700 text-sm md:text-base"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full p-2 md:p-3 bg-blue-600 rounded hover:bg-blue-700 text-sm md:text-base"
              >
                Submit Dispute
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

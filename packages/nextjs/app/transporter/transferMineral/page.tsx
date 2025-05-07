"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// form schema
const transferMineralSchema = z.object({
  mineralId: z.string().min(1, "Mineral ID is required"),
  receivingParty: z.string().min(1, "Receiving party is required"),
  origin: z.string().min(1, "Origin is required"),
  destination: z.string().min(1, "Destination is required"),
});

type TransferMineralFormData = z.infer<typeof transferMineralSchema>;

export default function TransferMineralPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransferMineralFormData>({
    resolver: zodResolver(transferMineralSchema),
  });

  const onSubmit = async (data: TransferMineralFormData) => {
    try {
      console.log("Form submitted:", data);
      // some logic
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="text-white p-4 flex gap-10 lg:gap-20 justify-center items-center">
      <div className="mx-10 w-[60%]">
        <h1 className="text-2xl font-bold mb-8 text-center">Transfer Mineral</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="border border-[#323539] rounded-xl p-6">
          {/* Mineral ID Field */}
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Mineral-ID</label>
            <div className="relative">
              <div className="flex items-center bg-[#2B2D2F] rounded-md p-2 pl-8">
                <input
                  type="text"
                  {...register("mineralId")}
                  className="bg-transparent text-gray-400 flex-grow outline-none"
                  placeholder="#f45f-2ds5-a445-7j97"
                />
              </div>
              {errors.mineralId && <p className="text-red-500 text-sm mt-1">{errors.mineralId.message}</p>}
            </div>
          </div>

          {/* Receiving Party Field */}
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Receiving Party</label>
            <div className="relative">
              <div className="flex items-center bg-[#2B2D2F] rounded-md p-2 pl-8">
                <input
                  type="text"
                  {...register("receivingParty")}
                  className="bg-transparent text-gray-400 flex-grow outline-none"
                  placeholder="Receiving party..."
                />
              </div>
              {errors.receivingParty && <p className="text-red-500 text-sm mt-1">{errors.receivingParty.message}</p>}
            </div>
          </div>

          {/* Origin Field */}
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Origin</label>
            <div className="relative">
              <div className="flex items-center bg-[#2B2D2F] rounded-md p-2 pl-8">
                <input
                  type="text"
                  {...register("origin")}
                  className="bg-transparent text-gray-400 flex-grow outline-none"
                  placeholder="origin..."
                />
              </div>
              {errors.origin && <p className="text-red-500 text-sm mt-1">{errors.origin.message}</p>}
            </div>
          </div>

          {/* Destination Field */}
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Destination</label>
            <div className="relative">
              <div className="flex items-center bg-[#2B2D2F] rounded-md p-2 pl-8">
                <input
                  type="text"
                  {...register("destination")}
                  className="bg-transparent text-gray-400 flex-grow outline-none"
                  placeholder="destination address..."
                />
              </div>
              {errors.destination && <p className="text-red-500 text-sm mt-1">{errors.destination.message}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <Link
              href={"/transporter/overview"}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-md transition-colors"
            >
              Cancel transfer
            </Link>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-md transition-colors"
            >
              Transfer Mineral
            </button>
          </div>
        </form>
      </div>

      {/* Information Panel */}
      <div className="hidden lg:block w-[40%] p-6 border border-[#323539] rounded-xl h-fit">
        <h2 className="text-xl font-bold mb-4">Mineral Transfer Guidelines</h2>

        <div className="space-y-4">
          <div className="bg-[#2B2D2F] p-4 rounded-lg">
            <h3 className="font-semibold text-blue-400 mb-2">Verification Process</h3>
            <p className="text-gray-300 text-sm">
              All mineral transfers undergo a 3-step verification process to ensure chain of custody is maintained.
            </p>
          </div>

          <div className="bg-[#2B2D2F] p-4 rounded-lg">
            <h3 className="font-semibold text-blue-400 mb-2">Required Information</h3>
            <ul className="text-gray-300 text-sm list-disc pl-5 space-y-1">
              <li>Valid mineral certification ID</li>
              <li>Authorized receiving party details</li>
              <li>GPS coordinates for origin/destination</li>
              <li>Transportation method details</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

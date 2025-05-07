"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Check, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Define validation schema with Zod
const refineSchema = z.object({
  mineralId: z.string().min(1, "Mineral ID is required"),
  report: z.string().optional(),
});

type RefineFormData = z.infer<typeof refineSchema>;

export default function RefineMineralPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<RefineFormData>({
    resolver: zodResolver(refineSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: RefineFormData) => {
    setIsSubmitting(true);
    try {
      console.log("Refining mineral:", data);
      // Add your refinement logic here
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate async operation
    } catch (error) {
      console.error("Error refining mineral:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 text-white">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-3">Refine Mineral</h1>
          <p className="text-gray-400">Enter mineral details for refinement processing</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 p-6 rounded-xl border border-gray-700 shadow-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <h2 className="text-xl font-medium mb-6 text-white">Refinement Details</h2>

              {/* Mineral ID Field */}
              <div className="space-y-2">
                <label htmlFor="mineralId" className="block text-sm font-medium text-gray-300">
                  Mineral ID
                </label>
                <input
                  id="mineralId"
                  type="text"
                  {...register("mineralId")}
                  placeholder="Enter mineral ID (e.g. #f45f-2ds5-a445-7j97)"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                {errors.mineralId && <p className="text-sm text-red-400 mt-1">{errors.mineralId.message}</p>}
              </div>

              {/* Optional Report Field */}
              <div className="space-y-2">
                <label htmlFor="report" className="block text-sm font-medium text-gray-300">
                  Refinement Notes (Optional)
                </label>
                <textarea
                  id="report"
                  {...register("report")}
                  placeholder="Additional notes about the refinement process..."
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent min-h-[120px]"
                />
              </div>

              <div className="my-6 border-t border-gray-700"></div>

              <button
                type="submit"
                disabled={isSubmitting || !isValid}
                className={`w-full h-12 rounded-lg font-medium text-white ${
                  isValid && !isSubmitting ? "bg-emerald-600 hover:bg-emerald-700" : "bg-gray-700 cursor-not-allowed"
                } transition-colors duration-200`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="animate-spin mr-2 h-5 w-5" />
                    Processing...
                  </div>
                ) : (
                  "Refine Mineral"
                )}
              </button>

              <p className="text-gray-400 text-sm text-center mt-4">
                {isValid
                  ? "All required fields are complete. You can refine the mineral."
                  : "Please enter a valid mineral ID to proceed."}
              </p>
            </form>
          </div>

          <div className="lg:w-80">
            <div className="p-6 rounded-xl border border-gray-700 shadow-lg h-full">
              <h2 className="text-lg font-medium mb-6 text-white">Validation Status</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center ${
                      !errors.mineralId ? "bg-emerald-900/50 text-emerald-400" : "bg-gray-700 text-gray-500"
                    }`}
                  >
                    {!errors.mineralId ? <Check size={14} /> : <AlertCircle size={14} />}
                  </div>
                  <span className="text-sm text-gray-300">Valid mineral ID</span>
                </div>
              </div>

              <div className="my-6 border-t border-gray-700"></div>

              <div className="space-y-3">
                <h3 className="font-medium text-sm text-white">Refinement Guidelines:</h3>
                <div className="flex gap-3 text-sm bg-gray-700/50 p-4 rounded-lg">
                  <AlertCircle className="min-w-5 h-5 mt-0.5 text-amber-400" />
                  <p className="text-gray-300">
                    The refinement process typically takes 24-48 hours. You&apos;ll receive a notification upon
                    completion.
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-lg bg-gray-800/30 border border-gray-700">
                <h3 className="text-sm font-medium text-gray-300 mb-2">Current Input</h3>
                <p className="text-sm text-gray-400">Mineral ID: {watch("mineralId") || "Not provided"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

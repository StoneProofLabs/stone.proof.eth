import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Define validation schema with Zod
const refineSchema = z.object({
  mineralId: z.string().min(1, "Mineral ID 1 is required"),
  report: z.string().optional(),
});

type RefineFormData = z.infer<typeof refineSchema>;

interface MineralDetailsFormProps {
  onSubmit: (data: RefineFormData) => void;
  isSubmitting?: boolean;
}

const MineralDetailsForm = ({ onSubmit, isSubmitting }: MineralDetailsFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RefineFormData>({
    resolver: zodResolver(refineSchema),
  });

  const handleFormSubmit = (data: RefineFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <div className="bg-[#252525] border border-[#323539] rounded-lg p-6 w-full">
      <h2 className="text-white text-xl font-medium mb-4">Refine Minerals</h2>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {/* Mineral ID  Field */}
        <div className="mb-4">
          <label className="block text-gray-400 mb-2">Mineral ID </label>
          <div className="relative">
            <input
              {...register("mineralId")}
              type="text"
              placeholder="Enter mineral ID"
              className="w-full bg-[#2B2D2F] rounded-md p-2 text-white focus:outline-none"
            />
            {errors.mineralId && <p className="text-red-500 text-sm mt-1">{errors.mineralId.message}</p>}
          </div>
        </div>

        {/* Optional Report Field */}
        <div className="mb-6">
          <label className="block text-gray-400 mb-2">Report (Optional)</label>
          <textarea
            {...register("report")}
            placeholder="Additional notes about the refinement"
            className="w-full bg-[#2B2D2F] rounded-md p-2 text-white min-h-[100px] focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Processing..." : "Refine Minerals"}
        </button>

        <p className="text-gray-500 text-sm text-center mt-4">Notification will be given to all members</p>
      </form>
    </div>
  );
};

export default MineralDetailsForm;

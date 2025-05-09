"use client";

import { Progress } from "./progress";
import { Loader2 } from "lucide-react";

interface LoadingProps {
  title?: string;
  description?: string;
  progressValue?: number;
  progressText?: string;
}

export const Loading = ({
  title = "Loading Data",
  description = "Please wait while we fetch the information...",
  progressValue = 60,
  progressText = "Preparing your interface",
}: LoadingProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-4 sm:space-y-6 md:space-y-8 animate-in fade-in duration-500 px-4 sm:px-6">
      <div className="relative">
        <div className="absolute -inset-2 sm:-inset-3 md:-inset-4">
          <div className="w-full h-full mx-auto rotate-180 opacity-30 blur-lg filter bg-gradient-to-r from-[#0A77FF] via-purple-500 to-pink-500"></div>
        </div>
        <Loader2 className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-[#0A77FF] animate-spin relative" />
      </div>

      <div className="space-y-2 sm:space-y-3 md:space-y-4 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">{title}</h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-[280px] sm:max-w-md md:max-w-lg mx-auto">
          {description}
        </p>
      </div>

      <div className="w-full max-w-[280px] sm:max-w-md md:max-w-lg space-y-2 sm:space-y-3">
        <Progress value={progressValue} className="h-1.5 sm:h-2 w-full" indicatorColor="#0A77FF" />
        <p className="text-xs sm:text-sm md:text-base text-gray-400 text-center">{progressText}</p>
      </div>
    </div>
  );
};

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
    <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-8 animate-in fade-in duration-500">
      <div className="relative">
        <div className="absolute -inset-4">
          <div className="w-full h-full mx-auto rotate-180 opacity-30 blur-lg filter bg-gradient-to-r from-[#0A77FF] via-purple-500 to-pink-500"></div>
        </div>
        <Loader2 className="w-16 h-16 text-[#0A77FF] animate-spin relative" />
      </div>

      <div className="space-y-4 text-center">
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        <p className="text-gray-400">{description}</p>
      </div>

      <div className="w-full max-w-md space-y-2">
        <Progress value={progressValue} className="h-2 w-full" indicatorColor="#0A77FF" />
        <p className="text-sm text-gray-400 text-center">{progressText}</p>
      </div>
    </div>
  );
};

"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import * as ProgressPrimitive from "@radix-ui/react-progress";

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  indicatorColor?: string;
}

const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(
  ({ className, indicatorColor, value, ...props }, ref) => (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn("relative h-2 w-full overflow-hidden rounded-full bg-[#232B3E]", className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn("h-full w-full flex-1 transition-all rounded-full")}
        style={{
          transform: `translateX(-${100 - (value || 0)}%)`,
          backgroundColor: indicatorColor || "#0A77FF",
        }}
      />
    </ProgressPrimitive.Root>
  ),
);

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };

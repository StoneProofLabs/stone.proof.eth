import { ComponentProps } from "react";

type SpinnerProps = ComponentProps<"div"> & {
  size?: "small" | "medium" | "large";
};

export const Spinner = ({ size = "medium", className = "", ...props }: SpinnerProps) => {
  const sizes = {
    small: "h-4 w-4 border-2",
    medium: "h-8 w-8 border-4",
    large: "h-12 w-12 border-4",
  };

  return (
    <div
      className={`animate-spin rounded-full border-solid border-current border-r-transparent ${sizes[size]} ${className}`}
      {...props}
    />
  );
};

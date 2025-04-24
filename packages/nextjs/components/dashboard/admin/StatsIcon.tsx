import { cn } from "~~/utils/dashboard/cn";

type StatVariant = "blue" | "green" | "orange" | "red";

interface StatsIconProps {
  variant: StatVariant;
  children: React.ReactNode;
}

const variantStyles: Record<StatVariant, { bg: string }> = {
  blue: { bg: "bg-[#1D4ED8]" },
  green: { bg: "bg-[#059669]" },
  orange: { bg: "bg-[#D97706]" },
  red: { bg: "bg-[#DC2626]" },
};

export default function StatsIcon({ variant, children }: StatsIconProps) {
  const styles = variantStyles[variant];

  return (
    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", styles.bg)}>
      <div className="w-6 h-6 text-white">{children}</div>
    </div>
  );
}

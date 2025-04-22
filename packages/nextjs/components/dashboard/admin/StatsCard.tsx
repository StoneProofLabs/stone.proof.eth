import { cn } from "~~/utils/dashboard/cn";

type StatVariant = "blue" | "green" | "orange" | "red";

interface StatsCardProps {
  variant: StatVariant;
  icon: React.ReactNode;
  value: number;
  label: string;
  percentage: number;
}

const variantStyles: Record<StatVariant, { border: string; text: string }> = {
  blue: { border: "border-[#1D4ED8]", text: "text-[#60A5FA]" },
  green: { border: "border-[#059669]", text: "text-[#34D399]" },
  orange: { border: "border-[#D97706]", text: "text-[#FBBF24]" },
  red: { border: "border-[#DC2626]", text: "text-[#F87171]" },
};

export default function StatsCard({ variant, icon, value, label, percentage }: StatsCardProps) {
  const styles = variantStyles[variant];

  return (
    <div className={cn("relative rounded-2xl p-6 border", styles.border)}>
      <div className="flex flex-col gap-1">
        {/* Icon */}
        <div className="mb-2">{icon}</div>

        {/* Value */}
        <div className="text-4xl font-bold text-white">{value.toLocaleString()}</div>

        {/* Label */}
        <div className="text-[#979AA0] text-base">{label}</div>

        {/* Percentage */}
        <div className={cn("mt-2 text-sm font-medium", percentage >= 0 ? "text-[#34D399]" : "text-[#F87171]")}>
          {percentage >= 0 ? "+" : ""}
          {percentage}%
        </div>
      </div>
    </div>
  );
}

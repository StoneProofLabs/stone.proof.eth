type StatusBadgeProps = {
  status: string;
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const bgColorMap: Record<string, string> = {
    Raw: "bg-amber-500",
    "In-factory": "bg-blue-500",
    Refined: "bg-green-500",
    "In-transit": "bg-red-500",
  };

  const bgColor = bgColorMap[status] || "bg-gray-500";

  return (
    <div className={`inline-flex items-center px-2 py-1 rounded-md ${bgColor} text-white text-sm`}>
      <span className="mr-1">•</span>
      {status}
    </div>
  );
}

type StatusBadgeProps = {
  time: number;
};

export default function EllapsedTIme({ time }: StatusBadgeProps) {
  // const bgColorMap: Record<string, string> = {
  //   Raw: "bg-amber-500",
  //   "In-factory": "bg-blue-500",
  //   Refined: "bg-green-500",
  //   "In-transit": "bg-red-500",
  // };

  // const bgColor = bgColorMap[status] || "bg-gray-500";

  return (
    <div className="flex items-center">
      <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
      <span>{time} hrs</span>
    </div>
  );
}

type PurityIndicatorProps = {
  value: number;
};

export default function PurityIndicator({ value }: PurityIndicatorProps) {
  return (
    <div className="flex items-center">
      <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
      <span>{value}%</span>
    </div>
  );
}

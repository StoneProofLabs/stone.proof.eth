import React from "react";

interface AdminStatCardProps {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  value: string | number;
  buttonText: string;
  onButtonClick: () => void;
  className?: string;
  cardBg?: string;
}

const AdminStatCard: React.FC<AdminStatCardProps> = ({
  icon,
  iconBg,
  title,
  value,
  buttonText,
  onButtonClick,
  className = "",
  cardBg = "#181B20",
}) => {
  return (
    <div
      className={`flex items-center justify-between border border-[#323539] rounded-xl p-5 min-w-[220px] w-full ${className}`}
      style={{ backgroundColor: cardBg }}
    >
      <div className="flex items-center gap-4">
        <div className="rounded-lg flex items-center justify-center w-12 h-12" style={{ backgroundColor: iconBg }}>
          {icon}
        </div>
        <div>
          <div className="text-gray-200 text-sm font-medium">{title}</div>
          <div className="text-2xl font-bold text-white mt-1">{value}</div>
        </div>
      </div>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors flex items-center gap-1"
        onClick={onButtonClick}
      >
        {buttonText}
        <span aria-hidden="true">→</span>
      </button>
    </div>
  );
};

export default AdminStatCard;

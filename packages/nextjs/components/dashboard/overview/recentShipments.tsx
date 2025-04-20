"use client";

import { ChevronRight, MoreHorizontal } from "lucide-react";

interface Shipment {
  id: string;
  mineralName: string;
  mineralImage: string;
  timeAgo: string;
  status: "completed" | "in-transit";
}

interface RecentShipmentsProps {
  shipments: Shipment[];
  title?: string;
  viewAllLabel?: string;
  onViewAll?: () => void;
}

export default function RecentShipments({
  shipments,
  title = "Recent Shipments",
  viewAllLabel = "View full history",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onViewAll = () => {},
}: RecentShipmentsProps) {
  return (
    <div className="bg-[#252525] border border-[#323539] rounded-2xl p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white text-lg font-medium">{title}</h3>
        <button className="text-gray-400 hover:text-white">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="space-y-4">
        {shipments.map(shipment => (
          <div key={shipment.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-800">
                <img src={shipment.mineralImage} alt={shipment.mineralName} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-white font-medium">{shipment.mineralName}</p>
                <p className="text-gray-400 text-sm">{shipment.timeAgo}</p>
              </div>
            </div>
            <button className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  shipment.status === "completed" ? "bg-green-500 text-white" : "bg-red-500 text-white"
                }`}
              >
                {shipment.status === "completed" ? "Completed" : "In-transit"}
              </span>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={onViewAll}
        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
      >
        {viewAllLabel}
      </button>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Cell, Pie, PieChart } from "recharts";

export default function SubscriptionCard() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  const percentage = 86;
  const data = [
    { name: "Progress", value: percentage },
    { name: "Remaining", value: 100 - percentage },
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  if (!isVisible) return null;

  return (
    <div className="flex justify-center items-center bg-opacity-40 p-2">
      <div className="bg-[#2B2D2F] rounded-lg p-4 w-64 relative">
        <button onClick={() => setIsVisible(false)} className="absolute top-2 right-2 text-white hover:text-gray-300">
          <X size={18} />
        </button>

        <div className="flex justify-center mb-3">
          <div className="relative w-20 h-20 flex justify-center items-center">
            <PieChart width={80} height={80}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={36}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                strokeWidth={0}
              >
                <Cell fill="#FFFFFF" />
                <Cell fill="#333333" />
              </Pie>
            </PieChart>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-lg font-bold">{percentage}%</span>
            </div>
          </div>
        </div>
        <div className="leading-none">
          <h1 className="font-bold text-[16px]">Subscription plan</h1>
          <h1 className="text-[#979AA0] text-[14px] mt-0">Upgrade plan to access the more of Stone.proof</h1>
        </div>
        <div>
          <Link href={"#"} className="font-bold text-[15px] text-accentBlue">
            Upgrade
          </Link>
        </div>
      </div>
    </div>
  );
}

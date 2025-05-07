"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import MineralDetailsForm from "~~/components/dashboard/refiner/mineralDetailsForm";
import UnrefinedMineralsTable from "~~/components/dashboard/refiner/unrefinedMinerals";
import { warehouseMineralData } from "~~/data/data";

// Define a type for your mineral data
type Mineral = {
  id: string;
  name: string;
  type: string;
  origin: string;
  weight: string;
  quantity: number;
  purity: number;
  ellapsedTime: string;
  storageConditions: string;
  image: string;
  manager: string;
};

export default function Page() {
  const [minerals, setMinerals] = useState<Mineral[]>(warehouseMineralData);
  const [selectedMineral, setSelectedMineral] = useState<Mineral | null>(null);

  // Select first mineral by default if available
  useEffect(() => {
    if (minerals.length > 0 && !selectedMineral) {
      setSelectedMineral(minerals[0]);
    }
  }, [minerals, selectedMineral]);

  const handleSelectMineral = (mineral: Mineral) => {
    setSelectedMineral(mineral);
  };

  const handleSubmit = (data: any) => {
    // some submission logic here
    console.log(data);
  };

  return (
    <div className="min-h-screen text-white p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Refine Mineral</h1>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Un-Refined Minerals</h2>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-[50%]">
            <UnrefinedMineralsTable
              minerals={minerals}
              selectedMineral={selectedMineral}
              onSelectMineral={handleSelectMineral}
            />
          </div>

          <div className="w-[50%]">
            <MineralDetailsForm onSubmit={handleSubmit} isSubmitting={false} />
          </div>
        </div>
      </div>
    </div>
  );
}

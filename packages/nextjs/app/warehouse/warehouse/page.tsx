"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import MineralDetailsForm from "~~/components/dashboard/warehouse/mineralDetailsForm";
import UnpurchasedMineralsTable from "~~/components/dashboard/warehouse/unpurchasedMinerals";
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

const MineralsManagementApp = () => {
  const [minerals, setMinerals] = useState<Mineral[]>(warehouseMineralData);
  const [selectedMineral, setSelectedMineral] = useState<Mineral | null>(null);
  // Remove unused state or use it in your component
  const [pendingRequests] = useState(9);

  // Select first mineral by default if available
  useEffect(() => {
    if (minerals.length > 0 && !selectedMineral) {
      setSelectedMineral(minerals[0]);
    }
  }, [minerals, selectedMineral]);

  const handleSelectMineral = (mineral: Mineral) => {
    setSelectedMineral(mineral);
  };

  const handlePurchase = (updatedMineral: Mineral) => {
    // Update the mineral in the list
    const updatedMinerals = minerals.map(mineral => (mineral.id === updatedMineral.id ? updatedMineral : mineral));

    setMinerals(updatedMinerals);
    setSelectedMineral(updatedMineral);

    alert(`Mineral ${updatedMineral.name} marked as purchased!`);
  };

  return (
    <div className="min-h-screen text-white p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Stored Mineral Details</h1>

          <button className="flex items-center bg-gray-900 hover:bg-gray-800 rounded-md py-2 px-4">
            <Bell size={18} className="mr-2" />
            <span>Pending Storage Requests</span>
            <span className="ml-2 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {pendingRequests}
            </span>
          </button>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Un-Purchased Minerals</h2>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-2/3">
            <UnpurchasedMineralsTable
              minerals={minerals}
              selectedMineral={selectedMineral}
              onSelectMineral={handleSelectMineral}
              onPurchase={handlePurchase}
            />
          </div>

          <div className="w-full lg:w-1/3">
            <MineralDetailsForm selectedMineral={selectedMineral} onPurchase={handlePurchase} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MineralsManagementApp;

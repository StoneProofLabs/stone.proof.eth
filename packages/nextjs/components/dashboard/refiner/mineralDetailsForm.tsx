import { useEffect, useState } from "react";
import { ChevronDown, Copy, Lock, Minus, Plus } from "lucide-react";

// @ts-ignore
const MineralDetailsForm = ({ selectedMineral, onPurchase }) => {
  const [quantity, setQuantity] = useState(0);
  const [purity, setPurity] = useState(0);
  const [isConditionsOpen, setIsConditionsOpen] = useState(false);
  const [storageConditions, setStorageConditions] = useState("No Conditions specified");

  // Update form when selected mineral changes
  useEffect(() => {
    if (selectedMineral) {
      setQuantity(selectedMineral.quantity || 0);
      setPurity(selectedMineral.purity || 0);
      setStorageConditions(selectedMineral.storageConditions || "No Conditions specified");
    }
  }, [selectedMineral]);

  const handleCopyId = () => {
    if (selectedMineral) {
      navigator.clipboard.writeText(selectedMineral.id);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreasePurity = () => {
    if (purity > 0) {
      setPurity(purity - 1);
    }
  };

  const increasePurity = () => {
    if (purity < 100) {
      setPurity(purity + 1);
    }
  };

  const handlePurchase = () => {
    if (selectedMineral && onPurchase) {
      onPurchase({
        ...selectedMineral,
        quantity,
        purity,
        storageConditions,
      });
    }
  };

  const conditionOptions = [
    "No Conditions specified",
    "Keep dry",
    "Low humidity",
    "Room temperature",
    "Cold storage",
    "Controlled atmosphere",
    "Dust-free environment",
    "Keep sealed",
  ];

  if (!selectedMineral) {
    return (
      <div className="bg-[#252525] border border-[#323539] rounded-lg p-6 w-full">
        <h2 className="text-white text-xl font-medium mb-4">Mineral Details</h2>
        <div className="text-gray-500 text-center py-12">Select a mineral to view details</div>
      </div>
    );
  }

  return (
    <div className="bg-[#252525] border border-[#323539] rounded-lg p-6 w-full">
      <h2 className="text-white text-xl font-medium mb-4">Mineral Details</h2>

      {/* Mineral ID Field */}
      <div className="mb-4">
        <label className="block text-gray-400 mb-2">Mineral-ID</label>
        <div className="relative">
          <div className="flex items-center bg-[#2B2D2F] rounded-md p-2 pl-8">
            <Lock size={16} className="text-gray-400 absolute left-2" />
            <span className="text-gray-400 flex-grow truncate">{selectedMineral.id}</span>
            <button onClick={handleCopyId} className="text-white hover:text-blue-400">
              <Copy size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Mineral Name Field */}
      <div className="mb-4">
        <label className="block text-gray-400 mb-2">Mineral Name</label>
        <div className="relative">
          <div className="flex items-center bg-[#2B2D2F] rounded-md p-2 pl-8">
            <Lock size={16} className="text-gray-400 absolute left-2" />
            <span className="text-gray-400">{selectedMineral.name}</span>
          </div>
        </div>
      </div>

      {/* Type Field */}
      <div className="mb-4">
        <label className="block text-gray-400 mb-2">Type</label>
        <div className="relative">
          <div className="flex items-center bg-[#2B2D2F] rounded-md p-2 pl-8">
            <Lock size={16} className="text-gray-400 absolute left-2" />
            <span className="text-gray-400">{selectedMineral.type}</span>
          </div>
        </div>
      </div>

      {/* Origin Field */}
      <div className="mb-4">
        <label className="block text-gray-400 mb-2">Origin</label>
        <div className="relative">
          <div className="flex items-center bg-[#2B2D2F] rounded-md p-2 pl-8">
            <Lock size={16} className="text-gray-400 absolute left-2" />
            <span className="text-gray-400">{selectedMineral.origin}</span>
          </div>
        </div>
      </div>

      {/* Quantity Field */}
      <div className="mb-4">
        <label className="block text-gray-400 mb-2">Quantity</label>
        <div className="flex items-center">
          <div className="flex-grow bg-[#2B2D2F] rounded-md p-2">
            <span className="text-gray-400">{quantity} KG</span>
          </div>
          <button onClick={decreaseQuantity} className="bg-[#2B2D2F] text-white p-2 ml-2 rounded-md hover:bg-gray-700">
            <Minus size={16} />
          </button>
          <button onClick={increaseQuantity} className="bg-[#2B2D2F] text-white p-2 ml-2 rounded-md hover:bg-gray-700">
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Purity Percentage Field */}
      <div className="mb-4">
        <label className="block text-gray-400 mb-2">Purity Percentage</label>
        <div className="relative">
          <div className="relative bg-[#2B2D2F] rounded-md p-4 mb-2">
            <div className="w-full bg-gray-700 h-2 rounded-full">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${purity}%` }}></div>
            </div>
          </div>
          <div className="flex items-center">
            <button onClick={decreasePurity} className="bg-gray-800 text-white p-2 rounded-md hover:bg-gray-700">
              <Minus size={16} />
            </button>
            <span className="flex-grow text-center text-white">{purity}%</span>
            <button onClick={increasePurity} className="bg-gray-800 text-white p-2 rounded-md hover:bg-gray-700">
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Storage Conditions Field */}
      <div className="mb-6">
        <label className="block text-gray-400 mb-2">Storage Conditions</label>
        <div className="relative">
          <button
            className="flex items-center justify-between w-full bg-[#2B2D2F] rounded-md p-2 text-gray-400"
            onClick={() => setIsConditionsOpen(!isConditionsOpen)}
          >
            <span>{storageConditions}</span>
            <Lock size={16} className="mr-2" />
            <ChevronDown size={16} />
          </button>

          {isConditionsOpen && (
            <div className="absolute z-10 w-full mt-1 bg-[#2B2D2F] rounded-md shadow-lg max-h-48 overflow-auto">
              {conditionOptions.map(option => (
                <button
                  key={option}
                  className="block w-full text-left px-4 py-2 text-gray-400 hover:bg-gray-700"
                  onClick={() => {
                    setStorageConditions(option);
                    setIsConditionsOpen(false);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Purchase Button */}
      <button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors"
        onClick={handlePurchase}
      >
        Mark Refined
      </button>

      <p className="text-gray-500 text-sm text-center mt-4">Notification will be given to all members</p>
    </div>
  );
};

export default MineralDetailsForm;

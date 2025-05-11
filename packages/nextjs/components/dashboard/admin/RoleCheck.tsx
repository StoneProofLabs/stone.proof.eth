import React, { useEffect, useState } from "react";
import { BiSolidErrorCircle } from "react-icons/bi";
import { HiLightningBolt } from "react-icons/hi";
import Icon from "~~/components/dashboard/Icon";

interface RoleCheckProps {
  userId?: string;
  onCheckRole?: () => void;
  foundRole?: string;
  hasRole?: boolean;
  onUserIdChange?: (userId: string) => void;
}

const RoleCheck: React.FC<RoleCheckProps> = ({
  userId = "",
  onCheckRole,
  foundRole = "",
  hasRole = false,
  onUserIdChange,
}) => {
  const [inputUserId, setInputUserId] = useState(userId);
  const [isChecked, setIsChecked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setInputUserId(userId);
  }, [userId]);

  useEffect(() => {
    // Start animation when component mounts
    setIsAnimating(true);

    // Optional: reset animation after a delay for potential re-animation
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleCheckRole = () => {
    setIsChecked(true);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 2000);
    if (onCheckRole) onCheckRole();
    if (onUserIdChange) onUserIdChange(inputUserId);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(inputUserId);
  };

  return (
    <div
      className={`relative bg-gradient-to-br from-[#060B17] to-[#0A1428] border-2 border-[#007AFF] rounded-[20px] p-5 w-full max-w-[550px] shadow-lg shadow-[#007AFF]/10 ${isAnimating ? "animate-pulse" : ""}`}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-[#007AFF]/10 rounded-full blur-xl -mr-5 -mt-5 z-0"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-[#007AFF]/10 rounded-full blur-lg -ml-4 -mb-4 z-0"></div>

      <div className="relative z-10">
        <div className="flex items-center mb-5">
          <HiLightningBolt size={28} className="text-[#007AFF] mr-3" />
          <h3 className="text-white text-2xl font-bold bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
            Role Check
          </h3>
        </div>

        <div className="mb-4">
          <p className="text-[#979AA0] text-xs mb-1">USER_ID</p>
          <div className="relative">
            <input
              type="text"
              value={inputUserId}
              onChange={e => setInputUserId(e.target.value)}
              className="w-full bg-[#060B17] border border-[#323539] rounded-[8px] px-3 py-2 text-white focus:border-[#007AFF] transition-colors"
              placeholder="0x..."
            />
            <button
              onClick={handleCopy}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:scale-110 transition-transform"
            >
              <Icon path="/dashboard/icon_set/copy.svg" alt="copy" />
            </button>
          </div>
        </div>

        {isChecked && (
          <div className="bg-[#1A202C] p-4 rounded-[8px] border border-[#323539] shadow-inner">
            <div className="flex flex-col sm:flex-row items-start sm:items-center mb-3">
              <div className="flex items-center gap-3 w-full">
                <HiLightningBolt size={24} className="text-white" />
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 flex-1">
                  <p className="text-white text-base font-medium">Found Role:</p>
                  {foundRole ? (
                    <div
                      className={`px-3 py-1 rounded-full flex items-center gap-1 mt-1 sm:mt-0 shadow-md ${hasRole ? "bg-[#4CAF50] shadow-[#4CAF50]/20" : "bg-[#EEA23E] shadow-[#EEA23E]/20"}`}
                    >
                      <BiSolidErrorCircle size={16} className="text-white" />
                      <span className="text-white text-sm font-medium">{foundRole}</span>
                    </div>
                  ) : (
                    <div className="bg-[#EEA23E] px-3 py-1 rounded-full flex items-center gap-1 mt-1 sm:mt-0 shadow-md shadow-[#EEA23E]/20">
                      <BiSolidErrorCircle size={16} className="text-white" />
                      <span className="text-white text-sm font-medium">No USER_ID Provided</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <p className="text-[#979AA0] text-lg ml-9 mb-4">
              {foundRole ? `User has ${foundRole} role(s)` : "Please provide a valid USER_ID above"}
            </p>
          </div>
        )}

        <button
          onClick={handleCheckRole}
          className="w-full bg-gradient-to-r from-[#007AFF] to-[#0A97FF] mt-5 text-white py-3.5 rounded-[10px] font-semibold text-lg shadow-lg shadow-[#007AFF]/20 hover:shadow-xl hover:shadow-[#007AFF]/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
        >
          Check Role
        </button>
      </div>
    </div>
  );
};

export default RoleCheck;

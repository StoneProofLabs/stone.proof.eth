import React, { useState } from "react";
import { HiLightningBolt } from "react-icons/hi";
import Icon from "~~/components/dashboard/Icon";

interface RoleCheckProps {
  userId?: string;
  onCheckRole?: () => void;
  foundRole?: string;
  hasRole?: boolean;
}

const RoleCheck: React.FC<RoleCheckProps> = ({ userId = "", onCheckRole, foundRole = "", hasRole = false }) => {
  const [inputUserId, setInputUserId] = useState(userId);
  const [isChecked, setIsChecked] = useState(!!foundRole);

  const handleCheckRole = () => {
    setIsChecked(true);
    if (onCheckRole) onCheckRole();
  };

  return (
    <div className="bg-[#0A101B] border border-[#2B3548] rounded-[16px] overflow-hidden w-full">
      <div className="rounded-t-[16px] py-6 px-5 bg-[#0E141F] border-b border-[#2B3548]">
        <div className="flex items-center">
          <div className="flex items-center gap-4">
            <div className="bg-[#1C6AE4] rounded-[10px] p-3 flex-shrink-0">
              <HiLightningBolt size={32} className="text-white" />
            </div>
            <div>
              <h3 className="text-white text-2xl font-bold leading-tight">Role Check</h3>
              <p className="text-[#979AA0] text-sm mt-1">Verify User Access</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-4">
          <p className="text-[#979AA0] text-xs mb-1">USER_ID</p>
          <div className="relative">
            <input
              type="text"
              value={inputUserId}
              onChange={e => setInputUserId(e.target.value)}
              className="w-full bg-[#1A202C] border border-[#323539] rounded-[8px] px-3 py-2 text-white"
              placeholder="0xffad-ecd3-34fc-2920"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <Icon path="/dashboard/icon_set/copy.svg" alt="copy" />
            </button>
          </div>
        </div>

        {isChecked && (
          <div className="flex items-center gap-3 mb-4 bg-[#1A202C] p-3 rounded-[8px]">
            <HiLightningBolt size={20} className="text-[#1C6AE4]" />
            <div className="flex-1">
              <p className="text-white text-sm">Found Role:</p>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${hasRole ? "bg-[#F59E0B] text-black" : "bg-[#F42A46] text-white"}`}
                >
                  {hasRole ? foundRole : "No USER_ID Provided"}
                </span>
              </div>
            </div>
          </div>
        )}

        {isChecked && !hasRole && <p className="text-[#979AA0] text-xs mb-4">Please provide a USER_ID above</p>}

        <button
          onClick={handleCheckRole}
          className="w-full bg-[#1C6AE4] text-white py-2.5 rounded-[8px] font-semibold mt-6"
        >
          Check Role
        </button>
      </div>
    </div>
  );
};

export default RoleCheck;

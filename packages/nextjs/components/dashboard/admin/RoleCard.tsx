import React, { useState } from "react";
import { HiArrowDown } from "react-icons/hi";
import Icon from "~~/components/dashboard/Icon";

interface RoleCardProps {
  role: string;
  iconPath: string;
  activeCount: number;
  userId?: string;
  subtitle?: string;
  onAssign?: () => void;
  onRevoke?: () => void;
}

const RoleCard: React.FC<RoleCardProps> = ({
  role,
  iconPath,
  activeCount,
  userId = "",
  subtitle = "Total Expenses",
  onAssign,
  onRevoke,
}) => {
  const [reason, setReason] = useState("");
  const [inputUserId, setInputUserId] = useState(userId);

  return (
    <div className="bg-[#0A101B] border border-[#2B3548] rounded-[16px] overflow-hidden w-full">
      <div className="rounded-t-[16px] py-6 px-5 bg-[#0E141F] border-b border-[#2B3548]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-[#1C6AE4] rounded-[10px] p-4 flex-shrink-0">
              <Icon path={iconPath} alt={`${role} icon`} width={36} height={36} />
            </div>
            <div>
              <h3 className="text-white text-xl font-bold leading-tight">{role}</h3>
              <p className="text-[#979AA0] text-sm">{subtitle}</p>
            </div>
          </div>
          <div className="bg-[#1C6AE4] px-4 py-2 rounded-full text-sm font-semibold text-white flex items-center gap-2">
            <HiArrowDown size={16} className="text-white" />
            <span>{activeCount.toLocaleString()} Active</span>
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

        <div className="mb-4">
          <p className="text-[#979AA0] text-xs mb-1">Reason</p>
          <div className="relative">
            <input
              type="text"
              value={reason}
              onChange={e => setReason(e.target.value)}
              className="w-full bg-[#1A202C] border border-[#323539] rounded-[8px] px-3 py-2 text-white"
              placeholder="0xffad-ecd3-34fc-2920"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <Icon path="/edit.svg" alt="edit" />
            </button>
          </div>
          <p className="text-[#979AA0] text-xs mt-1">Reason is required for revoking a role from a user</p>
        </div>

        <div className="flex gap-2 mt-6">
          <button onClick={onRevoke} className="flex-1 bg-[#F42A46] text-white py-2.5 rounded-[8px] font-semibold">
            Revoke Role
          </button>
          <button onClick={onAssign} className="flex-1 bg-[#1C6AE4] text-white py-2.5 rounded-[8px] font-semibold">
            Assign Role
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleCard;

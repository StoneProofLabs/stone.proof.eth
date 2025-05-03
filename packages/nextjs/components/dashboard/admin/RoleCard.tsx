import React, { useState } from "react";
import { HiArrowDown } from "react-icons/hi";
import Icon from "~~/components/dashboard/Icon";

interface RoleCardProps {
  role: string;
  iconPath: string;
  activeCount?: number;
  userId?: string;
  subtitle?: string;
  onAssign?: () => void;
  onRevoke?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  onUserIdChange?: (userId: string) => void;
}

const RoleCard: React.FC<RoleCardProps> = ({
  role,
  iconPath,
  activeCount = 0,
  userId = "",
  subtitle = "Total Expenses",
  onAssign = () => {},
  onRevoke = () => {},
  disabled = false,
  isLoading = false,
  onUserIdChange,
}) => {
  const [reason, setReason] = useState("");
  const [inputUserId, setInputUserId] = useState(userId);

  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputUserId(e.target.value);
    if (onUserIdChange) {
      onUserIdChange(e.target.value);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(inputUserId);
  };

  return (
    <div className="bg-[#060B17] border border-[#181818] rounded-[20px] p-3 w-full max-w-[550px]">
      <div className="bg-[#060910] border border-[#323539] rounded-[20px] py-3 px-5 mx-0 mb-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-3 sm:gap-0">
          <div className="flex items-center gap-2">
            <div className="bg-[#1C6AE4] rounded-[10px] p-4 flex-shrink-0">
              <Icon path={iconPath} alt={`${role} icon`} width={36} height={36} />
            </div>
            <div className="relative top-[10px]">
              <h3 className="text-white text-xl font-bold leading-tight">{role}</h3>
              <p className="text-[#979AA0] text-sm">{subtitle}</p>
            </div>
          </div>
          <div className="bg-[#1C6AE4] px-4 py-2 rounded-full text-sm font-semibold text-white flex items-center gap-2 self-start sm:self-center">
            <HiArrowDown size={16} className="text-white" />
            <span>{(activeCount ?? 0).toLocaleString()} Active</span>
          </div>
        </div>
      </div>

      <div className="px-3">
        <div className="mb-4">
          <p className="text-[#979AA0] text-xs mb-1">USER_ID</p>
          <div className="relative">
            <input
              type="text"
              value={inputUserId}
              onChange={handleUserIdChange}
              className="w-full bg-[#060B17] border border-[#323539] rounded-[8px] px-3 py-2 text-white focus:outline-none"
              placeholder="0x..."
              disabled={disabled || isLoading}
            />
            <button 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 focus:outline-none"
              disabled={disabled || isLoading}
              onClick={handleCopy}
            >
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
              className="w-full bg-[#060B17] border border-[#323539] rounded-[8px] px-3 py-2 text-white focus:outline-none"
              placeholder="Enter reason..."
              disabled={disabled || isLoading}
            />
          </div>
          <p className="text-[#979AA0] text-md mt-1">Reason is required for revoking a role from a user</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 mt-6 mb-3">
          <button
            onClick={() => {
              setReason(reason); // Ensure reason is set before revoking
              onRevoke();
            }}
            disabled={disabled || isLoading || !inputUserId}
            className={`w-full sm:flex-1 text-white py-2.5 rounded-[8px] font-semibold focus:outline-none mb-2 sm:mb-0 ${
              disabled || isLoading || !inputUserId ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#E33B32] hover:bg-[#c03129]'
            }`}
          >
            {isLoading ? 'Revoking...' : 'Revoke Role'}
          </button>
          <button
            onClick={onAssign}
            disabled={disabled || isLoading || !inputUserId}
            className={`w-full sm:flex-1 text-white py-2.5 rounded-[8px] font-semibold focus:outline-none ${
              disabled || isLoading || !inputUserId ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#0A77FF] hover:bg-[#0965d9]'
            }`}
          >
            {isLoading ? 'Assigning...' : 'Assign Role'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleCard;
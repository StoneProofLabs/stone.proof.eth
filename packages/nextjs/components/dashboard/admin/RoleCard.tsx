import React, { useEffect, useState } from "react";
import { HiArrowDown } from "react-icons/hi";
import { isAddress } from "viem";
import Icon from "~~/components/dashboard/Icon";

interface RoleCardProps {
  role: string;
  iconPath: string;
  activeCount?: number;
  userId?: string;
  subtitle?: string;
  onAssign?: () => Promise<void>;
  onRevoke?: () => Promise<void>;
  disabled?: boolean;
  isAssignLoading?: boolean;
  isRevokeLoading?: boolean;
  onUserIdChange: (address: string) => void;
  onReasonChange: (reason: string) => void;
}

const RoleCard: React.FC<RoleCardProps> = ({
  role,
  iconPath,
  activeCount = 0,
  userId = "",
  subtitle = "Total Expenses",
  onAssign = async () => {},
  onRevoke = async () => {},
  disabled = false,
  isAssignLoading = false,
  isRevokeLoading = false,
  onUserIdChange,
  onReasonChange,
}) => {
  const [localReason, setLocalReason] = useState("");
  const [displayAddress, setDisplayAddress] = useState("");

  // Validate address
  const isValidAddress = isAddress(userId);

  // Format address for display
  useEffect(() => {
    if (isValidAddress) {
      const formatted = `${userId.substring(0, 6)}...${userId.substring(38)}`;
      setDisplayAddress(formatted);
    } else {
      setDisplayAddress(userId);
    }
  }, [userId, isValidAddress]);

  const handleReasonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalReason(value);
    onReasonChange(value);
  };

  const handleCopy = () => {
    if (userId) {
      navigator.clipboard.writeText(userId);
    }
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
          <p className="text-[#979AA0] text-xs mb-1">ETHEREUM ADDRESS</p>
          <div className="relative">
            <input
              type="text"
              value={userId}
              onChange={e => onUserIdChange(e.target.value)}
              className={`w-full bg-[#060B17] border ${
                userId && !isValidAddress ? "border-red-500" : "border-[#323539]"
              } rounded-[8px] px-3 py-2 text-white focus:outline-none`}
              placeholder="0x..."
              disabled={disabled}
            />
            {isValidAddress && (
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 focus:outline-none"
                disabled={disabled}
                onClick={handleCopy}
              >
                <Icon path="/dashboard/icon_set/copy.svg" alt="copy" />
              </button>
            )}
          </div>
          {userId && !isValidAddress && (
            <p className="text-red-500 text-xs mt-1">Please enter a valid Ethereum address</p>
          )}
          {isValidAddress && <p className="text-green-500 text-xs mt-1">Valid address: {displayAddress}</p>}
        </div>

        <div className="mb-4">
          <p className="text-[#979AA0] text-xs mb-1">REASON (Required for revoke)</p>
          <input
            type="text"
            value={localReason}
            onChange={handleReasonChange}
            className="w-full bg-[#060B17] border border-[#323539] rounded-[8px] px-3 py-2 text-white focus:outline-none"
            placeholder="Enter reason..."
            disabled={disabled}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 mt-6 mb-3">
          <button
            onClick={onRevoke}
            disabled={disabled || !isValidAddress || !localReason.trim() || isRevokeLoading}
            className={`w-full sm:flex-1 text-white py-2.5 rounded-[8px] font-semibold focus:outline-none mb-2 sm:mb-0 ${
              disabled || !isValidAddress || !localReason.trim() || isRevokeLoading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-[#E33B32] hover:bg-[#c03129]"
            }`}
          >
            {isRevokeLoading ? "Revoking..." : "Revoke Role"}
          </button>
          <button
            onClick={onAssign}
            disabled={disabled || !isValidAddress || isAssignLoading}
            className={`w-full sm:flex-1 text-white py-2.5 rounded-[8px] font-semibold focus:outline-none ${
              disabled || !isValidAddress || isAssignLoading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-[#0A77FF] hover:bg-[#0965d9]"
            }`}
          >
            {isAssignLoading ? "Assigning..." : "Assign Role"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleCard;

"use client";

import { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ChevronRight, Copy, Loader2, Mail, MessageSquare, Phone, ShieldAlert } from "lucide-react";
import { isAddress } from "viem";
import { useAccount } from "wagmi";
import Icon from "~~/components/dashboard/Icon";
import RoleCard from "~~/components/dashboard/admin/RoleCard";
import RoleCheck from "~~/components/dashboard/admin/RoleCheck";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

const LoadingSpinner = ({
  size = 8,
  text = "Loading roles management Dashboard...",
}: {
  size?: number;
  text?: string;
}) => (
  <div className="flex flex-col items-center justify-center gap-2">
    <Loader2 className={`w-${size} h-${size} animate-spin`} />
    {text && <p className="text-sm text-muted-foreground">{text}</p>}
  </div>
);

const FullPageLoader = ({ text = "Verifying admin access permissions..." }: { text?: string }) => (
  <div className="flex items-center justify-center min-h-screen">
    <LoadingSpinner size={12} text={text} />
  </div>
);

const AccessDeniedCard = ({
  address,
  isLoadingRefresh,
  onRefresh,
}: {
  address: string;
  isLoadingRefresh: boolean;
  onRefresh: () => void;
}) => {
  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    notification.success("Wallet address copied!");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full mx-auto">
          <ShieldAlert className="w-8 h-8 text-red-600 dark:text-red-300" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Privileges Required</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Your wallet doesn&apos;t have admin access permissions to manage roles.
        </p>

        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Connected Wallet:</span>
            <button
              onClick={copyAddress}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              title="Copy address"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>
          <p className="font-mono text-sm break-all text-left">{address}</p>
        </div>

        <div className="pt-4 space-y-3">
          <h3 className="font-medium text-gray-900 dark:text-white">How to get admin access:</h3>
          <ol className="space-y-2 text-sm text-gray-600 dark:text-gray-300 text-left">
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium">
                1
              </span>
              Contact system owner
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium">
                2
              </span>
              Request admin role assignment
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium">
                3
              </span>
              Refresh this page after approval
            </li>
          </ol>
        </div>

        <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="font-medium text-gray-900 dark:text-white mb-4">Contact Owners</h3>
          <div className="space-y-3">
            {[
              {
                name: "Admin Email",
                value: "admin@stone.proof",
                icon: <Mail className="w-5 h-5" />,
                action: "mailto:admin@stone.proof?subject=Admin%20Role%20Request",
              },
              {
                name: "Support Phone",
                value: "+1 (555) 123-4567",
                icon: <Phone className="w-5 h-5" />,
                action: "tel:+15551234567",
              },
              {
                name: "Telegram Support",
                value: "@StoneProofSupport",
                icon: <MessageSquare className="w-5 h-5" />,
                action: "https://t.me/StoneProofSupport",
              },
            ].map((contact, index) => (
              <a
                key={index}
                href={contact.action}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-600 dark:text-blue-300">
                  {contact.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{contact.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{contact.value}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </a>
            ))}
          </div>
        </div>

        <div className="pt-4">
          <button
            onClick={onRefresh}
            disabled={isLoadingRefresh}
            className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isLoadingRefresh ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                Check Access Again
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const ConnectWalletView = ({ isLoading }: { isLoading: boolean }) => (
  <div className="flex items-center justify-center min-h-screen p-4">
    <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center border border-gray-200 dark:border-gray-700">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-4 mx-auto">
        {isLoading ? (
          <Loader2 className="w-8 h-8 text-blue-600 dark:text-blue-300 animate-spin" />
        ) : (
          <ShieldAlert className="w-8 h-8 text-blue-600 dark:text-blue-300" />
        )}
      </div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        {isLoading ? "Connecting..." : "Connect Your Wallet"}
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        {isLoading ? "Verifying wallet..." : "Please connect a wallet with admin privileges"}
      </p>
      <div className="flex justify-center">
        <ConnectButton />
      </div>
    </div>
  </div>
);

// Define role types
const ROLE_TYPES = {
  MINER: "Miner",
  REFINER: "Refiner",
  TRANSPORTER: "Transporter",
  AUDITOR: "Auditor",
  INSPECTOR: "Inspector",
  BUYER: "Buyer",
} as const;

type RoleType = keyof typeof ROLE_TYPES;

const ROLE_TO_FUNCTION_MAP = {
  MINER: { assign: "assignMiner", revoke: "revokeMiner" },
  REFINER: { assign: "assignRefiner", revoke: "revokeRefiner" },
  TRANSPORTER: { assign: "assignTransporter", revoke: "revokeTransporter" },
  AUDITOR: { assign: "assignAuditor", revoke: "revokeAuditor" },
  INSPECTOR: { assign: "assignInspector", revoke: "revokeInspector" },
  BUYER: { assign: "assignBuyer", revoke: "revokeBuyer" },
} as const;

const Page = () => {
  const { address, isConnected, isConnecting } = useAccount();
  const [userAddress, setUserAddress] = useState("");
  const [checkAddress, setCheckAddress] = useState("");
  const [revokeReason, setRevokeReason] = useState("");
  const [activeRole, setActiveRole] = useState<RoleType | null>(null);
  const [isRefreshingAccess, setIsRefreshingAccess] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isAssignLoading, setIsAssignLoading] = useState(false);
  const [isRevokeLoading, setIsRevokeLoading] = useState(false);

  // Check if connected wallet is admin
  const {
    data: isAdmin,
    isLoading: isLoadingRoleCheck,
    refetch: refetchRoleCheck,
  } = useScaffoldReadContract({
    contractName: "RolesManager",
    functionName: "hasAdminRole",
    args: [/*"DEFAULT_ADMIN_ROLE", */ address],
    enabled: isConnected && !!address,
  });

  // Get roles for checked address
  const { data: userRoles = [], refetch: refetchRoles } = useScaffoldReadContract({
    contractName: "RolesManager",
    functionName: "getRolesForAddress",
    args: [checkAddress],
    enabled: isAddress(checkAddress),
  });

  // Role statistics
  const [roleStats, setRoleStats] = useState({
    MINER: 0,
    REFINER: 0,
    TRANSPORTER: 0,
    AUDITOR: 0,
    INSPECTOR: 0,
    BUYER: 0,
  });

  // Contract write hook
  const { writeContractAsync } = useScaffoldWriteContract("RolesManager");

  // Fetch role counts
  const fetchRoleCounts = async () => {
    try {
      const counts = await Promise.all([
        writeContractAsync({
          functionName: "getRoleMemberCount",
          args: ["MINER_ROLE"],
        }),
        writeContractAsync({
          functionName: "getRoleMemberCount",
          args: ["REFINER_ROLE"],
        }),
        writeContractAsync({
          functionName: "getRoleMemberCount",
          args: ["TRANSPORTER_ROLE"],
        }),
        writeContractAsync({
          functionName: "getRoleMemberCount",
          args: ["AUDITOR_ROLE"],
        }),
        writeContractAsync({
          functionName: "getRoleMemberCount",
          args: ["INSPECTOR_ROLE"],
        }),
        writeContractAsync({
          functionName: "getRoleMemberCount",
          args: ["BUYER_ROLE"],
        }),
      ]);

      setRoleStats({
        MINER: Number(counts[0]),
        REFINER: Number(counts[1]),
        TRANSPORTER: Number(counts[2]),
        AUDITOR: Number(counts[3]),
        INSPECTOR: Number(counts[4]),
        BUYER: Number(counts[5]),
      });
    } catch (error) {
      console.error("Error fetching role counts:", error);
    }
  };

  const handleRefreshAccess = async () => {
    setIsRefreshingAccess(true);
    try {
      await refetchRoleCheck();
      await fetchRoleCounts();
    } catch (e) {
      console.error("Error refreshing access:", e);
      notification.error("Error checking access");
    } finally {
      setIsRefreshingAccess(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      const timer = setTimeout(() => {
        setIsDataLoading(false);
        fetchRoleCounts();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isAdmin]);

  const handleAssign = async (role: RoleType) => {
    const trimmedAddress = userAddress.trim();
    if (!isAddress(trimmedAddress)) {
      notification.error("Please enter a valid Ethereum address");
      return;
    }

    try {
      setIsAssignLoading(true);
      setActiveRole(role);

      await writeContractAsync({
        functionName: ROLE_TO_FUNCTION_MAP[role].assign,
        args: [trimmedAddress],
      });

      notification.success(`${ROLE_TYPES[role]} role assigned successfully`);
      setUserAddress("");
      await fetchRoleCounts();
    } catch (error: any) {
      console.error("Assignment error:", error);
      notification.error(`Failed to assign ${ROLE_TYPES[role]} role: ${error.message}`);
    } finally {
      setIsAssignLoading(false);
      setActiveRole(null);
    }
  };

  const handleRevoke = async (role: RoleType) => {
    const trimmedAddress = userAddress.trim();
    const trimmedReason = revokeReason.trim();

    if (!isAddress(trimmedAddress)) {
      notification.error("Please enter a valid Ethereum address");
      return;
    }

    if (!trimmedReason) {
      notification.error("Please provide a revocation reason");
      return;
    }

    try {
      setIsRevokeLoading(true);
      setActiveRole(role);

      await writeContractAsync({
        functionName: ROLE_TO_FUNCTION_MAP[role].revoke,
        args: [trimmedAddress, trimmedReason],
      });

      notification.success(`${ROLE_TYPES[role]} role revoked successfully`);
      setUserAddress("");
      setRevokeReason("");
      await fetchRoleCounts();
    } catch (error: any) {
      console.error("Revocation error:", error);
      notification.error(`Failed to revoke ${ROLE_TYPES[role]} role: ${error.message}`);
    } finally {
      setIsRevokeLoading(false);
      setActiveRole(null);
    }
  };

  const handleCheckRole = async () => {
    if (!isAddress(checkAddress)) {
      notification.error("Please enter a valid Ethereum address");
      return;
    }
    await refetchRoles();
  };

  // Loading state while checking roles
  if (isConnected && isLoadingRoleCheck) {
    return <FullPageLoader text="Checking admin permissions..." />;
  }

  // Not connected state
  if (!isConnected) {
    return <ConnectWalletView isLoading={isConnecting} />;
  }

  // No admin role state
  if (isConnected && !isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <AccessDeniedCard
          address={address || ""}
          isLoadingRefresh={isRefreshingAccess}
          onRefresh={handleRefreshAccess}
        />
      </div>
    );
  }

  return (
    <div className="px-4 pt-2 md:px-10 flex flex-col gap-6 md:gap-10">
      {isDataLoading ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          <LoadingSpinner size={12} text="Loading roles dashboard..." />
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0">
            <div className="flex flex-col">
              <p className="text-[24px] md:text-[28px] font-bold m-0 leading-tight">Manage Users in The System</p>
              <p className="text-[14px] md:text-[16px] text-[#979AA0] m-0 leading-tight">All the users at fingertips</p>
            </div>

            <div className="flex flex-wrap gap-2 md:gap-3">
              <button className="bg-[#252525] border border-[#323539] flex items-center justify-center gap-2 font-semibold px-4 py-1.5 pb-2.5 rounded-[8px]">
                <Icon path="/dashboard/icon_set/menu.svg" alt="menu icon" />
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-[20px] md:text-[24px] font-bold mb-4">Mineral Supply Chain Roles</h2>
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
              <RoleCard
                role={ROLE_TYPES.MINER}
                iconPath="/miners.svg"
                activeCount={roleStats.MINER}
                subtitle="Mining Operations"
                userId={userAddress}
                onAssign={() => handleAssign("MINER")}
                onRevoke={() => handleRevoke("MINER")}
                disabled={!isConnected || !isAdmin}
                isAssignLoading={isAssignLoading && activeRole === "MINER"}
                isRevokeLoading={isRevokeLoading && activeRole === "MINER"}
                onUserIdChange={setUserAddress}
                onReasonChange={setRevokeReason}
              />

              <RoleCard
                role={ROLE_TYPES.REFINER}
                iconPath="/refiner.svg"
                activeCount={roleStats.REFINER}
                subtitle="Refining Operations"
                userId={userAddress}
                onAssign={() => handleAssign("REFINER")}
                onRevoke={() => handleRevoke("REFINER")}
                disabled={!isConnected || !isAdmin}
                isAssignLoading={isAssignLoading && activeRole === "REFINER"}
                isRevokeLoading={isRevokeLoading && activeRole === "REFINER"}
                onUserIdChange={setUserAddress}
                onReasonChange={setRevokeReason}
              />

              <RoleCard
                role={ROLE_TYPES.TRANSPORTER}
                iconPath="/transporter.svg"
                activeCount={roleStats.TRANSPORTER}
                subtitle="Transportation"
                userId={userAddress}
                onAssign={() => handleAssign("TRANSPORTER")}
                onRevoke={() => handleRevoke("TRANSPORTER")}
                disabled={!isConnected || !isAdmin}
                isAssignLoading={isAssignLoading && activeRole === "TRANSPORTER"}
                isRevokeLoading={isRevokeLoading && activeRole === "TRANSPORTER"}
                onUserIdChange={setUserAddress}
                onReasonChange={setRevokeReason}
              />

              <RoleCheck
                userId={checkAddress}
                onCheckRole={handleCheckRole}
                foundRole={userRoles.join(", ") || "No roles found"}
                hasRole={userRoles.length > 0}
                onUserIdChange={setCheckAddress}
              />
            </div>
          </div>

          <div>
            <h2 className="text-[20px] md:text-[24px] font-bold mb-4">Supply Chain Validators</h2>
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
              <RoleCard
                role={ROLE_TYPES.AUDITOR}
                iconPath="/auditor.svg"
                activeCount={roleStats.AUDITOR}
                subtitle="Chain Compliance"
                userId={userAddress}
                onAssign={() => handleAssign("AUDITOR")}
                onRevoke={() => handleRevoke("AUDITOR")}
                disabled={!isConnected || !isAdmin}
                isAssignLoading={isAssignLoading && activeRole === "AUDITOR"}
                isRevokeLoading={isRevokeLoading && activeRole === "AUDITOR"}
                onUserIdChange={setUserAddress}
                onReasonChange={setRevokeReason}
              />

              <RoleCard
                role={ROLE_TYPES.INSPECTOR}
                iconPath="/inspector.svg"
                activeCount={roleStats.INSPECTOR}
                subtitle="Quality Assurance"
                userId={userAddress}
                onAssign={() => handleAssign("INSPECTOR")}
                onRevoke={() => handleRevoke("INSPECTOR")}
                disabled={!isConnected || !isAdmin}
                isAssignLoading={isAssignLoading && activeRole === "INSPECTOR"}
                isRevokeLoading={isRevokeLoading && activeRole === "INSPECTOR"}
                onUserIdChange={setUserAddress}
                onReasonChange={setRevokeReason}
              />

              <RoleCard
                role={ROLE_TYPES.BUYER}
                iconPath="/buyer.svg"
                activeCount={roleStats.BUYER}
                subtitle="Purchasing"
                userId={userAddress}
                onAssign={() => handleAssign("BUYER")}
                onRevoke={() => handleRevoke("BUYER")}
                disabled={!isConnected || !isAdmin}
                isAssignLoading={isAssignLoading && activeRole === "BUYER"}
                isRevokeLoading={isRevokeLoading && activeRole === "BUYER"}
                onUserIdChange={setUserAddress}
                onReasonChange={setRevokeReason}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;

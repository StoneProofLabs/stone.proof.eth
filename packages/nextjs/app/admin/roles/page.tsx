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
    <div className="max-w-md p-6 border rounded-lg shadow-lg bg-background">
      <div className="flex flex-col items-center gap-4 text-center">
        <ShieldAlert className="w-12 h-12 text-red-500" />
        <h3 className="text-2xl font-bold">Access Denied</h3>
        <p className="text-muted-foreground">
          The connected wallet doesn't have admin privileges for this dashboard.
        </p>
        <div className="flex items-center gap-2 p-2 px-4 mt-2 border rounded-lg">
          <span className="font-mono text-sm">{address}</span>
          <button onClick={copyAddress} className="p-1 rounded-md hover:bg-accent">
            <Copy className="w-4 h-4" />
          </button>
        </div>
        <button
          onClick={onRefresh}
          disabled={isLoadingRefresh}
          className="flex items-center gap-2 px-4 py-2 mt-4 text-sm font-medium transition-colors rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {isLoadingRefresh && <Loader2 className="w-4 h-4 animate-spin" />}
          Refresh Access
        </button>
      </div>
    </div>
  );
};

const ConnectWalletView = ({ isLoading }: { isLoading: boolean }) => (
  <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-4">
    <div className="max-w-md p-8 text-center border rounded-lg shadow-lg bg-background">
      <h2 className="mb-4 text-2xl font-bold">Connect Your Wallet</h2>
      <p className="mb-6 text-muted-foreground">
        Please connect your admin wallet to access the roles management dashboard
      </p>
      <ConnectButton />
    </div>
    {isLoading && <LoadingSpinner size={8} text="Connecting wallet..." />}
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
  const [roleAddresses, setRoleAddresses] = useState({
    MINER: "",
    REFINER: "",
    TRANSPORTER: "",
    AUDITOR: "",
    INSPECTOR: "",
    BUYER: "",
  });
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
    args: [address],
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

  const handleRoleAddressChange = (role: RoleType, address: string) => {
    setRoleAddresses(prev => ({
      ...prev,
      [role]: address,
    }));
  };

  const handleAssign = async (role: RoleType) => {
    const trimmedAddress = roleAddresses[role].trim();
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
      setRoleAddresses(prev => ({ ...prev, [role]: "" }));
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
    const trimmedAddress = roleAddresses[role].trim();
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
      setRoleAddresses(prev => ({ ...prev, [role]: "" }));
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
                userId={roleAddresses.MINER}
                onAssign={() => handleAssign("MINER")}
                onRevoke={() => handleRevoke("MINER")}
                disabled={!isConnected || !isAdmin}
                isAssignLoading={isAssignLoading && activeRole === "MINER"}
                isRevokeLoading={isRevokeLoading && activeRole === "MINER"}
                onUserIdChange={(address) => handleRoleAddressChange("MINER", address)}
                onReasonChange={setRevokeReason}
              />

              <RoleCard
                role={ROLE_TYPES.REFINER}
                iconPath="/refiner.svg"
                activeCount={roleStats.REFINER}
                subtitle="Refining Operations"
                userId={roleAddresses.REFINER}
                onAssign={() => handleAssign("REFINER")}
                onRevoke={() => handleRevoke("REFINER")}
                disabled={!isConnected || !isAdmin}
                isAssignLoading={isAssignLoading && activeRole === "REFINER"}
                isRevokeLoading={isRevokeLoading && activeRole === "REFINER"}
                onUserIdChange={(address) => handleRoleAddressChange("REFINER", address)}
                onReasonChange={setRevokeReason}
              />

              <RoleCard
                role={ROLE_TYPES.TRANSPORTER}
                iconPath="/transporter.svg"
                activeCount={roleStats.TRANSPORTER}
                subtitle="Transportation"
                userId={roleAddresses.TRANSPORTER}
                onAssign={() => handleAssign("TRANSPORTER")}
                onRevoke={() => handleRevoke("TRANSPORTER")}
                disabled={!isConnected || !isAdmin}
                isAssignLoading={isAssignLoading && activeRole === "TRANSPORTER"}
                isRevokeLoading={isRevokeLoading && activeRole === "TRANSPORTER"}
                onUserIdChange={(address) => handleRoleAddressChange("TRANSPORTER", address)}
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
                userId={roleAddresses.AUDITOR}
                onAssign={() => handleAssign("AUDITOR")}
                onRevoke={() => handleRevoke("AUDITOR")}
                disabled={!isConnected || !isAdmin}
                isAssignLoading={isAssignLoading && activeRole === "AUDITOR"}
                isRevokeLoading={isRevokeLoading && activeRole === "AUDITOR"}
                onUserIdChange={(address) => handleRoleAddressChange("AUDITOR", address)}
                onReasonChange={setRevokeReason}
              />

              <RoleCard
                role={ROLE_TYPES.INSPECTOR}
                iconPath="/inspector.svg"
                activeCount={roleStats.INSPECTOR}
                subtitle="Quality Assurance"
                userId={roleAddresses.INSPECTOR}
                onAssign={() => handleAssign("INSPECTOR")}
                onRevoke={() => handleRevoke("INSPECTOR")}
                disabled={!isConnected || !isAdmin}
                isAssignLoading={isAssignLoading && activeRole === "INSPECTOR"}
                isRevokeLoading={isRevokeLoading && activeRole === "INSPECTOR"}
                onUserIdChange={(address) => handleRoleAddressChange("INSPECTOR", address)}
                onReasonChange={setRevokeReason}
              />

              <RoleCard
                role={ROLE_TYPES.BUYER}
                iconPath="/buyer.svg"
                activeCount={roleStats.BUYER}
                subtitle="Purchasing"
                userId={roleAddresses.BUYER}
                onAssign={() => handleAssign("BUYER")}
                onRevoke={() => handleRevoke("BUYER")}
                disabled={!isConnected || !isAdmin}
                isAssignLoading={isAssignLoading && activeRole === "BUYER"}
                isRevokeLoading={isRevokeLoading && activeRole === "BUYER"}
                onUserIdChange={(address) => handleRoleAddressChange("BUYER", address)}
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
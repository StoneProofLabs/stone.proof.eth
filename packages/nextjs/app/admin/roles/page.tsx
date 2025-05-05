// "use client";

// import React from "react";
// import Link from "next/link";
// import Icon from "~~/components/dashboard/Icon";
// import RoleCard from "~~/components/dashboard/admin/RoleCard";
// import RoleCheck from "~~/components/dashboard/admin/RoleCheck";

// const page = () => {
//   return (
//     <div className="px-4 md:px-10 flex flex-col gap-6 md:gap-10">
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0">
//         <div className="flex flex-col">
//           <p className="text-[24px] md:text-[28px] font-bold m-0 leading-tight">Manage Users in The System</p>
//           <p className="text-[14px] md:text-[16px] text-[#979AA0] m-0 leading-tight">All the users at fingertips</p>
//         </div>

//         <div className="flex flex-wrap gap-2 md:gap-3">
//           <Link
//             href={""}
//             className="flex-1 md:flex-none bg-[#202634] gap-2 font-semibold px-4 py-1.5 rounded-[8px] flex items-center justify-center md:justify-start"
//           >
//             <h1 className="translate-y-[4px]">View Revoked Users</h1>
//           </Link>

//           <button className="bg-[#252525] border border-[#323539] flex items-center justify-center gap-2 font-semibold px-4 py-1.5 pb-2.5 rounded-[8px]">
//             <Icon path="/dashboard/icon_set/menu.svg" alt="menu icon" />
//           </button>
//         </div>
//       </div>

//       <div>
//         <h2 className="text-[20px] md:text-[24px] font-bold mb-4">Mineral Supply Chain Roles</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           <RoleCard
//             role="Miners"
//             iconPath="/miners.svg"
//             activeCount={2308}
//             subtitle="Mining Operations"
//             userId="0xffad-ecd3-34fc-2920"
//             onAssign={() => console.log("Assign miner role")}
//             onRevoke={() => console.log("Revoke miner role")}
//           />

//           <RoleCard
//             role="Refiner"
//             iconPath="/refiner.svg"
//             activeCount={2308}
//             subtitle="Refining Operations"
//             userId="0xffad-ecd3-34fc-2920"
//             onAssign={() => console.log("Assign refiner role")}
//             onRevoke={() => console.log("Revoke refiner role")}
//           />

//           <RoleCard
//             role="Warehouse"
//             iconPath="/warehouse.svg"
//             activeCount={308}
//             subtitle="Storage Management"
//             userId="0xffad-ecd3-34fc-2920"
//             onAssign={() => console.log("Assign warehouse role")}
//             onRevoke={() => console.log("Revoke warehouse role")}
//           />

//           <RoleCheck
//             userId="0xffad-ecd3-34fc-2920"
//             onCheckRole={() => console.log("Check role")}
//             foundRole=""
//             hasRole={false}
//           />
//         </div>
//       </div>

//       <div>
//         <h2 className="text-[20px] md:text-[24px] font-bold mb-4">Supply Chain Validators</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           <RoleCard
//             role="Auditor"
//             iconPath="/dashboard/icon_set/auditors.svg"
//             activeCount={2308}
//             subtitle="Chain Compliance"
//             userId="0xffad-ecd3-34fc-2920"
//             onAssign={() => console.log("Assign auditor role")}
//             onRevoke={() => console.log("Revoke auditor role")}
//           />

//           <RoleCard
//             role="Inspector"
//             iconPath="/dashboard/icon_set/inspectors.svg"
//             activeCount={2308}
//             subtitle="Quality Assurance"
//             userId="0xffad-ecd3-34fc-2920"
//             onAssign={() => console.log("Assign inspector role")}
//             onRevoke={() => console.log("Revoke inspector role")}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default page;

// app/admin/roles/page.tsx
// app/admin/roles/page.tsx



// // app/admin/roles/page.tsx
// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import { useAccount } from "wagmi";
// import { isAddress } from "viem";
// import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
// import { notification } from "~~/utils/scaffold-eth";
// import Icon from "~~/components/dashboard/Icon";
// import RoleCard from "~~/components/dashboard/admin/RoleCard";
// import RoleCheck from "~~/components/dashboard/admin/RoleCheck";

// const ROLE_TYPES = {
//   MINER: "MINER",
//   REFINER: "REFINER",
//   TRANSPORTER: "TRANSPORTER",
//   AUDITOR: "AUDITOR",
//   INSPECTOR: "INSPECTOR",
//   BUYER: "BUYER",
// } as const;

// type RoleType = keyof typeof ROLE_TYPES;

// const Page = () => {
//   const { address: connectedAddress, isConnected } = useAccount();
//   const [userAddress, setUserAddress] = useState("");
//   const [revokeReason, setRevokeReason] = useState("");
//   const [checkRoleAddress, setCheckRoleAddress] = useState("");
//   const [activeRole, setActiveRole] = useState<RoleType | null>(null);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const addressInputRef = useRef<HTMLInputElement>(null);
//   const checkAddressInputRef = useRef<HTMLInputElement>(null);

//   // Role statistics
//   const roleStats = {
//     MINER: 2308,
//     REFINER: 1452,
//     TRANSPORTER: 308,
//     AUDITOR: 89,
//     INSPECTOR: 127,
//     BUYER: 452,
//   };

//   // Admin check
//   const { data: isAdmin } = useScaffoldReadContract({
//     contractName: "RolesManager",
//     functionName: "hasAdminRole",
//     args: [connectedAddress],
//   });

//   // Get roles for address
//   const { data: checkedRoles = [], refetch: refetchCheckedRoles } = useScaffoldReadContract({
//     contractName: "RolesManager",
//     functionName: "getRolesForAddress",
//     args: [checkRoleAddress.trim()],
//     enabled: isAddress(checkRoleAddress.trim()),
//   });

//   // Transaction handling
//   const { writeAsync } = useScaffoldWriteContract({
//     contractName: "RolesManager",
//     onBlockConfirmation: (txnReceipt) => {
//       notification.success(`Transaction successful: ${txnReceipt.transactionHash}`);
//     },
//   });

//   const handleTransaction = async (action: "assign" | "revoke", role: RoleType) => {
//     try {
//       if (!isConnected) {
//         notification.error("Please connect your wallet first");
//         return;
//       }

//       const address = userAddress.trim();
//       if (!isAddress(address)) {
//         notification.error("Invalid Ethereum address");
//         return;
//       }

//       if (action === "revoke" && !revokeReason) {
//         notification.error("Please provide a revocation reason");
//         return;
//       }

//       if (!isAdmin) {
//         notification.error("Only admin can manage roles");
//         return;
//       }

//       setIsProcessing(true);
//       setActiveRole(role);

//       const functionName = `${action}${role.charAt(0)}${role.slice(1).toLowerCase()}`;
//       const args = action === "assign" ? [address] : [address, revokeReason];

//       await writeAsync({ functionName, args });

//       notification.success(`${role} role ${action}ed successfully`);
//       setRevokeReason("");
//       await refetchCheckedRoles();

//     } catch (error) {
//       console.error("Transaction error:", error);
//       notification.error(`Failed to ${action} role: ${error instanceof Error ? error.message : "Unknown error"}`);
//     } finally {
//       setIsProcessing(false);
//       setActiveRole(null);
//     }
//   };

//   // Handle paste for both address inputs
//   const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
//     e.preventDefault();
//     const pastedText = e.clipboardData.getData('text/plain').trim();
//     setter(pastedText);
//   };

//   return (
//     <div className="px-4 md:px-10 flex flex-col gap-6 md:gap-10">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0">
//         <div className="flex flex-col">
//           <p className="text-[24px] md:text-[28px] font-bold m-0 leading-tight">Manage Users in The System</p>
//           <p className="text-[14px] md:text-[16px] text-[#979AA0] m-0 leading-tight">All the users at fingertips</p>
//         </div>
//         <div className="flex flex-wrap gap-2 md:gap-3">
//           <button className="bg-[#252525] border border-[#323539] flex items-center justify-center gap-2 font-semibold px-4 py-1.5 rounded-[8px]">
//             <Icon path="/dashboard/icon_set/menu.svg" alt="menu icon" />
//           </button>
//         </div>
//       </div>

//       {/* User Address Input */}
//       <div className="bg-[#202634] p-4 rounded-lg">
//         <h3 className="text-lg font-semibold mb-2">User Address</h3>
//         <input
//           ref={addressInputRef}
//           type="text"
//           value={userAddress}
//           onChange={(e) => setUserAddress(e.target.value)}
//           onPaste={(e) => handlePaste(e, setUserAddress)}
//           onBlur={(e) => setUserAddress(e.target.value.trim())}
//           placeholder="0x..."
//           className="w-full bg-[#2d3748] p-2 rounded-md text-white"
//           disabled={!isAdmin || isProcessing}
//         />
        
//         {activeRole && (
//           <div className="mt-4">
//             <h4 className="font-medium mb-2">Revocation Reason</h4>
//             <input
//               type="text"
//               value={revokeReason}
//               onChange={(e) => setRevokeReason(e.target.value)}
//               placeholder="Enter reason for revocation..."
//               className="w-full bg-[#2d3748] p-2 rounded-md text-white"
//               disabled={isProcessing}
//             />
//           </div>
//         )}
//       </div>

//       {/* Role Check */}
//       <div className="bg-[#202634] p-4 rounded-lg">
//         <h3 className="text-lg font-semibold mb-2">Check User Roles</h3>
//         <div className="flex gap-2">
//           <input
//             ref={checkAddressInputRef}
//             type="text"
//             value={checkRoleAddress}
//             onChange={(e) => setCheckRoleAddress(e.target.value)}
//             onPaste={(e) => handlePaste(e, setCheckRoleAddress)}
//             placeholder="0x..."
//             className="flex-1 bg-[#2d3748] p-2 rounded-md text-white"
//           />
//           <button
//             onClick={() => refetchCheckedRoles()}
//             className="bg-[#323539] hover:bg-[#3a3e43] px-4 py-2 rounded-md transition-colors"
//             disabled={isProcessing}
//           >
//             Check
//           </button>
//         </div>
//         {checkedRoles.length > 0 && (
//           <div className="mt-3">
//             <h4 className="font-medium">Roles Found:</h4>
//             <div className="flex flex-wrap gap-2 mt-2">
//               {checkedRoles.map((role, index) => (
//                 <span key={index} className="bg-[#3a4556] px-3 py-1 rounded-full text-sm">
//                   {role}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Role Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {(Object.keys(ROLE_TYPES) as RoleType[]).map((role) => (
//           <RoleCard
//             key={role}
//             role={role}
//             iconPath={`/${role.toLowerCase()}.svg`}
//             activeCount={roleStats[role]}
//             subtitle={`${role} Operations`}
//             onAssign={() => handleTransaction("assign", role)}
//             onRevoke={() => handleTransaction("revoke", role)}
//             disabled={!isAdmin || isProcessing}
//             isLoading={activeRole === role && isProcessing}
//           />
//         ))}
//       </div>

//       {/* Status Notifications */}
//       {!isConnected && (
//         <div className="bg-blue-900/20 border border-blue-700 p-4 rounded-lg">
//           <p className="text-blue-400">Please connect your wallet to interact</p>
//         </div>
//       )}

//       {isConnected && !isAdmin && (
//         <div className="bg-yellow-900/20 border border-yellow-700 p-4 rounded-lg">
//           <p className="text-yellow-400">Connected wallet is not an admin</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Page;








"use client";

import { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ChevronRight, Copy, Loader2, Mail, MessageSquare, Phone, ShieldAlert } from "lucide-react";
import { useAccount } from "wagmi";
import { isAddress } from "viem";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";
import Icon from "~~/components/dashboard/Icon";
import RoleCard from "~~/components/dashboard/admin/RoleCard";
import RoleCheck from "~~/components/dashboard/admin/RoleCheck";

// Define role types
const ROLE_TYPES = {
  MINER: "Miner",
  REFINER: "Refiner",
  WAREHOUSE: "Warehouse",
  AUDITOR: "Auditor",
  INSPECTOR: "Inspector",
} as const;

type RoleType = keyof typeof ROLE_TYPES;

const LoadingSpinner = ({ size = 8, text = "Loading roles management Dashboard..." }: { size?: number; text?: string }) => (
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
          Your wallet doesn't have admin access permissions to manage roles.
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

const Page = () => {
  const { address, isConnected, isConnecting } = useAccount();
  const [userAddress, setUserAddress] = useState("");
  const [checkAddress, setCheckAddress] = useState("");
  const [revokeReason, setRevokeReason] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeRole, setActiveRole] = useState<RoleType | null>(null);
  const [isRefreshingAccess, setIsRefreshingAccess] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);

  // Check if connected wallet is admin
  const {
    data: isAdmin,
    isLoading: isLoadingRoleCheck,
    refetch: refetchRoleCheck,
  } = useScaffoldReadContract({
    contractName: "RolesManager",
    functionName: "hasAdminRole",
    args: [address],
    enabled: isConnected,
  });

  // Get roles for checked address
  const { data: userRoles = [], refetch: refetchRoles } = useScaffoldReadContract({
    contractName: "RolesManager",
    functionName: "getRolesForAddress",
    args: [checkAddress],
    enabled: isAddress(checkAddress),
  });

  // Write contract functions
  const { writeAsync: assignRole } = useScaffoldWriteContract({
    contractName: "RolesManager",
    functionName: "assignRole",
    onBlockConfirmation: (txnReceipt) => {
      notification.success(`Role assigned: ${txnReceipt.transactionHash}`);
      refetchRoles();
    },
  });

  const { writeAsync: revokeRole } = useScaffoldWriteContract({
    contractName: "RolesManager",
    functionName: "revokeRole",
    onBlockConfirmation: (txnReceipt) => {
      notification.success(`Role revoked: ${txnReceipt.transactionHash}`);
      refetchRoles();
    },
  });

  // Role statistics (you might want to fetch these from the contract)
  const roleStats = {
    MINER: 2308,
    REFINER: 1452,
    WAREHOUSE: 308,
    AUDITOR: 89,
    INSPECTOR: 127,
  };

  const handleRefreshAccess = async () => {
    setIsRefreshingAccess(true);
    try {
      const { data } = await refetchRoleCheck();
      if (!data) {
        notification.error("Still no admin access. Contact system owner.");
      }
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
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isAdmin]);

  const handleAssignRole = async (role: RoleType) => {
    if (!isConnected || !isAdmin) {
      notification.error(isConnected ? "Only admin can assign roles" : "Please connect your wallet");
      return;
    }

    if (!isAddress(userAddress)) {
      notification.error("Please enter a valid Ethereum address");
      return;
    }

    try {
      setIsProcessing(true);
      setActiveRole(role);
      
      await assignRole({
        args: [userAddress, ROLE_TYPES[role]],
      });
      
      setUserAddress("");
    } catch (error) {
      console.error("Error assigning role:", error);
      notification.error("Failed to assign role");
    } finally {
      setIsProcessing(false);
      setActiveRole(null);
    }
  };

  const handleRevokeRole = async (role: RoleType) => {
    if (!isConnected || !isAdmin) {
      notification.error(isConnected ? "Only admin can revoke roles" : "Please connect your wallet");
      return;
    }

    if (!isAddress(userAddress)) {
      notification.error("Please enter a valid Ethereum address");
      return;
    }

    if (!revokeReason) {
      notification.error("Please provide a revocation reason");
      return;
    }

    try {
      setIsProcessing(true);
      setActiveRole(role);
      
      await revokeRole({
        args: [userAddress, ROLE_TYPES[role], revokeReason],
      });
      
      setUserAddress("");
      setRevokeReason("");
    } catch (error) {
      console.error("Error revoking role:", error);
      notification.error("Failed to revoke role");
    } finally {
      setIsProcessing(false);
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
                role="MINER"
                iconPath="/miners.svg"
                activeCount={roleStats.MINER}
                subtitle="Mining Operations"
                userId={userAddress}
                onAssign={() => handleAssignRole("MINER")}
                onRevoke={() => handleRevokeRole("MINER")}
                disabled={!isConnected || !isAdmin}
                isLoading={isProcessing && activeRole === "MINER"}
              />

              <RoleCard
                role="REFINER"
                iconPath="/refiner.svg"
                activeCount={roleStats.REFINER}
                subtitle="Refining Operations"
                userId={userAddress}
                onAssign={() => handleAssignRole("REFINER")}
                onRevoke={() => handleRevokeRole("REFINER")}
                disabled={!isConnected || !isAdmin}
                isLoading={isProcessing && activeRole === "REFINER"}
              />

              <RoleCard
                role="WAREHOUSE"
                iconPath="/warehouse.svg"
                activeCount={roleStats.WAREHOUSE}
                subtitle="Storage Management"
                userId={userAddress}
                onAssign={() => handleAssignRole("WAREHOUSE")}
                onRevoke={() => handleRevokeRole("WAREHOUSE")}
                disabled={!isConnected || !isAdmin}
                isLoading={isProcessing && activeRole === "WAREHOUSE"}
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
                role="AUDITOR"
                iconPath="/auditor.svg"
                activeCount={roleStats.AUDITOR}
                subtitle="Chain Compliance"
                userId={userAddress}
                onAssign={() => handleAssignRole("AUDITOR")}
                onRevoke={() => handleRevokeRole("AUDITOR")}
                disabled={!isConnected || !isAdmin}
                isLoading={isProcessing && activeRole === "AUDITOR"}
              />

              <RoleCard
                role="INSPECTOR"
                iconPath="/inspector.svg"
                activeCount={roleStats.INSPECTOR}
                subtitle="Quality Assurance"
                userId={userAddress}
                onAssign={() => handleAssignRole("INSPECTOR")}
                onRevoke={() => handleRevokeRole("INSPECTOR")}
                disabled={!isConnected || !isAdmin}
                isLoading={isProcessing && activeRole === "INSPECTOR"}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
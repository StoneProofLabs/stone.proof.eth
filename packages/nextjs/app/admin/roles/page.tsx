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



"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAccount } from "wagmi";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { notification } from "~~/utils/scaffold-eth";
import Icon from "~~/components/dashboard/Icon";
import RoleCard from "~~/components/dashboard/admin/RoleCard";
import RoleCheck from "~~/components/dashboard/admin/RoleCheck";

const ROLES_MANAGER_ADDRESS = "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318";

// Role constants matching your contract
const ROLE_TYPES = {
  MINER: "MINER",
  REFINER: "REFINER",
  TRANSPORTER: "TRANSPORTER",
  AUDITOR: "AUDITOR",
  INSPECTOR: "INSPECTOR",
  BUYER: "BUYER",
} as const;

type RoleType = keyof typeof ROLE_TYPES;

const Page = () => {
  const { address: connectedAddress } = useAccount();
  const { targetNetwork } = useTargetNetwork();
  const [userAddress, setUserAddress] = useState("");

  // Check if connected wallet is admin
  const { data: isAdmin } = useScaffoldReadContract({
    contractName: "RolesManager",
    functionName: "hasAdminRole",
    args: [connectedAddress],
    watch: true,
  });

  // Get roles for the input address
  const {
    data: userRoles = [],
    isLoading: isLoadingRoles,
    refetch: refetchRoles,
  } = useScaffoldReadContract({
    contractName: "RolesManager",
    functionName: "getRolesForAddress",
    args: [userAddress],
    enabled: !!userAddress,
  });

  // Generic role assignment function
  const { writeAsync: assignRole } = useScaffoldWriteContract({
    contractName: "RolesManager",
    functionName: "assignRole",
    onBlockConfirmation: txnReceipt => {
      notification.success(`Role assigned successfully`, { txnReceipt });
      refetchRoles();
    },
  });

  // Generic role revocation function
  const { writeAsync: revokeRole } = useScaffoldWriteContract({
    contractName: "RolesManager",
    functionName: "revokeRole",
    onBlockConfirmation: txnReceipt => {
      notification.success(`Role revoked successfully`, { txnReceipt });
      refetchRoles();
    },
  });

  const handleRoleOperation = async (operation: "assign" | "revoke", role: RoleType) => {
    if (!userAddress) {
      notification.error("Please enter a user address");
      return;
    }

    if (!isAdmin) {
      notification.error("Only admin can manage roles");
      return;
    }

    try {
      const functionName =
        operation === "assign"
          ? `assign${role.charAt(0)}${role.slice(1).toLowerCase()}`
          : `revoke${role.charAt(0)}${role.slice(1).toLowerCase()}`;

      const operationFn = operation === "assign" ? assignRole : revokeRole;
      await operationFn({
        functionName,
        args: [userAddress],
      });
    } catch (error) {
      notification.error(`Failed to ${operation} role: ${error.message}`);
      console.error(`Error ${operation}ing role:`, error);
    }
  };

  // Stats for role cards (mock data - replace with actual contract calls)
  const roleStats = {
    MINER: { active: 2308 },
    REFINER: { active: 1452 },
    TRANSPORTER: { active: 308 },
    AUDITOR: { active: 89 },
    INSPECTOR: { active: 127 },
  };

  return (
    <div className="px-4 md:px-10 flex flex-col gap-6 md:gap-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0">
        <div className="flex flex-col">
          <p className="text-[24px] md:text-[28px] font-bold m-0 leading-tight">Manage Users in The System</p>
          <p className="text-[14px] md:text-[16px] text-[#979AA0] m-0 leading-tight">All the users at fingertips</p>
        </div>

        <div className="flex flex-wrap gap-2 md:gap-3">
          <Link
            href={""}
            className="flex-1 md:flex-none bg-[#202634] gap-2 font-semibold px-4 py-1.5 rounded-[8px] flex items-center justify-center md:justify-start"
          >
            <h1 className="translate-y-[4px]">View Revoked Users</h1>
          </Link>

          <button className="bg-[#252525] border border-[#323539] flex items-center justify-center gap-2 font-semibold px-4 py-1.5 pb-2.5 rounded-[8px]">
            <Icon path="/dashboard/icon_set/menu.svg" alt="menu icon" />
          </button>
        </div>
      </div>

      {/* User Address Input */}
      <div className="bg-[#202634] p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">User Address</h3>
        <input
          type="text"
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
          placeholder="0x..."
          className="w-full bg-[#2d3748] p-2 rounded-md text-white"
          disabled={!isAdmin}
        />
        
        {userAddress && (
          <div className="mt-4">
            <h4 className="font-medium">Current Roles:</h4>
            {isLoadingRoles ? (
              <div className="text-gray-400">Loading roles...</div>
            ) : userRoles.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-2">
                {userRoles.map((role, index) => (
                  <span key={index} className="bg-[#3a4556] px-3 py-1 rounded-full text-sm">
                    {role}
                  </span>
                ))}
              </div>
            ) : (
              <div className="text-gray-400">No roles assigned</div>
            )}
          </div>
        )}
      </div>

      {/* Mineral Supply Chain Roles */}
      <div>
        <h2 className="text-[20px] md:text-[24px] font-bold mb-4">Mineral Supply Chain Roles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <RoleCard
            role="Miners"
            iconPath="/miners.svg"
            activeCount={roleStats.MINER.active}
            subtitle="Mining Operations"
            userId={userAddress}
            onAssign={() => handleRoleOperation("assign", "MINER")}
            onRevoke={() => handleRoleOperation("revoke", "MINER")}
            disabled={!isAdmin}
          />

          <RoleCard
            role="Refiner"
            iconPath="/refiner.svg"
            activeCount={roleStats.REFINER.active}
            subtitle="Refining Operations"
            userId={userAddress}
            onAssign={() => handleRoleOperation("assign", "REFINER")}
            onRevoke={() => handleRoleOperation("revoke", "REFINER")}
            disabled={!isAdmin}
          />

          <RoleCard
            role="Warehouse"
            iconPath="/warehouse.svg"
            activeCount={roleStats.TRANSPORTER.active}
            subtitle="Storage Management"
            userId={userAddress}
            onAssign={() => handleRoleOperation("assign", "TRANSPORTER")}
            onRevoke={() => handleRoleOperation("revoke", "TRANSPORTER")}
            disabled={!isAdmin}
          />
        </div>
      </div>

      {/* Supply Chain Validators */}
      <div>
        <h2 className="text-[20px] md:text-[24px] font-bold mb-4">Supply Chain Validators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <RoleCard
            role="Auditor"
            iconPath="/dashboard/icon_set/auditors.svg"
            activeCount={roleStats.AUDITOR.active}
            subtitle="Chain Compliance"
            userId={userAddress}
            onAssign={() => handleRoleOperation("assign", "AUDITOR")}
            onRevoke={() => handleRoleOperation("revoke", "AUDITOR")}
            disabled={!isAdmin}
          />

          <RoleCard
            role="Inspector"
            iconPath="/dashboard/icon_set/inspectors.svg"
            activeCount={roleStats.INSPECTOR.active}
            subtitle="Quality Assurance"
            userId={userAddress}
            onAssign={() => handleRoleOperation("assign", "INSPECTOR")}
            onRevoke={() => handleRoleOperation("revoke", "INSPECTOR")}
            disabled={!isAdmin}
          />
        </div>
      </div>

      {/* Role Check Component */}
      <RoleCheck
        userId={userAddress}
        onCheckRole={() => refetchRoles()}
        foundRole={userRoles?.join(", ") || ""}
        hasRole={userRoles && userRoles.length > 0}
        isLoading={isLoadingRoles}
      />

      {/* Admin Notice */}
      {!isAdmin && connectedAddress && (
        <div className="bg-yellow-900/20 border border-yellow-700 p-4 rounded-lg">
          <p className="text-yellow-400">Connected wallet is not an admin. Only admin accounts can manage roles.</p>
        </div>
      )}
    </div>
  );
};

export default Page;

"use client";

import React from "react";
import Link from "next/link";
import Icon from "~~/components/dashboard/Icon";
import RoleCard from "~~/components/dashboard/admin/RoleCard";
import RoleCheck from "~~/components/dashboard/admin/RoleCheck";

const page = () => {
  return (
    <div className="px-4 pt-2 md:px-10 flex flex-col gap-6 md:gap-10">
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

      <div>
        <h2 className="text-[20px] md:text-[24px] font-bold mb-4">Mineral Supply Chain Roles</h2>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
          <RoleCard
            role="Miners"
            iconPath="/miners.svg"
            activeCount={2308}
            subtitle="Mining Operations"
            userId="0xffad-ecd3-34fc-2920"
            onAssign={() => console.log("Assign miner role")}
            onRevoke={() => console.log("Revoke miner role")}
          />

          <RoleCard
            role="Refiner"
            iconPath="/refiner.svg"
            activeCount={2308}
            subtitle="Refining Operations"
            userId="0xffad-ecd3-34fc-2920"
            onAssign={() => console.log("Assign refiner role")}
            onRevoke={() => console.log("Revoke refiner role")}
          />

          <RoleCard
            role="Warehouse"
            iconPath="/warehouse.svg"
            activeCount={308}
            subtitle="Storage Management"
            userId="0xffad-ecd3-34fc-2920"
            onAssign={() => console.log("Assign warehouse role")}
            onRevoke={() => console.log("Revoke warehouse role")}
          />

          <RoleCheck
            userId="0xffad-ecd3-34fc-2920"
            onCheckRole={() => console.log("Check role")}
            foundRole=""
            hasRole={false}
          />
        </div>
      </div>

      <div>
        <h2 className="text-[20px] md:text-[24px] font-bold mb-4">Supply Chain Validators</h2>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
          <RoleCard
            role="Auditor"
            iconPath="/auditor.svg"
            activeCount={2308}
            subtitle="Chain Compliance"
            userId="0xffad-ecd3-34fc-2920"
            onAssign={() => console.log("Assign auditor role")}
            onRevoke={() => console.log("Revoke auditor role")}
          />

          <RoleCard
            role="Inspector"
            iconPath="/inspector.svg"
            activeCount={2308}
            subtitle="Quality Assurance"
            userId="0xffad-ecd3-34fc-2920"
            onAssign={() => console.log("Assign inspector role")}
            onRevoke={() => console.log("Revoke inspector role")}
          />
        </div>
      </div>
    </div>
  );
};

export default page;

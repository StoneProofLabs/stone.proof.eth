import Icon from "~~/components/dashboard/Icon";
import MineralSupplyGraph from "~~/components/dashboard/overview/mineralSupply";
import StatsCard from "~~/components/dashboard/overview/statsCard";

// dummy user
interface User {
  name: string;
}

// sample user
const user: User = {
  name: "Brian Ford",
};

// some dummy chart data
const mineralsData = [
  { value: 20 },
  { value: 30 },
  { value: 40 },
  { value: 80 },
  { value: 100 },
  { value: 90 },
  { value: 70 },
  { value: 60 },
  { value: 80 },
  { value: 70 },
];

const transfersData = [
  { value: 30 },
  { value: 40 },
  { value: 60 },
  { value: 90 },
  { value: 100 },
  { value: 90 },
  { value: 80 },
  { value: 60 },
  { value: 70 },
  { value: 60 },
];

const shipmentsData = [
  { value: 40 },
  { value: 50 },
  { value: 70 },
  { value: 90 },
  { value: 100 },
  { value: 80 },
  { value: 60 },
  { value: 70 },
  { value: 80 },
  { value: 70 },
];
// dummy graphdata
const supplyData = [
  { month: "Apr", completed: 18000, inTransit: 0 },
  { month: "May", completed: 14000, inTransit: 0 },
  { month: "Jun", completed: 22000, inTransit: 0 },
  { month: "Jul", completed: 25000, inTransit: 0 },
  { month: "Aug", completed: 11000, inTransit: 0 },
  { month: "Sep", completed: 30000, inTransit: 0 },
  { month: "Oct", completed: 25000, inTransit: 0 },
  { month: "Nov", completed: 17000, inTransit: 0 },
  { month: "Dec", completed: 22000, inTransit: 0 },
  { month: "Jan", completed: 20000, inTransit: 0 },
  { month: "Feb", completed: 15000, inTransit: 0 },
  { month: "Mar", completed: 30000, inTransit: 0 },
];

export default function Page() {
  return (
    <div className="px-10 flex flex-col gap-10">
      {/* the welcome message */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-[28px] font-bold m-0 leading-tight">Hey there, {user.name}!</p>
          <p className="text-[16px] text-[#979AA0] m-0 leading-tight">
            Welcome back, we&apos;re happy to have you here!
          </p>
        </div>

        <div className="flex gap-1">
          <button className="bg-[#252525] border border-[#323539] flex items-center justify-center gap-2 font-semibold px-4 py-1.5 pb-2.5 rounded-[8px]">
            <span className="flex items-center gap-2">
              <h1 className="text-sm translate-y-[7px]">Download Report</h1>
              <Icon path="/dashboard/icon_set/download.svg" alt="Download icon" />
            </span>
          </button>

          <button className="bg-accentBlue gap-2 font-semibold px-4 py-1.5 rounded-[8px] flex items-center">
            <h1 className="translate-y-[4px]">Register Mineral</h1>
          </button>

          <button className="bg-[#252525] border border-[#323539] flex items-center justify-center gap-2 font-semibold px-4 py-1.5 pb-2.5 rounded-[8px]">
            <Icon path="/dashboard/icon_set/menu.svg" alt="menu icon" />
          </button>
        </div>
      </div>

      {/* the stats cards */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatsCard
            title="Total Minerals Supplied"
            value="30"
            tagName="Coltan"
            chartData={mineralsData}
            color="blue"
          />

          <StatsCard title="Completed Transfers" value="27" tagName="Gold" chartData={transfersData} color="green" />

          <StatsCard title="Active Shipments" value="27" tagName="Copper" chartData={shipmentsData} color="red" />
        </div>
      </div>

      {/* the mineral supply graph */}
      <MineralSupplyGraph data={supplyData} />
    </div>
  );
}

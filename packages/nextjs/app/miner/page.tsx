import Icon from "~~/components/dashboard/Icon";

// dummy user
interface User {
  name: string;
}

// sample user
const user: User = {
  name: "Brian Ford",
};
export default function Page() {
  return (
    <div className="px-10">
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
    </div>
  );
}

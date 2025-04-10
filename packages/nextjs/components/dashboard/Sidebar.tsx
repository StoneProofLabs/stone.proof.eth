import StoneProof from "../logo/Stoneproof";
import Icon from "./Icon";
import Search from "./search";

export default function Sidebar() {
  return (
    <div className="bg-darkBlack min-h-screen w-[280px]">
      {/* the logo */}
      <div className="flex justify-between px-5 py-[16px]">
        <StoneProof />
        <div className="cursor-pointer flex items-center justify-center">
          <Icon path="/dashboard/icon_set/menu.svg" alt="Menu icon" />
        </div>
      </div>

      {/* the other div */}
      {/* the searchbar */}
      <div className="px-5">
        <Search />
      </div>
    </div>
  );
}

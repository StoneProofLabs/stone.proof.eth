import Icon from "./Icon";

export default function Search() {
  return (
    <div className="bg-[#2B2D2F] flex justify-center rounded-md px-2 py-3">
      <Icon path="/dashboard/icon_set/search.svg" alt="Search icon" />
      <input className="bg-[#2B2D2F] focus:outline-none ml-3 text-[14px]" type="text" placeholder="Search here..." />
    </div>
  );
}

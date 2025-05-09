import ProgressCard from "./ProgressCard";
import { BsFillGridFill } from "react-icons/bs";
import { FaGem, FaTasks } from "react-icons/fa";
import { PiCirclesThreeFill } from "react-icons/pi";

export default function ProgressCardsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      <ProgressCard
        icon={<FaGem className="text-white" />}
        title="Auditing Progress"
        percent={23}
        pending="2,345"
        color="orange"
      />
      <ProgressCard
        icon={<FaTasks className="text-white" />}
        title="Inspection Progress"
        percent={12}
        pending="3,239"
        color="blue"
      />
      <ProgressCard
        icon={<PiCirclesThreeFill className="text-white" />}
        title="Refining Progress"
        percent={13}
        pending="212"
        color="red"
      />
      <ProgressCard
        icon={<BsFillGridFill className="text-white" />}
        title="Conflicts Resolution"
        percent={24}
        pending="12"
        color="blue"
      />
    </div>
  );
}

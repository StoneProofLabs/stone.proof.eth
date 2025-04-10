"use client";

import Logo from "./Logo";
import { useDynamicPathText } from "~~/utils/dashboard/getWorkspace";

export default function StoneProof() {
  const { dynamicWorkspace } = useDynamicPathText();

  return (
    <div className="flex gap-[12px] items-center text-white">
      <div>
        <Logo />
      </div>
      <div className="leading-none">
        <h1 className="font-bold text-[16px]">Stone.Proof</h1>
        <h1 className="text-[#979AA0] text-[14px] mt-0">{dynamicWorkspace}</h1>
      </div>
    </div>
  );
}

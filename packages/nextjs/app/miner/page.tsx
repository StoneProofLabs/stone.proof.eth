"use client";

import Logo from "~~/components/Logo";
import { useDynamicPathText } from "~~/utils/dashboard/getWorkspace";

export default function Page() {
  const { dynamicWorkspace } = useDynamicPathText();

  return (
    <div className="flex gap-[12px] items-center text-white">
      <div>
        <Logo />
      </div>
      <div className="leading-none">
        <h1 className="font-bold text-lg">Stone.Proof</h1>
        <h1 className="text-[#979AA0] mt-0">{dynamicWorkspace}</h1>
      </div>
    </div>
  );
}

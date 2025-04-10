"use client";

import Logo from "~~/components/Logo";
import { useDynamicPathText } from "~~/utils/dashboard/getWorkspace";

// Updated import

export default function Page() {
  const { dynamicWorkspace } = useDynamicPathText();

  return (
    <div>
      <Logo />
      <div className="flex flex-col gap-1">
        <h1>Stone.Proof</h1>
        <p>{dynamicWorkspace}</p>
      </div>
    </div>
  );
}

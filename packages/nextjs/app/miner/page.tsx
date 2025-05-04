"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HardHat, ChevronRight, Loader2 } from "lucide-react";

const MinerAccessGranted = () => {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleEnterPortal = () => {
    setIsRedirecting(true);
    router.push("/miner/overview");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-xl shadow-lg border border-green-700">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-900 rounded-full mx-auto">
          {isRedirecting ? (
            <Loader2 className="w-8 h-8 text-green-300 animate-spin" />
          ) : (
            <HardHat className="w-8 h-8 text-green-300" />
          )}
        </div>

        <h2 className="text-2xl font-bold text-white">Miner Access Granted</h2>
        <p className="text-gray-300">You have full access to the miner portal.</p>

        <button
          onClick={handleEnterPortal}
          disabled={isRedirecting}
          className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {isRedirecting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Redirecting...
            </>
          ) : (
            <>
              Enter Miner Portal
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default function MinerPortalEntry() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-lightBlack">
      <MinerAccessGranted />
    </div>
  );
}
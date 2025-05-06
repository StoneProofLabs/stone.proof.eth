"use client";

import { useSearchParams } from "next/navigation";
import { ShieldAlert } from "lucide-react";
import { useAccount } from "wagmi";
import { Button } from "~~/components/ui/button";

export default function AccessDeniedPage() {
  const searchParams = useSearchParams();
  const { address } = useAccount();
  const reason = searchParams.get("reason");

  const getErrorMessage = () => {
    switch (reason) {
      case "miner-role-required":
        return {
          title: "Miner Access Required",
          description: "Your wallet doesn't have miner privileges.",
          action: "Contact your administrator to request access.",
        };
      default:
        return {
          title: "Access Denied",
          description: "You don't have permission to access this page.",
          action: "Please check with your administrator.",
        };
    }
  };

  const { title, description, action } = getErrorMessage();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-4">
      <ShieldAlert className="w-12 h-12 text-red-500" />
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-gray-500 text-center max-w-md">{description}</p>
      {address && (
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-sm">
          <p className="font-mono break-all">{address}</p>
        </div>
      )}
      <p className="text-gray-500 text-center max-w-md">{action}</p>
      <div className="flex gap-4 mt-4">
        <Button variant="outline" onClick={() => window.location.reload()}>
          Re-check Access
        </Button>
        <Button onClick={() => (window.location.href = "/")}>Return to Home</Button>
      </div>
    </div>
  );
}

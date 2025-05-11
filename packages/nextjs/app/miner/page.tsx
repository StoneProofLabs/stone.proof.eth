"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "../lib/toast";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ChevronRight, Copy, HardHat, Loader2, Mail, MessageSquare, Phone, ShieldAlert } from "lucide-react";
import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const LoadingSpinner = ({ size = 8, text = "Loading..." }: { size?: number; text?: string }) => (
  <div className="flex flex-col items-center justify-center gap-2">
    <Loader2 className={`w-${size} h-${size} animate-spin`} />
    {text && <p className="text-sm text-muted-foreground">{text}</p>}
  </div>
);

const FullPageLoader = ({ text = "Verifying access permissions..." }: { text?: string }) => (
  <div className="flex items-center justify-center min-h-screen">
    <LoadingSpinner size={12} text={text} />
  </div>
);

const AdminContactSection = () => {
  const contacts = [
    {
      name: "Admin Email",
      value: "admin@stone.proof",
      icon: <Mail className="w-5 h-5" />,
      action: "mailto:admin@stone.proof?subject=Miner%20Role%20Request",
    },
    {
      name: "Support Phone",
      value: "+(250) 795 107 436",
      icon: <Phone className="w-5 h-5" />,
      action: "tel:+250795107436",
    },
    {
      name: "Telegram Support",
      value: "@StoneProofSupport",
      icon: <MessageSquare className="w-5 h-5" />,
      action: "https://t.me/StoneProofSupport",
    },
  ];

  return (
    <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
      <h3 className="font-medium text-gray-900 dark:text-white mb-4">Contact Administrators</h3>
      <div className="space-y-3">
        {contacts.map((contact, index) => (
          <a
            key={index}
            href={contact.action}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
          >
            <div className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-600 dark:text-blue-300">
              {contact.icon}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{contact.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{contact.value}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </a>
        ))}
      </div>
    </div>
  );
};

const AccessDeniedCard = ({
  address,
  isLoadingRefresh,
  onRefresh,
}: {
  address: string;
  isLoadingRefresh: boolean;
  onRefresh: () => void;
}) => {
  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    toast.success("Wallet address copied!");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full mx-auto">
          <ShieldAlert className="w-8 h-8 text-red-600 dark:text-red-300" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Miner Privileges Required</h2>
        <p className="text-gray-600 dark:text-gray-300">Your wallet doesn't have miner access permissions.</p>

        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Connected Wallet:</span>
            <button
              onClick={copyAddress}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              title="Copy address"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>
          <p className="font-mono text-sm break-all text-left">{address}</p>
        </div>

        <div className="pt-4 space-y-3">
          <h3 className="font-medium text-gray-900 dark:text-white">How to get miner access:</h3>
          <ol className="space-y-2 text-sm text-gray-600 dark:text-gray-300 text-left">
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium">
                1
              </span>
              Contact system administrator using one of the methods below
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium">
                2
              </span>
              Request miner role assignment for your wallet address
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium">
                3
              </span>
              Refresh this page after receiving confirmation
            </li>
          </ol>
        </div>

        <AdminContactSection />

        <div className="pt-4">
          <button
            onClick={onRefresh}
            disabled={isLoadingRefresh}
            className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isLoadingRefresh ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                Check Access Again
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const MinerAccessGranted = () => {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleEnterPortal = () => {
    setIsRedirecting(true);
    router.push("/miner/overview");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-green-200 dark:border-green-800">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full mx-auto">
          {isRedirecting ? (
            <Loader2 className="w-8 h-8 text-green-600 dark:text-green-300 animate-spin" />
          ) : (
            <HardHat className="w-8 h-8 text-green-600 dark:text-green-300" />
          )}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Miner Access Granted</h2>
        <p className="text-gray-600 dark:text-gray-300">You have full access to the miner portal.</p>

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

const ConnectWalletView = ({ isLoading }: { isLoading: boolean }) => (
  <div className="flex items-center justify-center min-h-screen p-4">
    <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center border border-gray-200 dark:border-gray-700">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-4 mx-auto">
        {isLoading ? (
          <Loader2 className="w-8 h-8 text-blue-600 dark:text-blue-300 animate-spin" />
        ) : (
          <HardHat className="w-8 h-8 text-blue-600 dark:text-blue-300" />
        )}
      </div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        {isLoading ? "Connecting..." : "Connect Miner Wallet"}
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        {isLoading ? "Verifying wallet..." : "Please connect a wallet with miner privileges"}
      </p>
      <div className="flex justify-center">
        <ConnectButton showBalance={false} accountStatus="address" chainStatus="none" />
      </div>
    </div>
  </div>
);

export default function MinerPortalEntry() {
  const { address, isConnected, isConnecting } = useAccount();
  const [isRefreshingAccess, setIsRefreshingAccess] = useState(false);

  const {
    data: hasMinerRole,
    isLoading: isLoadingRoleCheck,
    error,
    refetch: refetchRoleCheck,
  } = useScaffoldReadContract({
    contractName: "RolesManager",
    functionName: "hasMinerRole",
    args: [address],
    enabled: isConnected,
  });

  const handleRefreshAccess = async () => {
    setIsRefreshingAccess(true);
    try {
      const { data } = await refetchRoleCheck();
      if (!data) {
        toast.error("Still no miner access. Contact administrator.");
      }
    } catch (e) {
      console.error("Error refreshing access:", e);
      toast.error("Error checking access");
    } finally {
      setIsRefreshingAccess(false);
    }
  };

  // Loading state while checking roles
  if (isConnected && isLoadingRoleCheck) {
    return <FullPageLoader text="Checking miner access permissions..." />;
  }

  // Not connected state
  if (!isConnected) {
    return <ConnectWalletView isLoading={isConnecting} />;
  }

  // No miner role state
  if (isConnected && !hasMinerRole) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <AccessDeniedCard
          address={address || ""}
          isLoadingRefresh={isRefreshingAccess}
          onRefresh={handleRefreshAccess}
        />
      </div>
    );
  }

  // Access granted state
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <MinerAccessGranted />
    </div>
  );
}

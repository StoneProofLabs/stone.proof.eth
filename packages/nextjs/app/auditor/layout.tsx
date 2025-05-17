"use client";

import { useEffect, useState } from "react";
import { Montserrat } from "next/font/google";
import { Loading } from "../../components/ui/loading";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ChevronRight, Copy, Loader2, Mail, MessageSquare, Phone, ShieldAlert } from "lucide-react";
import { useAccount } from "wagmi";
import Sidebar from "~~/components/dashboard/Sidebar";
import TopBar from "~~/components/dashboard/topBar";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { useSidebarStore } from "~~/stores/useSidebarStore";
import { getSidebarItems } from "~~/types/dashboard/sidebarItems";
import { notification } from "~~/utils/scaffold-eth";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const LoadingSpinner = ({ size = 8, text = "Loading..." }: { size?: number; text?: string }) => (
  <div className="flex flex-col items-center justify-center gap-2">
    <Loader2 className={`w-${size} h-${size} animate-spin`} />
    {text && <p className="text-sm text-muted-foreground">{text}</p>}
  </div>
);

const FullPageLoader = ({ text = "Verifying auditor permissions..." }: { text?: string }) => (
  <div className="flex items-center justify-center min-h-screen bg-lightBlack">
    <LoadingSpinner size={12} text={text} />
  </div>
);

// Commented out but kept for reference - Access Denied component
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
    notification.success("Wallet address copied!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-4xl p-4 sm:p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700">
        <div className="text-center flex flex-col items-center gap-5">
          <div>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-700 rounded-full mx-auto">
              <ShieldAlert className="w-8 h-8 text-red-300" />
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-red-400 mt-3">Auditor Privileges Required</h2>
            <p className="text-sm sm:text-base text-gray-300 mt-2">
              Your wallet doesn&apos;t have auditor access permissions to view this dashboard.
            </p>
          </div>

          {/* Main content - switches from row to column on small screens */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6 w-[100%] ">
            {/* Left section - miner privileges */}
            <div className="w-full lg:w-[50%] h-[100%] flex flex-col justify-between">
              <div className="bg-gray-700 p-3 sm:p-4 rounded-lg mt-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs sm:text-sm font-medium text-gray-400">Connected Wallet:</span>
                  <button onClick={copyAddress} className="text-blue-400 hover:text-blue-300" title="Copy address">
                    <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
                <p className="font-mono text-xs sm:text-sm break-all text-left text-gray-200">{address}</p>
              </div>

              <div className="pt-4 space-y-3">
                <h3 className="font-medium text-white">How to get auditor access:</h3>
                <ol className="space-y-2 text-xs sm:text-sm text-gray-300 text-left">
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-900 text-blue-200 text-xs font-medium">
                      1
                    </span>
                    Contact system administrator
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-900 text-blue-200 text-xs font-medium">
                      2
                    </span>
                    Request auditor role assignment
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-900 text-blue-200 text-xs font-medium">
                      3
                    </span>
                    Refresh this page after approval
                  </li>
                </ol>
              </div>
            </div>

            {/* Right section - contact administrators */}
            <div className="w-full lg:w-[40%] mt-4 lg:mt-0 lg:pt-0">
              <h3 className="font-medium text-white mb-3 sm:mb-4">Contact Administrators</h3>
              <div className="space-y-2 sm:space-y-3">
                {[
                  {
                    name: "Admin Email",
                    value: "admin@stone.proof",
                    icon: <Mail className="w-4 h-4 sm:w-5 sm:h-5" />,
                    action: "mailto:admin@stone.proof?subject=Miner%20Access%20Request",
                  },
                  {
                    name: "Support Phone",
                    value: "+1 (555) 123-4567",
                    icon: <Phone className="w-4 h-4 sm:w-5 sm:h-5" />,
                    action: "tel:+15551234567",
                  },
                  {
                    name: "Telegram Support",
                    value: "@StoneProofSupport",
                    icon: <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />,
                    action: "https://t.me/StoneProofSupport",
                  },
                ].map((contact, index) => (
                  <a
                    key={index}
                    href={contact.action}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors text-xs"
                  >
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full text-blue-300">
                        {contact.icon}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 overflow-hidden">
                      <p className="font-medium text-white truncate leading-tight text-xs sm:text-sm">{contact.name}</p>
                      <p className="text-xs text-gray-400 truncate leading-tight">{contact.value}</p>
                    </div>
                    <ChevronRight className="w-3 h-3 text-gray-400 flex-shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Refresh button */}
          <div className="w-full pt-2 sm:pt-4">
            <button
              onClick={onRefresh}
              disabled={isLoadingRefresh}
              className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
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
    </div>
  );
};

// Commented out but kept for reference
const ConnectWalletView = ({ isLoading }: { isLoading: boolean }) => (
  <div className="flex items-center justify-center min-h-screen p-4 bg-lightBlack">
    <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-lg p-8 text-center border border-gray-700">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-900 rounded-full mb-4 mx-auto">
        {isLoading ? (
          <Loader2 className="w-8 h-8 text-blue-300 animate-spin" />
        ) : (
          <ShieldAlert className="w-8 h-8 text-blue-300" />
        )}
      </div>
      <h1 className="text-2xl font-bold text-white mb-2">{isLoading ? "Connecting..." : "Connect Your Wallet"}</h1>
      <p className="text-gray-300 mb-6">
        {isLoading ? "Verifying wallet..." : "Please connect a wallet with auditor privileges"}
      </p>
      <div className="flex justify-center">
        <ConnectButton />
      </div>
    </div>
  </div>
);

export default function AuditorLayout({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebarStore();
  const { address, isConnected, isConnecting } = useAccount();
  const [isRefreshingAccess, setIsRefreshingAccess] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const sidebarItems = getSidebarItems("/auditor");

  // Commented out the auditor role check but kept for reference
  // const {
  //   data: hasAuditorRole,
  //   isLoading: isLoadingRoleCheck,
  //   refetch: refetchRoleCheck,
  // } = useScaffoldReadContract({
  //   contractName: "RolesManager",
  //   functionName: "hasAuditorRole",
  //   args: [address],
  //   /*enabled: isConnected*/
  // });

  // Commented out but kept for reference
  // const handleRefreshAccess = async () => {
  //   setIsRefreshingAccess(true);
  //   try {
  //     const { data } = await refetchRoleCheck();
  //     if (!data) {
  //       notification.error("Still no auditor access. Contact administrator.");
  //     }
  //   } catch (e) {
  //     console.error("Error refreshing access:", e);
  //     notification.error("Error checking access");
  //   } finally {
  //     setIsRefreshingAccess(false);
  //   }
  // };

  useEffect(() => {
    // Skip the auditor check and just set loading to false after delay
    const timer = setTimeout(() => {
      setIsDataLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isConnected && isLoadingRoleCheck) {
    return;
    <Loading
      title="Verifying Auditor Access"
      description="Please wait while we verify your auditor access..."
      progressValue={90}
      progressText="Almost there..."
    />;
  }

  // Commented out the original access control logic but kept for reference
  // if (isConnected && isLoadingRoleCheck) {
  //   return
  //   <Loading
  //   title="Verifying Auditor Access"
  //   description="Please wait while we verify your auditor access..."
  //   progressValue={90}
  //   progressText="Almost there..."
  // />;
  // }


  // if (!isConnected) {
  //   return <ConnectWalletView isLoading={isConnecting} />;
  // }

  // if (!hasAuditorRole) {
  //   return (
  //     <AccessDeniedCard address={address!} isLoadingRefresh={isRefreshingAccess} onRefresh={handleRefreshAccess} />
  //   );
  // }

  if (isDataLoading) {
    return <FullPageLoader text="Loading auditor dashboard..." />;
  }

  return (
    <div className={`${montserrat.variable} font-montserrat bg-lightBlack flex text-white h-screen`}>
      <Sidebar basePath="/auditor" />
      <div
        className={`flex flex-col flex-1 overflow-hidden transition-all duration-300 ${
          !isCollapsed ? "md:ml-[250px]" : ""
        }`}
      >
        <TopBar sidebarItems={sidebarItems} basePath="/auditor" />
        <main className="flex-1 overflow-y-auto px-6 py-4">{children}</main>
      </div>
    </div>
  );
}

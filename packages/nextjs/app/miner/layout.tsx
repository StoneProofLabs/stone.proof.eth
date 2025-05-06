"use client";

// "use client";
// import { Inter } from "next/font/google";
// import { useAccount } from "wagmi";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { ShieldAlert, Copy, Mail, Phone, MessageSquare, ChevronRight, Loader2, HardHat, Lock } from "lucide-react";
// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import Sidebar from "~~/components/dashboard/Sidebar";
// import TopBar from "~~/components/dashboard/topBar";
// import { getSidebarItems } from "~~/types/dashboard/sidebarItems";
// import { ConnectButton } from "@rainbow-me/rainbowkit";
// import { toast } from "../lib/toast";
// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-inter",
//   display: "swap",
// });
// const basepath = "/miner";
// const sideBarItems = getSidebarItems(basepath);
// const LoadingSpinner = ({ size = 12, text = "Loading..." }: { size?: number; text?: string }) => (
//   <div className="flex flex-col items-center justify-center gap-2">
//     <Loader2 className={`w-${size} h-${size} animate-spin`} />
//     {text && <p className="text-sm text-muted-foreground">{text}</p>}
//   </div>
// );
// const FullPageLoader = ({ text = "Verifying access permissions..." }: { text?: string }) => (
//   <div className="flex items-center justify-center min-h-screen">
//     <LoadingSpinner size={12} text={text} />
//   </div>
// );
// const AdminContactSection = () => (
//   <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
//     <h3 className="font-medium text-gray-900 dark:text-white mb-4">Contact Administrators</h3>
//     <div className="space-y-3">
//       {[
//         {
//           name: "Admin Email",
//           value: "admin@stone.proof",
//           icon: <Mail className="w-5 h-5" />,
//           action: "mailto:admin@stone.proof?subject=Miner%20Role%20Request"
//         },
//         {
//           name: "Support Phone",
//           value: "+(250) 795 107 436",
//           icon: <Phone className="w-5 h-5" />,
//           action: "tel:+250795107436"
//         },
//         {
//           name: "Telegram Support",
//           value: "@StoneProofSupport",
//           icon: <MessageSquare className="w-5 h-5" />,
//           action: "https://t.me/StoneProofSupport"
//         }
//       ].map((contact, index) => (
//         <a
//           key={index}
//           href={contact.action}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
//         >
//           <div className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-600 dark:text-blue-300">
//             {contact.icon}
//           </div>
//           <div className="flex-1">
//             <p className="text-sm font-medium text-gray-900 dark:text-white">{contact.name}</p>
//             <p className="text-xs text-gray-500 dark:text-gray-400">{contact.value}</p>
//           </div>
//           <ChevronRight className="w-4 h-4 text-gray-400" />
//         </a>
//       ))}
//     </div>
//   </div>
// );
// const AccessDeniedOverlay = ({
//   address,
//   isLoadingRefresh,
//   onRefresh,
// }: {
//   address: string;
//   isLoadingRefresh: boolean;
//   onRefresh: () => void;
// }) => {
//   const copyAddress = () => {
//     navigator.clipboard.writeText(address);
//     toast.success("Wallet address copied!");
//   };
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
//       <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
//         <div className="text-center space-y-4">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full mx-auto">
//             <Lock className="w-8 h-8 text-red-600 dark:text-red-300" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Access Restricted</h2>
//           <p className="text-gray-600 dark:text-gray-300">Your miner privileges are currently inactive</p>
//           <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
//             <div className="flex justify-between items-center mb-1">
//               <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Connected Wallet:</span>
//               <button
//                 onClick={copyAddress}
//                 className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
//                 title="Copy address"
//               >
//                 <Copy className="w-5 h-5" />
//               </button>
//             </div>
//             <p className="font-mono text-sm break-all text-left">{address}</p>
//           </div>
//           <div className="pt-4 space-y-3">
//             <h3 className="font-medium text-gray-900 dark:text-white">How to get miner access:</h3>
//             <ol className="space-y-4 text-sm text-gray-600 dark:text-gray-300 text-left">
//               <li className="flex items-start gap-3">
//                 <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium">
//                   1
//                 </span>
//                 <div>
//                   <p>Contact system administrator at:</p>
//                   <div className="mt-1 space-y-2 pl-2">
//                     <a
//                       href="mailto:admin@stone.proof?subject=Miner%20Role%20Request"
//                       className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
//                     >
//                       <Mail className="w-4 h-4" />
//                       admin@stone.proof
//                     </a>
//                     <a
//                       href="tel:+250795107436"
//                       className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
//                     >
//                       <Phone className="w-4 h-4" />
//                       +(250) 795 107 436
//                     </a>
//                   </div>
//                 </div>
//               </li>
//               <li className="flex items-start gap-3">
//                 <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium">
//                   2
//                 </span>
//                 <div>
//                   <p>Request miner role assignment through:</p>
//                   <div className="mt-1 pl-2">
//                     <a
//                       href="https://t.me/StoneProofSupport"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
//                     >
//                       <MessageSquare className="w-4 h-4" />
//                       @StoneProofSupport
//                     </a>
//                   </div>
//                 </div>
//               </li>
//               <li className="flex items-start gap-3">
//                 <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium">
//                   3
//                 </span>
//                 <div>
//                   <p>Refresh this page after approval</p>
//                   <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                     If access isn't granted immediately, wait a few minutes then refresh
//                   </p>
//                 </div>
//               </li>
//             </ol>
//           </div>
//           <div className="pt-4">
//             <button
//               onClick={onRefresh}
//               disabled={isLoadingRefresh}
//               className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors flex items-center justify-center gap-2"
//             >
//               {isLoadingRefresh ? (
//                 <Loader2 className="w-4 h-4 animate-spin" />
//               ) : (
//                 <>
//                   Verify Access Again
//                   <ChevronRight className="w-4 h-4" />
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// const DisabledLayoutWrapper = ({ children }: { children: React.ReactNode }) => (
//   <div className="relative">
//     <div className="opacity-50 pointer-events-none">{children}</div>
//     <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm" />
//   </div>
// );
// const ConnectWalletView = ({ isLoading }: { isLoading: boolean }) => (
//   <div className="flex items-center justify-center min-h-screen p-4">
//     <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center border border-gray-200 dark:border-gray-700">
//       <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-4 mx-auto">
//         {isLoading ? (
//           <Loader2 className="w-8 h-8 text-blue-600 dark:text-blue-300 animate-spin" />
//         ) : (
//           <HardHat className="w-8 h-8 text-blue-600 dark:text-blue-300" />
//         )}
//       </div>
//       <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
//         {isLoading ? "Connecting..." : "Connect Miner Wallet"}
//       </h1>
//       <p className="text-gray-600 dark:text-gray-300 mb-6">
//         {isLoading ? "Verifying wallet..." : "Please connect a wallet with miner privileges"}
//       </p>
//       <div className="flex justify-center">
//         <ConnectButton showBalance={false} accountStatus="address" chainStatus="none" />
//       </div>
//     </div>
//   </div>
// );
// export default function MinerLayout({ children }: { children: React.ReactNode }) {
//   const router = useRouter();
//   const { address, isConnected, isConnecting } = useAccount();
//   const [isRefreshingAccess, setIsRefreshingAccess] = useState(false);
//   const {
//     data: hasMinerRole,
//     isLoading: isLoadingRoleCheck,
//     error,
//     refetch: refetchRoleCheck,
//   } = useScaffoldReadContract({
//     contractName: "RolesManager",
//     functionName: "hasMinerRole",
//     args: [address],
//     enabled: isConnected,
//   });
//   const handleRefreshAccess = async () => {
//     setIsRefreshingAccess(true);
//     try {
//       const { data } = await refetchRoleCheck();
//       if (!data) {
//         toast.error("Still no miner access. Contact administrator using the details below.");
//       } else {
//         toast.success("Access granted! Loading miner portal...");
//       }
//     } catch (e) {
//       console.error("Error refreshing access:", e);
//       toast.error("Error checking access. Please try again.");
//     } finally {
//       setIsRefreshingAccess(false);
//     }
//   };
//   // Loading state while checking roles
//   if (isConnected && isLoadingRoleCheck) {
//     return <FullPageLoader text="Checking permissions..." />;
//   }
//   // Not connected state
//   if (!isConnected) {
//     return <ConnectWalletView isLoading={isConnecting} />;
//   }
//   // Main layout with disabled state for unauthorized users
//   const layoutContent = (
//     <div className={`${inter.variable} font-sans bg-lightBlack flex text-white h-screen`}>
//       <Sidebar basePath={basepath} />
//       <div className="flex flex-col flex-1 overflow-hidden">
//         <TopBar sidebarItems={sideBarItems} basePath={basepath} />
//         <main className="flex-1 overflow-y-auto px-6 py-4 bg-[#0F0F0F]">{children}</main>
//       </div>
//     </div>
//   );
//   if (!hasMinerRole) {
//     return (
//       <>
//         <DisabledLayoutWrapper>{layoutContent}</DisabledLayoutWrapper>
//         <AccessDeniedOverlay
//           address={address || ""}
//           isLoadingRefresh={isRefreshingAccess}
//           onRefresh={handleRefreshAccess}
//         />
//       </>
//     );
//   }
//   return layoutContent;
// }
import { Montserrat } from "next/font/google";
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ChevronRight, Copy, HardHat, Loader2, Mail, MessageSquare, Phone, ShieldAlert } from "lucide-react";
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

const basepath = "/miner";
const sideBarItems = getSidebarItems(basepath);

const LoadingSpinner = ({ size = 8, text = "Loading..." }: { size?: number; text?: string }) => (
  <div className="flex flex-col items-center justify-center gap-2">
    <Loader2 className={`w-${size} h-${size} animate-spin`} />
    {text && <p className="text-sm text-muted-foreground">{text}</p>}
  </div>
);

const FullPageLoader = ({ text = "Verifying miner permissions..." }: { text?: string }) => (
  <div className="flex items-center justify-center min-h-screen bg-lightBlack">
    <LoadingSpinner size={12} text={text} />
  </div>
);

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
    <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-900 rounded-full mx-auto">
          <HardHat className="w-8 h-8 text-red-300" />
        </div>

        <h2 className="text-2xl font-bold text-white">Miner Privileges Required</h2>
        <p className="text-gray-300">Your wallet doesn&apos;t have miner access permissions to view this dashboard.</p>

        <div className="bg-gray-700 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-400">Connected Wallet:</span>
            <button onClick={copyAddress} className="text-blue-400 hover:text-blue-300" title="Copy address">
              <Copy className="w-5 h-5" />
            </button>
          </div>
          <p className="font-mono text-sm break-all text-left text-gray-200">{address}</p>
        </div>

        <div className="pt-4 space-y-3">
          <h3 className="font-medium text-white">How to get miner access:</h3>
          <ol className="space-y-2 text-sm text-gray-300 text-left">
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
              Request miner role assignment
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-900 text-blue-200 text-xs font-medium">
                3
              </span>
              Refresh this page after approval
            </li>
          </ol>
        </div>

        <div className="mt-6 border-t border-gray-700 pt-6">
          <h3 className="font-medium text-white mb-4">Contact Administrators</h3>
          <div className="space-y-3">
            {[
              {
                name: "Admin Email",
                value: "admin@stone.proof",
                icon: <Mail className="w-5 h-5" />,
                action: "mailto:admin@stone.proof?subject=Miner%20Access%20Request",
              },
              {
                name: "Support Phone",
                value: "+1 (555) 123-4567",
                icon: <Phone className="w-5 h-5" />,
                action: "tel:+15551234567",
              },
              {
                name: "Telegram Support",
                value: "@StoneProofSupport",
                icon: <MessageSquare className="w-5 h-5" />,
                action: "https://t.me/StoneProofSupport",
              },
            ].map((contact, index) => (
              <a
                key={index}
                href={contact.action}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <div className="flex items-center justify-center w-8 h-8 bg-blue-900 rounded-full text-blue-300">
                  {contact.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{contact.name}</p>
                  <p className="text-xs text-gray-400">{contact.value}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </a>
            ))}
          </div>
        </div>

        <div className="pt-4">
          <button
            onClick={onRefresh}
            disabled={isLoadingRefresh}
            className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors flex items-center justify-center gap-2"
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

const ConnectWalletView = ({ isLoading }: { isLoading: boolean }) => (
  <div className="flex items-center justify-center min-h-screen p-4 bg-lightBlack">
    <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-lg p-8 text-center border border-gray-700">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-900 rounded-full mb-4 mx-auto">
        {isLoading ? (
          <Loader2 className="w-8 h-8 text-blue-300 animate-spin" />
        ) : (
          <HardHat className="w-8 h-8 text-blue-300" />
        )}
      </div>
      <h1 className="text-2xl font-bold text-white mb-2">{isLoading ? "Connecting..." : "Connect Miner Wallet"}</h1>
      <p className="text-gray-300 mb-6">
        {isLoading ? "Verifying wallet..." : "Please connect a wallet with miner privileges"}
      </p>
      <div className="flex justify-center">
        <ConnectButton />
      </div>
    </div>
  </div>
);

export default function MinerLayout({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebarStore();
  const { address, isConnected, isConnecting } = useAccount();
  const [isRefreshingAccess, setIsRefreshingAccess] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const {
    data: hasMinerRole,
    isLoading: isLoadingRoleCheck,
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
        notification.error("Still no miner access. Contact administrator.");
      }
    } catch (e) {
      console.error("Error refreshing access:", e);
      notification.error("Error checking access");
    } finally {
      setIsRefreshingAccess(false);
    }
  };

  useEffect(() => {
    if (hasMinerRole) {
      const timer = setTimeout(() => {
        setIsDataLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [hasMinerRole]);

  if (isConnected && isLoadingRoleCheck) {
    return <FullPageLoader text="Checking miner permissions..." />;
  }

  if (!isConnected) {
    return <ConnectWalletView isLoading={isConnecting} />;
  }

  if (!hasMinerRole) {
    return (
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      <AccessDeniedCard address={address!} isLoadingRefresh={isRefreshingAccess} onRefresh={handleRefreshAccess} />
    );
  }

  if (isDataLoading) {
    return <FullPageLoader text="Loading miner dashboard..." />;
  }

  return (
    <div className={`${montserrat.variable} font-montserrat bg-lightBlack flex text-white h-screen`}>
      <Sidebar basePath={basepath} />
      <div
        className={`flex flex-col flex-1 overflow-hidden transition-all duration-300 ${
          !isCollapsed ? "md:ml-[250px]" : ""
        }`}
      >
        <TopBar sidebarItems={sideBarItems} basePath={basepath} />
        <main className="flex-1 overflow-y-auto px-6 py-4">{children}</main>
      </div>
    </div>
  );
}
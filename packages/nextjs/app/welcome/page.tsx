"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import StoneProof from "../../components/landing/Header/StoneProof";
import { Loading } from "../../components/ui/loading";
import { toast } from "../lib/toast";
import { motion } from "framer-motion";

interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
  verified: boolean;
  mineralsMined: string[];
  companyName: string;
  companyPhoneNumber: string;
  location: string;
  numberOfEmployees: number;
  licenseFileUrl: string;
}

const ROLES = [
  {
    title: "Miner",
    description: "Access mining operations, track resources, and manage your mining activities.",
    icon: "/landing/pic1.svg",
    route: "/miner",
  },
  {
    title: "Refiner",
    description: "Process and refine minerals with advanced tracking and quality control.",
    icon: "/landing/pic2.svg",
    route: "/refiner",
  },
  {
    title: "Buyer",
    description: "Purchase verified minerals with complete transparency and traceability.",
    icon: "/landing/pic3.svg",
    route: "/buyer",
  },
  {
    title: "Transporter",
    description: "Manage and track mineral transportation with real-time logistics monitoring.",
    icon: "/landing/verified.png",
    route: "/transporter",
  },
  {
    title: "Auditor",
    description: "Conduct thorough audits and ensure compliance with industry standards.",
    icon: "/landing/pic1.svg",
    route: "/auditor",
  },
  {
    title: "Inspector",
    description: "Perform detailed inspections and quality assessments of mineral products.",
    icon: "/landing/pic2.svg",
    route: "/inspector",
  },
  {
    title: "Super Admin",
    description: "Full system access with comprehensive management and oversight capabilities.",
    icon: "/landing/pic3.svg",
    route: "/admin",
  },
];

const CARD_GRADIENT = "linear-gradient(180deg, rgba(42,47,61,0.20) 0%, rgba(10,15,27,0.40) 100%)";

const RoleCard = ({
  title,
  description,
  icon,
  route,
  isVerified,
  userRole,
  onNavigate,
}: {
  title: string;
  description: string;
  icon: string;
  route: string;
  isVerified: boolean;
  userRole: string;
  onNavigate?: (role: string, route: string) => void;
}) => {
  const router = useRouter();
  const isActive = userRole && userRole.toLowerCase() === title.toLowerCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={isActive ? { scale: 1.04, boxShadow: "0 0 0 4px #0A77FF33" } : {}}
      className={`rounded-xl border shadow-xl flex flex-col items-center justify-between p-4 min-h-[240px] relative group transition-all duration-200
        ${isActive ? "border-[#0A77FF] bg-[#0A77FF]/5" : "border-[#23262F]"}
      `}
      style={{
        backdropFilter: "blur(2px)",
        background: CARD_GRADIENT,
        boxShadow: isActive ? "0 0 16px 2px #0A77FF33" : undefined,
      }}
    >
      <div className="flex flex-col items-center justify-center flex-1 w-full">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <span
            className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${isVerified ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}
          >
            {isVerified ? "Verified" : "Unverified"}
          </span>
        </div>
        <p className="text-gray-400 text-xs text-center max-w-xs mb-3">{description}</p>
      </div>

      {/* Icon container */}
      <div className="w-full flex justify-center relative mb-3">
        <img
          src={icon}
          alt={title}
          className="w-16 h-16 select-none pointer-events-none object-contain drop-shadow-2xl z-20"
        />
      </div>

      <div className="w-full flex justify-end">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            if (onNavigate) onNavigate(title, route);
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors border bg-[#0A77FF]/10 hover:bg-[#0A77FF]/20 text-[#0A77FF] border-[#0A77FF]/20 text-sm font-medium`}
        >
          <span>Enter</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
};

const Page = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [navigateMessage, setNavigateMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You must be logged in to access this page.");
      router.push("/auth/login");
      return;
    }

    // Decode the JWT token to get the user ID
    const decodeToken = (token: string) => {
      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join(""),
        );
        return JSON.parse(jsonPayload);
      } catch (error) {
        console.error("Error decoding token:", error);
        return null;
      }
    };

    const decodedToken = decodeToken(token);
    const userId = decodedToken?.id;

    if (!userId) {
      toast.error("Invalid authentication token.");
      router.push("/auth/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://stoneproofbackend.onrender.com/api/v1/users/single/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        toast.error("Failed to load user data");
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = async () => {

    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    if (!email || !password) {
      toast.error("Missing credentials for logout.");
      return;
    }

    const loadingToast = toast.loading("Logging out...");

    setIsLoggingOut(true);

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      toast.dismiss(loadingToast);

      if (response.ok) {
        toast.success("Successfully logged out!");
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        localStorage.removeItem("token");
        setTimeout(() => {
          router.push("/auth/login");
        }, 1500);
      } else {
        toast.error(data.message || "Logout failed.");

        setIsLoggingOut(false);
      }
    } catch (err) {
      toast.error("An error occurred during logout.");
      setIsLoggingOut(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#060910]">
        <Loading
          title="Loading Profile"
          description="Please wait while we fetch your profile information..."
          progressValue={75}
          progressText="Almost there..."
        />
      </div>
    );
  }

  if (isLoggingOut) {
    return (
      <div className="min-h-screen bg-[#060910]">
        <Loading
          title="Logging Out"
          description="Please wait while we securely log you out..."
          progressValue={85}
          progressText="Clearing your session..."
        />
      </div>
    );
  }

  if (isNavigating) {
    return (
      <div className="min-h-screen bg-[#060910]">
        <Loading
          title={navigateMessage}
          description="Please wait while we take you to your portal..."
          progressValue={90}
          progressText="Navigating..."
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060910] flex flex-col lg:flex-row">
      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 sm:mb-12">
            <div className="mb-4 sm:mb-6">
              <StoneProof size="lg" />
            </div>
            <div
              className="relative mb-4 sm:mb-6 p-4 sm:p-8 rounded-xl overflow-hidden backdrop-blur-sm"
              style={{
                background: "linear-gradient(135deg, rgba(10,119,255,0.08) 0%, rgba(10,119,255,0.03) 100%)",
                border: "1px solid rgba(10,119,255,0.15)",
                boxShadow: "0 0 20px rgba(10,119,255,0.05)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A77FF]/5 via-transparent to-[#0A77FF]/5"></div>
              <div className="relative z-10">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  Welcome, <span className="text-white">{userData?.firstName}</span>{" "}
                  <span className="text-[#0A77FF] bg-clip-text text-transparent bg-gradient-to-r from-[#0A77FF] to-[#0A77FF]/80">
                    {userData?.lastName}
                  </span>
                </h2>
                <p className="text-base sm:text-xl text-gray-300 font-medium">
                  Your gateway to transparent mineral trading
                </p>
              </div>
            </div>
            <div className="text-center mb-8 sm:mb-12">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3">Claim Your Role</h1>
              <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
                Choose your role in the StoneProof ecosystem and start your journey towards transparent and secure
                mineral trading.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {ROLES.map((role, index) => (
              <RoleCard
                key={index}
                title={role.title}
                description={role.description}
                icon={role.icon}
                route={role.route}
                isVerified={userData?.verified || false}
                userRole={userData?.role || ""}
                onNavigate={(roleTitle, route) => {
                  setIsNavigating(true);
                  setNavigateMessage(`Navigating to your ${roleTitle.toLowerCase()} portal...`);
                  setTimeout(() => {
                    router.push(route);
                  }, 800); // short delay for loader effect
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-full lg:w-[30%] p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-6">
          <div
            className="rounded-xl border border-[#23262F] p-4 sm:p-6"
            style={{
              backdropFilter: "blur(2px)",
              background: "linear-gradient(135deg, rgba(10,119,255,0.08) 0%, rgba(10,119,255,0.03) 100%)",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 text-[#0A77FF]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <h2 className="text-base sm:text-lg font-semibold text-white">Personal Information</h2>
            </div>
            <div className="space-y-2 text-sm sm:text-base text-gray-300">
              <p>
                <span className="font-medium text-white">Name:</span> {userData?.firstName} {userData?.lastName}
              </p>
              <p>
                <span className="font-medium text-white">Email:</span> {userData?.email}
              </p>
              <p>
                <span className="font-medium text-white">Phone:</span> {userData?.phoneNumber}
              </p>
              <p>
                <span className="font-medium text-white">Role:</span> {userData?.role}
              </p>
              <p>
                <span className="font-medium text-white">Status:</span>{" "}
                {userData?.verified ? "Verified" : "Not Verified"}
              </p>
            </div>
          </div>

          <div
            className="rounded-xl border border-[#23262F] p-4 sm:p-6"
            style={{
              backdropFilter: "blur(2px)",
              background: "linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(16,185,129,0.03) 100%)",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <h2 className="text-base sm:text-lg font-semibold text-white">Company Information</h2>
            </div>
            <div className="space-y-2 text-sm sm:text-base text-gray-300">
              <p>
                <span className="font-medium text-white">Company Name:</span> {userData?.companyName}
              </p>
              <p>
                <span className="font-medium text-white">Company Phone:</span> {userData?.companyPhoneNumber}
              </p>
              <p>
                <span className="font-medium text-white">Location:</span> {userData?.location}
              </p>
              <p>
                <span className="font-medium text-white">Employees:</span> {userData?.numberOfEmployees}
              </p>
            </div>
          </div>

          <div
            className="rounded-xl border border-[#23262F] p-4 sm:p-6"
            style={{
              backdropFilter: "blur(2px)",
              background: "linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(245,158,11,0.03) 100%)",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 text-amber-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                />
              </svg>
              <h2 className="text-base sm:text-lg font-semibold text-white">Minerals Mined</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {(userData?.mineralsMined || []).map((mineral, index) => (
                <span key={index} className="bg-[#0A77FF] text-white px-3 py-1 rounded-full text-xs sm:text-sm">
                  {mineral}
                </span>
              ))}
            </div>
          </div>

          {userData?.licenseFileUrl && (
            <div
              className="rounded-xl border border-[#23262F] p-4 sm:p-6"
              style={{
                backdropFilter: "blur(2px)",
                background: "linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(139,92,246,0.03) 100%)",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <svg
                  className="w-6 h-6 sm:w-7 sm:h-7 text-purple-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h2 className="text-base sm:text-lg font-semibold text-white">License</h2>
              </div>
              <a
                href={userData.licenseFileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0A77FF] hover:text-[#0A77FF]/80 underline text-sm sm:text-base"
              >
                View License Document
              </a>
            </div>
          )}

          <div className="flex justify-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="w-48 py-2 sm:py-3 bg-red-500/30 hover:bg-red-500/20 text-red-400 font-semibold rounded-lg transition-colors border border-red-500/20 text-sm sm:text-base"
            >
              Logout
            </motion.button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Page;

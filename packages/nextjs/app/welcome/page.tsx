"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loading } from "../../components/ui/loading";
import { toast } from "../lib/toast";
import { FiArrowLeft } from "react-icons/fi";

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

const Page = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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
    setIsLoggingOut(true);
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
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

  return (
    <div className="min-h-screen bg-[#060910]">
      {/* Back Button */}

      <div className="max-w-4xl mx-auto p-6 pt-20">
        <div className="bg-[#181c27] rounded-xl border border-[#23272F] p-6">
          <h1 className="text-3xl font-bold mb-6 text-white">Welcome, {userData?.firstName}!</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-[#232B3E] rounded-lg p-4 border border-[#23272F]">
                <h2 className="text-xl font-semibold mb-4 text-white">Personal Information</h2>
                <div className="space-y-2 text-gray-300">
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

              <div className="bg-[#232B3E] rounded-lg p-4 border border-[#23272F]">
                <h2 className="text-xl font-semibold mb-4 text-white">Company Information</h2>
                <div className="space-y-2 text-gray-300">
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
            </div>

            <div className="space-y-4">
              <div className="bg-[#232B3E] rounded-lg p-4 border border-[#23272F]">
                <h2 className="text-xl font-semibold mb-4 text-white">Minerals Mined</h2>
                <div className="flex flex-wrap gap-2">
                  {userData?.mineralsMined.map((mineral, index) => (
                    <span key={index} className="bg-[#0A77FF] text-white px-3 py-1 rounded-full text-sm">
                      {mineral}
                    </span>
                  ))}
                </div>
              </div>

              {userData?.licenseFileUrl && (
                <div className="bg-[#232B3E] rounded-lg p-4 border border-[#23272F]">
                  <h2 className="text-xl font-semibold mb-4 text-white">License</h2>
                  <a
                    href={userData.licenseFileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0A77FF] hover:text-[#0A77FF]/80 underline"
                  >
                    View License Document
                  </a>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="mt-8 px-6 py-3 bg-[#0A77FF] hover:bg-[#0A77FF]/80 text-white font-semibold rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;

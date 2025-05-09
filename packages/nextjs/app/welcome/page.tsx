"use client";

import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "../lib/toast";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to access this page.");
      router.push("/auth/login");
    }
  }, [router]);

  const handleLogout = async () => {
    // Get email and password from localStorage (assumed stored at login)
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    if (!email || !password) {
      toast.error("Missing credentials for logout.");
      return;
    }
    const loadingToast = toast.loading("Logging out...");
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
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("An error occurred during logout.");
    }
  };

  return (
    <div>
      <div>Welcome Page</div>
      <button
        onClick={handleLogout}
        style={{
          marginTop: 24,
          padding: "10px 24px",
          background: "#0A77FF",
          color: "white",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Page;

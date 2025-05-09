"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "../../../lib/toast";

function getQueryParams() {
  if (typeof window === "undefined") return {};
  return Object.fromEntries(new URLSearchParams(window.location.search));
}

const GoogleCallbackPage = () => {
  const router = useRouter();

  useEffect(() => {
    async function handleGoogleCallback() {
      try {
        const params = getQueryParams();
        if (params.token) {
          localStorage.setItem("token", params.token);
        }
        if (params.email) {
          localStorage.setItem("email", params.email);
        }
        if (params.name) {
          localStorage.setItem("name", params.name);
        }
        toast.success("Google login successful! Redirecting...");
        setTimeout(() => {
          router.push("/welcome");
        }, 1500);
      } catch (err) {
        toast.error("Google login failed.");
        router.push("/auth/google/failure");
      }
    }
    handleGoogleCallback();
  }, [router]);

  return <div style={{ color: "white", textAlign: "center", marginTop: 40 }}>Processing Google login...</div>;
};

export default GoogleCallbackPage;

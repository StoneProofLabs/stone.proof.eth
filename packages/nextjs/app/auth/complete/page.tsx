"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const GoogleCallbackPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Extract the code from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      // Call your backend to exchange the code for user info
      fetch(`https://stoneproofbackend.onrender.com/auth/google/callback?code=${code}`)
        .then(res => res.json())
        .then(data => {
          // Save the user info in localStorage
          if (data && data.user) {
            localStorage.setItem("googleProfile", JSON.stringify(data.user));
            // Optionally, save a token if provided
            if (data.token) {
              localStorage.setItem("token", data.token);
            }
            // Redirect to complete page
            router.push("/auth/complete");
          } else {
            // Handle error (show toast, redirect, etc.)
            router.push("/auth/login");
          }
        })
        .catch(() => {
          // Handle error
          router.push("/auth/login");
        });
    } else {
      // No code in URL, redirect to login
      router.push("/auth/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#060910] text-white">
      <p>Completing Google authentication...</p>
    </div>
  );
};

export default GoogleCallbackPage;

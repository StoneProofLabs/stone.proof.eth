"use client";

import { useRouter } from "next/navigation";

const GoogleFailurePage = () => {
  const router = useRouter();
  return (
    <div style={{ color: "white", textAlign: "center", marginTop: 40 }}>
      <h2>Google Login Failed</h2>
      <p>There was a problem signing in with Google. Please try again or use another login method.</p>
      <button
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
        onClick={() => router.push("/auth/login")}
      >
        Back to Login
      </button>
    </div>
  );
};

export default GoogleFailurePage;

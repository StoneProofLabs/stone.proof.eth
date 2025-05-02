"use client";

import * as React from "react";
import { Toast, Toaster } from "react-hot-toast";

export const ToasterProvider = () => {
  return <Toaster />;
};

export const toast = {
  success: (message: string, duration?: number) => {
    return Toast(message, {
      icon: "✅",
      duration,
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  },
  error: (message: string, duration?: number) => {
    return Toast(message, {
      icon: "❌",
      duration,
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  },
  loading: (message: string, duration?: number) => {
    return Toast(message, {
      icon: "⏳",
      duration,
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  },
};

export { Toaster };
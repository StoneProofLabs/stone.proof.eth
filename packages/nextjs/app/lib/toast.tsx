"use client";

import React from "react";
import { Toaster, toast as hotToast } from "react-hot-toast";

export const ToastProvider: React.FC = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: "#181c27 !important",
          color: "#fff",
          borderRadius: "12px",
          padding: "12px 16px",
          fontSize: "14px",
          border: "1px solid #23262F",
          boxShadow: "0 2px 16px 0 #000A",
        },
        success: {
          iconTheme: {
            primary: "#10B981",
            secondary: "#181c27",
          },
          style: {
            background: "#181c27 !important",
          },
        },
        error: {
          iconTheme: {
            primary: "#EF4444",
            secondary: "#181c27",
          },
          style: {
            background: "#181c27 !important",
          },
        },
        loading: {
          style: {
            background: "#181c27 !important",
          },
        },
      }}
      containerStyle={{
        background: "transparent",
        zIndex: 9999,
      }}
    />
  );
};

export const toast = {
  success: (message: string) => hotToast.success(message),
  error: (message: string) => hotToast.error(message),
  loading: (message: string) => hotToast.loading(message),
  dismiss: (id?: string) => hotToast.dismiss(id),
};

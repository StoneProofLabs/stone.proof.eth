"use client";

import * as React from "react";
import { Toaster, toast as hotToast } from "react-hot-toast";

export const ToasterProvider = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: "#181c27",
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
        },
        error: {
          iconTheme: {
            primary: "#EF4444",
            secondary: "#181c27",
          },
        },
      }}
      containerStyle={{
        background: "transparent",
      }}
    />
  );
};

export const toast = {
  success: (message: string, options?: any) => hotToast.success(message, options),
  error: (message: string, options?: any) => hotToast.error(message, options),
  loading: (message: string, options?: any) => hotToast.loading(message, options),
  dismiss: (id?: string) => hotToast.dismiss(id),
};

export { Toaster };

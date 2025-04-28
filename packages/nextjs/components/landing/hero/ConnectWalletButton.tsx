import React from "react";
import { FaWallet } from "react-icons/fa";

const ConnectWalletButton: React.FC = () => {
  return (
    <button
      className="relative flex items-center gap-2 px-8 py-3 rounded-lg font-semibold bg-[#23272F] text-white border-2 border-white focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-[0_0_16px_2px_rgba(59,130,246,0.25)]"
      style={{ minHeight: "48px" }}
    >
      <FaWallet className="text-lg" />
      Connect Wallet
    </button>
  );
};

export default ConnectWalletButton;

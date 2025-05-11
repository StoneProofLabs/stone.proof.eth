import React from "react";

interface StoneProofProps {
  size?: "md" | "lg" | "xl";
}

const sizeMap = {
  md: { img: "h-8 md:h-12", text: "text-base md:text-lg" },
  lg: { img: "h-12 md:h-16", text: "text-xl md:text-2xl" },
  xl: { img: "h-16 md:h-20", text: "text-2xl md:text-3xl" },
};

const StoneProof: React.FC<StoneProofProps> = ({ size = "md" }) => {
  const { img, text } = sizeMap[size] || sizeMap.md;
  return (
    <div className="flex items-center gap-2 md:gap-3">
      {/* Responsive logo size */}
      <img src="/dashboard/stone_proof_logo.svg" alt="Stone Proof" className={`${img} w-auto`} />
      {/* Responsive text */}
      <span className={`font-semibold text-white ${text}`}>Stone.Proof</span>
    </div>
  );
};

export default StoneProof;

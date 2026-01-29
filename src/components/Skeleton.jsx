import React from "react";

const Skeleton = ({ className }) => {
  return (
    <div
      className={`bg-slate-900 border-2 border-slate-800 animate-pulse relative overflow-hidden ${className}`}
    >
      {/* Scanning Shine Effect */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-slate-800/50 to-transparent"></div>
    </div>
  );
};

export default Skeleton;

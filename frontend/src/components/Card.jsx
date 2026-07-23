import React from "react";

const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white/90 backdrop-blur-sm rounded-xl shadow-[0_1px_2px_rgba(18,64,59,0.06),0_8px_24px_-12px_rgba(18,64,59,0.15)] border border-ink-100 p-6 sm:p-7 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;

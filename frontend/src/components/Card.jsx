import React from "react";

const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white rounded-2xl border border-line shadow-[0_1px_2px_rgba(20,35,31,0.04),0_8px_24px_-12px_rgba(20,35,31,0.12)] p-6 sm:p-8 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;

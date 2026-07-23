import React from "react";

const Loader = ({ label = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center py-10 text-ink-400 text-sm font-mono">
      {label}
    </div>
  );
};

export default Loader;

import React from "react";

const Loader = ({ label = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center py-10 text-gray-500 text-sm">
      {label}
    </div>
  );
};

export default Loader;

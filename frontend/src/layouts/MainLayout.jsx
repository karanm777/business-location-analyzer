import React from "react";
import Navbar from "../components/Navbar.jsx";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8">{children}</main>
      <footer className="text-center text-xs text-gray-400 py-6">
        Business Location Analyzer
      </footer>
    </div>
  );
};

export default MainLayout;

import React from "react";
import Navbar from "../components/Navbar.jsx";
import ChatWidget from "../components/ChatWidget.jsx";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8">{children}</main>
      <footer className="text-center text-xs text-ink-400 font-mono py-6 border-t border-ink-100">
        Market Gap Finder
      </footer>
      <ChatWidget />
    </div>
  );
};

export default MainLayout;

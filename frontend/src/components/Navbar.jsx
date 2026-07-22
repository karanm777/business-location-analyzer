import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-paper/90 backdrop-blur border-b border-line sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
          <span className="w-2 h-2 rounded-full bg-brand-500" aria-hidden="true"></span>
          Business Location Analyzer
        </Link>

        <div className="flex items-center gap-5 text-sm">
          {user ? (
            <>
              <Link to="/dashboard" className="text-ink/70 hover:text-brand-600 transition-colors">
                Dashboard
              </Link>
              <Link to="/history" className="text-ink/70 hover:text-brand-600 transition-colors">
                History
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-1.5 rounded-full border border-line hover:border-ink/30 hover:bg-white transition-colors"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-ink/70 hover:text-brand-600 transition-colors">
                Log in
              </Link>
              <Link
                to="/register"
                className="px-4 py-1.5 rounded-full bg-brand-500 text-white hover:bg-brand-600 transition-colors"
              >
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

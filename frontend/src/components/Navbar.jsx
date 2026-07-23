import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

const PinMark = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0">
    <path
      d="M12 22s7-7.582 7-13A7 7 0 1 0 5 9c0 5.418 7 13 7 13Z"
      fill="#E0973D"
      stroke="#12403B"
      strokeWidth="1.4"
    />
    <circle cx="12" cy="9" r="2.4" fill="#12403B" />
  </svg>
);

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-paper/80 backdrop-blur-sm border-b border-ink-100 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 py-3.5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display font-semibold text-ink-500 text-lg tracking-tight">
          <PinMark />
          Market Gap Finder
        </Link>

        <div className="flex items-center gap-5 text-sm font-medium">
          {user ? (
            <>
              <Link to="/dashboard" className="text-ink-500/80 hover:text-ink-500 transition-colors">
                Dashboard
              </Link>
              <Link to="/history" className="text-ink-500/80 hover:text-ink-500 transition-colors">
                History
              </Link>
              <button
                onClick={handleLogout}
                className="px-3.5 py-1.5 rounded-lg border border-ink-100 text-ink-500 hover:bg-ink-50 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-ink-500/80 hover:text-ink-500 transition-colors">
                Login
              </Link>
              <Link
                to="/register"
                className="px-3.5 py-1.5 rounded-lg bg-ink-500 text-paper hover:bg-ink-600 transition-colors"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

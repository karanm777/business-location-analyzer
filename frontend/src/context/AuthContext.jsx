import React, { createContext, useState, useEffect } from "react";
import { fetchCurrentUser } from "../services/auth.service.js";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    fetchCurrentUser()
      .then((res) => setUser(res.data.user))
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("mgf:dashboardState");
        localStorage.removeItem("mgf:lastAnalysis");
        localStorage.removeItem("mgf:lastForm");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = (token, userData) => {
    localStorage.setItem("token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("mgf:dashboardState");
    localStorage.removeItem("mgf:lastAnalysis");
    localStorage.removeItem("mgf:lastForm");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

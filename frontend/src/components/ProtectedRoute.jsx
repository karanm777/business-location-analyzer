import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import Loader from "./Loader.jsx";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader label="Checking session..." />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

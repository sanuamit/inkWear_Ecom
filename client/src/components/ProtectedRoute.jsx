// src/components/ProtectedRoute.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "./Loader";

export default function ProtectedRoute({ adminOnly = false }) {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <Loader fullScreen />;
  }

  // No user → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Admin-only route but user is not admin
  if (adminOnly && !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

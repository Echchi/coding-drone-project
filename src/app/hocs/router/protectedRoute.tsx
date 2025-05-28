import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../shared/context/authProvider.tsx";

const ProtectedRoute = ({
  allowedRoles,
}: {
  allowedRoles: ("instructor" | "student")[];
}) => {
  const { role } = useAuth();

  if (!role) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/workspace" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

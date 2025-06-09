// components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { isTokenValid } from "../utils/auth";
import type { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  return isTokenValid(token) ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

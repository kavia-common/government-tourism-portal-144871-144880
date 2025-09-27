import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

/**
 * ProtectedRoute enforces authentication and optional role checks.
 * Props:
 * - children: ReactNode
 * - requireAuth?: boolean (default true)
 * - allowedRoles?: string[] (optional list of roles to allow)
 */
// PUBLIC_INTERFACE
export default function ProtectedRoute({ children, requireAuth = true, allowedRoles }) {
  /** This is a public function component. */
  const { isAuthenticated, role, ready } = useAuth();
  const location = useLocation();

  if (!ready) {
    return (
      <div className="w-full py-20 flex items-center justify-center text-gray-600">
        <Spinner />
        <span className="ml-2 text-sm">Loading...</span>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRoles && allowedRoles.length > 0 && (!role || !allowedRoles.includes(role))) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function Spinner() {
  return (
    <svg className="animate-spin h-5 w-5 text-ocean-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4A4 4 0 004 12z"/>
    </svg>
  );
}

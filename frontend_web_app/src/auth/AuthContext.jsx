import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { clearTokens, getTokens, setTokens } from "../api/client";

/**
 * AuthContext provides user auth state and role to the app.
 * It tracks:
 * - isAuthenticated: boolean based on presence of access token
 * - role: 'agent' | 'admin' | null
 * - setAuth: set tokens and role after login
 * - logout: clear tokens and reset role
 */
// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  /** This is a public function component. */
  const [role, setRole] = useState(null); // 'agent' | 'admin' | null
  const [ready, setReady] = useState(false);

  // Initialize auth from storage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem("gtp_role_v1");
      if (raw) setRole(raw);
    } catch {
      // ignore
    }
    // tokens are managed in client.js, just ensure we read them to warm cache
    getTokens();
    setReady(true);
  }, []);

  const setAuth = useCallback((tokens, roleValue) => {
    setTokens(tokens);
    setRole(roleValue || null);
    try {
      if (roleValue) {
        localStorage.setItem("gtp_role_v1", roleValue);
      } else {
        localStorage.removeItem("gtp_role_v1");
      }
    } catch {
      // ignore
    }
  }, []);

  const logout = useCallback(() => {
    clearTokens();
    setRole(null);
    try {
      localStorage.removeItem("gtp_role_v1");
    } catch {
      // ignore
    }
  }, []);

  const value = useMemo(() => ({
    isAuthenticated: !!getTokens()?.accessToken,
    role,
    setAuth,
    logout,
    ready
  }), [role, setAuth, logout, ready]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

const AuthContext = createContext(null);

// PUBLIC_INTERFACE
export function useAuth() {
  /** Hook to consume auth state and actions. */
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}

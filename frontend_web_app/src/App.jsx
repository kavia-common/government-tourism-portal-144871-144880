import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppShell from "./AppShell";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Registration from "./routes/Registration";
import Renewal from "./routes/Renewal";
import AdminDashboard from "./routes/AdminDashboard";
import { ToastProvider } from "./components/ui/Toast";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";

// PUBLIC_INTERFACE
export default function App() {
  /** Root app with providers and routes following Ocean Professional theme. */
  return (
    <ToastProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppShell />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/agent/login" element={<Navigate to="/login" replace />} />
              <Route path="/admin/login" element={<Navigate to="/login" replace />} />
              <Route
                path="/register"
                element={
                  <ProtectedRoute allowedRoles={["agent", "admin"]}>
                    <Registration />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/renew"
                element={
                  <ProtectedRoute allowedRoles={["agent", "admin"]}>
                    <Renewal />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ToastProvider>
  );
}

function NotFound() {
  return (
    <div className="bg-white rounded-xl shadow-soft border border-gray-100 p-8 text-center">
      <h2 className="text-2xl font-semibold text-gray-900">Page not found</h2>
      <p className="text-gray-600 mt-2">The page you are looking for does not exist.</p>
      <a href="/" className="inline-block mt-4 px-4 py-2 rounded-md bg-ocean-primary text-white font-semibold hover:opacity-95">
        Go home
      </a>
    </div>
  );
}

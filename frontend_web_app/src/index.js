import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppShell from './AppShell';
import Home from './routes/Home';
import Login from './routes/Login';
import Registration from './routes/Registration';
import Renewal from './routes/Renewal';
import AdminDashboard from './routes/AdminDashboard';
import { ToastProvider } from './components/ui/Toast';
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';

const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      // Registration and renewal require auth (agent or admin)
      {
        path: "/register",
        element: (
          <ProtectedRoute allowedRoles={['agent', 'admin']}>
            <Registration />
          </ProtectedRoute>
        )
      },
      {
        path: "/renew",
        element: (
          <ProtectedRoute allowedRoles={['agent', 'admin']}>
            <Renewal />
          </ProtectedRoute>
        )
      },
      // Admin dashboard requires admin role
      {
        path: "/admin",
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        )
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ToastProvider>
  </React.StrictMode>
);

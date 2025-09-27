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

const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Registration /> },
      { path: "/renew", element: <Renewal /> },
      { path: "/admin", element: <AdminDashboard /> }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  </React.StrictMode>
);

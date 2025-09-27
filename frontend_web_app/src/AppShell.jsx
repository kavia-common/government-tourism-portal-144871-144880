/* AppShell provides the main layout with header and navigation placeholders */
import { NavLink, Outlet } from "react-router-dom";
import logo from "./logo.svg";

export default function AppShell() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white/90 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} className="w-10 h-10" alt="logo" />
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                Government Tourism Portal
              </h1>
              <p className="text-xs text-gray-500">Ocean Professional</p>
            </div>
          </div>
          <nav className="flex items-center gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive ? "bg-blue-50 text-ocean-primary" : "text-gray-700 hover:text-gray-900"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/login"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Registration
            </NavLink>
            <NavLink
              to="/admin"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Admin
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Outlet />
        </div>
      </main>

      <footer className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6 text-sm text-gray-500">
          © {new Date().getFullYear()} Ministry of Tourism. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

/* AppShell provides the main layout with header and navigation placeholders */
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import logo from "./logo.svg";
import Button from "./components/ui/Button";
import { useAuth } from "./auth/AuthContext";

export default function AppShell() {
  const { isAuthenticated, role, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-ocean-background">
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
          <nav className="flex items-center gap-2">
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

            {!isAuthenticated && (
              <>
                <NavLink to="/login">
                  <Button variant="outline" size="sm">Login</Button>
                </NavLink>
                <NavLink to="/register">
                  <Button variant="secondary" size="sm">Registration</Button>
                </NavLink>
              </>
            )}

            {isAuthenticated && (
              <>
                <NavLink to="/renew">
                  <Button variant="outline" size="sm">Renewal</Button>
                </NavLink>
                <NavLink to="/admin">
                  <Button size="sm">Admin</Button>
                </NavLink>
                <span className="text-xs text-gray-600 px-2 py-1 rounded bg-gray-50 border border-gray-200">
                  Signed in as {role || "user"}
                </span>
                <Button variant="ghost" size="sm" onClick={onLogout}>Logout</Button>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Outlet />
        </div>
      </main>

      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6 text-sm text-gray-500">
          © {new Date().getFullYear()} Ministry of Tourism. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

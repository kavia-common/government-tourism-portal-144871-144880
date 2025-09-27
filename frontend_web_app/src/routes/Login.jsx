import Card, { CardContent, CardHeader } from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useState } from "react";
import { useToast } from "../components/ui/Toast";
import { loginAgent, loginAdmin } from "../api/modules/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

// PUBLIC_INTERFACE
export default function Login() {
  /** Agent/Admin login integrated with backend API. */
  const [role, setRole] = useState("agent"); // 'agent' | 'admin'
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const { add: toast } = useToast();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || (role === "admin" ? "/admin" : "/");

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    setSubmitting(true);
    try {
      const fn = role === "admin" ? loginAdmin : loginAgent;
      const res = await fn({ username, password });
      if (res.ok) {
        // capture tokens already stored by module, also set role context
        const token = res.data?.accessToken || res.data?.token || null;
        if (token) {
          // setAuth will persist role for guards
          setAuth({ accessToken: token, refreshToken: res.data?.refreshToken || null }, role);
        }
        toast("Login successful", "success");
        navigate(from, { replace: true });
      } else {
        const msg = (res.data && (res.data.message || res.data.error)) || "Invalid credentials";
        setFormError(msg);
        toast(`Login failed: ${msg}`, "danger");
      }
    } catch (err) {
      setFormError("Network error. Please try again.");
      toast("Network error. Please try again.", "danger");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader title="Login" subtitle="Agent and Admin authentication" />
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit} noValidate>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setRole("agent")}
                className={`px-3 py-1.5 rounded-md border text-sm ${role === "agent" ? "bg-blue-50 border-blue-200 text-blue-700" : "border-gray-300 text-gray-700"}`}
                aria-pressed={role === "agent"}
              >
                Agent
              </button>
              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`px-3 py-1.5 rounded-md border text-sm ${role === "admin" ? "bg-blue-50 border-blue-200 text-blue-700" : "border-gray-300 text-gray-700"}`}
                aria-pressed={role === "admin"}
              >
                Admin
              </button>
            </div>

            <Input
              id="username"
              label="Username"
              placeholder={role === "admin" ? "admin" : "agent1"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {formError && (
              <div className="text-sm text-red-600">{formError}</div>
            )}
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? (
                <span className="inline-flex items-center">
                  <Spinner />
                  <span className="ml-2">Signing in...</span>
                </span>
              ) : "Sign in"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Notes" />
        <CardContent>
          <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
            <li>Supports Agent and Admin roles.</li>
            <li>Uses bearer tokens with automatic refresh handling.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4 text-ocean-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4A4 4 0 004 12z"/>
    </svg>
  );
}

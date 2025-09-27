import Card, { CardContent, CardHeader } from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useState } from "react";
import { useToast } from "../components/ui/Toast";
import { loginAgent, loginAdmin } from "../api/modules/auth";
import { useNavigate } from "react-router-dom";

// PUBLIC_INTERFACE
export default function Login() {
  /** Agent/Admin login integrated with backend API. */
  const [role, setRole] = useState("agent"); // 'agent' | 'admin'
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { add: toast } = useToast();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const fn = role === "admin" ? loginAdmin : loginAgent;
      const res = await fn({ username, password });
      if (res.ok) {
        toast("Login successful", "success");
        navigate(role === "admin" ? "/admin" : "/");
      } else {
        const msg = (res.data && (res.data.message || res.data.error)) || "Invalid credentials";
        toast(`Login failed: ${msg}`, "danger");
      }
    } catch (err) {
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
          <form className="space-y-4" onSubmit={onSubmit}>
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
              placeholder="Enter username"
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
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Signing in..." : "Sign in"}
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

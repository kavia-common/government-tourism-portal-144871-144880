import Button from "../components/ui/Button";
import Card, { CardContent } from "../components/ui/Card";

// PUBLIC_INTERFACE
export default function Home() {
  /** Landing page showing agent and admin login entry points. */
  return (
    <section className="space-y-6">
      <Card>
        <CardContent>
          <h2 className="text-2xl font-semibold text-gray-900">Welcome</h2>
          <p className="text-gray-600 mt-2">
            Access agent and admin tools for tourist registrations, renewals, and incident management.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/login"><Button>Agent/Admin Login</Button></a>
            <a href="/register"><Button variant="outline">Registration</Button></a>
            <a href="/renew"><Button variant="secondary">Renewal</Button></a>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Note: Set REACT_APP_API_BASE_URL in your environment to connect to backend.
          </p>
        </CardContent>
      </Card>

      <Card className="gradient-ocean">
        <CardContent>
          <h3 className="text-lg font-semibold text-gray-900">Ocean Professional Theme</h3>
          <p className="text-gray-700">
            Blue primary with amber accents, subtle shadows, rounded corners, and a minimalist design.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}

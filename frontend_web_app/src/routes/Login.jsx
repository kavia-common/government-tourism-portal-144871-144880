import Card, { CardContent, CardHeader } from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

// PUBLIC_INTERFACE
export default function Login() {
  /** Simple login placeholder form for agent/admin */
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader title="Login" subtitle="Agent and Admin authentication" />
        <CardContent>
          <form className="space-y-4">
            <Input id="username" label="Username" placeholder="Enter username" />
            <Input id="password" type="password" label="Password" placeholder="Enter password" />
            <Button type="button" className="w-full">Sign in</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Notes" />
        <CardContent>
          <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
            <li>Supports Agent and Admin roles.</li>
            <li>OTP and sessions integrate later with the backend.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

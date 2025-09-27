import Card, { CardContent, CardHeader } from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

// PUBLIC_INTERFACE
export default function Registration() {
  /** Tourist registration placeholder form with Ocean Professional styling */
  return (
    <Card className="p-0">
      <CardHeader title="Tourist Registration" subtitle="Register tourists and simulate blockchain ID issuance." />
      <CardContent>
        <form className="grid md:grid-cols-2 gap-6">
          <Input id="fullName" label="Full Name" placeholder="Jane Doe" />
          <Input id="passportNumber" label="Passport Number" placeholder="X1234567" />
          <Input id="nationality" label="Nationality" placeholder="Country" />
          <Input id="email" type="email" label="Email" placeholder="jane@example.com" />
          <div className="md:col-span-2">
            <Button type="button">Register</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

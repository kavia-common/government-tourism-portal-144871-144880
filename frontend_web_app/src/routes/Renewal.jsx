import Card, { CardContent, CardHeader, CardFooter } from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

/**
 * Renewal page to extend tourist validity with dummy content.
 */
// PUBLIC_INTERFACE
export default function Renewal() {
  /** Renewal form skeleton using Ocean Professional components. */
  return (
    <Card>
      <CardHeader title="Tourist Renewal" subtitle="Extend tourist validity period (dummy flow)" />
      <CardContent>
        <form className="grid md:grid-cols-2 gap-6">
          <Input id="touristId" label="Tourist ID" placeholder="e.g., TRST-12345" />
          <Input id="extraDays" type="number" label="Extra Days" placeholder="30" helperText="Number of days to extend validity" />
        </form>
      </CardContent>
      <CardFooter>
        <div className="flex gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Renew</Button>
        </div>
      </CardFooter>
    </Card>
  );
}

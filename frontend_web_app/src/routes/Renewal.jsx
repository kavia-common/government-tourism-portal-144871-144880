import Card, { CardContent, CardHeader, CardFooter } from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useState } from "react";
import { useToast } from "../components/ui/Toast";
import { renewTourist } from "../api/modules/tourists";

/**
 * Renewal page to extend tourist validity against backend API.
 */
// PUBLIC_INTERFACE
export default function Renewal() {
  /** Renewal form using tourists renew endpoint. */
  const [touristId, setTouristId] = useState("");
  const [extraDays, setExtraDays] = useState(30);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { add: toast } = useToast();

  const validate = () => {
    const e = {};
    if (!touristId.trim()) e.touristId = "Tourist ID is required";
    const days = Number(extraDays);
    if (Number.isNaN(days) || days <= 0) e.extraDays = "Enter a valid number of days";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onRenew = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await renewTourist(touristId, Number(extraDays));
      if (res.ok) {
        toast("Renewal successful.", "success");
        setTouristId("");
        setExtraDays(30);
        setErrors({});
      } else {
        const msg = (res.data && (res.data.message || res.data.error)) || "Not found or validation error";
        toast(`Renewal failed: ${msg}`, "danger");
      }
    } catch {
      toast("Network error. Please try again.", "danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader title="Tourist Renewal" subtitle="Extend tourist validity period" />
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <Input id="touristId" label="Tourist ID" placeholder="e.g., TRST-12345" value={touristId} onChange={(e) => setTouristId(e.target.value)} error={errors.touristId} />
          <Input id="extraDays" type="number" label="Extra Days" placeholder="30" helperText="Number of days to extend validity" value={extraDays} onChange={(e) => setExtraDays(e.target.value)} error={errors.extraDays} />
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => { setTouristId(""); setExtraDays(30); setErrors({}); }}>Cancel</Button>
          <Button onClick={onRenew} disabled={loading}>
            {loading ? (
              <span className="inline-flex items-center">
                <Spinner />
                <span className="ml-2">Renewing...</span>
              </span>
            ) : "Renew"}
          </Button>
        </div>
      </CardFooter>
    </Card>
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

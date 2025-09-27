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
  const { add: toast } = useToast();

  const onRenew = async () => {
    if (!touristId) {
      toast("Please enter a Tourist ID.", "warning");
      return;
    }
    setLoading(true);
    try {
      const res = await renewTourist(touristId, Number(extraDays));
      if (res.ok) {
        toast("Renewal successful.", "success");
        setTouristId("");
        setExtraDays(30);
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
          <Input id="touristId" label="Tourist ID" placeholder="e.g., TRST-12345" value={touristId} onChange={(e) => setTouristId(e.target.value)} />
          <Input id="extraDays" type="number" label="Extra Days" placeholder="30" helperText="Number of days to extend validity" value={extraDays} onChange={(e) => setExtraDays(e.target.value)} />
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => { setTouristId(""); setExtraDays(30); }}>Cancel</Button>
          <Button onClick={onRenew} disabled={loading}>{loading ? "Renewing..." : "Renew"}</Button>
        </div>
      </CardFooter>
    </Card>
  );
}

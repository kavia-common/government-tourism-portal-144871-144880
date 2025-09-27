import Card, { CardContent, CardHeader } from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useState } from "react";
import { useToast } from "../components/ui/Toast";
import { createTourist } from "../api/modules/tourists";
import { requestOtp, verifyOtp } from "../api/modules/otp";

// PUBLIC_INTERFACE
export default function Registration() {
  /** Tourist registration integrated with backend; optional email OTP verification. */
  const [fullName, setFullName] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [nationality, setNationality] = useState("");
  const [email, setEmail] = useState("");
  const [validityDays, setValidityDays] = useState(90);
  const [submitting, setSubmitting] = useState(false);

  const [otpRequested, setOtpRequested] = useState(false);
  const [otpCode, setOtpCode] = useState("");

  const { add: toast } = useToast();

  const onRegister = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Optional OTP flow: if email provided and not verified yet, request OTP
      if (email && !otpRequested) {
        const r = await requestOtp(email);
        if (r.ok) {
          setOtpRequested(true);
          toast("OTP sent to your email. Please verify.", "info");
          setSubmitting(false);
          return;
        } else {
          toast("Failed to send OTP. You can continue without OTP.", "warning");
        }
      }

      // If OTP requested, verify first
      if (email && otpRequested) {
        const v = await verifyOtp(email, otpCode);
        if (!v.ok) {
          toast("OTP verification failed. Check the code.", "danger");
          setSubmitting(false);
          return;
        }
      }

      const res = await createTourist({
        fullName,
        passportNumber,
        nationality,
        email: email || undefined,
        validityDays: Number(validityDays) || 90,
      });

      if (res.ok) {
        toast("Tourist registered successfully", "success");
        // reset form
        setFullName("");
        setPassportNumber("");
        setNationality("");
        setEmail("");
        setValidityDays(90);
        setOtpRequested(false);
        setOtpCode("");
      } else {
        const msg = (res.data && (res.data.message || res.data.error)) || "Validation error";
        toast(`Registration failed: ${msg}`, "danger");
      }
    } catch {
      toast("Network error. Please try again.", "danger");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="p-0">
      <CardHeader title="Tourist Registration" subtitle="Register tourists and simulate blockchain ID issuance." />
      <CardContent>
        <form className="grid md:grid-cols-2 gap-6" onSubmit={onRegister}>
          <Input id="fullName" label="Full Name" placeholder="Jane Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          <Input id="passportNumber" label="Passport Number" placeholder="X1234567" value={passportNumber} onChange={(e) => setPassportNumber(e.target.value)} required />
          <Input id="nationality" label="Nationality" placeholder="Country" value={nationality} onChange={(e) => setNationality(e.target.value)} />
          <Input id="email" type="email" label="Email (optional)" placeholder="jane@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input id="validityDays" type="number" label="Validity Days" placeholder="90" value={validityDays} onChange={(e) => setValidityDays(e.target.value)} />
          {email && otpRequested && (
            <Input id="otp" label="Enter OTP" placeholder="123456" value={otpCode} onChange={(e) => setOtpCode(e.target.value)} />
          )}
          <div className="md:col-span-2">
            <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
              {submitting ? "Processing..." : "Register"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

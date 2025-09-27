import Card, { CardContent, CardHeader } from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useState } from "react";
import { useToast } from "../components/ui/Toast";
import { createTourist } from "../api/modules/tourists";
import { requestOtp, verifyOtp } from "../api/modules/otp";

/**
 * Generate a simulated blockchain ID (non-cryptographic, client-side).
 * This is for UX demonstration only and NOT suitable for production identity.
 */
function simulateBlockchainId(seed) {
  const input = `${seed}:${Date.now()}:${Math.random().toString(36).slice(2)}`;
  let hash = 5381;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 33) ^ input.charCodeAt(i);
  }
  const hex = (hash >>> 0).toString(16).padStart(8, "0");
  return `BCID-${hex.toUpperCase()}`;
}

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

  const [issuedBlockchainId, setIssuedBlockchainId] = useState(null);

  const [errors, setErrors] = useState({});
  const { add: toast } = useToast();

  const validate = () => {
    const e = {};
    if (!fullName.trim()) e.fullName = "Full name is required";
    if (!passportNumber.trim()) e.passportNumber = "Passport number is required";
    const days = Number(validityDays);
    if (Number.isNaN(days) || days <= 0) e.validityDays = "Enter a valid number of days";
    if (email && !/^\S+@\S+\.\S+$/.test(email)) e.email = "Enter a valid email";
    if (email && otpRequested && !otpCode.trim()) e.otp = "Enter the OTP you received";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onRegister = async (e) => {
    e.preventDefault();
    if (!validate()) return;
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
        // Simulate client-side blockchain ID issuance for demo
        const bcid = simulateBlockchainId(`${passportNumber}:${fullName}`);
        setIssuedBlockchainId(bcid);
        toast(`Tourist registered. Blockchain ID issued: ${bcid}`, "success");

        // reset form
        setFullName("");
        setPassportNumber("");
        setNationality("");
        setEmail("");
        setValidityDays(90);
        setOtpRequested(false);
        setOtpCode("");
        setErrors({});
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
        <form className="grid md:grid-cols-2 gap-6" onSubmit={onRegister} noValidate>
          <Input id="fullName" label="Full Name" placeholder="Jane Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} error={errors.fullName} required />
          <Input id="passportNumber" label="Passport Number" placeholder="X1234567" value={passportNumber} onChange={(e) => setPassportNumber(e.target.value)} error={errors.passportNumber} required />
          <Input id="nationality" label="Nationality" placeholder="Country" value={nationality} onChange={(e) => setNationality(e.target.value)} />
          <Input id="email" type="email" label="Email (optional)" placeholder="jane@example.com" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
          <Input id="validityDays" type="number" label="Validity Days" placeholder="90" value={validityDays} onChange={(e) => setValidityDays(e.target.value)} error={errors.validityDays} />
          {email && otpRequested && (
            <Input id="otp" label="Enter OTP" placeholder="123456" value={otpCode} onChange={(e) => setOtpCode(e.target.value)} error={errors.otp} />
          )}
          <div className="md:col-span-2">
            <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
              {submitting ? (
                <span className="inline-flex items-center">
                  <Spinner />
                  <span className="ml-2">Processing...</span>
                </span>
              ) : "Register"}
            </Button>
          </div>
        </form>

        {issuedBlockchainId && (
          <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-blue-50">
            <p className="text-sm text-gray-700">
              Simulated Blockchain ID issued for the last registration:
            </p>
            <p className="mt-1 font-mono text-sm text-blue-800">{issuedBlockchainId}</p>
          </div>
        )}
      </CardContent>
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

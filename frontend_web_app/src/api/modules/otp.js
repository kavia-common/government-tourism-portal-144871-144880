import { post } from "../client";

// PUBLIC_INTERFACE
export async function requestOtp(identifier) {
  /** Request an OTP for identifier (phone/email). */
  return await post("/otp/request", { identifier }, { auth: false });
}

// PUBLIC_INTERFACE
export async function verifyOtp(identifier, code) {
  /** Verify OTP for identifier and code. */
  return await post("/otp/verify", { identifier, code }, { auth: false });
}

import React from 'react'
import OTPInput from '../components/OTPInput.jsx'
import { useAuthStore } from '../store/auth.js'

export default function OTPVerify() {
  const { otpContext } = useAuthStore()
  return (
    <div className="max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">OTP Verification</h1>
      <div className="text-sm text-gray-600">Complete the verification for both email and phone.</div>
      <OTPInput channel="Email" to={otpContext?.email} onVerified={()=>{}} />
      <OTPInput channel="SMS" to={otpContext?.phone} onVerified={()=>{}} />
    </div>
  )
}

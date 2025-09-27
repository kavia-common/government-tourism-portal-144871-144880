import { useState } from 'react'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import OTPInput from '../components/OTPInput'
import { Api } from '../services/api'

export default function Renewal() {
  const [idOrPassport, setIdOrPassport] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [emailOTP, setEmailOTP] = useState<string>('')
  const [phoneOTP, setPhoneOTP] = useState<string>('')
  const [step, setStep] = useState<'form' | 'otp-email' | 'otp-phone' | 'result'>('form')
  const [result, setResult] = useState<{ renewed: boolean, renewedUntil: string } | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await Api.sendOTP('email', email)
    setEmailOTP(res.otp)
    setStep('otp-email')
  }

  const verifyEmail = async (code: string) => {
    const ok = await Api.verifyOTP(code, emailOTP)
    if (!ok) return alert('Incorrect Email OTP.')
    const res = await Api.sendOTP('phone', phone)
    setPhoneOTP(res.otp)
    setStep('otp-phone')
  }

  const verifyPhone = async (code: string) => {
    const ok = await Api.verifyOTP(code, phoneOTP)
    if (!ok) return alert('Incorrect Phone OTP.')
    const r = await Api.renewTourist({ idOrPassport, email, phone })
    setResult(r)
    setStep('result')
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <Card>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Renew Tourist Registration</h2>
        </div>
        {step === 'form' && (
          <form className="mt-6 space-y-4" onSubmit={submit}>
            <Input label="Tourist ID or Passport Number" required value={idOrPassport} onChange={e => setIdOrPassport(e.target.value)} />
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Email" type="email" required value={email} onChange={e => setEmail(e.target.value)} />
              <Input label="Phone" required value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
            <button className="btn btn-primary">Submit & Verify OTP</button>
          </form>
        )}
        {step === 'otp-email' && (
          <div className="mt-6 space-y-3">
            <p className="text-sm text-gray-600">Enter the email OTP sent to <b>{email}</b></p>
            <OTPInput onComplete={verifyEmail} />
            <button className="btn btn-secondary" onClick={() => setStep('form')}>Back</button>
          </div>
        )}
        {step === 'otp-phone' && (
          <div className="mt-6 space-y-3">
            <p className="text-sm text-gray-600">Enter the phone OTP sent to <b>{phone}</b></p>
            <OTPInput onComplete={verifyPhone} />
          </div>
        )}
        {step === 'result' && result && (
          <div className="mt-6 space-y-3">
            <div className="p-4 rounded-lg bg-amber-50 text-amber-900">Renewal Successful</div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="card p-4">
                <div className="text-sm text-gray-500">Renewed</div>
                <div className="font-semibold">{result.renewed ? 'Yes' : 'No'}</div>
              </div>
              <div className="card p-4">
                <div className="text-sm text-gray-500">Valid Until</div>
                <div className="font-semibold">{result.renewedUntil}</div>
              </div>
            </div>
          </div>
        )}
      </Card>
    </section>
  )
}

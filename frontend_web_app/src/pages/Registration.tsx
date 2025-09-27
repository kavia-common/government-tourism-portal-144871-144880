import { useState } from 'react'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Select from '../components/ui/Select'
import OTPInput from '../components/OTPInput'
import { getDynamicFieldsByNationality, validateEmail, validatePhone, Nationality } from '../utils/formHelpers'
import { Api } from '../services/api'

export default function Registration() {
  const [step, setStep] = useState<'form' | 'otp-email' | 'otp-phone' | 'result'>('form')
  const [nationality, setNationality] = useState<Nationality>('Domestic')
  const [form, setForm] = useState<any>({ name: '', email: '', phone: '', nationality: 'Domestic' })
  const [emailOTP, setEmailOTP] = useState<string>('')
  const [phoneOTP, setPhoneOTP] = useState<string>('')
  const [result, setResult] = useState<{touristId: string, digitalId: string, txHash: string} | null>(null)
  const [loading, setLoading] = useState(false)

  const dynamicFields = getDynamicFieldsByNationality(nationality)

  const update = (key: string, value: string) => {
    setForm((f: any) => ({ ...f, [key]: value }))
  }

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateEmail(form.email) || !validatePhone(form.phone)) return
    setLoading(true)
    const emailRes = await Api.sendOTP('email', form.email)
    setEmailOTP(emailRes.otp)
    setLoading(false)
    setStep('otp-email')
  }

  const verifyEmailOTP = async (code: string) => {
    const ok = await Api.verifyOTP(code, emailOTP)
    if (ok) {
      const phoneRes = await Api.sendOTP('phone', form.phone)
      setPhoneOTP(phoneRes.otp)
      setStep('otp-phone')
    } else {
      alert('Incorrect Email OTP. Try again.')
    }
  }

  const verifyPhoneOTP = async (code: string) => {
    const ok = await Api.verifyOTP(code, phoneOTP)
    if (ok) {
      setLoading(true)
      const res = await Api.registerTourist({ ...form, dynamic: dynamicFields })
      setResult(res)
      setStep('result')
      setLoading(false)
    } else {
      alert('Incorrect Phone OTP. Try again.')
    }
  }

  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <h2 className="text-2xl font-semibold">New Tourist Registration</h2>
            {step === 'form' && (
              <form className="mt-6 space-y-4" onSubmit={submitForm}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Full Name" required value={form.name} onChange={e => update('name', e.target.value)} />
                  <Select label="Nationality" value={nationality} onChange={e => { setNationality(e.target.value as Nationality); update('nationality', e.target.value) }}>
                    <option>Domestic</option>
                    <option>Foreign</option>
                  </Select>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Email" type="email" required value={form.email} onChange={e => update('email', e.target.value)} />
                  <Input label="Phone" required placeholder="e.g., 9876543210" value={form.phone} onChange={e => update('phone', e.target.value)} />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {dynamicFields.map((f) => (
                    <Input key={f.key} label={f.label} required={f.required} onChange={e => update(f.key, e.target.value)} />
                  ))}
                </div>
                <button className="btn btn-primary" disabled={loading}>{loading ? 'Submitting...' : 'Submit & Verify OTP'}</button>
              </form>
            )}

            {step === 'otp-email' && (
              <div className="mt-6 space-y-4">
                <p className="text-gray-600 text-sm">Enter the 6-digit OTP sent to your email: <b>{form.email}</b></p>
                <OTPInput onComplete={verifyEmailOTP} />
                <button className="btn btn-secondary" onClick={() => setStep('form')}>Back</button>
              </div>
            )}

            {step === 'otp-phone' && (
              <div className="mt-6 space-y-4">
                <p className="text-gray-600 text-sm">Enter the 6-digit OTP sent to your phone: <b>{form.phone}</b></p>
                <OTPInput onComplete={verifyPhoneOTP} />
              </div>
            )}

            {step === 'result' && result && (
              <div className="mt-6 space-y-3">
                <div className="p-4 rounded-lg bg-amber-50 text-amber-900">
                  Registration successful! A digital Tourist ID has been generated on Polygon (simulated).
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="card p-4">
                    <div className="text-sm text-gray-500">Tourist ID</div>
                    <div className="font-semibold">{result.touristId}</div>
                  </div>
                  <div className="card p-4">
                    <div className="text-sm text-gray-500">Digital ID</div>
                    <div className="font-semibold">{result.digitalId}</div>
                  </div>
                  <div className="card p-4 sm:col-span-2">
                    <div className="text-sm text-gray-500">Blockchain Tx Hash</div>
                    <div className="font-mono break-all">{result.txHash}</div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
        <aside className="space-y-4">
          <div className="card p-4">
            <div className="text-sm text-gray-600">Instructions</div>
            <ul className="mt-2 list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>Fill in accurate tourist details.</li>
              <li>Verify via Email and Phone OTP (simulated).</li>
              <li>Upon success, a digital ID is issued.</li>
            </ul>
          </div>
          <div className="card p-4">
            <div className="text-sm text-gray-600">Security Notice</div>
            <p className="text-sm text-gray-600 mt-1">All operations are simulated for demo; no real blockchain interaction occurs.</p>
          </div>
        </aside>
      </div>
    </section>
  )
}

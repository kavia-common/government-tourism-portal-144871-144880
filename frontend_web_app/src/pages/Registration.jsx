import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormField from '../components/FormField.jsx'
import { submitRegistration } from '../services/api.js'
import { useAuthStore } from '../store/auth.js'

export default function Registration() {
  const [form, setForm] = useState({
    fullName: '',
    nationality: 'Domestic',
    idNumber: '',
    passportNumber: '',
    email: '',
    phone: '',
    address: '',
    arrivalDate: '',
    departureDate: '',
    purpose: 'Leisure'
  })
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const navigate = useNavigate()
  const { setOtpContext } = useAuthStore()

  const update = (k, v) => setForm(s => ({ ...s, [k]: v }))

  const onNext = (e) => {
    e.preventDefault()
    // Simple validation
    if (!form.fullName || !form.email || !form.phone) return
    setOtpContext({ purpose: 'registration', email: form.email, phone: form.phone })
    setStep(2)
  }

  const onSubmit = async () => {
    setLoading(true)
    try {
      const res = await submitRegistration(form)
      setResult(res)
      setStep(3)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">New Registration</h1>

      {step === 1 && (
        <form onSubmit={onNext} className="card p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <FormField label="Full Name" required>
              <input className="input" value={form.fullName} onChange={e=>update('fullName', e.target.value)} />
            </FormField>
            <FormField label="Nationality" required>
              <select className="input" value={form.nationality} onChange={e=>update('nationality', e.target.value)}>
                <option>Domestic</option>
                <option>Foreign</option>
                <option>NRI</option>
              </select>
            </FormField>
          </div>

          {form.nationality === 'Domestic' && (
            <FormField label="Government ID Number (Aadhaar/ID)" required>
              <input className="input" value={form.idNumber} onChange={e=>update('idNumber', e.target.value)} />
            </FormField>
          )}
          {form.nationality !== 'Domestic' && (
            <FormField label="Passport Number" required>
              <input className="input" value={form.passportNumber} onChange={e=>update('passportNumber', e.target.value)} />
            </FormField>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <FormField label="Email" required>
              <input type="email" className="input" value={form.email} onChange={e=>update('email', e.target.value)} />
            </FormField>
            <FormField label="Phone" required>
              <input type="tel" className="input" value={form.phone} onChange={e=>update('phone', e.target.value)} />
            </FormField>
          </div>

          <FormField label="Address">
            <textarea className="input" rows={2} value={form.address} onChange={e=>update('address', e.target.value)} />
          </FormField>

          <div className="grid md:grid-cols-3 gap-4">
            <FormField label="Arrival Date">
              <input type="date" className="input" value={form.arrivalDate} onChange={e=>update('arrivalDate', e.target.value)} />
            </FormField>
            <FormField label="Departure Date">
              <input type="date" className="input" value={form.departureDate} onChange={e=>update('departureDate', e.target.value)} />
            </FormField>
            <FormField label="Purpose of Visit">
              <select className="input" value={form.purpose} onChange={e=>update('purpose', e.target.value)}>
                <option>Leisure</option>
                <option>Business</option>
                <option>Pilgrimage</option>
              </select>
            </FormField>
          </div>

          <div className="flex justify-end gap-3">
            <button type="button" className="px-4 py-2 rounded-lg bg-gray-100" onClick={()=>navigate(-1)}>Cancel</button>
            <button className="btn-primary">Proceed to OTP</button>
          </div>
        </form>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div className="card p-4">
            <div className="font-medium">Step 2: Verify Contact</div>
            <div className="text-sm text-gray-600">We will simulate OTP verification for email and phone.</div>
          </div>
          <div className="flex justify-end">
            <button className="btn-primary" onClick={onSubmit} disabled={loading}>{loading ? 'Submitting…' : 'Submit Registration'}</button>
          </div>
        </div>
      )}

      {step === 3 && result && (
        <div className="card p-6 space-y-3">
          <div className="text-green-700 font-medium">Registration Submitted Successfully</div>
          <div className="text-sm">Digital Tourist ID: <span className="font-mono">{result.digitalTouristId}</span></div>
          <div className="text-sm">Polygon Tx (simulated): <span className="font-mono break-all">{result.polygonTx}</span></div>
          <div className="flex justify-end">
            <button className="btn-secondary" onClick={()=>navigate('/agent')}>Back to Agent Portal</button>
          </div>
        </div>
      )}
    </div>
  )
}

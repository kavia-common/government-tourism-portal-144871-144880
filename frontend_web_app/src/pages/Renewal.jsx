import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormField from '../components/FormField.jsx'
import { submitRenewal } from '../services/api.js'

export default function Renewal() {
  const [tid, setTid] = useState('')
  const [email, setEmail] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await submitRenewal({ tid, email })
      setResult(res)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Renew Digital Tourist ID</h1>
      <form onSubmit={onSubmit} className="card p-6 space-y-4">
        <FormField label="Tourist ID" required>
          <input className="input" value={tid} onChange={(e)=>setTid(e.target.value)} placeholder="TID-XXXXXX"/>
        </FormField>
        <FormField label="Registered Email" required>
          <input type="email" className="input" value={email} onChange={(e)=>setEmail(e.target.value)} />
        </FormField>
        <div className="flex justify-end">
          <button className="btn-primary" disabled={loading}>{loading ? 'Processing…' : 'Renew'}</button>
        </div>
      </form>

      {result && (
        <div className="card p-6 mt-4">
          <div className="text-green-700 font-medium">Renewal Successful</div>
          <div className="text-sm">Valid Until: <span className="font-medium">{result.validUntil}</span></div>
          <div className="flex justify-end">
            <button className="btn-secondary" onClick={()=>navigate('/agent')}>Back to Agent Portal</button>
          </div>
        </div>
      )}
    </div>
  )
}

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth.js'
import { login as apiLogin } from '../services/api.js'
import FormField from '../components/FormField.jsx'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuthStore()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await apiLogin({ role: 'admin', email, password })
      login({ role: 'admin', email: res.email })
      navigate('/admin')
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto card p-6">
      <h1 className="text-xl font-semibold mb-4">Administrator Login</h1>
      {error && <div className="mb-3 text-error text-sm">{error}</div>}
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField label="Email" required>
          <input type="email" className="input" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="admin@example.gov"/>
        </FormField>
        <FormField label="Password" required>
          <input type="password" className="input" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="••••••••"/>
        </FormField>
        <button className="btn-secondary w-full" disabled={loading}>{loading ? 'Signing In…' : 'Sign In'}</button>
      </form>
      <p className="mt-4 text-sm text-gray-600">Demo: any email/password works.</p>
    </div>
  )
}

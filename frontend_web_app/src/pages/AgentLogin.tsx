import { useState } from 'react'
import Input from '../components/ui/Input'
import Card from '../components/ui/Card'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'

export default function AgentLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuthStore()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      login({ id: 'agent-1', name: 'Tourism Agent', role: 'agent', email })
      navigate('/agent')
      setLoading(false)
    }, 800)
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="max-w-md mx-auto">
        <Card>
          <h2 className="text-2xl font-semibold">Agent Login</h2>
          <p className="text-sm text-gray-600 mt-1">Use demo credentials to proceed.</p>
          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            <Input label="Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input label="Password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="btn btn-primary w-full" disabled={loading}>{loading ? 'Signing in...' : 'Sign In'}</button>
          </form>
          <div className="mt-4 text-sm text-gray-600">
            After login you can start new registrations or renewals with OTP simulation.
          </div>
        </Card>
      </div>
    </section>
  )
}

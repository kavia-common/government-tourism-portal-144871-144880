import { useState } from 'react'
import Input from '../components/ui/Input'
import Card from '../components/ui/Card'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuthStore()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      login({ id: 'admin-1', name: 'Portal Admin', role: 'admin', email: `${username}@gov.local` })
      navigate('/admin/dashboard')
      setLoading(false)
    }, 800)
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="max-w-md mx-auto">
        <Card>
          <h2 className="text-2xl font-semibold">Admin Login</h2>
          <p className="text-sm text-gray-600 mt-1">Admin access for monitoring and incident response.</p>
          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            <Input label="Username" required value={username} onChange={(e) => setUsername(e.target.value)} />
            <Input label="Password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="btn btn-primary w-full" disabled={loading}>{loading ? 'Signing in...' : 'Sign In'}</button>
          </form>
        </Card>
      </div>
    </section>
  )
}

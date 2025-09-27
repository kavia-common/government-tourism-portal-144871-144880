import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-text">Welcome to the Government Tourism Portal</h1>
          <p className="mt-3 text-gray-600">
            Securely manage tourist registrations, renewals, and monitor national tourism safety with real-time alerts.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <Link to="/agent-login" className="btn btn-primary">Agent Login</Link>
            <Link to="/admin-login" className="btn btn-secondary">Admin Login</Link>
          </div>
          <div className="mt-6 p-4 bg-white rounded-xl shadow-subtle">
            <p className="text-sm text-gray-600">
              This is a demo interface with simulated backend and OTP. No real data is processed.
            </p>
          </div>
        </div>
        <div className="card p-0 overflow-hidden">
          <div className="h-64 bg-gradient-to-br from-blue-500/10 to-gray-50 grid place-items-center">
            <div className="text-center">
              <div className="text-7xl">🛡️</div>
              <div className="mt-2 text-gray-600">Modern, secure and responsive</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

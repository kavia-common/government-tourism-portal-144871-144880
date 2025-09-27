import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export default function Header() {
  const location = useLocation()
  const { isAuthenticated, user, logout } = useAuthStore()

  return (
    <header className="bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-primary text-white grid place-items-center font-bold">GP</div>
          <div>
            <div className="text-sm text-gray-500 leading-none">Ministry of Tourism</div>
            <div className="font-semibold text-text leading-tight">Government Tourism Portal</div>
          </div>
        </Link>
        <nav className="flex items-center gap-2">
          {!isAuthenticated && (
            <>
              <Link to="/agent-login" className={`btn ${location.pathname.includes('agent-login') ? 'btn-primary' : 'btn-secondary'}`}>Agent</Link>
              <Link to="/admin-login" className={`btn ${location.pathname.includes('admin-login') ? 'btn-primary' : 'btn-secondary'}`}>Admin</Link>
            </>
          )}
          {isAuthenticated && user && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Signed in as <b>{user.name}</b> ({user.role})</span>
              <button className="btn btn-secondary" onClick={logout}>Logout</button>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

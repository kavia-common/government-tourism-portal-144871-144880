import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/auth.js'

export default function Layout({ children }) {
  const { user, logout } = useAuthStore()
  const location = useLocation()
  const onHome = location.pathname === '/'

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/15 to-secondary/15 flex items-center justify-center">
              <span className="text-primary font-bold">GT</span>
            </div>
            <div>
              <div className="text-lg font-semibold text-text">Government Tourism Portal</div>
              <div className="text-xs text-gray-500">Official Service</div>
            </div>
          </Link>
          <nav className="flex items-center gap-3">
            {!user && (
              <>
                <Link className="btn-primary text-sm" to="/agent/login">Agent Login</Link>
                <Link className="btn-secondary text-sm" to="/admin/login">Admin Login</Link>
              </>
            )}
            {user && (
              <>
                {user.role === 'agent' && (
                  <>
                    <Link className="text-sm px-3 py-2 rounded-lg hover:bg-gray-100" to="/agent">Agent Portal</Link>
                    <Link className="text-sm px-3 py-2 rounded-lg hover:bg-gray-100" to="/agent/registration">New Registration</Link>
                    <Link className="text-sm px-3 py-2 rounded-lg hover:bg-gray-100" to="/agent/renewal">Renewal</Link>
                  </>
                )}
                {user.role === 'admin' && (
                  <Link className="text-sm px-3 py-2 rounded-lg hover:bg-gray-100" to="/admin">Dashboard</Link>
                )}
                <button className="ml-2 text-sm px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100" onClick={logout}>Logout</button>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className={`flex-1 ${onHome ? 'brand-gradient' : 'bg-background'}`}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          {children}
        </div>
      </main>
      <footer className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4 text-xs text-gray-500">
          © {new Date().getFullYear()} Ministry of Tourism. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import AgentLogin from './pages/AgentLogin'
import AdminLogin from './pages/AdminLogin'
import Registration from './pages/Registration'
import Renewal from './pages/Renewal'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'
import Footer from './components/Footer'
import { useAuthStore } from './store/authStore'
import AgentHub from './pages/AgentHub'

function PrivateRoute({ children, role }: { children: JSX.Element, role: 'agent' | 'admin' }) {
  const { isAuthenticated, user } = useAuthStore()
  if (!isAuthenticated || !user || user.role !== role) {
    return <Navigate to={role === 'agent' ? '/agent-login' : '/admin-login'} replace />
  }
  return children
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-ocean-gradient">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agent-login" element={<AgentLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/agent" element={
            <PrivateRoute role="agent">
              <AgentHub />
            </PrivateRoute>
          } />
          <Route path="/register" element={
            <PrivateRoute role="agent">
              <Registration />
            </PrivateRoute>
          } />
          <Route path="/renew" element={
            <PrivateRoute role="agent">
              <Renewal />
            </PrivateRoute>
          } />
          <Route path="/admin/dashboard" element={
            <PrivateRoute role="admin">
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

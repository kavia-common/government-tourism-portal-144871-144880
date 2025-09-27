import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import AgentLogin from './pages/AgentLogin.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AgentPortal from './pages/AgentPortal.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import Registration from './pages/Registration.jsx'
import Renewal from './pages/Renewal.jsx'
import OTPVerify from './pages/OTPVerify.jsx'
import NotFound from './pages/NotFound.jsx'
import Layout from './components/Layout.jsx'
import { useAuthStore } from './store/auth.js'

export default function App() {
  const { user } = useAuthStore()

  // Simple route guards
  const PrivateAgent = ({ children }) => {
    if (!user || user.role !== 'agent') return <Navigate to="/agent/login" replace />
    return children
  }
  const PrivateAdmin = ({ children }) => {
    if (!user || user.role !== 'admin') return <Navigate to="/admin/login" replace />
    return children
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agent/login" element={<AgentLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/agent" element={<PrivateAgent><AgentPortal /></PrivateAgent>} />
        <Route path="/agent/registration" element={<PrivateAgent><Registration /></PrivateAgent>} />
        <Route path="/agent/renewal" element={<PrivateAgent><Renewal /></PrivateAgent>} />
        <Route path="/otp" element={<PrivateAgent><OTPVerify /></PrivateAgent>} />

        <Route path="/admin" element={<PrivateAdmin><AdminDashboard /></PrivateAdmin>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}

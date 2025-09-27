import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-text">Welcome to the Government Tourism Portal</h1>
        <p className="mt-3 text-gray-600">Secure access for registered Agents and Administrators.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="text-xl font-semibold">Agent Access</h2>
          <p className="mt-2 text-gray-600">Register new tourists, manage renewals, and validate OTPs.</p>
          <Link to="/agent/login" className="btn-primary mt-4 inline-flex">Proceed to Agent Login</Link>
        </div>
        <div className="card p-6">
          <h2 className="text-xl font-semibold">Administrator Access</h2>
          <p className="mt-2 text-gray-600">Monitor incidents, alerts, and tourist insights.</p>
          <Link to="/admin/login" className="btn-secondary mt-4 inline-flex">Proceed to Admin Login</Link>
        </div>
      </div>
    </div>
  )
}

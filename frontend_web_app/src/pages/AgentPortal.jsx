import React from 'react'
import { Link } from 'react-router-dom'

export default function AgentPortal() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Agent Portal</h1>
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="text-lg font-semibold">New Registration</h2>
          <p className="text-gray-600 mt-1">Register a new tourist and generate a digital ID (simulated).</p>
          <Link to="/agent/registration" className="btn-primary mt-4 inline-flex">Start New Registration</Link>
        </div>
        <div className="card p-6">
          <h2 className="text-lg font-semibold">Renewal</h2>
          <p className="text-gray-600 mt-1">Renew an existing tourist ID.</p>
          <Link to="/agent/renewal" className="btn-secondary mt-4 inline-flex">Start Renewal</Link>
        </div>
      </div>
    </div>
  )
}

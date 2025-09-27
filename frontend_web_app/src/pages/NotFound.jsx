import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="text-center space-y-3">
      <div className="text-3xl font-semibold">404</div>
      <div className="text-gray-600">The page you requested was not found.</div>
      <Link to="/" className="btn-primary inline-flex">Go Home</Link>
    </div>
  )
}

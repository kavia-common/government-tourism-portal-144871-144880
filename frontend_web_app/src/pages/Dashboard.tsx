import { useEffect, useState } from 'react'
import StatusCard from '../components/StatusCard'
import MapView from '../components/MapView'
import Card from '../components/ui/Card'
import { Api } from '../services/api'
import { Incident } from '../types'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [activeAlerts, setActiveAlerts] = useState<number>(3)
  const [geofenceBreaches, setGeofenceBreaches] = useState<number>(1)
  const [anomalies, setAnomalies] = useState<number>(2)

  useEffect(() => {
    Api.fetchIncidents().then(setIncidents)
  }, [])

  const respondToAlert = (id: string) => {
    alert(`Responding to alert ${id}...`)
    setActiveAlerts((n) => Math.max(0, n - 1))
  }

  const trackAlert = (id: string) => {
    alert(`Tracking alert ${id} on map...`)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-12 gap-6">
      <aside className="lg:col-span-3 space-y-4">
        <Card>
          <div className="text-sm text-gray-500">Navigation</div>
          <nav className="mt-3 grid gap-2">
            <Link to="/admin/dashboard" className="btn btn-secondary">Dashboard</Link>
            <Link to="/" className="btn btn-secondary">Home</Link>
          </nav>
        </Card>
        <Card>
          <div className="text-sm text-gray-500">Active Alerts</div>
          <ul className="mt-3 space-y-2">
            {incidents.slice(0, 3).map(i => (
              <li key={i.id} className="flex items-center justify-between bg-amber-50 text-amber-900 rounded-lg px-3 py-2">
                <span className="text-sm">{i.title}</span>
                <div className="flex gap-2">
                  <button className="btn btn-secondary px-2 py-1 text-xs" onClick={() => respondToAlert(i.id)}>Respond</button>
                  <button className="btn btn-primary px-2 py-1 text-xs" onClick={() => trackAlert(i.id)}>Track</button>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </aside>
      <section className="lg:col-span-9 space-y-6">
        <div className="grid sm:grid-cols-3 gap-4">
          <StatusCard title="Geofence Breaches" value={geofenceBreaches} color="error" />
          <StatusCard title="Active Alerts" value={activeAlerts} color="secondary" />
          <StatusCard title="Anomaly Indicators" value={anomalies} color="primary" />
        </div>
        <MapView incidents={incidents} />
        <Card>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Recent Events</h3>
            <span className="text-sm text-gray-500">{incidents.length} incidents</span>
          </div>
          <div className="mt-4 overflow-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="py-2 pr-4">Title</th>
                  <th className="py-2 pr-4">Severity</th>
                  <th className="py-2 pr-4">Location</th>
                  <th className="py-2 pr-4"></th>
                </tr>
              </thead>
              <tbody>
                {incidents.map(i => (
                  <tr key={i.id} className="border-t">
                    <td className="py-2 pr-4">{i.title}</td>
                    <td className="py-2 pr-4">
                      <span className={`px-2 py-1 rounded text-xs ${i.severity === 'high' ? 'bg-red-100 text-red-700' : i.severity === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                        {i.severity}
                      </span>
                    </td>
                    <td className="py-2 pr-4">{i.lat.toFixed(2)}, {i.lng.toFixed(2)}</td>
                    <td className="py-2 pr-4">
                      <button className="btn btn-secondary px-3 py-1 text-xs" onClick={() => alert(`Viewing incident ${i.id}`)}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import StatusCard from '../components/StatusCard.jsx'
import MapView from '../components/MapView.jsx'
import { fetchDashboardData } from '../services/api.js'
import dayjs from 'dayjs'
import clsx from 'clsx'

export default function AdminDashboard() {
  const [data, setData] = useState({ incidents: [], alerts: [], stats: {} })
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    const run = async () => {
      const res = await fetchDashboardData()
      setData(res)
      setLoading(false)
    }
    run()
  }, [])

  const filteredIncidents = data.incidents.filter(i => filter === 'All' || i.type === filter)

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-4">
        <StatusCard title="Active Tourists" value={data.stats.activeTourists || '—'} delta={3.2} tone="primary" />
        <StatusCard title="Active Alerts" value={data.stats.activeAlerts || '—'} delta={-1.1} tone="error" />
        <StatusCard title="Incidents Today" value={data.stats.incidentsToday || '—'} delta={2.4} tone="secondary" />
        <StatusCard title="Geofence Breaches" value={data.stats.geofenceBreaches || '—'} delta={4.8} tone="error" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Live Map</h2>
            <div className="flex items-center gap-2">
              <select className="input" value={filter} onChange={(e)=>setFilter(e.target.value)}>
                <option>All</option>
                <option>Geofence Breach</option>
                <option>Medical Emergency</option>
                <option>Crowd Anomaly</option>
              </select>
            </div>
          </div>
          {loading ? <div className="card p-6">Loading map…</div> : <MapView incidents={filteredIncidents} />}
        </div>

        <div className="space-y-4">
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Active Alerts</h2>
              <span className="text-xs text-gray-500">{data.alerts.length} alerts</span>
            </div>
            <div className="mt-3 space-y-3">
              {data.alerts.map(a => (
                <div key={a.id} className="p-3 rounded-lg border border-gray-100 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{a.title}</div>
                    <span className={clsx("text-xs px-2 py-1 rounded-md", {
                      'bg-red-50 text-red-700': a.priority === 'High',
                      'bg-amber-50 text-amber-700': a.priority === 'Medium',
                      'bg-green-50 text-green-700': a.priority === 'Low'
                    })}>{a.priority}</span>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">{dayjs(a.time).fromNow()}</div>
                  <div className="mt-2 flex gap-2">
                    <button className="btn-primary text-xs">Respond</button>
                    <button className="px-3 py-2 rounded-lg bg-gray-200 text-xs">Track</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-4">
            <h2 className="text-lg font-semibold">Recent Incidents</h2>
            <div className="mt-2 space-y-2">
              {data.incidents.map(i => (
                <div key={i.id} className="flex items-center justify-between p-2 rounded-lg bg-white border border-gray-100">
                  <div>
                    <div className="font-medium text-sm">{i.type}</div>
                    <div className="text-xs text-gray-600">{i.location}</div>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-md bg-blue-50 text-blue-700">{i.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

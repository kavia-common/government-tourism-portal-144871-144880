import dayjs from 'dayjs'

// PUBLIC_INTERFACE
export async function login({ role, email, password }) {
  /** Simulated login API. */
  await delay(300)
  if (!email || !password) throw new Error('Invalid credentials')
  return { role, email, token: btoa(`${email}:${Date.now()}`) }
}

// PUBLIC_INTERFACE
export async function submitRegistration(payload) {
  /** Simulated registration API with digital ID generation. */
  await delay(600)
  const id = 'TID-' + Math.random().toString(36).substring(2, 8).toUpperCase()
  const polygonTx = '0x' + Math.random().toString(16).substring(2) + Math.random().toString(16).substring(2)
  return { registrationId: id, digitalTouristId: id, polygonTx }
}

// PUBLIC_INTERFACE
export async function submitRenewal(payload) {
  await delay(500)
  return { renewalId: 'REN-' + Math.random().toString(36).substring(2, 8).toUpperCase(), validUntil: dayjs().add(1, 'year').format('YYYY-MM-DD') }
}

// PUBLIC_INTERFACE
export async function fetchDashboardData() {
  /** Simulated admin dashboard data including incidents and alerts. */
  await delay(400)
  const incidents = [
    { id: 'i1', type: 'Geofence Breach', status: 'Active', lat: 28.6139, lng: 77.2090, location: 'Delhi' },
    { id: 'i2', type: 'Medical Emergency', status: 'Responding', lat: 19.0760, lng: 72.8777, location: 'Mumbai' },
    { id: 'i3', type: 'Crowd Anomaly', status: 'Investigating', lat: 13.0827, lng: 80.2707, location: 'Chennai' },
  ]
  const alerts = [
    { id: 'a1', priority: 'High', title: 'Severe Weather Warning', time: dayjs().subtract(12, 'minute').toISOString(), status: 'Unacknowledged' },
    { id: 'a2', priority: 'Medium', title: 'Route Closure', time: dayjs().subtract(1, 'hour').toISOString(), status: 'Tracking' },
  ]
  const stats = {
    activeTourists: 13452,
    activeAlerts: alerts.length,
    incidentsToday: 23,
    geofenceBreaches: 7,
  }
  return { incidents, alerts, stats }
}

// Helpers
function delay(ms) {
  return new Promise(res => setTimeout(res, ms))
}

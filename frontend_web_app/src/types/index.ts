export type User = {
  id: string
  name: string
  role: 'agent' | 'admin'
  email: string
}

export type Incident = {
  id: string
  title: string
  description: string
  severity: 'low' | 'medium' | 'high'
  lat: number
  lng: number
}

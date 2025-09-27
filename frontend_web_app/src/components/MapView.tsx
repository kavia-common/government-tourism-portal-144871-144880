import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Incident } from '../types'

const icon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

type Props = {
  incidents: Incident[]
}

export default function MapView({ incidents }: Props) {
  const center = [20.5937, 78.9629] as [number, number] // India geographic center as default
  return (
    <div className="card p-0 overflow-hidden">
      <MapContainer center={center} zoom={5} style={{ height: '420px', width: '100%' }}>
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Example geofence */}
        <Circle center={[28.6139, 77.2090]} radius={15000} pathOptions={{ color: '#EF4444', fillColor: '#EF4444', fillOpacity: 0.08 }} />
        {incidents.map((inc) => (
          <Marker key={inc.id} position={[inc.lat, inc.lng]} icon={icon}>
            <Popup>
              <div className="space-y-1">
                <div className="font-semibold">{inc.title}</div>
                <div className="text-sm text-gray-600">{inc.description}</div>
                <div className="text-xs text-gray-500">Severity: {inc.severity}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

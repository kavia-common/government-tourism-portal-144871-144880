import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

/**
 * PUBLIC_INTERFACE
 * MapView renders incidents on a Leaflet map.
 */
export default function MapView({ incidents = [], center = [20.5937, 78.9629], zoom = 5 }) {
  return (
    <div className="card overflow-hidden">
      <MapContainer center={center} zoom={zoom} style={{ height: 420, width: '100%' }}>
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {incidents.map((inc) => (
          <Marker key={inc.id} position={[inc.lat, inc.lng]} icon={markerIcon}>
            <Popup>
              <div className="space-y-1">
                <div className="font-semibold">{inc.type}</div>
                <div className="text-xs text-gray-600">{inc.location}</div>
                <div className="text-xs">Status: <span className="font-medium">{inc.status}</span></div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

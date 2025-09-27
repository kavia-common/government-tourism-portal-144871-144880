# Government Tourism Portal - Frontend Web App

Tech stack:
- React 18 + Vite + TypeScript
- Tailwind CSS
- Leaflet via react-leaflet
- Zustand state management

Getting started:
1. npm install
2. npm run dev
3. Open http://localhost:3000

Features:
- Agent/Admin login (simulated)
- Registration (dynamic fields by nationality) with email/phone OTP simulation
- Renewal flow with OTP simulation
- Simulated blockchain Digital Tourist ID issuance
- Admin Dashboard with map and incident management (simulated)
- Responsive, modern, government-themed UI

Config:
- No environment variables are required for the demo.
- Configure real backend by using a VITE_API_BASE_URL and updating `src/services/api.ts`.

Notes:
- OTPs are logged in the browser console with [SIM-OTP] prefix for demonstration.
- Map uses OpenStreetMap tiles and includes a sample geofence circle.

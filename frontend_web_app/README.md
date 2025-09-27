# Government Tourism Portal - Frontend

Modern React + Vite + Tailwind CSS application implementing:
- Agent and Admin login
- Registration (new) and Renewal flows
- Nationality-based dynamic forms
- OTP validation simulation for email and phone
- Simulated Polygon digital Tourist ID generation
- Admin dashboard with Leaflet map, incidents, and alert management panels
- Ocean Professional theme (blue & amber accents), responsive design

## Getting Started

1. Install dependencies
   - npm install

2. Run in development
   - npm run dev
   - Dev server runs on http://localhost:3000 (configured in vite.config.js)

3. Build for production
   - npm run build
   - npm run preview

This app uses simulated APIs (no backend required for demo). When integrating with the backend:
- Backend default host/port: http://localhost:3001
- Set the API base URL via environment variable:
  - Copy .env.example to .env and set VITE_API_BASE_URL=http://localhost:3001
- Alternatively, configure a Vite dev proxy (vite.config.js) to forward /api to http://localhost:3001
  - Uncomment the proxy block and use fetch('/api/...') in your services

## Troubleshooting (Ports / Backend Readiness / CORS)

- Frontend dev port:
  - The dev server is set to port 3000 and host 0.0.0.0. If port 3000 is occupied, free it or change the port in vite.config.js and package.json.
- Backend not ready:
  - The current frontend uses simulated APIs and does not require the backend to start. If you switch to real APIs, ensure the backend is running on port 3001 before using the app.
- CORS:
  - If calling the backend directly (no proxy) from http://localhost:3000 to http://localhost:3001, the backend must allow CORS from http://localhost:3000.
  - Recommended during development: enable the Vite proxy so requests go through the same origin.
- Start-up order:
  - Development with simulated APIs: frontend only.
  - With real backend: start backend on :3001 first, then start frontend on :3000.

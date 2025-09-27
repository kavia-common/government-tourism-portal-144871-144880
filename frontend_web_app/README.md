# Government Tourism Portal - Frontend

Modern React + Vite + Tailwind CSS application implementing:
- Agent and Admin login
- Registration (new) and Renewal flows
- Nationality-based dynamic forms
- OTP validation simulation for email and phone
- Simulated Polygon digital Tourist ID generation
- Admin dashboard with Leaflet map, incidents, and alert management panels
- Ocean Professional theme (blue & amber accents), responsive design

## Prerequisites
- Node.js 18+ and npm

## Environment Setup
1) Copy the example env file and adjust if needed:
   cp .env.example .env

2) Ensure these values are set:
   - PORT=3000
   - HOST=0.0.0.0
   - VITE_API_BASE_URL=http://localhost:3001

Vite will bind to HOST:PORT. The application reads the backend base URL from `import.meta.env.VITE_API_BASE_URL`.

## Getting Started

1) Install dependencies
   npm install

2) Run in development (Vite on http://0.0.0.0:3000)
   npm run dev
   - The scripts also accept environment overrides, e.g.:
     HOST=0.0.0.0 PORT=3000 npm run dev

3) Build for production
   npm run build

4) Preview the production build (also bound to 0.0.0.0:3000)
   npm run preview

## Backend Integration

- Default backend is expected at http://localhost:3001.
- All API calls use the base URL from VITE_API_BASE_URL. Set it in `.env` (see .env.example).
- Optionally, use a Vite proxy to avoid CORS during local development:
  - In vite.config.js, uncomment the proxy block and set the target to http://localhost:3001
  - Then call your APIs with `/api/...` paths from the frontend.

## Troubleshooting (Ports / Backend Readiness / CORS)

- Frontend dev server:
  - Runs on port 3000 and host 0.0.0.0 by default. If port 3000 is in use, free it first (the project requirements fix it to 3000).
- Backend not ready:
  - The default UI uses simulated APIs for demonstration. If you switch to real endpoints, make sure the backend is running on :3001.
- CORS:
  - When directly calling backend at http://localhost:3001 from http://localhost:3000, ensure the backend allows CORS from http://localhost:3000.
  - Recommended: enable the Vite proxy during development.
- Start-up order:
  - With real backend: start backend on :3001 first, then frontend on :3000.


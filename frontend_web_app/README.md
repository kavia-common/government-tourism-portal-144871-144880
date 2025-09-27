# Government Tourism Portal — Frontend Web App

A fresh React + Tailwind (v4) frontend implementing the Ocean Professional theme.

Core features:
- Agent and Admin login (role-based)
- Tourist Registration with OTP (mocked) and simulated Blockchain ID issuance
- Tourist Renewal
- Admin Dashboard with map placeholder, alert panel, incident list, and status cards
- Clean, minimalist styling with blue/amber accents and subtle shadows

Tech:
- React 18, React Router v6
- Tailwind CSS v4 (via @tailwindcss/postcss)
- Environment-driven API base URL

Quick start:
1) Install dependencies:
   npm install

2) Configure environment:
   cp .env.example .env
   # Set REACT_APP_API_BASE_URL to your backend base URL (or leave empty for mocks/fallback)

3) Run:
   npm start
   # Open http://localhost:3000

Routing:
- /           Home
- /login      Login (toggle Agent/Admin)
- /register   Registration (requires Agent/Admin login)
- /renew      Renewal (requires Agent/Admin login)
- /admin      Admin Dashboard (requires Admin login)

Environment:
- REACT_APP_API_BASE_URL (string): Base URL for backend (e.g., http://localhost:8080)

Structure:
- src/auth: Auth context and ProtectedRoute
- src/api: Fetch client and modules (auth, tourists, incidents, map, otp)
- src/components/ui: UI primitives (Button, Card, Input, Modal, Toast, Badge)
- src/components/dashboard: Dashboard widgets (MapView, StatusCards, AlertPanel, IncidentList)
- src/routes: Pages (Home, Login, Registration, Renewal, AdminDashboard)
- src/styles: Tailwind theme and tokens

Notes:
- API calls are designed to gracefully handle missing backends; toasts will indicate failures.
- OTP is mocked for UX demonstration.
- Registration displays a simulated Blockchain ID upon success (client-side only, not cryptographic).
- Ensure accessibility and responsiveness across viewports.

Scripts:
- npm start — development server
- npm test — test runner
- npm run build — production build

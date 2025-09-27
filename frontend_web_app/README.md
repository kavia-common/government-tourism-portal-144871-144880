# Government Tourism Portal — Frontend Web App

Modern React + Tailwind (v4) frontend implementing the Ocean Professional theme (blue primary with amber accents), featuring:
- Agent and Admin login (role-based)
- Tourist Registration with optional OTP and simulated Blockchain ID issuance
- Tourist Renewal
- Admin Dashboard with map placeholder, alert panel, incident list, and status cards
- Responsive layout with clean, minimalist styling and subtle gradients/shadows

## Getting Started

1) Install dependencies:
   npm install

2) Configure environment:
   - Copy .env.example to .env and set REACT_APP_API_BASE_URL
   - If no backend is available, UI will still load; API calls will fail gracefully and show toasts.

3) Run in development:
   npm start
   Open http://localhost:3000

## Project Structure

- src/auth: Auth context and ProtectedRoute
- src/api: Minimal fetch client and API modules (auth, tourists, incidents, map, otp)
- src/components/ui: Reusable UI primitives (Button, Card, Input, Toast, etc.)
- src/components/dashboard: Dashboard widgets (MapView placeholder, StatusCards, AlertPanel, IncidentList)
- src/routes: Pages (Home, Login, Registration, Renewal, AdminDashboard)
- src/styles: Tailwind theme and tokens (Ocean Professional)

## Theming

The Ocean Professional theme is defined via CSS variables and Tailwind utilities:
- Primary: #2563EB
- Secondary: #F59E0B
- Error: #EF4444
- Background: #f9fafb
- Surface: #ffffff
- Text: #111827

See src/styles/tailwind-theme.css and src/styles/tokens.css.

## Notes

- Set REACT_APP_API_BASE_URL in .env to connect to a backend. The API client includes token handling and refresh retry.
- OTP endpoints and backend routes are placeholders; you can hook them to your backend implementation.
- The registration page simulates a Blockchain ID on success to demonstrate end-to-end UX.

## Scripts

- npm start — CRA dev server
- npm test — CRA test runner
- npm run build — Production build

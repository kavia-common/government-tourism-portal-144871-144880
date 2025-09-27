import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Bind to 0.0.0.0 so it is accessible inside containerized environments
    host: '0.0.0.0',
    // Use port 3000 to align with platform readiness checks
    port: 3000,
    // Some platforms rely on plain HTTP without strict HMR checks
    strictPort: true
  }
})

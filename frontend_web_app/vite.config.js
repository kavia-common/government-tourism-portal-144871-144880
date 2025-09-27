import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Vite configuration
 * - Runs on port 3000 to align with preview expectations.
 * - Binds to 0.0.0.0 so containerized environments can reach it.
 * - Proxy template is provided (commented) to forward /api to backend on :3001.
 * Note: While we read HOST/PORT from process.env for flexibility, we default to 0.0.0.0:3000 to satisfy task requirements.
 */
const HOST = process.env.HOST || '0.0.0.0'
const PORT = Number(process.env.PORT || 3000)

export default defineConfig({
  plugins: [react()],
  server: {
    host: HOST,
    port: PORT,
    // If you switch from simulated APIs to a real backend, uncomment and adjust:
    // proxy: {
    //   '/api': {
    //     target: process.env.VITE_API_BASE_URL || 'http://localhost:3001',
    //     changeOrigin: true,
    //     secure: false,
    //     // Optionally rewrite if your backend isn't prefixed with /api
    //     // rewrite: (path) => path.replace(/^\/api/, ''),
    //   }
    // }
  }
})

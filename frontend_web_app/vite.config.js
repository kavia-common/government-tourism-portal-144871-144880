import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Vite configuration
 * - Runs on port 3000 to align with preview expectations.
 * - Binds to 0.0.0.0 so containerized environments can reach it.
 * - Proxy template is provided (commented) to forward /api to backend on :3001.
 */
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    // If you switch from simulated APIs to a real backend, uncomment and adjust:
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3001',
    //     changeOrigin: true,
    //     secure: false,
    //     // Optionally rewrite if your backend isn't prefixed with /api
    //     // rewrite: (path) => path.replace(/^\/api/, ''),
    //   }
    // }
  }
})

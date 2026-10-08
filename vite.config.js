import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/techfest-3d-experience/',
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  }
})

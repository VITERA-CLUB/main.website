import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // Use root base for local dev; adjust during deploy if needed
  base: '/',
  server: {
    allowedHosts: [
      'localhost',
      // Add other allowed hosts (for testing purposes)
    ]
  }
})

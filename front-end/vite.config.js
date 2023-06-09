import { build, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/login': 'http://localhost:3000',
      '/register': 'http://localhost:3000',
      '/api': 'http://localhost:3000',
      '/logout': 'http://localhost:3000',
      '/token': 'http://localhost:3000',
    }
  },
  build: {
    outDir: '../public',
    emptyOutDir: true
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// Set environment variables or flags as needed for production proxy
const productionProxyTarget = 'https://api.orka-app.com'
const developmentProxyTarget = 'http://0.0.0.0:8000/'

export default defineConfig(({ command }) => {
  // Use proxy for both development and production
  const proxyConfig = {
    '/api': {
      target: command === 'serve' ? developmentProxyTarget : productionProxyTarget,
      changeOrigin: true
    },
  }

  return {
    server: {
      proxy: proxyConfig,
    },
    build: {
      outDir: 'dist',
    },
    plugins: [react()],
  }
})
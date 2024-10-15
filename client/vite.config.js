import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    // Development mode: enable proxy
    return {
      server: {
        proxy: {
          '/api': 'http://localhost:8000',
        },
      },
      build: {
        outDir: 'dist',
      },
      plugins: [react()],
    }
  } else {
    // Production mode: no proxy
    return {
      build: {
        outDir: 'dist',
      },
      plugins: [react()],
    }
  }
})

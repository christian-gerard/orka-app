import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    // Development mode: enable proxy
    return {
      server: {
        proxy: {
          '/api': 'http://ec2-184-72-8-99.us-west-1.compute.amazonaws.com',
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

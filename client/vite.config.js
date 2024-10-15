import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {

    proxy: {
      '/api': 'http://localhost:8000',
    },


  },
  build: {
    outDir: 'dist',  // This should be the same as the directory in your YAML file
  },
  plugins: [react()],
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {

    proxy: {
      '/api': 'http://ec2-184-72-8-99.us-west-1.compute.amazonaws.com',
    },


  },
  build: {
    outDir: 'dist',  // This should be the same as the directory in your YAML file
  },
  plugins: [react()],
})

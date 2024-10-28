import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api-inference.huggingface.co', // Updated to Hugging Face API
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // Keep this if you want to adjust the path
      }
    }
  }
})

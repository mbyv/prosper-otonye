import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' keeps asset paths relative so the build works on Vercel, Netlify and GitHub Pages alike
export default defineConfig({
  plugins: [react()],
  base: './',
})

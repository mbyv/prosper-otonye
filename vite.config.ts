import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

// base: './' keeps asset paths relative so the build works on Vercel, Netlify and GitHub Pages alike.
// Two pages: the portfolio (/) and the D4TF Connect case study (/d4tf-connect/).
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rolldownOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        d4tf: resolve(import.meta.dirname, 'd4tf-connect/index.html'),
      },
    },
  },
})

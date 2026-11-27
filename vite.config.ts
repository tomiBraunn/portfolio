import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // dos páginas: el portfolio dev (/) y el de cocina (/cocina/)
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        cocina: path.resolve(__dirname, 'cocina/index.html'),
      },
    },
  },
})

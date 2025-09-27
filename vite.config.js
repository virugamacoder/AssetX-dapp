import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'components': path.resolve(__dirname, 'src/components'),
      'layouts': path.resolve(__dirname, 'src/layouts'),
      'pages': path.resolve(__dirname, 'src/pages'),
      'assets': path.resolve(__dirname, 'src/assets'),
      'routes': path.resolve(__dirname, 'src/routes'),
      'providers': path.resolve(__dirname, 'src/providers'),
      // Note: removed 'redux' alias as it conflicts with the redux npm package
    },
  },
})

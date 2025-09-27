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
      'hooks': path.resolve(__dirname, 'src/hooks'),
      'services' : path.resolve(__dirname,'src/services'),
      'utils': path.resolve(__dirname, 'src/utils'),
      'data': path.resolve(__dirname, 'src/data'),
      'features': path.resolve(__dirname, 'src/features')

       // Note: removed 'redux' alias as it conflicts with the redux npm package
    },
  },
})

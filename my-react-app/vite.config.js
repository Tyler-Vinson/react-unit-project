import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/react-unit-project/',
  publicDir: 'public',
  plugins: [react()],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: '3d-vendor',
              test: /node_modules[\\/](?:three|three-mesh-bvh|@react-three)[\\/]/,
              maxSize: 400 * 1024,
            },
          ],
        },
      },
    },
  },
})

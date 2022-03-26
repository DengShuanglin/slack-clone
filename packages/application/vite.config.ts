import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
//@ts-ignored
import cssnanoPlugin from 'cssnano'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  css: {
    postcss: {
      plugins: [cssnanoPlugin]
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://121.5.68.110:3001/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})

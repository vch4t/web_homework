import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'

import legacy from '@vitejs/plugin-legacy';
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base:"./",
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server:{
    hmr:true,
    port:5173,
  },
})

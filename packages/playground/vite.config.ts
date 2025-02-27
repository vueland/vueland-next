import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const resolve = (path) => path.replace(__dirname, path)

export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '@': resolve('./src'),
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },
  server: {
    host: '0.0.0.0',
    port: 8080,
  },
  plugins: [
    vue(),
  ],
})

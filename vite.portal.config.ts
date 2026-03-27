import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import sitemap from 'vite-plugin-sitemap'
import { resolve } from 'path'

export default defineConfig({
  root: resolve(__dirname, 'src/portal'),
  plugins: [
    vue(),
    tailwindcss(),
    sitemap({ hostname: 'https://fachinformatiker.wiki' }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: resolve(__dirname, 'dist/portal'),
    emptyOutDir: true,
  },
})

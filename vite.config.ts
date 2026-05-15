import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const prodBase = '/rest-countries-api/'

export default defineConfig(({ command }) => ({
  plugins: [tailwindcss(), react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // TOTO vypne "legacy-js-api" varovanie
        silenceDeprecations: ['import'], // TOTO umlčí varovanie o @import
      },
    },
  },
  base: command === 'build' ? prodBase : '/',
}))

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss(), react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // TOTO vypne "legacy-js-api" varovanie
        silenceDeprecations: ['import'], // TOTO umlčí varovanie o @import
      },
    },
  },
  base: '',
})

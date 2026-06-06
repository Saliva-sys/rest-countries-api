import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({ 
  plugins: [tailwindcss(), react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // this will shutdown "legacy-js-api" warning
        silenceDeprecations: ['import'], // This silences the warning about @import
      },
    },
  },
  base: '',
})

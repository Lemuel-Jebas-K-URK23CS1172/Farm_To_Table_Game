import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/FarmToTableGame/', // 👈 MUST MATCH your repo name exactly (case sensitive)
})

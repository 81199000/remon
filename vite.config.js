import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/remon/', // 替换成你的 GitHub 仓库名
}) 
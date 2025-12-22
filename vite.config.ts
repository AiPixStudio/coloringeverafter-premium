
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Explicitly declare process for the build tool context
declare var process: any;

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
      'process.env': JSON.stringify(env),
    }
  }
})

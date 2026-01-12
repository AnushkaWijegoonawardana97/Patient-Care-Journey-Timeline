import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    emptyOutDir: true,
    // Handle Windows file lock issues
    rollupOptions: {
      output: {
        // Prevent file locking issues on Windows
        manualChunks: undefined,
      },
    },
  },
  // Better handling of file system operations on Windows
  server: {
    fs: {
      strict: false,
    },
  },
});

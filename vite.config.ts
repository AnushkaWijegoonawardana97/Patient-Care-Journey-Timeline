import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    emptyOutDir: true,
    // Ensure public directory files are copied (including mockServiceWorker.js)
    copyPublicDir: true,
    rollupOptions: {
      output: {
        // Prevent file locking issues on Windows
        manualChunks: undefined,
      },
    },
  },
  // Ensure public directory is included
  publicDir: "public",
  // Better handling of file system operations on Windows
  server: {
    fs: {
      strict: false,
    },
  },
});

// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Replace with your repo name (case-sensitive)
export default defineConfig({
  plugins: [react()],
  base: "/FarmToTableGame/",
  build: {
    outDir: "dist",
    sourcemap: false,
  },
  server: {
    port: 5173,
    open: true,
  },
});

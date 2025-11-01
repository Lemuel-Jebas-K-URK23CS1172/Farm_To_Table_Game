// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/FarmToTableGame/", // 👈 exact repo name (case-sensitive)
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Farm_To_Table_Game/", // 👈 must match your repo name
});

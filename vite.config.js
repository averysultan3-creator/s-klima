import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // GitHub Pages mirror = /s-klima/, our server (own domain) = VITE_BASE=/
  base: process.env.VITE_BASE || "/s-klima/",
});

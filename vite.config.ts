import { defineConfig } from "vite";

// Stamped at build time so the deployed page can prove which build it is.
const buildTime = new Date().toISOString().replace("T", " ").slice(0, 16) + "Z";

export default defineConfig({
  define: {
    __BUILD_TIME__: JSON.stringify(buildTime),
  },
});

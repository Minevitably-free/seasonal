import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
      "/store": path.resolve(__dirname, "./store"),
      "/services": path.resolve(__dirname, "./services"),
    },
  },
  server: {
    fs: {
      cachedChecks: false,
    },
  },
});

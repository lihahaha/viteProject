import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
console.log("__dirname", __dirname);
// https://vitejs.dev/config/
export default defineConfig((command, mode) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    base: "",
    resolve: {
      extensions: [".mjs", ".js", ".mts", ".ts", ".jsx", ".tsx", ".json"],
      alias: [{ find: "@/", replacement: "/src/" }],
    },
    build: {
      outDir: "build",
      assetsInlineLimit: 2048,
      minify: "terser", // boolean | 'terser' | 'esbuild'
    },
    server: {
      port: 9021,
      host: "localhost",
      open: true,
      hmr: true,
      proxy: {
        "/api": {
          target: "",
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/uniauth/, ""),
        },
      },
    },
  };
});

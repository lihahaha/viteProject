import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  resolve: {
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
    alias: [{ find: "@/", replacement: "/src/" }],
  },
  build: {
    outDir: "build",
    minify: "terser", // boolean | 'terser' | 'esbuild'
  },

  server: {
    port: 9021,
    host: "localhost",
    open: "/",
    proxy: {
      "/uniauth": {
        target: "http://172.30.1.215:30114",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/uniauth/, ""),
      },
      "/dataReport": {
        target: "http://172.30.1.211:31065",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dataReport/, ""),
      },
      "/shuibao": {
        //http://172.30.1.214:31852
        // target: 'https://60.13.54.71:30119',
        target: "http://60.13.54.71:30119",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/shuibao/, ""),
      },
      "/app": {
        target: "http://172.30.1.214:32107",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/app/, ""),
      },
      "/third": {
        target: "http://172.30.1.214:30108",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/third/, ""),
      },
      "/party": {
        target: "http://172.30.1.212:31193",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/party/, ""),
      },
      "/gis": {
        target: "http://60.13.54.71:30119",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/party/, ""),
      },
      "/yunli-geomap/api/gis": {
        target: "http://60.13.54.71:30119",
        headers: {
          origin: "http://60.13.54.71:30119",
        },
        changeOrigin: true,
      },
      // '/yunli/ma/v1': {
      //     target: 'http://172.30.1.211:31852/yunli/ma/v1',
      //     changeOrigin: true,
      //     // rewrite: (path) => path.replace(/^\/party/, ''),
      // },
    },
  },
});

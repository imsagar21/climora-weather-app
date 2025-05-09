import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined, // optional; set this if you plan to split manually
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      open: true, // auto-opens the report in your browser
      filename: "dist/stats.html", // output file
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

// import { defineConfig } from 'vite';

// export default defineConfig({
//   build: {
//     rollupOptions: {
//       output: {
//         manualChunks: undefined, // optional; set this if you plan to split manually
//       },
//     },
//   },
//   plugins: [
//     visualizer({
//       open: true, // auto-opens the report in your browser
//       filename: 'dist/stats.html', // output file
//       gzipSize: true,
//       brotliSize: true,
//     }),
//   ],
// });

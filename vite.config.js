import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Increase chunk size warning limit (3D assets are large)
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split Three.js and R3F into their own chunk
          "three-vendor": ["three"],
          "r3f-vendor": [
            "@react-three/fiber",
            "@react-three/drei",
            "@react-three/postprocessing",
          ],
          // Split GSAP into its own chunk
          "gsap-vendor": ["gsap"],
          // Split React into its own chunk
          "react-vendor": ["react", "react-dom"],
        },
      },
    },
    // Enable minification
    minify: "esbuild",
    // Enable source maps only in development
    sourcemap: false,
    // Target modern browsers for smaller output
    target: "es2020",
  },
  // Optimize dependency pre-bundling
  optimizeDeps: {
    include: [
      "three",
      "@react-three/fiber",
      "@react-three/drei",
      "gsap",
      "react",
      "react-dom",
    ],
  },
});

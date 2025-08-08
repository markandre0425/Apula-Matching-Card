import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'vite-plugin-error-overlay',
      apply: 'serve',
      enforce: 'post',
      transform(code, id) {
        if (id.includes('node_modules')) return;
        
        return {
          code: `try {
            ${code}
          } catch (error) {
            console.error(error);
            throw error;
          }`,
          map: null
        };
      }
    }
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..']
    },
    hmr: {
      port: 24678
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', '@tanstack/react-query']
  }
});



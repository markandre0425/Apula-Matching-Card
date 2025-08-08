import { createServer } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import { nanoid } from "nanoid";
import type { Express } from "express";
import express from "express";

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function createViteServer() {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    plugins: [react()],
    root: path.resolve(__dirname, "..", "client"),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "..", "client", "src"),
        "@shared": path.resolve(__dirname, "..", "shared"),
      },
    },
  });

  return vite;
}

export function serveStatic(app: Express) {
  // Serve the built client files from the dist/public directory
  const staticPath = path.resolve(__dirname, "..", "dist", "public");
  app.use(express.static(staticPath));
  
  // Serve index.html for all non-API routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(staticPath, "index.html"));
  });
}

export async function setupViteMiddleware(app: Express) {
  const vite = await createViteServer();
  
  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        __dirname,
        "..",
        "client",
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      if (typeof e === 'object' && e !== null && 'stack' in e) {
        console.error((e as Error).stack);
      }
      next(e);
    }
  });
}






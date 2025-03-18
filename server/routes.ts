import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertGameResultSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route to save game results
  app.post("/api/game-results", async (req, res) => {
    try {
      const validatedData = insertGameResultSchema.parse(req.body);
      const gameResult = await storage.saveGameResult(validatedData);
      res.status(201).json(gameResult);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid game result data", details: error.format() });
      } else {
        res.status(500).json({ message: "Failed to save game result" });
      }
    }
  });

  // API route to get high scores
  app.get("/api/high-scores", async (req, res) => {
    try {
      const difficulty = req.query.difficulty as string || undefined;
      const limit = parseInt(req.query.limit as string || "10");
      
      const highScores = await storage.getHighScores(difficulty, limit);
      res.json(highScores);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch high scores" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema (keeping original)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Game result schema for storing game completion stats
export const gameResults = pgTable("game_results", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  difficulty: text("difficulty").notNull(),
  moves: integer("moves").notNull(),
  timeTaken: integer("time_taken").notNull(), // In seconds
  matchesMade: integer("matches_made").notNull(),
  completedAt: timestamp("completed_at").defaultNow().notNull(),
});

export const insertGameResultSchema = createInsertSchema(gameResults).omit({
  id: true,
  completedAt: true,
});

export type InsertGameResult = z.infer<typeof insertGameResultSchema>;
export type GameResult = typeof gameResults.$inferSelect;

// Card schema for defining game card content
export const cards = pgTable("cards", {
  id: serial("id").primaryKey(),
  icon: text("icon").notNull(),
  tip: text("tip").notNull(),
  enabled: boolean("enabled").default(true).notNull(),
});

export const insertCardSchema = createInsertSchema(cards).omit({
  id: true,
});

export type InsertCard = z.infer<typeof insertCardSchema>;
export type Card = typeof cards.$inferSelect;

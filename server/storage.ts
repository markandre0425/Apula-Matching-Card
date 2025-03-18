import { users, type User, type InsertUser, type GameResult, type InsertGameResult } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  saveGameResult(result: InsertGameResult): Promise<GameResult>;
  getHighScores(difficulty?: string, limit?: number): Promise<GameResult[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private gameResults: Map<number, GameResult>;
  currentId: number;
  gameResultId: number;

  constructor() {
    this.users = new Map();
    this.gameResults = new Map();
    this.currentId = 1;
    this.gameResultId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async saveGameResult(result: InsertGameResult): Promise<GameResult> {
    const id = this.gameResultId++;
    const completedAt = new Date();
    const gameResult: GameResult = { 
      ...result, 
      id, 
      completedAt,
      userId: result.userId ?? null 
    };
    this.gameResults.set(id, gameResult);
    return gameResult;
  }

  async getHighScores(difficulty?: string, limit: number = 10): Promise<GameResult[]> {
    let results = Array.from(this.gameResults.values());
    
    // Filter by difficulty if provided
    if (difficulty) {
      results = results.filter(result => result.difficulty === difficulty);
    }
    
    // Sort by moves (ascending) and then by time (ascending)
    results.sort((a, b) => {
      if (a.moves !== b.moves) {
        return a.moves - b.moves;
      }
      return a.timeTaken - b.timeTaken;
    });
    
    // Return the top results based on limit
    return results.slice(0, limit);
  }
}

export const storage = new MemStorage();

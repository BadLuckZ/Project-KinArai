import { Database } from "bun:sqlite";

export const db = new Database("food.db");

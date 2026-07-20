import { db } from "./connection";

console.log("Running Schema migrations...");

// Create the menu table
db.run(`
  CREATE TABLE IF NOT EXISTS menu (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL
  )
`);

// Create the history table
db.run(`
  CREATE TABLE IF NOT EXISTS history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    menu_id INTEGER NOT NULL,
    eaten_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (menu_id) REFERENCES menu(id)
  )
`);

console.log("Schema migrated success");

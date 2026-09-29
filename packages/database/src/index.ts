import Database from "better-sqlite3";
import { mkdirSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

export function openDatabase(path = "./data/giba-security.db") {
  mkdirSync(dirname(path), { recursive: true });
  const db = new Database(path);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  return db;
}

export function runInitialMigration(db: Database.Database) {
  const migration = resolve(process.cwd(), "packages/database/migrations/001_initial.sql");
  db.exec(readFileSync(migration, "utf8"));
}

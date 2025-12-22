/**
 * --------------------
 * Main Database Module
 * --------------------
 */

import * as schema from "./schema.js";
import type { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { drizzle } from "drizzle-orm/better-sqlite3";

interface SetupDatabaseProps {
  sqliteFilePath: string;
  migrationsPath: string;
}

export type AppDatabase = BetterSQLite3Database<typeof schema>;

/**
 * Sets up the driver for the SQLite database and applies any migrations
 * needed
 *
 * @param {SetupDatabaseProps} props
 * @returns {Promise<AppDatabase>}
 */
export async function connectDatabase({
  sqliteFilePath,
  migrationsPath,
}: SetupDatabaseProps): Promise<AppDatabase> {
  // Driver & Setups
  try {
    const driver = new Database(sqliteFilePath);

    // FK & Journal mode changes
    driver.pragma("foreign_keys = ON");
    driver.pragma("journal_mode = WAL");

    // Setup ORM and apply migrations
    const db = drizzle<typeof schema>(driver, { schema });
    migrate(db, { migrationsFolder: migrationsPath });

    return db;
  } catch (error) {
    console.error(error, "Failed to initialize database");
    throw new Response("Database error occurred");
  }
}

// Barrel Exports

export * from "./queries.js";

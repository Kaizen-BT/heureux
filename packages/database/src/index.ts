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

/**
 * Sets up the driver for the SQLite database and applies any migrations
 * needed
 *
 * @param {SetupDatabaseProps} props
 * @returns {Promise<BetterSQLite3Database<typeof schema>>}
 */
export async function initDatabase({
  sqliteFilePath,
  migrationsPath,
}: SetupDatabaseProps): Promise<BetterSQLite3Database<typeof schema>> {
  // Driver & Setups
  try {
    const driver = new Database(sqliteFilePath);

    // FK & Journal mode changes
    driver.pragma("foreign_keys = ON");
    driver.pragma("journal_mode = WAL");

    // Setup ORM and apply migrations
    const db = drizzle(driver, { schema });
    migrate(db, { migrationsFolder: migrationsPath });

    return db;
  } catch (_) {
    console.error("Failed to initialize database");
    throw new Response("Database initialization failed");
  }
}

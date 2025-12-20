import path from "node:path";
import type { AppModule } from "../AppModule.js";
import { ModuleContext } from "../ModuleContext.js";
import { existsSync } from "node:fs";

/**
 * ApplicationDatabase module responsible for applying migrations
 * and initializing the connection to the Database
 */
class ApplicationDatabase implements AppModule {
  async enable({ app }: ModuleContext): Promise<void> {
    let databasePath, migrationsPath: string;

    // Determine paths based on mode
    switch (app.isPackaged) {
      case true:
        databasePath = path.join(app.getPath("userData"), "database.sqlite");
        migrationsPath = path.join(process.resourcesPath, "drizzle");
        break;

      case false:
        databasePath = path.join(process.cwd(), "dev.sqlite");
        migrationsPath = path.resolve("packages/database/drizzle");
        break;
    }

    console.log(existsSync(migrationsPath));
    console.log(
      `Database Path: ${databasePath}\nMigrations Path: ${migrationsPath}`
    );

    await app.whenReady();
  }
}

export function createDatabaseModule() {
  return new ApplicationDatabase();
}

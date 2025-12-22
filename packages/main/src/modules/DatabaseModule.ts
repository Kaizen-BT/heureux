import path from "node:path";
import type { AppModule } from "../AppModule.js";
import { ModuleContext } from "../ModuleContext.js";
import {
  connectDatabase,
  getAllMilestones,
  getAllProjects,
  getAllTasks,
} from "@app/database";
import {
  mainHandleAPI,
  initializeQueryDriver,
} from "../utils/ipcMainWrapper.js";
import { APIContract } from "@app/api";

/**
 * ApplicationDatabase module responsible for applying migrations
 * and initializing the connection to the Database
 */
class ApplicationDatabase implements AppModule {
  async enable({ app }: ModuleContext): Promise<void> {
    let sqliteFilePath, migrationsPath: string;

    // Determine paths based on mode
    switch (app.isPackaged) {
      case true:
        sqliteFilePath = path.join(app.getPath("userData"), "database.sqlite");
        migrationsPath = path.join(process.resourcesPath, "drizzle");
        break;

      case false:
        sqliteFilePath = path.join(process.cwd(), "dev.sqlite");
        migrationsPath = path.resolve("packages/database/drizzle");
        break;
    }

    // Debugging information
    console.log(
      `\n\nDatabase Path: ${sqliteFilePath}\nMigrations Path: ${migrationsPath}\n\n`
    );

    // Connect, apply migrations, and initialize query driver
    const db = await connectDatabase({ sqliteFilePath, migrationsPath });
    const queryDriver = initializeQueryDriver({ database: db });

    mainHandleAPI("getAllMilestones", queryDriver.getAllTasks);

    await app.whenReady();
  }
}

export function createDatabaseModule() {
  return new ApplicationDatabase();
}

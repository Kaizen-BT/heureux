import type { AppDatabase } from "./index.js";

interface QueryFuncBase {
  database: AppDatabase;
}

/**
 * Fetches all the projects from the AppDatabase
 *
 * @param {QueryFuncBase} props
 */
export async function getAllProjects({ database }: QueryFuncBase) {
  const data = await database.query.projects.findMany();
  return data;
}

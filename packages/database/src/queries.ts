import type { AppDatabase } from "./index.js";
import type { MilestoneSelect, ProjectSelect, TaskSelect } from "./schema.js";

// --- Interfaces & Type Aliases ---

interface QueryFuncBase {
  database: AppDatabase;
}

type QueryResult<T> = Promise<T>;

// --- Query Runners ---

/**
 * Fetches all the projects from the AppDatabase
 *
 * @param {QueryFuncBase} props
 * @returns {QueryResult<ProjectSelect[]>}
 */
export async function getAllProjects({
  database,
}: QueryFuncBase): QueryResult<ProjectSelect[]> {
  const data = await database.query.projects.findMany();
  return data;
}

/**
 * Fetches all the tasks in the AppDatabase
 *
 * @param {QueryFuncBase} props
 * @returns {QueryResult<TaskSelect[]>}
 */
export async function getAllTasks({
  database,
}: QueryFuncBase): QueryResult<TaskSelect[]> {
  const data = await database.query.tasks.findMany();
  return data;
}

/**
 * Fetches all the milestones in the AppDatabase
 *
 * @param {QueryFuncBase} props
 * @returns {QueryResult<MilestoneSelect[]>}
 */
export async function getAllMilestones({
  database,
}: QueryFuncBase): QueryResult<MilestoneSelect[]> {
  const data = await database.query.milestones.findMany();
  return data;
}

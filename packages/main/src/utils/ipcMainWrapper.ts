import { APIContract } from "@app/api";
import {
  AppDatabase,
  getAllMilestones,
  getAllProjects,
  getAllTasks,
} from "@app/database";
import { ipcMain } from "electron";

/**
 * A wrapper around ipcMain.handle that registers a channel and an event
 * listener with the channel and types inferred from the APIContract
 */
export function mainHandleAPI<K extends keyof APIContract>(
  channel: K,
  handler: (...args: Parameters<APIContract[K]>) => ReturnType<APIContract[K]>
) {
  ipcMain.handle(channel, async (_, args) => {
    return await handler(...(args as Parameters<APIContract[K]>));
  });
}

/**
 * Initializes the Query driver which is an object that abstracts the
 * Database query functions.
 *
 * It also registers the query runners to their appropriate channels
 */
export function initializeQueryDriver({
  database,
}: {
  database: AppDatabase;
}): APIContract {
  return {
    // Projects
    getAllProjects: () => getAllProjects({ database }),

    // Milestones
    getAllMilestones: () => getAllMilestones({ database }),

    // Tasks
    getAllTasks: () => getAllTasks({ database }),
  } satisfies APIContract;
}
